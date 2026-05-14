import { useState } from "react";
import { CONFIG, PAGES } from "./config";

export default function Nav({ page, setPage, th }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.5rem",
        height: 52,
        boxSizing: "border-box",
        background: "rgba(7,8,15,0.92)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: `1px solid ${th.border}`,
        transition: "background 0.3s",
      }}
    >
      {/* Logo */}
      <span
        onClick={() => setPage("home")}
        style={{
          fontFamily: "monospace",
          fontSize: 17,
          color: th.text,
          cursor: "pointer",
          letterSpacing: 1,
          fontWeight: 700,
        }}
      >
        <span style={{ color: th.accent, fontWeight: 400 }}>✦ </span>SB
      </span>

      {/* Desktop nav */}
      <div
        className="nav-desktop"
        style={{ display: "flex", alignItems: "center", gap: "1.8rem" }}
      >
        {PAGES.filter((p) => p !== "home").map((p) => (
          <span
            key={p}
            onClick={() => setPage(p)}
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              cursor: "pointer",
              letterSpacing: 1.9,
              color: page === p ? th.accent : th.text,
              textTransform: "uppercase",
              opacity: page === p ? 1 : 0.75,
              transition: "color 0.2s, opacity 0.2s",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = th.accent;
              e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = page === p ? th.accent : th.text;
              e.currentTarget.style.opacity = page === p ? "1" : "0.75";
            }}
          >
            {page === p && (
              <span
                style={{
                  position: "absolute",
                  bottom: -4,
                  left: 0,
                  right: 0,
                  height: 1.5,
                  background: th.accent,
                  borderRadius: 2,
                }}
              />
            )}
            {p}
          </span>
        ))}

        {CONFIG.resume && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <a
              href={CONFIG.resume}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                letterSpacing: 1.2,
                color: th.accent,
                border: `1px solid ${th.accent}50`,
                borderRadius: 5,
                padding: "4px 10px",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${th.accent}15`;
                e.currentTarget.style.borderColor = th.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = `${th.accent}50`;
              }}
            >
              Resume ↗
            </a>
            <a
              href={CONFIG.resume}
              download
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                letterSpacing: 1.2,
                color: th.textSub,
                border: `1px solid ${th.border}`,
                borderRadius: 5,
                padding: "4px 8px",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = th.accent;
                e.currentTarget.style.borderColor = th.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = th.textSub;
                e.currentTarget.style.borderColor = th.border;
              }}
            >
              ⤓
            </a>
          </div>
        )}

      </div>

      {/* Mobile toggle */}
      <div
        className="nav-mobile"
        style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}
      >
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: 20,
            color: th.text,
          }}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        style={{
          position: "absolute",
          top: 52,
          left: 0,
          right: 0,
          background: th.bg,
          borderBottom: `1px solid ${th.border}`,
          padding: mobileMenuOpen ? "1rem 1.5rem" : "0 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
          zIndex: 99,
          maxHeight: mobileMenuOpen ? 360 : 0,
          opacity: mobileMenuOpen ? 1 : 0,
          overflow: "hidden",
          pointerEvents: mobileMenuOpen ? "auto" : "none",
          transition: "max-height 0.25s ease, opacity 0.25s ease",
        }}
      >
        {PAGES.filter((p) => p !== "home").map((p) => (
          <span
            key={p}
            onClick={() => {
              setPage(p);
              setMobileMenuOpen(false);
            }}
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              cursor: "pointer",
              letterSpacing: 1.5,
              color: page === p ? th.accent : th.textSub,
              textTransform: "uppercase",
              padding: "0.4rem 0",
              transition: "color 0.2s",
            }}
          >
            {p}
          </span>
        ))}
        {CONFIG.resume && (
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginTop: 8 }}>
            <a
              href={CONFIG.resume}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                letterSpacing: 1.2,
                color: th.accent,
                border: `1px solid ${th.accent}50`,
                borderRadius: 5,
                padding: "6px 12px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              View Resume ↗
            </a>
            <a
              href={CONFIG.resume}
              download
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                letterSpacing: 1.2,
                color: th.textSub,
                border: `1px solid ${th.border}`,
                borderRadius: 5,
                padding: "6px 12px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Download ⤓
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
