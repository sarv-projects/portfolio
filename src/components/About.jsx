import { CONFIG } from "./config";
import { FadeIn, BackBtn } from "./UI";

export default function About({ setPage, th, dark }) {
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
          &gt; about
        </p>
        <h2
          style={{
            fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
            fontWeight: 900,
            color: th.text,
            margin: "0 0 2rem",
            letterSpacing: -1,
          }}
        >
          Who I Am
        </h2>
      </FadeIn>

      <FadeIn delay={60}>
        <p
          style={{
            color: th.textSub,
            fontSize: 15.5,
            lineHeight: 1.85,
            marginBottom: 52,
          }}
        >
          {CONFIG.about}
        </p>
      </FadeIn>

      <FadeIn delay={100}>
        <p
          style={{
            fontFamily: "monospace",
            color: th.accent,
            fontSize: 11,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          // Experience
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {CONFIG.experience.map((e, i) => (
            <div
              key={i}
              style={{
                background: th.bgCard,
                border: `1px solid ${th.border}`,
                borderRadius: 12,
                padding: "1.4rem 1.6rem",
                display: "flex",
                gap: "1.25rem",
                alignItems: "flex-start",
                transition: "border-color 0.2s, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.25s ease",
                boxShadow: dark
                  ? "0 2px 12px rgba(0,0,0,0.15)"
                  : "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${th.accent}50`;
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = dark
                  ? `0 6px 24px rgba(0,0,0,0.2), 0 0 0 1px ${th.accent}20`
                  : `0 8px 32px rgba(0,0,0,0.06), 0 0 0 1px ${th.accent}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = th.border;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = dark
                  ? "0 2px 12px rgba(0,0,0,0.15)"
                  : "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)";
              }}
            >
              <div style={{ minWidth: 10, marginTop: 7 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: th.accent,
                    boxShadow: `0 0 8px ${th.accent}`,
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ color: th.text, fontWeight: 700, fontSize: 15 }}>
                    {e.role}
                  </span>
                  {e.link ? (
                    <a
                      href={e.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontFamily: "monospace",
                        color: th.accent,
                        fontSize: 12,
                        textDecoration: "none",
                        transition: "all 0.2s",
                        borderBottom: `1px dotted ${th.accent}40`,
                      }}
                      onMouseEnter={(el) => {
                        el.currentTarget.style.borderBottomColor = th.accent;
                        el.currentTarget.style.opacity = "0.8";
                      }}
                      onMouseLeave={(el) => {
                        el.currentTarget.style.borderBottomColor = `${th.accent}40`;
                        el.currentTarget.style.opacity = "1";
                      }}
                    >
                      @ {e.company} ↗
                    </a>
                  ) : (
                    <span style={{ fontFamily: "monospace", color: th.accent, fontSize: 12 }}>
                      @ {e.company}
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: "monospace",
                      color: th.textMuted,
                      fontSize: 12,
                    }}
                  >
                    {e.period}
                  </span>
                  {e.location && (
                    <span
                      style={{
                        fontFamily: "monospace",
                        color: th.textMuted,
                        fontSize: 11,
                        marginLeft: 8,
                      }}
                    >
                      — {e.location}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    color: th.textSub,
                    fontSize: 13.5,
                    lineHeight: 1.65,
                    margin: "8px 0 0",
                  }}
                >
                  {e.desc.split("\n\n").map((para, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "flex-start",
                        margin: idx === 0 ? "0" : "14px 0 0",
                      }}
                    >
                      <div
                        style={{
                          minWidth: 7,
                          marginTop: 5,
                        }}
                      >
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: th.accent,
                            boxShadow: `0 0 8px ${th.accent}, 0 0 20px ${th.accent}50`,
                            transition: "box-shadow 0.3s ease",
                          }}
                        />
                      </div>
                      <p
                        style={{
                          margin: 0,
                          lineHeight: 1.7,
                          color: th.textSub,
                        }}
                      >
                        {para}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Education */}
      {CONFIG.education && CONFIG.education.length > 0 && (
        <FadeIn delay={140}>
          <div style={{ marginTop: 44 }}>
            <p
              style={{
                fontFamily: "monospace",
                color: th.accent,
                fontSize: 11,
                letterSpacing: 3,
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              // Education
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {CONFIG.education.map((e, i) => (
                <div
                  key={i}
                  style={{
                    background: th.bgCard,
                    border: `1px solid ${th.border}`,
                    borderRadius: 12,
                    padding: "1.2rem 1.6rem",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                    boxShadow: dark
                      ? "0 2px 12px rgba(0,0,0,0.15)"
                      : "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ minWidth: 10, marginTop: 6 }}>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: th.textMuted,
                        opacity: 0.5,
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        flexWrap: "wrap",
                        gap: 8,
                      }}
                    >
                      <span style={{ color: th.text, fontWeight: 700, fontSize: 14 }}>
                        {e.school}
                      </span>
                      <span
                        style={{
                          fontFamily: "monospace",
                          color: th.textMuted,
                          fontSize: 11,
                        }}
                      >
                        {e.period}
                      </span>
                    </div>
                    <p
                      style={{
                        color: th.textSub,
                        fontSize: 13,
                        margin: "4px 0 0",
                      }}
                    >
                      {e.degree}
                      {e.cgpa && (
                        <span
                          style={{
                            fontFamily: "monospace",
                            color: th.textMuted,
                            fontSize: 12,
                            marginLeft: 8,
                          }}
                        >
                          — {e.cgpa}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
