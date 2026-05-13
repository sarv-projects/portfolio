import { useEffect, useRef } from "react";

// ── Tech Background (Particles + Grid + Glow) ──
export function TechBg({ dark, accent = "#00d4ff" }) {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let W, H, pts, anim, tick = 0;
    let mouse = { x: 0, y: 0, active: false };
    const N = 60;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function init() {
      resize();
      mouse = { x: W * 0.5, y: H * 0.5, active: false };
      pts = Array.from({ length: N }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.5 + 0.6,
        glow: Math.random() > 0.7,
      }));
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }
    function onMouseLeave() { mouse.active = false; }

    function draw() {
      tick++;
      ctx.clearRect(0, 0, W, H);

      // Animated radial glow
      const gx = W * 0.5 + Math.sin(tick * 0.004) * W * 0.18;
      const gy = H * 0.45 + Math.cos(tick * 0.0032) * H * 0.12;
      const glow = ctx.createRadialGradient(gx, gy, 80, gx, gy, Math.max(W, H) * 0.7);
      glow.addColorStop(0, dark ? `${accent}18` : `${accent}12`);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // Grid
      ctx.strokeStyle = dark ? `${accent}08` : `${accent}08`;
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      // Particles
      for (let i = 0; i < N; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;

        if (mouse.active) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const md = Math.sqrt(mdx * mdx + mdy * mdy);
          if (md < 150) {
            p.x -= (mdx / (md || 1)) * 0.35;
            p.y -= (mdy / (md || 1)) * 0.35;
          }
        }

        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        if (p.glow) {
          ctx.shadowColor = accent;
          ctx.shadowBlur = 8;
        }
        ctx.fillStyle = dark ? `${accent}99` : `${accent}80`;
        ctx.fill();
        ctx.shadowBlur = 0;

        for (let j = i + 1; j < N; j++) {
          const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = dark
              ? `${accent}${Math.round(0.12 * (1 - d / 100) * 255).toString(16).padStart(2, '0')}`
              : `${accent}${Math.round(0.10 * (1 - d / 100) * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        if (mouse.active) {
          const mx = p.x - mouse.x;
          const my = p.y - mouse.y;
          const md = Math.sqrt(mx * mx + my * my);
          if (md < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = dark
              ? `${accent}${Math.round(0.18 * (1 - md / 100) * 255).toString(16).padStart(2, '0')}`
              : `${accent}${Math.round(0.14 * (1 - md / 100) * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      anim = requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener("resize", init);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    return () => {
      cancelAnimationFrame(anim);
      window.removeEventListener("resize", init);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [dark]);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: dark ? 0.5 : 0.35 }}
    />
  );
}

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
