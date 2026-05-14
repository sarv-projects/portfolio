import { CONFIG } from "./config";
import { FadeIn, Reveal, Tag, BackBtn } from "./UI";

export default function Blog({ setPage, th, dark }) {
  return (
    <div className="page-section" style={{ maxWidth: 860 }}>
      <BackBtn setPage={setPage} th={th} />
      <FadeIn>
        <p
          style={{
            fontFamily: "monospace",
            color: th.accent,
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          &gt; blog
        </p>
        <h2
          style={{
            fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
            fontWeight: 900,
            color: th.text,
            margin: "0 0 0.4rem",
            letterSpacing: -1,
          }}
        >
          Writing
        </h2>
        <p
          style={{
            color: th.textMuted,
            fontFamily: "monospace",
            fontSize: 12,
            marginBottom: 48,
          }}
        >
          // research notes, experiments, engineering playbooks
        </p>
      </FadeIn>

      {CONFIG.blogs.length === 0 ? (
        <EmptyBlogState th={th} />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {CONFIG.blogs.map((b, i) => (
            <Reveal key={i} delay={i * 120}>
              <div
                className="blog-card"
                style={{
                  background: th.bgCard,
                  border: `1px solid ${th.border}`,
                  borderRadius: 12,
                  padding: "1.6rem",
                  transition: "border-color 0.2s, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s",
                  boxShadow: dark
                    ? "0 2px 12px rgba(0,0,0,0.15)"
                    : "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${th.accent}50`;
                  e.currentTarget.style.transform = "translateX(6px)";
                  e.currentTarget.style.boxShadow = dark
                    ? `0 6px 24px rgba(0,0,0,0.2), 0 0 0 1px ${th.accent}20`
                    : `0 8px 32px rgba(0,0,0,0.06), 0 0 0 1px ${th.accent}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = th.border;
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.boxShadow = dark
                    ? "0 2px 12px rgba(0,0,0,0.15)"
                    : "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <h3
                    style={{
                      color: th.text,
                      fontSize: 17,
                      fontWeight: 700,
                      margin: 0,
                      lineHeight: 1.3,
                      flex: 1,
                    }}
                  >
                    {b.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: "monospace",
                      color: th.textMuted,
                      fontSize: 11,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {b.date}
                  </span>
                </div>
                <p
                  style={{
                    color: th.textSub,
                    fontSize: 14,
                    lineHeight: 1.65,
                    margin: "0 0 14px",
                  }}
                >
                  {b.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 10,
                  }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {b.tags.map((t) => (
                      <Tag key={t} t={t} th={th} />
                    ))}
                  </div>
                  <a
                    href={b.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontFamily: "monospace",
                      fontSize: 12,
                      color: th.accent,
                      textDecoration: "none",
                      padding: "4px 10px",
                      border: `1px solid ${th.accent}30`,
                      borderRadius: 6,
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${th.accent}10`;
                      e.currentTarget.style.borderColor = th.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = `${th.accent}30`;
                    }}
                  >
                    Read on Medium ↗
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyBlogState({ th }) {
  return (
    <div
      style={{
        background: th.bgCard,
        border: `1px solid ${th.border}`,
        borderRadius: 12,
        padding: "3rem",
        textAlign: "center",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
      }}
    >
      <p
        style={{
          fontFamily: "monospace",
          color: th.textMuted,
          fontSize: 13,
          margin: 0,
        }}
      >
        // posts incoming
      </p>
      <p style={{ color: th.textSub, fontSize: 14, marginTop: 12 }}>
        First post dropping soon on Medium.
      </p>
      <a
        href="https://medium.com"
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-block",
          marginTop: 20,
          fontFamily: "monospace",
          fontSize: 12,
          color: th.accent,
          textDecoration: "none",
          border: `1px solid ${th.accent}50`,
          borderRadius: 6,
          padding: "8px 20px",
        }}
      >
        Follow on Medium ↗
      </a>
    </div>
  );
}
