import { useEffect, useRef } from "react";

function noise(x, y, t) {
  const n = Math.sin(x * 0.01 + t) * Math.cos(y * 0.015 + t * 0.7) + Math.sin(y * 0.02 + t * 1.3) * 0.5;
  return n;
}

const SYMBOLS = ["0", "1", "∑", "Δ", "∇", "∫", "λ", "∞", "∂"];

// ── Neural Nebula Background ──
export const TechBg = () => {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let W, H, particles, nebula, meteors, ripples, anim, tick = 0;
    let mouse = { x: 0.5, y: 0.5, mx: 0, my: 0 };

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function init() {
      resize();
      const layers = [
        { count: 200, rMin: 0.2, rMax: 0.4, base: 0.2, speed: 0.15, connect: false },
        { count: 120, rMin: 0.4, rMax: 0.7, base: 0.35, speed: 0.3, connect: true },
        { count: 50, rMin: 0.7, rMax: 1.3, base: 0.5, speed: 0.5, connect: true },
        { count: 20, rMin: 1.3, rMax: 2.5, base: 0.65, speed: 0.8, connect: true },
      ];
      let idx = 0;
      particles = layers.flatMap((l) =>
        Array.from({ length: l.count }, () => {
          const isSymbol = idx % 20 === 0 && l.layer > 0;
          idx++;
          return {
            x: Math.random() * W,
            y: Math.random() * H,
            ox: Math.random() * 1000,
            oy: Math.random() * 1000,
            r: l.rMin + Math.random() * (l.rMax - l.rMin),
            baseAlpha: Math.random() * 0.2 + l.base,
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            twinklePhase: Math.random() * Math.PI * 2,
            speed: l.speed,
            connect: l.connect,
            hue: Math.random() > 0.9 ? (Math.random() > 0.5 ? 220 : 30) : 0,
            isSymbol,
            symbol: isSymbol ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)] : null,
            fontSize: l.rMin > 0.7 ? 10 : 7,
          };
        })
      );
      nebula = [
        { x: 0.2, y: 0.25, r: 0.55, color1: "#00d4ff", color2: "#0044ff", alpha: 0.08 },
        { x: 0.75, y: 0.55, r: 0.45, color1: "#7000ff", color2: "#ff00aa", alpha: 0.06 },
        { x: 0.4, y: 0.7, r: 0.4, color1: "#0044ff", color2: "#00d4ff", alpha: 0.05 },
        { x: 0.6, y: 0.3, r: 0.3, color1: "#ff6600", color2: "#ff00aa", alpha: 0.04 },
      ];
      meteors = [];
      ripples = [];
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / W;
      mouse.y = (e.clientY - rect.top) / H;
      mouse.mx = e.clientX - rect.left;
      mouse.my = e.clientY - rect.top;
      // Subtle ripple on mouse move
      ripples.push({ x: mouse.mx, y: mouse.my, r: 0, alpha: 0.15, speed: 2 + Math.random() });
    }

    function spawnMeteor() {
      if (Math.random() > 0.004) return;
      meteors.push({
        x: Math.random() * W * 0.8 + W * 0.1,
        y: Math.random() * H * 0.25,
        vx: -(Math.random() * 5 + 3),
        vy: Math.random() * 2 + 1.5,
        life: 1,
        decay: 0.012 + Math.random() * 0.01,
        len: Math.random() * 60 + 40,
      });
    }

    function draw() {
      tick++;
      ctx.clearRect(0, 0, W, H);

      // Milky Way band
      const mwGrad = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, H * 0.55);
      mwGrad.addColorStop(0, "rgba(255,255,255,0.015)");
      mwGrad.addColorStop(0.4, "rgba(255,255,255,0.006)");
      mwGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = mwGrad;
      ctx.fillRect(0, 0, W, H);

      // Nebula
      for (const n of nebula) {
        const nx = W * (n.x + 0.03 * Math.sin(tick * 0.0003 + n.color1.charCodeAt(3)));
        const ny = H * (n.y + 0.03 * Math.cos(tick * 0.0002 + n.color2.charCodeAt(2)));
        const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, W * n.r);
        const aHex = Math.round(n.alpha * 255).toString(16).padStart(2, "0");
        g.addColorStop(0, n.color1 + aHex);
        g.addColorStop(0.5, n.color2 + Math.round(n.alpha * 0.6 * 255).toString(16).padStart(2, "0"));
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // Neural connections (lines between nearby connectable particles)
      const connectable = particles.filter((p) => p.connect);
      for (let i = 0; i < connectable.length; i++) {
        for (let j = i + 1; j < connectable.length; j++) {
          const a = connectable[i];
          const b = connectable[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 70) {
            const alpha = (1 - dist / 70) * 0.12;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Particles with flow field + mouse parallax
      const pScale = 0.006;
      const t = tick * 0.002;
      const mouseAttractX = (mouse.x - 0.5) * 0.4;
      const mouseAttractY = (mouse.y - 0.5) * 0.4;

      for (const p of particles) {
        const angle = noise(p.ox + p.x * pScale, p.oy + p.y * pScale, t) * 3;
        const fx = Math.cos(angle) * p.speed;
        const fy = Math.sin(angle) * p.speed;

        // Mouse attention shift
        const attractX = mouseAttractX * p.speed * 0.3;
        const attractY = mouseAttractY * p.speed * 0.3;

        const parallax = p.speed * 15;
        const px = (mouse.x - 0.5) * parallax;
        const py = (mouse.y - 0.5) * parallax;

        p.x += fx + attractX;
        p.y += fy + attractY;

        if (p.x < -40) p.x = W + 40;
        if (p.x > W + 40) p.x = -40;
        if (p.y < -40) p.y = H + 40;
        if (p.y > H + 40) p.y = -40;

        const twinkle = p.baseAlpha + 0.3 * Math.sin(tick * p.twinkleSpeed + p.twinklePhase);
        const drawX = p.x + px;
        const drawY = p.y + py;

        if (p.isSymbol && p.symbol) {
          ctx.font = `${p.fontSize}px "JetBrains Mono", monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.shadowColor = "#00d4ff";
          ctx.shadowBlur = 8;
          ctx.fillStyle = `rgba(0,212,255,${Math.max(0.1, twinkle * 0.6)})`;
          ctx.fillText(p.symbol, drawX, drawY);
          ctx.shadowBlur = 0;
        } else {
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.r, 0, Math.PI * 2);
          ctx.shadowColor = "#00d4ff";
          ctx.shadowBlur = p.r * 5 + 3;
          if (p.hue > 0) {
            ctx.fillStyle = `hsla(${p.hue}, 80%, 90%, ${Math.max(0.05, twinkle)})`;
          } else {
            ctx.fillStyle = `rgba(255,255,255,${Math.max(0.05, twinkle)})`;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.r += rip.speed;
        rip.alpha *= 0.97;
        if (rip.alpha < 0.01) { ripples.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,212,255,${rip.alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Meteors
      spawnMeteor();
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life -= m.decay;
        if (m.life <= 0) { meteors.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * m.len * m.life, m.y - m.vy * m.len * m.life);
        ctx.strokeStyle = `rgba(200,220,255,${m.life * 0.7})`;
        ctx.lineWidth = m.life * 1.5 + 0.5;
        ctx.stroke();
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.life * 2 + 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${m.life * 0.9})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      anim = requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener("resize", init);
    canvas.addEventListener("mousemove", onMouseMove);
    return () => {
      cancelAnimationFrame(anim);
      window.removeEventListener("resize", init);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
};

// ── Scanlines ──
export function Scanlines() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        backgroundImage:
          "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.008) 2px,rgba(0,0,0,0.008) 4px)",
      }}
    />
  );
}

// ── Orbital Rings ──
export function OrbitalLayer({ dark, th }) {
  const ringColor = dark ? "rgba(0,212,255,0.15)" : "rgba(0,153,204,0.12)";
  const coreGlow = dark ? "rgba(0,212,255,0.06)" : "rgba(0,153,204,0.05)";
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        display: "grid",
        placeItems: "center",
        opacity: dark ? 0.3 : 0.18,
      }}
    >
      <div style={{ position: "relative", width: "min(72vw, 720px)", aspectRatio: "1 / 1" }}>
        <div
          style={{
            position: "absolute",
            inset: "8%",
            borderRadius: "50%",
            border: `1px solid ${ringColor}`,
            boxShadow: `0 0 40px ${coreGlow}`,
            animation: "orbital-spin 44s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "20%",
            borderRadius: "50%",
            border: `1px dashed ${ringColor}`,
            animation: "orbital-spin-reverse 62s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "33%",
            borderRadius: "50%",
            border: `1px solid ${ringColor}`,
            animation: "orbital-pulse 8s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "8%",
            width: 6,
            height: 6,
            marginLeft: -3,
            borderRadius: "50%",
            background: th.accent,
            boxShadow: `0 0 12px ${th.accent}`,
            animation: "orbital-spin 44s linear infinite",
            transformOrigin: "0 300px",
          }}
        />
      </div>
    </div>
  );
}

// ── Matrix Rain ──
function MatrixRain({ dark }) {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let W, H, drops = [], anim;
    const fontSize = 10;
    const chars = "01アイウエオカキクケコサシスセソタチツテト";

    function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
    function init() { resize(); drops = Array(Math.floor(W / fontSize)).fill(1); }

    function draw() {
      ctx.fillStyle = dark ? "rgba(7,8,15,0.04)" : "rgba(240,244,248,0.04)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = dark ? "#00d4ff" : "#0099cc";
      ctx.font = fontSize + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      anim = requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener("resize", init);
    return () => { cancelAnimationFrame(anim); window.removeEventListener("resize", init); };
  }, [dark]);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06, pointerEvents: "none" }}
    />
  );
}
