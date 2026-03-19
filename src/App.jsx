import { useState, useEffect, useRef } from "react";

// ============================================================
//  CONFIG — Edit this to update everything
// ============================================================
const CONFIG = {
  name: "Sarvesh Bhattacharyya",
  title: "AI Engineer",
  tagline: "I build systems that make LLMs act instead of just talk. \n Focus : Multi-agent systems · RAG · LLM infrastructure · backend systems ",
  email: "sarveshbh.2022@gmail.com",
  github: "https://github.com/sarv-projects",
  linkedin: "https://www.linkedin.com/in/sarvesh-bhattacharyya-485360270/",
  resume: "", // paste your PDF/Drive link here
  about: `Final year ECE student at MSRIT Bengaluru, currently interning as an AI Engineer. I work across the full stack of making AI systems actually work in production — from how agents are orchestrated, to how they connect with the real world, to why they sometimes don't behave the way you expect.`,
  experience: [
    {
      role: "AI Engineer Intern",
      company: "Beaut Group",
      period: "Feb 2025 – Present",
      desc: "In Progress",
    },
  ],
  skillGroups: [
    {
      label:"Languages",
      skills:["Python","Javascript","C/C++","Java"]
    }
    ,
    {
      label: "AI & LLM",
      skills: ["LangGraph","LangChain", "MCP", "RAG", "sklearn","Pytorch" ,"QLoRA","CrewAI"],
    },
    {
      label: "Backend",
      skills: ["FastAPI",  "PostgreSQL", "Redis", "Firebase","DuckDB"],
    },
    {
      label: "Vector & Data",
      skills: ["Pinecone", "ChromaDB", "Nango", "Langfuse","pandas","numpy"],
    },
    {
      label: "Tools",
      skills: ["Docker","Bash", "GitHub", "Linux", "GitHub Actions"],
    },
  ],
  projects: [
    {
      title: "LLM Twin — In Progress",
      desc: "Personal LLM fine-tuned to replicate my writing style while retaining base reasoning.\n\nInitial approach (prompt + memory) broke quickly — style drifted as context grew and responses became inconsistent.\n\nSplit the system instead:\n- QLoRA fine-tune → style alignment\n- RAG (ChromaDB) → memory retrieval\n- local inference (4-bit GGUF via Ollama) → full offline control\n\nTrained on ~9k personal messages. Early result:\nstrong conversational alignment, but noticeable degradation in structured/professional tone — highlighting dataset bias.\n\nCurrently testing tradeoff between style fidelity vs reasoning degradation.",
      stack: ["Python", "Llama 3.2", "QLoRA", "Unsloth", "Ollama", "ChromaDB", "Sentence Transformers"],
      github: "https://github.com/sarv-projects/llmtwin", live: "",
    },
    {
      title: "ACARE — Semi-Autonomous Clinical Assistance System",
      desc: "Built a semi-autonomous clinical assistance system combining AI perception with real-time control and orchestration.\n\nArchitected a dual-layer system for clinical task execution using AI + control systems:\n\n- ROS2-based high-level system on Raspberry Pi for perception, voice interaction, and task orchestration (LangGraph)\n- YOLO-based tool detection pipeline for object recognition in surgical environments\n- Voice command interface integrated with task execution pipeline (Deepgram)\n- Real-time motor control using Teensy 4.1 (PID-based control loop)\n- Hardware-level emergency stop (ESTOP) directly wired to motor drivers\n- Multi-modal interaction design (vision + voice) for intent-driven task execution",
      stack: ["ROS2", "Python", "C++", "YOLOv11", "LangGraph", "Deepgram", "Raspberry Pi 5"],
      github: "#"
    },
  ],
  blogs: [
    // Add blog posts here when ready. Example:
    // {
    //   title: "Byte Pair Encoding: How Tokenization Works Under the Hood",
    //   desc: "A practical walkthrough of BPE from scratch: word frequencies, pair merges, vocab growth, and why subword tokenization is critical for modern LLM pipelines.",
    //   tags: ["NLP", "Tokenization", "BPE"],
    //   date: "March 2026",
    //   readTime: "20 min",
    //   link: "https://medium.com/@you/your-post"
    // }
  ],
};
// ============================================================

const PAGES = ["home", "projects", "skills", "blog", "about", "contact"];

// ── Theme ──
const DARK = {
  bg: "#07080f", bgCard: "#0d0f1a", border: "#1a1d2e",
  text: "#ffffff", textSub: "#9ca3af", textMuted: "#4b5563",
  accent: "#00d4ff",
};
const LIGHT = {
  bg: "#f0f4f8", bgCard: "#ffffff", border: "#e2e8f0",
  text: "#0a0a0f", textSub: "#4b5563", textMuted: "#9ca3af",
  accent: "#0099cc",
};

// ── Grid + Particles ──
function TechBg({ theme }) {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let W, H, pts, anim;
    const N = 80; // Increased particles for more sci-fi feel
    function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
    function init() {
      resize();
      pts = Array.from({ length: N }, () => ({
        x: Math.random()*W, y: Math.random()*H,
        vx: (Math.random()-.5)*.3, vy: (Math.random()-.5)*.3, // Slightly faster
        r: Math.random()*1.5+.6,
        glow: Math.random() > 0.7, // Some particles glow
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      // Enhanced grid with subtle animation
      ctx.strokeStyle = theme === LIGHT ? "rgba(0,153,204,0.08)" : "rgba(0,212,255,0.05)";
      ctx.lineWidth = 1;
      for (let x=0;x<W;x+=60){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
      for (let y=0;y<H;y+=60){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
      // Particles with glow
      for (let i=0;i<N;i++) {
        const p=pts[i]; p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        if (p.glow) {
          ctx.shadowColor = theme === LIGHT ? "#0099cc" : "#00d4ff";
          ctx.shadowBlur = 10;
        }
        ctx.fillStyle = theme===LIGHT?"rgba(0,153,204,0.6)":"rgba(0,212,255,0.7)"; ctx.fill();
        ctx.shadowBlur = 0; // Reset
        for(let j=i+1;j<N;j++){
          const q=pts[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.sqrt(dx*dx+dy*dy);
          if(d<120){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);
            ctx.strokeStyle=theme===LIGHT?`rgba(0,153,204,${.12*(1-d/120)})`:`rgba(0,212,255,${.15*(1-d/120)})`;
            ctx.lineWidth=.8;ctx.stroke();}
        }
      }
      anim=requestAnimationFrame(draw);
    }
    init(); draw();
    window.addEventListener("resize",init);
    return()=>{cancelAnimationFrame(anim);window.removeEventListener("resize",init);};
  },[theme]);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.8}}/>;
}

// ── Scanlines ──
function Scanlines() {
  return <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",
    backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.02) 2px,rgba(0,0,0,0.02) 4px)"}}/>;
}

// ── Matrix Rain ──
function MatrixRain({ theme }) {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let W, H, drops = [], anim;
    const fontSize = 12;
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

    function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
    function init() {
      resize();
      drops = Array(Math.floor(W / fontSize)).fill(1);
    }
    function draw() {
      ctx.fillStyle = theme === LIGHT ? "rgba(240,244,248,0.05)" : "rgba(7,8,15,0.05)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = theme === LIGHT ? "#0099cc" : "#00d4ff";
      ctx.font = fontSize + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      anim = requestAnimationFrame(draw);
    }
    init(); draw();
    window.addEventListener("resize", init);
    return () => { cancelAnimationFrame(anim); window.removeEventListener("resize", init); };
  }, [theme]);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.1,pointerEvents:"none"}}/>;
}

// ── Tag ──
function Tag({t,th}){
  return(
    <span style={{fontFamily:"monospace",fontSize:11,color:th.accent,
      background:`${th.accent}10`,border:`1px solid ${th.accent}30`,
      borderRadius:4,padding:"2px 8px",letterSpacing:.5}}>{t}</span>
  );
}

function FadeIn({children, delay = 0}) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(id);
  }, [delay]);
  return (
    <div style={{
      opacity: ready ? 1 : 0,
      transform: ready ? "translateY(0)" : "translateY(10px)",
      transition: "opacity .35s ease, transform .35s ease",
    }}>
      {children}
    </div>
  );
}

function Reveal({children, threshold = 0.25}) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(14px)",
      transition: "opacity .5s ease, transform .5s ease",
    }}>
      {children}
    </div>
  );
}

// ── Back Button ──
function BackBtn({setPage,th}){
  const [hov,setHov]=useState(false);
  return(
    <button onClick={()=>setPage("home")} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{position:"fixed",bottom:32,right:32,zIndex:200,fontFamily:"monospace",fontSize:12,
        letterSpacing:1.5,padding:"9px 20px",borderRadius:6,cursor:"pointer",
        background:hov?`${th.accent}15`:th.bg,color:hov?th.accent:th.textMuted,
        border:`1px solid ${hov?th.accent:th.border}`,backdropFilter:"blur(12px)",transition:"all .2s"}}>← HOME</button>
  );
}

// ── Nav ──
function Nav({page,setPage,dark,setDark,th}){
  const [mobileMenuOpen,setMobileMenuOpen]=useState(false);
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,
      display:"flex",alignItems:"center",justifyContent:"space-between",
      padding:"0 1rem",height:52,boxSizing:"border-box",
      background:dark?"rgba(7,8,15,0.95)":"rgba(240,244,248,0.95)",
      backdropFilter:"blur(18px)",borderBottom:`1px solid ${th.border}`,transition:"background .3s"}}>
      <span onClick={()=>setPage("home")} style={{fontFamily:"monospace",fontSize:17,
        color:th.text,cursor:"pointer",letterSpacing:1,fontWeight:700}}>
       <span style={{color:th.accent,fontWeight:400}}>✦ AI</span>
      </span>
      {/* Desktop Menu */}
      <div id="desktop-nav" style={{display:"flex",alignItems:"center",gap:"1.8rem"}}>
        {PAGES.filter(p=>p!=="home").map(p=>(
          <span key={p} onClick={()=>setPage(p)} style={{fontFamily:"monospace",fontSize:11,cursor:"pointer",
            letterSpacing:1.5,color:page===p?th.accent:th.textSub,textTransform:"uppercase",
            transition:"color .2s",position:"relative"}}
            onMouseEnter={e=>e.currentTarget.style.color=th.accent}
            onMouseLeave={e=>e.currentTarget.style.color=page===p?th.accent:th.textSub}>
            {page===p&&<span style={{position:"absolute",bottom:-4,left:0,right:0,height:1,background:th.accent,borderRadius:2}}/>}
            {p}
          </span>
        ))}
        {CONFIG.resume&&(
          <a href={CONFIG.resume} target="_blank" rel="noreferrer" style={{fontFamily:"monospace",fontSize:12,
            letterSpacing:1.5,color:th.accent,border:`1px solid ${th.accent}50`,borderRadius:5,
            padding:"4px 12px",textDecoration:"none",transition:"all .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.background=`${th.accent}15`;e.currentTarget.style.borderColor=th.accent;}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor=`${th.accent}50`;}}>RESUME ↗</a>
        )}
        <button onClick={()=>setDark(d=>!d)} style={{background:"transparent",border:`1px solid ${th.border}`,
          borderRadius:20,padding:"4px 10px",cursor:"pointer",fontSize:14,transition:"all .2s",
          color:th.textSub}}>
          {dark?"☀":"☾"}
        </button>
      </div>
      {/* Mobile Menu Toggle */}
      <div id="mobile-nav" style={{display:"flex",alignItems:"center",gap:"1rem"}}>
        <button onClick={()=>setDark(d=>!d)} style={{background:"transparent",border:"none",
          cursor:"pointer",fontSize:16,color:th.textSub}}>
          {dark?"☀":"☾"}
        </button>
        <button onClick={()=>setMobileMenuOpen(!mobileMenuOpen)} style={{background:"transparent",border:"none",
          cursor:"pointer",fontSize:18,color:th.text}}>
          {mobileMenuOpen?"✕":"☰"}
        </button>
      </div>
      {/* Mobile Menu */}
      <div style={{position:"absolute",top:52,left:0,right:0,background:th.bg,
        borderBottom:`1px solid ${th.border}`,padding:mobileMenuOpen?"1rem":"0 1rem",display:"flex",flexDirection:"column",gap:"0.75rem",
        zIndex:99,maxHeight: mobileMenuOpen?320:0,opacity: mobileMenuOpen?1:0,overflow:"hidden",
        pointerEvents: mobileMenuOpen?"auto":"none",transition:"max-height .25s ease, opacity .25s ease"}}>
        {PAGES.filter(p=>p!=="home").map(p=>(
          <span key={p} onClick={()=>{setPage(p);setMobileMenuOpen(false);}} style={{fontFamily:"monospace",fontSize:12,cursor:"pointer",
            letterSpacing:1.5,color:page===p?th.accent:th.textSub,textTransform:"uppercase",
            padding:"0.5rem 0",transition:"color .2s"}}>
            {p}
          </span>
        ))}
        {CONFIG.resume&&(
          <a href={CONFIG.resume} target="_blank" rel="noreferrer" style={{fontFamily:"monospace",fontSize:12,
            letterSpacing:1.5,color:th.accent,border:`1px solid ${th.accent}50`,borderRadius:5,
            padding:"8px 12px",textDecoration:"none",display:"inline-block",width:"fit-content"}}>RESUME ↗</a>
        )}
      </div>
    </nav>
  );
}

// ── HOME ──
function Home({setPage,th,dark}){
  const [typed,setTyped]=useState("");
  const [cur,setCur]=useState(true);
  const full=CONFIG.tagline;
  useEffect(()=>{let i=0;const iv=setInterval(()=>{setTyped(full.slice(0,i+1));i++;if(i>=full.length)clearInterval(iv);},38);return()=>clearInterval(iv);},[full]);
  useEffect(()=>{const iv=setInterval(()=>setCur(c=>!c),530);return()=>clearInterval(iv);},[]);
  return(
    <div style={{position:"relative",height:"calc(100vh - 52px)",display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",overflow:"hidden",paddingTop:"52px"}}>
      <TechBg theme={dark?DARK:LIGHT}/>
      <MatrixRain theme={dark?DARK:LIGHT}/>
      <div style={{position:"absolute",inset:0,
        background:dark?"radial-gradient(ellipse at center,transparent 30%,rgba(7,8,15,0.85) 100%)":"radial-gradient(ellipse at center,transparent 30%,rgba(240,244,248,0.85) 100%)",
        zIndex:1,pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:200,
        background:dark?"linear-gradient(to top,rgba(7,8,15,1),transparent)":"linear-gradient(to top,rgba(240,244,248,1),transparent)",
        zIndex:2,pointerEvents:"none"}}/>
      <FadeIn delay={90}>
        <div style={{position:"relative",zIndex:3,textAlign:"center",padding:"0 1.5rem",maxWidth:740}}>
          <h1 style={{fontSize:"clamp(2.2rem,5vw,4.5rem)",fontWeight:900,color:th.text,margin:0,lineHeight:1.1,letterSpacing:-1.5}}>{CONFIG.name}</h1>
          <p style={{color:th.textSub,fontSize:"clamp(.95rem,1.8vw,1.15rem)",marginTop:22,minHeight:34,fontStyle:"italic",letterSpacing:.3,whiteSpace:"pre-wrap"}}>
            "{typed}{cur&&<span style={{color:th.accent}}>|</span>}"
          </p>
          <div style={{display:"flex",gap:"1rem",justifyContent:"center",marginTop:44,flexWrap:"wrap"}}>
            <button onClick={()=>setPage("projects")} style={{fontFamily:"monospace",fontSize:13,letterSpacing:1.5,
              textTransform:"uppercase",padding:"11px 32px",borderRadius:6,cursor:"pointer",
              background:th.accent,color:dark?"#07080f":"#fff",border:`1px solid ${th.accent}`,fontWeight:700,
              boxShadow:`0 0 28px ${th.accent}50`,transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 0 42px ${th.accent}80`;e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow=`0 0 28px ${th.accent}50`;e.currentTarget.style.transform="translateY(0)";}}>
              View Projects</button>
            <button onClick={()=>setPage("about")} style={{fontFamily:"monospace",fontSize:13,letterSpacing:1.5,
              textTransform:"uppercase",padding:"11px 32px",borderRadius:6,cursor:"pointer",
              background:"transparent",color:th.accent,border:`1px solid ${th.accent}60`,transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=`${th.accent}10`;e.currentTarget.style.borderColor=th.accent;}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor=`${th.accent}60`;}}>
              About Me</button>
          </div>
          <div style={{display:"flex",gap:"1.5rem",justifyContent:"center",marginTop:36}}>
            {[["GitHub",CONFIG.github],["LinkedIn",CONFIG.linkedin]].map(([l,href])=>(
              <a key={l} href={href} target="_blank" rel="noreferrer" style={{fontFamily:"monospace",fontSize:12,
                color:`${th.accent}90`,textDecoration:"none",letterSpacing:1,transition:"color .2s"}}
                onMouseEnter={e=>e.currentTarget.style.color=th.accent}
                onMouseLeave={e=>e.currentTarget.style.color=`${th.accent}90`}>{l} ↗</a>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

// ── PROJECTS ──
function Projects({setPage,th}){
  const projectIcons = ["🤖", "⚕️"]; // AI for LLM Twin, Medical for ACARE
  return(
    <div style={{padding:"7rem 2.5rem 6rem",maxWidth:1200,margin:"0 auto"}}>
      <BackBtn setPage={setPage} th={th}/>
      <p style={{fontFamily:"monospace",color:th.accent,fontSize:11,letterSpacing:4,textTransform:"uppercase",marginBottom:8}}>&gt; projects</p>
      <h2 style={{fontSize:"2.4rem",fontWeight:900,color:th.text,margin:"0 0 .4rem",letterSpacing:-1}}>Things I've Built</h2>
      <p style={{color:th.textMuted,fontFamily:"monospace",fontSize:12,marginBottom:64}}>// grows as I ship more</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:"2rem","@media (max-width: 768px)":{gridTemplateColumns:"1fr"}}}>
        {CONFIG.projects.map((p,i)=>(
          <Reveal key={i}>
            <div style={{background:th.bgCard,border:`1px solid ${th.border}`,borderRadius:12,
              padding:"2rem",display:"flex",flexDirection:"column",gap:16,transition:"all .3s ease",
              cursor:"pointer",position:"relative",overflow:"hidden",
              boxShadow:`0 4px 20px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)`}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=th.textMuted;e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow=`0 12px 40px rgba(0,0,0,0.2), 0 0 20px rgba(0,0,0,0.1)`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=`0 4px 20px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)`;}}>
              {/* Subtle glow effect */}
              <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:`linear-gradient(135deg, rgba(0,0,0,0.02), transparent)`,pointerEvents:"none"}}/>
              <div style={{position:"relative",zIndex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                  <span style={{fontSize:24}}>{projectIcons[i] || "⚡"}</span>
                  <div style={{flex:1}}>
                    <h3 style={{color:th.text,fontSize:18,fontWeight:800,margin:0,lineHeight:1.2,letterSpacing:-.5}}>{p.title}</h3>
                    <span style={{fontFamily:"monospace",color:th.textMuted,fontSize:10,marginTop:4,display:"block"}}>0{i+1}</span>
                  </div>
                </div>
                <div style={{color:th.textSub,fontSize:14,lineHeight:1.7,marginBottom:16}}>
                  {p.desc.split('\n\n').map((para, idx) => (
                    <p key={idx} style={{margin: idx === 0 ? "0 0 12px" : "12px 0", fontSize: idx === 0 ? 15 : 14, fontWeight: idx === 0 ? 600 : 400}}>
                      {para.split('\n').map((line, j) => (
                        <span key={j}>
                          {line.startsWith('- ') ? <span style={{color:th.text,fontWeight:500}}>• {line.slice(2)}</span> : line}
                          {j < para.split('\n').length - 1 && <br/>}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
                  {p.stack.map(t=><Tag key={t} t={t} th={th}/>)}
                </div>
                <div style={{display:"flex",gap:"1rem",borderTop:`1px solid ${th.border}`,paddingTop:16,flexWrap:"wrap"}}>
                  {p.github&&p.github!=="#"&&<a href={p.github} target="_blank" rel="noreferrer" style={{fontFamily:"monospace",fontSize:12,color:th.accent,textDecoration:"none",transition:"all .2s",padding:"6px 12px",border:`1px solid ${th.accent}40`,borderRadius:6}}
                    onMouseEnter={e=>{e.currentTarget.style.background=`rgba(0,0,0,0.05)`;e.currentTarget.style.borderColor=th.textMuted;}}
                    onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor=`rgba(0,0,0,0.1)`;}}>GitHub ↗</a>}
                  {p.live&&<a href={p.live} target="_blank" rel="noreferrer" style={{fontFamily:"monospace",fontSize:12,color:th.textMuted,textDecoration:"none",transition:"color .2s"}}
                    onMouseEnter={e=>e.currentTarget.style.color=th.accent}
                    onMouseLeave={e=>e.currentTarget.style.color=th.textMuted}>Live ↗</a>}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ── SKILLS ──
function Skills({setPage,th}){
  const skillColors=["#00d4ff","#00ff88","#ff6b9d","#ffd700","#a78bfa"];
  return(
    <div style={{padding:"7rem 2.5rem 6rem",maxWidth:860,margin:"0 auto"}}>
      <BackBtn setPage={setPage} th={th}/>
      <p style={{fontFamily:"monospace",color:th.accent,fontSize:11,letterSpacing:4,textTransform:"uppercase",marginBottom:8}}>&gt; skills</p>
      <h2 style={{fontSize:"2.4rem",fontWeight:900,color:th.text,margin:"0 0 .4rem",letterSpacing:-1}}>Stack & Skills</h2>
      <p style={{color:th.textMuted,fontFamily:"monospace",fontSize:12,marginBottom:48}}>// tools I actually use in production</p>
      <div style={{display:"flex",flexDirection:"column",gap:"2rem"}}>
        {CONFIG.skillGroups.map((g,i)=>{
          const color=skillColors[i%skillColors.length];
          return(
          <div key={i}>
            <p style={{fontFamily:"monospace",color:color,fontSize:11,letterSpacing:3,textTransform:"uppercase",marginBottom:14,opacity:.9}}>✦ {g.label}</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
              {g.skills.map(s=>(
                <div key={s} style={{background:th.bgCard,border:`1px solid ${th.border}`,borderRadius:8,
                  padding:"10px 18px",fontFamily:"monospace",fontSize:13,color:th.textSub,
                  transition:"all .2s",cursor:"default"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=color;e.currentTarget.style.color=color;e.currentTarget.style.background=`${color}08`;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.color=th.textSub;e.currentTarget.style.background=th.bgCard;}}>
                  {s}
                </div>
              ))}
            </div>
          </div>
        );
        })}
      </div>
    </div>
  );
}
function Blog({setPage,th}){
  return(
    <div style={{padding:"7rem 2.5rem 6rem",maxWidth:860,margin:"0 auto"}}>
      <BackBtn setPage={setPage} th={th}/>
      <p style={{fontFamily:"monospace",color:th.accent,fontSize:11,letterSpacing:4,textTransform:"uppercase",marginBottom:8}}>&gt; blog</p>
      <h2 style={{fontSize:"2.4rem",fontWeight:900,color:th.text,margin:"0 0 .4rem",letterSpacing:-1}}>Writing</h2>
      <p style={{color:th.textMuted,fontFamily:"monospace",fontSize:12,marginBottom:48}}>// research notes, experiments, engineering playbooks</p>
      {CONFIG.blogs.length===0?(
        <div style={{background:th.bgCard,border:`1px solid ${th.border}`,borderRadius:10,
          padding:"3rem",textAlign:"center"}}>
          <p style={{fontFamily:"monospace",color:th.textMuted,fontSize:13,margin:0}}>// posts incoming</p>
          <p style={{color:th.textSub,fontSize:14,marginTop:12}}>First post dropping soon on Medium.</p>
          <a href="https://medium.com" target="_blank" rel="noreferrer" style={{display:"inline-block",marginTop:20,
            fontFamily:"monospace",fontSize:12,color:th.accent,textDecoration:"none",
            border:`1px solid ${th.accent}50`,borderRadius:5,padding:"8px 20px"}}>Follow on Medium ↗</a>
        </div>
      ):(
        <div style={{display:"flex",flexDirection:"column",gap:"1.25rem"}}>
          {CONFIG.blogs.map((b,i)=>(
            <div key={i} style={{background:th.bgCard,border:`1px solid ${th.border}`,borderRadius:10,
              padding:"1.6rem",transition:"border-color .2s,transform .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=`${th.accent}60`;e.currentTarget.style.transform="translateX(4px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.transform="translateX(0)";}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8,marginBottom:10}}>
                <h3 style={{color:th.text,fontSize:17,fontWeight:700,margin:0,lineHeight:1.3,flex:1}}>{b.title}</h3>
                <span style={{fontFamily:"monospace",color:th.textMuted,fontSize:11,whiteSpace:"nowrap"}}>{b.date} · {b.readTime} read</span>
              </div>
              <p style={{color:th.textSub,fontSize:14,lineHeight:1.65,margin:"0 0 14px"}}>{b.desc}</p>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{b.tags.map(t=><Tag key={t} t={t} th={th}/>)}</div>
                <a href={b.link} target="_blank" rel="noreferrer" style={{fontFamily:"monospace",fontSize:12,
                  color:th.accent,textDecoration:"none"}}>Read on Medium ↗</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── ABOUT ──
function About({setPage,th}){
  return(
    <div style={{padding:"7rem 2.5rem 6rem",maxWidth:860,margin:"0 auto"}}>
      <BackBtn setPage={setPage} th={th}/>
      <p style={{fontFamily:"monospace",color:th.accent,fontSize:11,letterSpacing:4,textTransform:"uppercase",marginBottom:8}}>&gt; about</p>
      <h2 style={{fontSize:"2.4rem",fontWeight:900,color:th.text,margin:"0 0 2rem",letterSpacing:-1}}>Who I Am</h2>
      <p style={{color:th.textSub,fontSize:15.5,lineHeight:1.85,marginBottom:52}}>{CONFIG.about}</p>
      <p style={{fontFamily:"monospace",color:th.accent,fontSize:11,letterSpacing:3,textTransform:"uppercase",marginBottom:20}}>// Experience</p>
      <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
        {CONFIG.experience.map((e,i)=>(
          <div key={i} style={{background:th.bgCard,border:`1px solid ${th.border}`,borderRadius:10,
            padding:"1.4rem 1.6rem",display:"flex",gap:"1.25rem",alignItems:"flex-start"}}>
            <div style={{minWidth:10,marginTop:7}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:th.accent,boxShadow:`0 0 8px ${th.accent}`}}/>
            </div>
            <div>
              <div style={{display:"flex",gap:"1rem",alignItems:"baseline",flexWrap:"wrap"}}>
                <span style={{color:th.text,fontWeight:700,fontSize:15}}>{e.role}</span>
                <span style={{fontFamily:"monospace",color:th.accent,fontSize:12}}>@ {e.company}</span>
                <span style={{fontFamily:"monospace",color:th.textMuted,fontSize:12}}>{e.period}</span>
              </div>
              <p style={{color:th.textSub,fontSize:13.5,lineHeight:1.65,margin:"8px 0 0"}}>{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CONTACT ──
function Contact({setPage,th}){
  return(
    <div style={{padding:"7rem 2.5rem 6rem",maxWidth:600,margin:"0 auto"}}>
      <BackBtn setPage={setPage} th={th}/>
      <p style={{fontFamily:"monospace",color:th.accent,fontSize:11,letterSpacing:4,textTransform:"uppercase",marginBottom:8}}>&gt; contact</p>
      <h2 style={{fontSize:"2.4rem",fontWeight:900,color:th.text,margin:"0 0 1rem",letterSpacing:-1}}>Get In Touch</h2>
      <p style={{color:th.textSub,fontSize:15,lineHeight:1.75,marginBottom:48}}>Open to AI engineering roles, collaborations, and interesting problems.</p>
      <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
        {[
          {label:"Email",value:CONFIG.email,href:`mailto:${CONFIG.email}`},
          {label:"GitHub",value:CONFIG.github,href:CONFIG.github},
          {label:"LinkedIn",value:CONFIG.linkedin,href:CONFIG.linkedin},
        ].map(({label,value,href})=>(
          <a key={label} href={href} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>
            <div style={{background:th.bgCard,border:`1px solid ${th.border}`,borderRadius:10,
              padding:"1.1rem 1.5rem",display:"flex",justifyContent:"space-between",alignItems:"center",
              transition:"border-color .2s,transform .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=`${th.accent}60`;e.currentTarget.style.transform="translateX(4px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.transform="translateX(0)";}}>
              <span style={{fontFamily:"monospace",color:th.accent,fontSize:13,letterSpacing:1}}>{label}</span>
              <span style={{color:th.textSub,fontSize:13}}>{value} ↗</span>
            </div>
          </a>
        ))}
      </div>
      <p style={{fontFamily:"monospace",color:th.textMuted,fontSize:12,marginTop:52,letterSpacing:1}}></p>
    </div>
  );
}

// ── FOOTER ──
function Footer({th}){
  return(
    <footer style={{background:th.bgCard,borderTop:`1px solid ${th.border}`,padding:"2rem",
      textAlign:"center",fontFamily:"monospace",color:th.textMuted,fontSize:12,marginTop:"4rem"}}>
      <p style={{margin:"0 0 0.5rem"}}>© {new Date().getFullYear()} {CONFIG.name}. All rights reserved.</p>
      <p style={{margin:0,fontSize:11,opacity:0.7}}>Built with React + Vite · Designed & coded by me</p>
    </footer>
  );
}

// ── APP ──
export default function App(){
  const [page,setPage]=useState("home");
  const [dark,setDark]=useState(true);
  const th=dark?DARK:LIGHT;
  return(
    <>
    <style>{`
      @media (max-width: 768px) {
        #desktop-nav { display: none !important; }
        #mobile-nav { display: flex !important; }
        body { font-size: 14px; }
      }
      @media (min-width: 769px) {
        #mobile-nav { display: none !important; }
      }
    `}</style>
    <div style={{background:th.bg,minHeight:"100vh",color:th.text,fontFamily:"'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', sans-serif",transition:"background .3s,color .3s",overflowX:"hidden",maxWidth:"100vw",display:"flex",flexDirection:"column"}}>
      <Scanlines/>
      <Nav page={page} setPage={setPage} dark={dark} setDark={setDark} th={th}/>
      <div style={{position:"relative",zIndex:2,flex:1}}>
        <FadeIn key={page}>
          {page==="home"&&<Home setPage={setPage} th={th} dark={dark}/>}
          {page==="projects"&&<Projects setPage={setPage} th={th}/>}
          {page==="skills"&&<Skills setPage={setPage} th={th}/>}
          {page==="blog"&&<Blog setPage={setPage} th={th}/>}
          {page==="about"&&<About setPage={setPage} th={th}/>}
          {page==="contact"&&<Contact setPage={setPage} th={th}/>}
        </FadeIn>
      </div>
      <Footer th={th}/>
    </div>
    </>
  );
}