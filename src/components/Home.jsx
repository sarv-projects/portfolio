import { useState, useEffect, useRef, useCallback } from "react";
import { CONFIG } from "./config";
import { TechBg } from "./Backgrounds";
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

export default function Home({ setPage, th }) {
  const [typed, setTyped] = useState("");
  const [showName, setShowName] = useState(false);
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

  

  return (
    <div
      ref={heroRef}
      style={{
        position: "relative",
        height: "calc(100dvh - 52px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "52px",
      }}
    >
      {/* Background layer - simplified */}
      <TechBg />

      {/* Deep space vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 15%, rgba(2,3,8,0.4) 50%, rgba(2,3,8,0.9) 100%)",
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
          background: "linear-gradient(to top, rgba(2,3,8,1), transparent)",
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
              <NameReveal text={CONFIG.name} accent="#ffffff" />
            )}
          </h1>

          {/* Accent line */}
            <div
              style={{
                height: 2,
                width: 0,
                background: "#ffffff",
                margin: "20px auto 20px",
                borderRadius: 2,
                opacity: 0.3,
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
                background: "#020308",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.15)",
                fontWeight: 700,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#020308";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
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
                background: "#020308",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.15)",
                fontWeight: 700,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#020308";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
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
              return (
                <div
                  key={tag}
                  style={{
                    position: "relative",
                    padding: "16px 32px",
                    cursor: "default",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    color: "#e2e8f0",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    background: "rgba(255, 255, 255, 0.04)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                    borderTop: "1px solid rgba(0, 210, 255, 0.35)",
                    borderLeft: "1px solid rgba(0, 210, 255, 0.25)",
                    borderRight: "1px solid rgba(0, 210, 255, 0.1)",
                    borderBottom: "1px solid rgba(0, 210, 255, 0.08)",
                    boxShadow: "0 0 40px rgba(0, 210, 255, 0.12)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(0, 210, 255, 0.1)";
                    e.currentTarget.style.borderTopColor = "rgba(0, 210, 255, 0.8)";
                    e.currentTarget.style.borderLeftColor = "rgba(0, 210, 255, 0.5)";
                    e.currentTarget.style.boxShadow = "0 0 60px rgba(0,210,255,0.25), 0 0 100px rgba(0,210,255,0.1)";
                    e.currentTarget.style.letterSpacing = "0.2em";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    const meta = e.currentTarget.querySelector(".meta-label");
                    if (meta) meta.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                    e.currentTarget.style.borderTopColor = "rgba(0, 210, 255, 0.35)";
                    e.currentTarget.style.borderLeftColor = "rgba(0, 210, 255, 0.25)";
                    e.currentTarget.style.boxShadow = "0 0 40px rgba(0,210,255,0.12)";
                    e.currentTarget.style.letterSpacing = "0.15em";
                    e.currentTarget.style.transform = "translateY(0)";
                    const meta = e.currentTarget.querySelector(".meta-label");
                    if (meta) meta.style.opacity = "0.5";
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      color: "#00d2ff",
                      textShadow: "0 0 8px rgba(0,210,255,0.6)",
                      marginRight: 10,
                      fontSize: "0.65rem",
                    }}
                  >
                    ◆
                  </span>
                  {tag}
                  <span
                    className="meta-label"
                    style={{
                      position: "absolute",
                      right: 14,
                      bottom: 6,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.5rem",
                      color: "rgba(0, 210, 255, 0.5)",
                      letterSpacing: "0.05em",
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    {i === 0 ? "ACTIVE" : i === 1 ? "12ms" : i === 2 ? "RAG" : "CORE"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
