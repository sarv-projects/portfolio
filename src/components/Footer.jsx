import { CONFIG } from "./config";

export default function Footer({ th }) {
  return (
    <footer
      style={{
        background: th.bgCard,
        borderTop: `1px solid ${th.border}`,
        padding: "clamp(1.5rem, 4vw, 2.5rem) clamp(1rem, 3vw, 2rem)",
        textAlign: "center",
        fontFamily: "monospace",
        color: th.textMuted,
        fontSize: 12,
        marginTop: "4rem",
      }}
    >
      <p style={{ margin: "0 0 0.5rem" }}>
        © {new Date().getFullYear()} {CONFIG.name}. All rights reserved.
      </p>
      <p style={{ margin: 0, fontSize: 11, opacity: 0.6 }}>
        Built with React + Vite · Designed & coded by me
      </p>
    </footer>
  );
}
