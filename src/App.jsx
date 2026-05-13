import { useState } from "react";
import { DARK, LIGHT } from "./components/config";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Blog from "./components/Blog";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { FadeIn } from "./components/UI";

export default function App() {
  const [page, setPage] = useState("home");
  const [dark, setDark] = useState(false);
  const th = dark ? DARK : LIGHT;

  return (
    <>
      <style>{`
        @keyframes orbital-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbital-spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes orbital-pulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.03); }
        }
        @keyframes shimmer-sweep {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float-emoji {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes name-slide-in {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes line-grow {
          0% { width: 0; opacity: 0; }
          100% { width: 60px; opacity: 0.5; }
        }
        @keyframes float-tag {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes neon-pulse {
          0%, 100% {
            box-shadow:
              0 0 12px var(--glow),
              0 0 30px var(--glow-dim),
              0 0 60px var(--glow-dim2);
          }
          50% {
            box-shadow:
              0 0 24px var(--glow),
              0 0 55px var(--glow-bright),
              0 0 90px var(--glow-bright2);
          }
        }
      `}</style>
      <div
        style={{
          background: th.bg,
          minHeight: "100vh",
          color: th.text,
          fontFamily:
            "'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', sans-serif",
          transition: "background 0.3s, color 0.3s",
          overflowX: "hidden",
          maxWidth: "100vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Nav
          page={page}
          setPage={setPage}
          dark={dark}
          setDark={setDark}
          th={th}
        />
        <div style={{ position: "relative", zIndex: 2, flex: 1 }}>
          <FadeIn key={page} delay={80}>
            {page === "home" && <Home setPage={setPage} th={th} dark={dark} />}
            {page === "projects" && <Projects setPage={setPage} th={th} dark={dark} />}
            {page === "skills" && <Skills setPage={setPage} th={th} dark={dark} />}
            {page === "blog" && <Blog setPage={setPage} th={th} dark={dark} />}
            {page === "about" && <About setPage={setPage} th={th} dark={dark} />}
            {page === "contact" && <Contact setPage={setPage} th={th} dark={dark} />}
          </FadeIn>
        </div>
        <Footer th={th} />
      </div>
    </>
  );
}
