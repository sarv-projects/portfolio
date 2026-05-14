import { CONFIG } from "./config";
import { FadeIn, Reveal, Tag, BackBtn } from "./UI";

export default function Projects({ setPage, th, dark }) {
  return (
    <div className="page-section" style={{ maxWidth: 1200 }}>
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
          &gt; projects
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
          Things I've Built
        </h2>
        <p
          style={{
            color: th.textMuted,
            fontFamily: "monospace",
            fontSize: 12,
            marginBottom: 64,
          }}
        >
          // grows as I ship more
        </p>
      </FadeIn>

      {/* Grid — media queries handled in index.css */}
      <div className="projects-grid">
        {CONFIG.projects.map((p, i) => (
          <Reveal key={i} delay={120 + i * 80}>
            <div
              className="project-card"
              style={{
                background: th.bgCard,
                border: `1px solid ${th.border}`,
                borderLeft: `3px solid ${th.accent}`,
                borderRadius: 12,
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                position: "relative",
                overflow: "hidden",
                boxShadow: dark
                  ? `0 2px 8px rgba(0,0,0,0.15)`
                  : `0 1px 3px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = dark
                  ? `0 8px 24px rgba(0,0,0,0.2)`
                  : `0 4px 16px rgba(0,0,0,0.06)`;
                e.currentTarget.style.borderColor = th.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = dark
                  ? `0 2px 8px rgba(0,0,0,0.15)`
                  : `0 1px 3px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)`;
                e.currentTarget.style.borderColor = th.border;
              }}
            >
              
              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 8,
                  }}
                >
                  <div>
                    <h3
                      style={{
                        color: th.text,
                        fontSize: 18,
                        fontWeight: 800,
                        margin: 0,
                        lineHeight: 1.2,
                        letterSpacing: -0.5,
                      }}
                    >
                      {p.title.replace(/ \(In Progress\)/, "")}
                    </h3>
                    <span
                      style={{
                        fontFamily: "monospace",
                        color: th.accent,
                        fontSize: 12,
                        marginTop: 4,
                        display: "block",
                        fontWeight: 600,
                      }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  {/* Status badge */}
                  {p.status === "live" && (
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 10,
                        letterSpacing: 1,
                        color: "#00ff88",
                        border: `1px solid #00ff8860`,
                        borderRadius: 4,
                        padding: "2px 8px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Live
                    </span>
                  )}
                  {p.status === "in-progress" && (
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 10,
                        letterSpacing: 1,
                        color: "#ffd700",
                        border: `1px solid #ffd70060`,
                        borderRadius: 4,
                        padding: "2px 8px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      In Progress
                    </span>
                  )}
                  {p.status === "experiment" && (
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 10,
                        letterSpacing: 1,
                        color: "#ff6b9d",
                        border: `1px solid #ff6b9d60`,
                        borderRadius: 4,
                        padding: "2px 8px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Experiment
                    </span>
                  )}
                </div>

                <div
                  className="project-desc"
                  style={{
                    color: th.textSub,
                    fontSize: 14,
                    lineHeight: 1.7,
                    marginBottom: 16,
                  }}
                >
                  {p.desc.split("\n\n").map((para, idx) => (
                    <p
                      key={idx}
                      style={{
                        margin: idx === 0 ? "0 0 12px" : "12px 0",
                        fontSize: idx === 0 ? 15 : 14,
                        fontWeight: idx === 0 ? 600 : 400,
                      }}
                    >
                      {para.split("\n").map((line, j) => (
                        <span key={j}>
                          {line.startsWith("- ") ? (
                            <span style={{ color: th.text, fontWeight: 500 }}>
                              • {line.slice(2)}
                            </span>
                          ) : (
                            line
                          )}
                          {j < para.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>

                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}
                >
                  {p.stack.map((t) => (
                    <Tag key={t} t={t} th={th} variant="project" />
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    borderTop: `1px solid ${th.border}`,
                    paddingTop: 16,
                    flexWrap: "wrap",
                  }}
                >
                  {p.github && p.github !== "#" && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontFamily: "monospace",
                        fontSize: 12,
                        color: th.accent,
                        textDecoration: "none",
                        transition: "all 0.2s",
                        padding: "6px 14px",
                        border: `1px solid ${th.accent}40`,
                        borderRadius: 6,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${th.accent}10`;
                        e.currentTarget.style.borderColor = th.accent;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor = `${th.accent}40`;
                      }}
                    >
                      GitHub ↗
                    </a>
                  )}
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontFamily: "monospace",
                        fontSize: 12,
                        color: th.accent,
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                        padding: "6px 14px",
                        border: `1px solid ${th.accent}40`,
                        borderRadius: 6,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = th.accent;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = `${th.accent}40`;
                      }}
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
