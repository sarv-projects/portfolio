import { CONFIG, SKILL_COLORS } from "./config";
import { FadeIn, Reveal, BackBtn } from "./UI";

export default function Skills({ setPage, th, dark }) {
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
          &gt; skills
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
          Stack & Skills
        </h2>
        <p
          style={{
            color: th.textMuted,
            fontFamily: "monospace",
            fontSize: 12,
            marginBottom: 48,
          }}
        >
          // tools I use in production
        </p>
      </FadeIn>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {CONFIG.skillGroups.map((g, i) => {
          const color = SKILL_COLORS[i % SKILL_COLORS.length];
          return (
            <Reveal key={i} delay={i * 100}>
            <div>
              <p
                style={{
                  fontFamily: "monospace",
                  color: color,
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  marginBottom: 14,
                  opacity: 0.9,
                }}
              >
                ✦ {g.label}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {g.skills.map((s) => (
                  <div
                    key={s}
                    style={{
                      background: dark ? th.bgCard : "#ffffff",
                      border: `1px solid ${th.border}`,
                      borderRadius: 8,
                      padding: "10px 18px",
                      fontFamily: "monospace",
                      fontSize: 13,
                      color: th.textSub,
                      transition: "all 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
                      cursor: "default",
                      boxShadow: dark
                        ? "0 2px 8px rgba(0,0,0,0.12)"
                        : "0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = color;
                      e.currentTarget.style.color = color;
                      e.currentTarget.style.background = `${color}08`;
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = `0 6px 20px ${color}18`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = th.border;
                      e.currentTarget.style.color = th.textSub;
                      e.currentTarget.style.background = dark ? th.bgCard : "#ffffff";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = dark
                        ? "0 2px 8px rgba(0,0,0,0.12)"
                        : "0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)";
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
