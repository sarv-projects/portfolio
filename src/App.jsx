import { useState, useEffect, useRef } from "react";

const CONFIG = {
  name: "Sarvesh Bhattacharyya",
  title: "AI Engineer",
  tagline: "I build the infrastructure that lets LLMs act autonomously.",
  email: "you@email.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  about: `Final year ECE student at MSRIT Bengaluru, interning as an AI Engineer. I specialize in backend orchestration — stateful multi-tenant agentic systems using FastAPI, LangGraph, and MCP. I think in systems before I think in code. I don't just write prompts — I design the infrastructure behind them.`,
  experience: [
    {
      role: "AI Engineer Intern",
      company: "Beaut Group",
      period: "Feb 2025 – Present",
      desc: "Building multi-tenant agentic integrations on a live production AI platform. Designed and built Slack OAuth integration, Notion→Pinecone incremental sync pipeline, and parallel multi-agent voice qualification architecture using CrewAI + Redis. Proposed Premium Plugin Layer using self-hosted n8n — approved and added to product roadmap.",
    },
  ],
  skills: [
    "Python","FastAPI","LangGraph","CrewAI","MCP",
    "RAG","Pinecone","ChromaDB","Redis","PostgreSQL",
    "QLoRA","Unsloth","Ollama","VAPI","Nango",
    "React","Vite","Docker","Firebase","Git",
  ],
  projects: [
    {
      title: "ARIA — AI Interview Coach",
      desc: "Voice-based AI interview coach with resume-grounded questioning, smart multi-signal VAD, session memory with semantic no-repeat, face confidence analysis (browser-local), and a pushiness monitor. 8-node LangGraph pipeline. Privacy-first — video never leaves browser.",
      stack: ["React","Vite","FastAPI","LangGraph","Groq","Deepgram","ElevenLabs","MediaPipe"],
      github: "#", live: "",
    },
    {
      title: "LLM Twin",
      desc: "Personal AI fine-tuned to write exactly like me, with RAG-based memory, running 100% locally. QLoRA fine-tuned Llama 3.2 3B on 9k personal messages. 4-bit GGUF via Ollama. ChromaDB for semantic memory.",
      stack: ["Python","Llama 3.2","QLoRA","Unsloth","Ollama","ChromaDB","Sentence Transformers"],
      github: "#", live: "",
    },
    {
      title: "ACARE — Clinical Assistance Robot",
      desc: "6-DOF robotic arm for plastic surgery departments. Dual-layer architecture: Raspberry Pi 5 + ROS2 for AI, Teensy 4.1 for real-time PID motor control. YOLOv11 tool detection, LangGraph dialogue, speaker + face auth, dual-layer hardware safety.",
      stack: ["ROS2","Python","C++","YOLOv11","LangGraph","Deepgram","Raspberry Pi 5"],
      github: "#", live: "",
    },
    {
      title: "CodeNavigator",
      desc: "Agentic code intelligence system. Drop any GitHub repo — understand it instantly. AST parsing, 3-layer call graph, Bayesian file probability map, hybrid RAG, 7-node LangGraph, Redis caching, sub-2s query latency.",
      stack: ["Python","LangGraph","Redis","FastAPI","ChromaDB","Langfuse"],
      github: "#", live: "",
    },
  ],
};

const accent = "#00d4ff";
const bg = "#07080f";
const bgCard = "#0d0f1a";
const border = "#1a1d2e";
const textMuted = "#4b5563";
const textSub = "#9ca3af";

// ── Grid + Particles BG ──
function TechBg() {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let W, H, pts, anim;
    const N = 70;
    function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
    function init() {
      resize();
      pts = Array.from({ length: N }, () => ({
        x: Math.random()*W, y: Math.random()*H,
        vx: (Math.random()-.5)*.22, vy: (Math.random()-.5)*.22,
        r: Math.random()*1.2+.4,
      }));
    }
    function drawGrid() {
      const step = 60;
      ctx.strokeStyle = "rgba(0,212,255,0.03)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      drawGrid();
      for (let i = 0; i < N; i++) {
        const p = pts[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = "rgba(0,212,255,0.55)"; ctx.fill();
        for (let j = i+1; j < N; j++) {
          const q = pts[j], dx = p.x-q.x, dy = p.y-q.y, d = Math.sqrt(dx*dx+dy*dy);
          if (d < 110) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0,212,255,${0.11*(1-d/110)})`; ctx.lineWidth = .5; ctx.stroke();
          }
        }
      }
      anim = requestAnimationFrame(draw);
    }
    init(); draw();
    window.addEventListener("resize", init);
    return () => { cancelAnimationFrame(anim); window.removeEventListener("resize", init); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .75 }} />;
}

// ── Scanlines ──
function Scanlines() {
  return <div style={{
    position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
    backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px)",
  }} />;
}

// ── Nav ──
function Nav({ page, setPage }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 2.5rem", height: 58,
      background: "rgba(7,8,15,0.88)", backdropFilter: "blur(18px)",
      borderBottom: `1px solid ${border}`,
    }}>
      <span onClick={() => setPage("home")} style={{
        fontFamily: "monospace", fontSize: 15, color: "#fff", cursor: "pointer", letterSpacing: 1, fontWeight: 700,
      }}>
        {CONFIG.name.split(" ")[0]}<span style={{ color: accent, fontWeight: 400 }}> / AI Engineer</span>
      </span>
      <div style={{ display: "flex", gap: "2rem" }}>
        {["projects", "about", "contact"].map(p => (
          <span key={p} onClick={() => setPage(p)} style={{
            fontFamily: "monospace", fontSize: 12, cursor: "pointer", letterSpacing: 1.5,
            color: page === p ? accent : textSub,
            textTransform: "uppercase", transition: "color 0.2s", position: "relative",
          }}>
            {page === p && <span style={{ position: "absolute", bottom: -4, left: 0, right: 0, height: 1, background: accent, borderRadius: 2 }} />}
            {p}
          </span>
        ))}
      </div>
    </nav>
  );
}

// ── Tag ──
function Tag({ t }) {
  return (
    <span style={{
      fontFamily: "monospace", fontSize: 11, color: accent,
      background: "rgba(0,212,255,0.06)", border: `1px solid rgba(0,212,255,0.18)`,
      borderRadius: 4, padding: "2px 8px", letterSpacing: .5,
    }}>{t}</span>
  );
}

// ── Back Button ──
function BackBtn({ setPage }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={() => setPage("home")}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        position: "fixed", bottom: 32, right: 32, zIndex: 200,
        fontFamily: "monospace", fontSize: 12, letterSpacing: 1.5,
        padding: "9px 20px", borderRadius: 6, cursor: "pointer",
        background: hov ? "rgba(0,212,255,0.1)" : "rgba(7,8,15,0.9)",
        color: hov ? accent : textMuted,
        border: `1px solid ${hov ? accent : border}`,
        backdropFilter: "blur(12px)", transition: "all .2s",
      }}>← HOME</button>
  );
}

// ── HOME ──
function Home({ setPage }) {
  const [typed, setTyped] = useState("");
  const [cur, setCur] = useState(true);
  const full = CONFIG.tagline;
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => { setTyped(full.slice(0, i + 1)); i++; if (i >= full.length) clearInterval(iv); }, 38);
    return () => clearInterval(iv);
  }, []);
  useEffect(() => { const iv = setInterval(() => setCur(c => !c), 530); return () => clearInterval(iv); }, []);

  return (
    <div style={{ position: "relative", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <TechBg />
      {/* vignette */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 30%, rgba(7,8,15,0.85) 100%)", zIndex: 1, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: "linear-gradient(to top,rgba(7,8,15,1),transparent)", zIndex: 2, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "0 1.5rem", maxWidth: 740 }}>
        <p style={{ fontFamily: "monospace", color: accent, fontSize: 11, letterSpacing: 5, marginBottom: 20, textTransform: "uppercase", opacity: .7 }}>
          AI Engineer
        </p>
        <h1 style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 900, color: "#fff", margin: 0, lineHeight: 1.04, letterSpacing: -2 }}>
          {CONFIG.name}
        </h1>
        <p style={{ color: textSub, fontSize: "clamp(.95rem,1.8vw,1.15rem)", marginTop: 22, minHeight: 34, fontStyle: "italic", letterSpacing: .3 }}>
          "{typed}{cur && <span style={{ color: accent }}>|</span>}"
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: 44, flexWrap: "wrap" }}>
          <button onClick={() => setPage("projects")} style={{
            fontFamily: "monospace", fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase",
            padding: "11px 32px", borderRadius: 6, cursor: "pointer",
            background: accent, color: bg, border: `1px solid ${accent}`, fontWeight: 700,
            boxShadow: `0 0 28px rgba(0,212,255,0.3)`, transition: "all .2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 42px rgba(0,212,255,0.5)`; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 28px rgba(0,212,255,0.3)`; e.currentTarget.style.transform = "translateY(0)"; }}
          >View Projects</button>
          <button onClick={() => setPage("about")} style={{
            fontFamily: "monospace", fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase",
            padding: "11px 32px", borderRadius: 6, cursor: "pointer",
            background: "transparent", color: accent, border: `1px solid rgba(0,212,255,0.35)`, transition: "all .2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.background = "rgba(0,212,255,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.35)"; e.currentTarget.style.background = "transparent"; }}
          >About Me</button>
        </div>

        <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", marginTop: 36 }}>
          {[["GitHub", CONFIG.github], ["LinkedIn", CONFIG.linkedin]].map(([l, href]) => (
            <a key={l} href={href} target="_blank" rel="noreferrer" style={{
              fontFamily: "monospace", fontSize: 12, color: textMuted, textDecoration: "none", letterSpacing: 1, transition: "color .2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = accent}
              onMouseLeave={e => e.currentTarget.style.color = textMuted}
            >{l} ↗</a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── PROJECTS ──
function Projects({ setPage }) {
  return (
    <div style={{ padding: "7rem 2.5rem 6rem", maxWidth: 1040, margin: "0 auto" }}>
      <BackBtn setPage={setPage} />
      <p style={{ fontFamily: "monospace", color: accent, fontSize: 11, letterSpacing: 4, textTransform: "uppercase", marginBottom: 8 }}>&gt; projects</p>
      <h2 style={{ fontSize: "2.4rem", fontWeight: 900, color: "#fff", margin: "0 0 .4rem", letterSpacing: -1 }}>Things I've Built</h2>
      <p style={{ color: textMuted, fontFamily: "monospace", fontSize: 12, marginBottom: 44 }}>// grows as I ship more</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: "1.25rem" }}>
        {CONFIG.projects.map((p, i) => (
          <div key={i} style={{
            background: bgCard, border: `1px solid ${border}`, borderRadius: 10, padding: "1.6rem",
            display: "flex", flexDirection: "column", gap: 12, transition: "border-color .2s,transform .2s,box-shadow .2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.35)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 700, margin: 0, lineHeight: 1.3 }}>{p.title}</h3>
              <span style={{ fontFamily: "monospace", color: textMuted, fontSize: 11 }}>0{i + 1}</span>
            </div>
            <p style={{ color: textSub, fontSize: 13.5, lineHeight: 1.65, margin: 0, flex: 1 }}>{p.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{p.stack.map(t => <Tag key={t} t={t} />)}</div>
            <div style={{ display: "flex", gap: "1rem", marginTop: 4, borderTop: `1px solid ${border}`, paddingTop: 12 }}>
              {p.github && <a href={p.github} target="_blank" rel="noreferrer" style={{ fontFamily: "monospace", fontSize: 12, color: accent, textDecoration: "none" }} onMouseEnter={e => e.currentTarget.style.opacity = ".6"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>GitHub ↗</a>}
              {p.live && <a href={p.live} target="_blank" rel="noreferrer" style={{ fontFamily: "monospace", fontSize: 12, color: textMuted, textDecoration: "none" }}>Live ↗</a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ABOUT ──
function About({ setPage }) {
  return (
    <div style={{ padding: "7rem 2.5rem 6rem", maxWidth: 860, margin: "0 auto" }}>
      <BackBtn setPage={setPage} />
      <p style={{ fontFamily: "monospace", color: accent, fontSize: 11, letterSpacing: 4, textTransform: "uppercase", marginBottom: 8 }}>&gt; about</p>
      <h2 style={{ fontSize: "2.4rem", fontWeight: 900, color: "#fff", margin: "0 0 2rem", letterSpacing: -1 }}>Who I Am</h2>
      <p style={{ color: textSub, fontSize: 15.5, lineHeight: 1.85, marginBottom: 52 }}>{CONFIG.about}</p>

      <p style={{ fontFamily: "monospace", color: accent, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>// Experience</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: 52 }}>
        {CONFIG.experience.map((e, i) => (
          <div key={i} style={{ background: bgCard, border: `1px solid ${border}`, borderRadius: 10, padding: "1.4rem 1.6rem", display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
            <div style={{ minWidth: 10, marginTop: 7 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: accent, boxShadow: `0 0 8px ${accent}` }} />
            </div>
            <div>
              <div style={{ display: "flex", gap: "1rem", alignItems: "baseline", flexWrap: "wrap" }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{e.role}</span>
                <span style={{ fontFamily: "monospace", color: accent, fontSize: 12 }}>@ {e.company}</span>
                <span style={{ fontFamily: "monospace", color: textMuted, fontSize: 12 }}>{e.period}</span>
              </div>
              <p style={{ color: textSub, fontSize: 13.5, lineHeight: 1.65, margin: "8px 0 0" }}>{e.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontFamily: "monospace", color: accent, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>// Stack & Skills</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {CONFIG.skills.map(s => <Tag key={s} t={s} />)}
      </div>
    </div>
  );
}

// ── CONTACT ──
function Contact({ setPage }) {
  return (
    <div style={{ padding: "7rem 2.5rem 6rem", maxWidth: 600, margin: "0 auto" }}>
      <BackBtn setPage={setPage} />
      <p style={{ fontFamily: "monospace", color: accent, fontSize: 11, letterSpacing: 4, textTransform: "uppercase", marginBottom: 8 }}>&gt; contact</p>
      <h2 style={{ fontSize: "2.4rem", fontWeight: 900, color: "#fff", margin: "0 0 1rem", letterSpacing: -1 }}>Get In Touch</h2>
      <p style={{ color: textSub, fontSize: 15, lineHeight: 1.75, marginBottom: 48 }}>Open to AI engineering roles, collaborations, and interesting problems.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {[
          { label: "Email", value: CONFIG.email, href: `mailto:${CONFIG.email}` },
          { label: "GitHub", value: CONFIG.github, href: CONFIG.github },
          { label: "LinkedIn", value: CONFIG.linkedin, href: CONFIG.linkedin },
        ].map(({ label, value, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
            <div style={{
              background: bgCard, border: `1px solid ${border}`, borderRadius: 10,
              padding: "1.1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center",
              transition: "border-color .2s,transform .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)"; e.currentTarget.style.transform = "translateX(4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.transform = "translateX(0)"; }}
            >
              <span style={{ fontFamily: "monospace", color: accent, fontSize: 13, letterSpacing: 1 }}>{label}</span>
              <span style={{ color: textSub, fontSize: 13 }}>{value} ↗</span>
            </div>
          </a>
        ))}
      </div>
      <p style={{ fontFamily: "monospace", color: textMuted, fontSize: 12, marginTop: 52, letterSpacing: 1 }}>
        // built to last. updated via config.
      </p>
    </div>
  );
}

// ── APP ──
export default function App() {
  const [page, setPage] = useState("home");
  return (
    <div style={{ background: bg, minHeight: "100vh", color: "#fff", fontFamily: "'Inter',sans-serif" }}>
      <Scanlines />
      <Nav page={page} setPage={setPage} />
      <div style={{ position: "relative", zIndex: 2 }}>
        {page === "home" && <Home setPage={setPage} />}
        {page === "projects" && <Projects setPage={setPage} />}
        {page === "about" && <About setPage={setPage} />}
        {page === "contact" && <Contact setPage={setPage} />}
      </div>
    </div>
  );
}