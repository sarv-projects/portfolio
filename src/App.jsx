import { useState } from "react";
import { DARK } from "./components/config";
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
  const th = DARK;

  return (
    <>
      <style>{`
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
          th={th}
        />
        <div style={{ position: "relative", zIndex: 2, flex: 1 }}>
          <FadeIn key={page} delay={80}>
            {page === "home" && <Home setPage={setPage} th={th} />}
            {page === "projects" && <Projects setPage={setPage} th={th} dark={true} />}
            {page === "skills" && <Skills setPage={setPage} th={th} dark={true} />}
            {page === "blog" && <Blog setPage={setPage} th={th} dark={true} />}
            {page === "about" && <About setPage={setPage} th={th} dark={true} />}
            {page === "contact" && <Contact setPage={setPage} th={th} dark={true} />}
          </FadeIn>
        </div>
        <Footer th={th} />
      </div>
    </>
  );
}
