import { useState, useEffect, useRef } from "react";

// ── Tag / Badge ──
export function Tag({ t, th, variant = "default" }) {
  const isProject = variant === "project";
  return (
    <span
      style={{
        fontFamily: "monospace",
        fontSize: 11,
        color: isProject ? th.textSub : th.textMuted,
        background: isProject ? `${th.accent}12` : th.bg,
        border: isProject ? `1px solid ${th.accent}50` : `1px solid ${th.border}`,
        borderRadius: 4,
        padding: "2px 8px",
        letterSpacing: 0.5,
        fontWeight: isProject ? 500 : 400,
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 12px ${th.accent}18`;
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 0 transparent";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {t}
    </span>
  );
}

// ── Fade In (page transitions with scale + blur) ──
export function FadeIn({ children, delay = 0 }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(id);
  }, [delay]);
  return (
    <div
      style={{
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0) scale(1)" : "translateY(16px) scale(0.95)",
        filter: ready ? "blur(0)" : "blur(4px)",
        transition: "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), filter 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
}

// ── Scroll Reveal (with stagger delay) ──
export function Reveal({ children, threshold = 0.2, delay = 0 }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold, delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) translateX(0)" : "translateY(24px) translateX(-6px)",
        transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}

// ── Back Button ──
export function BackBtn({ setPage, th }) {
  const [hov, setHov] = useState(false);
  return (
    <>
      {/* Desktop: fixed bottom-right */}
      <button
        onClick={() => setPage("home")}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="back-btn-desktop"
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          zIndex: 200,
          fontFamily: "monospace",
          fontSize: 12,
          letterSpacing: 1.5,
          padding: "9px 20px",
          borderRadius: 8,
          cursor: "pointer",
          background: hov ? `${th.accent}12` : `${th.bgCard}cc`,
          color: hov ? th.accent : th.textMuted,
          border: `1px solid ${hov ? th.accent : th.border}`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: hov ? `0 4px 20px rgba(0,0,0,0.08)` : "none",
          transition: "all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        ← HOME
      </button>
      {/* Mobile: inline at top of page, not fixed */}
      <button
        onClick={() => setPage("home")}
        className="back-btn-mobile"
        style={{
          display: "none",
          fontFamily: "monospace",
          fontSize: 12,
          letterSpacing: 1.5,
          padding: "8px 18px",
          borderRadius: 8,
          cursor: "pointer",
          background: `${th.bgCard}cc`,
          color: th.textMuted,
          border: `1px solid ${th.border}`,
          marginBottom: "1.5rem",
          transition: "all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        ← HOME
      </button>
    </>
  );
}

// ── Section Header ──
export function SectionHeader({ label, title, subtitle }) {
  return (
    <>
      <p
        style={{
          fontFamily: "monospace",
          color: "var(--color-accent, inherit)",
          fontSize: 11,
          letterSpacing: 4,
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        &gt; {label}
      </p>
      <h2
        style={{
          fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
          fontWeight: 900,
          margin: "0 0 0.4rem",
          letterSpacing: -1,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            color: "var(--color-muted, inherit)",
            fontFamily: "monospace",
            fontSize: 12,
            marginBottom: 48,
          }}
        >
          {subtitle}
        </p>
      )}
    </>
  );
}
