import { CONFIG } from "./config";
import { FadeIn, Reveal, BackBtn } from "./UI";

export default function Contact({ setPage, th, dark }) {
  const links = [
    {
      label: "Email",
      value: CONFIG.email,
      href: `mailto:${CONFIG.email}`,
      desc: "Best way to reach me",
    },
    {
      label: "Phone",
      value: CONFIG.phone,
      href: `tel:${CONFIG.phone}`,
      desc: "Available for quick calls",
    },
    {
      label: "GitHub",
      value: CONFIG.github.replace("https://github.com/", ""),
      href: CONFIG.github,
      desc: "Code & projects",
    },
    {
      label: "LinkedIn",
      value: CONFIG.linkedin.replace("https://www.linkedin.com/in/", "").replace(/\/$/, ""),
      href: CONFIG.linkedin,
      desc: "Professional profile",
    },
    {
      label: "Medium",
      value: "@sarveshbh.2022",
      href: CONFIG.medium,
      desc: "Writing & research",
    },
  ];

  return (
    <div style={{ padding: "7rem 2.5rem 6rem", maxWidth: 600, margin: "0 auto" }}>
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
          &gt; contact
        </p>
        <h2
          style={{
            fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
            fontWeight: 900,
            color: th.text,
            margin: "0 0 1rem",
            letterSpacing: -1,
          }}
        >
          Get In Touch
        </h2>
        <p
          style={{
            color: th.textSub,
            fontSize: 15,
            lineHeight: 1.75,
            marginBottom: 48,
          }}
        >
          Open to AI engineering roles, collaborations, and interesting problems.
        </p>
      </FadeIn>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {links.map(({ label, value, href, desc }, i) => (
          <Reveal key={label} delay={i * 80}>
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <div
              className="contact-card"
              style={{
                background: th.bgCard,
                border: `1px solid ${th.border}`,
                borderRadius: 12,
                padding: "1.1rem 1.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
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
              <div>
                <span
                  style={{
                    fontFamily: "monospace",
                    color: th.accent,
                    fontSize: 13,
                    letterSpacing: 1,
                    display: "block",
                    marginBottom: 2,
                  }}
                >
                  {label}
                </span>
                {desc && (
                  <span
                    style={{
                      fontFamily: "monospace",
                      color: th.textMuted,
                      fontSize: 10,
                      letterSpacing: 0.5,
                    }}
                  >
                    {desc}
                  </span>
                )}
              </div>
              <span
                style={{
                  color: th.textSub,
                  fontSize: 13,
                  textAlign: "right",
                  wordBreak: "break-all",
                  maxWidth: "55%",
                }}
              >
                {value} ↗
              </span>
            </div>
          </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
