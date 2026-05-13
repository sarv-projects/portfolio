import { useState, useEffect, useRef, useCallback } from "react";
import { CONFIG } from "./config";
import { TechBg, OrbitalLayer } from "./Backgrounds";
import { FadeIn } from "./UI";

// ── Name reveal (clean fade+slide, no character splitting) ──
function NameReveal({ text, accent }) {
  return (
    <span
      style={{
        color: accent,
        opacity: 0,
        transform: "translateY(16px)",
        animation: "name-slide-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards",
        display: "inline",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );
}

// ── Magnetic button ──
function MagneticBtn({ children, onClick, style, onMouseEnter, onMouseLeave }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 120;
    const strength = Math.max(0, 1 - dist / maxDist);
    setPos({ x: dx * strength * 0.2, y: dy * strength * 0.2 });
  }, []);

  const handleMouseLeave = useCallback((e) => {
    setPos({ x: 0, y: 0 });
    onMouseLeave?.(e);
  }, [onMouseLeave]);

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
      style={{
        ...style,
        transform: `translate(${pos.x}px, ${pos.y}px) scale(${pos.x !== 0 || pos.y !== 0 ? 1.02 : 1})`,
        transition: pos.x === 0 && pos.y === 0 ? "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
        willChange: "transform",
      }}
    >
      {children}
    </button>
  );
}

// ── Tag colors — each tag gets its own dark, sharp identity ──
const TAG_COLORS = [
  { dark: "#a78bfa", light: "#5b21b6" },  // Multi-Agent Systems — deep purple
  { dark: "#f472b6", light: "#9d174d" },  // Voice AI — deep pink
  { dark: "#2dd4bf", light: "#0f766e" },  // RAG Pipelines — deep teal
  { dark: "#fbbf24", light: "#92400e" },  // Backend Engineering — deep amber
];

export default function Home({ setPage, th, dark }) {
  const [typed, setTyped] = useState("");
  const [showName, setShowName] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const heroRef = useRef(null);

  const full = CONFIG.tagline;

  // Stagger name reveal
  useEffect(() => {
    const id = setTimeout(() => setShowName(true), 250);
    return () => clearTimeout(id);
  }, []);

  // Typewriter
  useEffect(() => {
    if (!showName) return;
    let i = 0;
    const iv = setInterval(() => {
      setTyped(full.slice(0, i + 1));
      i++;
      if (i >= full.length) clearInterval(iv);
    }, 35);
    return () => clearInterval(iv);
  }, [showName, full]);

  // Mouse tracking for spotlight
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={heroRef}
      style={{
        position: "relative",
        height: "calc(100vh - 52px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "52px",
      }}
    >
      {/* Background layers */}
      <TechBg dark={dark} accent={th.accent} />
      <OrbitalLayer dark={dark} th={th} />

      {/* Mouse-tracking ambient spotlight */}
      <div
        style={{
          position: "absolute",
          width: "80vmax",
          height: "80vmax",
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle at center, ${th.accent}0a 0%, ${th.accent}04 30%, transparent 60%)`,
          zIndex: 1,
          pointerEvents: "none",
          transition: "left 0.3s ease-out, top 0.3s ease-out",
        }}
      />

      {/* Soft vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: dark
            ? "radial-gradient(ellipse at center, transparent 30%, rgba(11,13,20,0.85) 100%)"
            : "radial-gradient(ellipse at center, transparent 30%, rgba(248,250,252,0.85) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: dark
            ? "linear-gradient(to top, rgba(11,13,20,1), transparent)"
            : "linear-gradient(to top, rgba(248,250,252,1), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <FadeIn delay={100}>
        <div
          style={{
            position: "relative",
            zIndex: 3,
            textAlign: "center",
            padding: "0 1.5rem",
            maxWidth: 740,
          }}
        >
          {/* Name — stagger-revealed letters */}
          <h1
            style={{
              fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
              fontWeight: 900,
              margin: 0,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              minHeight: "1.2em",
            }}
          >
            {showName && (
              <NameReveal text={CONFIG.name} accent={th.accent} />
            )}
          </h1>

          {/* Accent line */}
          <div
            style={{
              height: 2,
              width: 0,
              background: th.accent,
              margin: "20px auto 20px",
              borderRadius: 2,
              opacity: 0.5,
              animation: showName ? "line-grow 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards" : "none",
            }}
          />

          {/* Tagline */}
          <p
            style={{
              color: th.textSub,
              fontSize: "clamp(1rem, 2vw, 1.22rem)",
              minHeight: 34,
              fontWeight: 300,
              letterSpacing: 0.3,
              whiteSpace: "pre-wrap",
              opacity: 0,
              animation: showName ? "fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.85s forwards" : "none",
            }}
          >
            {typed}
            <span
              style={{
                opacity: 0.6,
                animation: "pulse-glow 1s ease-in-out infinite",
              }}
            >
              |
            </span>
          </p>

          {/* CTA buttons — magnetic */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              marginTop: 44,
              flexWrap: "wrap",
              opacity: 0,
              animation: showName ? "fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1s forwards" : "none",
            }}
          >
            <MagneticBtn
              onClick={() => setPage("projects")}
              style={{
                fontFamily: "monospace",
                fontSize: 13,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                padding: "12px 36px",
                borderRadius: 8,
                cursor: "pointer",
                background: th.accent,
                color: dark ? "#0b0d14" : "#ffffff",
                border: "none",
                fontWeight: 700,
                boxShadow: `0 4px 14px ${th.accent}40, 0 1px 3px rgba(0,0,0,0.08)`,
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 6px 24px ${th.accent}60, 0 2px 6px rgba(0,0,0,0.1)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 4px 14px ${th.accent}40, 0 1px 3px rgba(0,0,0,0.08)`;
              }}
            >
              View Projects
            </MagneticBtn>

            <MagneticBtn
              onClick={() => setPage("about")}
              style={{
                fontFamily: "monospace",
                fontSize: 13,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                padding: "12px 36px",
                borderRadius: 8,
                cursor: "pointer",
                background: "transparent",
                color: th.accent,
                border: `1.5px solid ${th.accent}50`,
                fontWeight: 600,
                backdropFilter: "blur(4px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${th.accent}10`;
                e.currentTarget.style.borderColor = th.accent;
                e.currentTarget.style.boxShadow = `0 4px 16px ${th.accent}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = `${th.accent}50`;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              About Me
            </MagneticBtn>
          </div>

          {/* Quick tags — each with its own dark, sharp color + floating */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 14,
              marginTop: 44,
              flexWrap: "wrap",
              opacity: 0,
              animation: showName ? "fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1.15s forwards" : "none",
            }}
          >
            {CONFIG.homeTags.map((tag, i) => {
              const tc = TAG_COLORS[i] || TAG_COLORS[0];
              const c = dark ? tc.dark : tc.light;
              const floatDuration = 3 + i * 0.6;
              return (
                <span
                  key={tag}
                  style={{
                    fontFamily: "monospace",
                    fontSize: 12,
                    fontWeight: 700,
                    color: c,
                    letterSpacing: 0.5,
                    padding: "7px 18px",
                    border: `1px solid ${c}60`,
                    borderRadius: 20,
                    background: `${c}10`,
                    backdropFilter: "blur(6px)",
                    boxShadow: `0 0 14px ${c}20, 0 0 40px ${c}08`,
                    cursor: "default",
                    animation: `float-tag ${floatDuration}s ease-in-out ${0.2 * i}s infinite`,
                    transition: "all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                  onMouseEnter={(e) => {
                    const c2 = dark ? tc.dark : tc.light;
                    e.currentTarget.style.setProperty("--glow", c2);
                    e.currentTarget.style.setProperty("--glow-dim", `${c2}40`);
                    e.currentTarget.style.setProperty("--glow-dim2", `${c2}20`);
                    e.currentTarget.style.setProperty("--glow-bright", `${c2}70`);
                    e.currentTarget.style.setProperty("--glow-bright2", `${c2}40`);
                    e.currentTarget.style.borderColor = c2;
                    e.currentTarget.style.background = `${c2}25`;
                    e.currentTarget.style.animation = "neon-pulse 1.6s ease-in-out infinite";
                    e.currentTarget.style.transform = "translateY(-4px) scale(1.06)";
                  }}
                  onMouseLeave={(e) => {
                    const c2 = dark ? tc.dark : tc.light;
                    e.currentTarget.style.borderColor = `${c2}60`;
                    e.currentTarget.style.background = `${c2}10`;
                    e.currentTarget.style.animation = `float-tag ${floatDuration}s ease-in-out ${0.2 * i}s infinite`;
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                  }}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
