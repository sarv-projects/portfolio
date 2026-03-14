import { useState, useEffect, useRef } from "react";

// ============================================================
//  CONFIG — Edit this to update everything
// ============================================================
const CONFIG = {
  name: "Sarvesh Bhattacharyya",
  title: "AI Engineer",
  tagline: "I build the infrastructure that lets LLMs act autonomously.",
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
      skills: ["LangGraph", "CrewAI", "MCP", "RAG", "QLoRA","LangChain","sklearn","pytorch"],
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
   // {
 //     title: "ARIA — AI Interview Coach    - In Progress ",
 //     desc: "Voice-based AI interview coach with resume-grounded questioning, smart multi-signal VAD, session memory with semantic no-repeat, face confidence analysis (browser-local), and a pushiness monitor. 8-node LangGraph pipeline. Privacy-first — video never leaves browser.",
  //    stack: ["React", "Vite", "FastAPI", "LangGraph", "Groq", "Deepgram", "ElevenLabs", "MediaPipe"],
 //     github: "#", live: "",
 //   },
    {
      title: "LLM Twin - In Progress ",
      desc: "Personal AI fine-tuned to write exactly like me, with RAG-based memory, running 100% locally. QLoRA fine-tuned Llama 3.2 3B on 9k personal messages. 4-bit GGUF via Ollama. ChromaDB for semantic memory.",
      stack: ["Python", "Llama 3.2", "QLoRA", "Unsloth", "Ollama", "ChromaDB", "Sentence Transformers"],
      github: "https://github.com/sarv-projects/llmtwin", live: "",
    },
    {
      title: "ACARE — Clinical Assistance Robot - In Progress  ",
      desc: "Designed software architecture for a 6-DOF clinical robotic arm for plastic surgery departments. Dual-layer: Raspberry Pi 5 + ROS2 for AI intelligence, Teensy 4.1 for real-time PID motor control. YOLOv11 tool detection, LangGraph dialogue, dual biometric auth, and hardware ESTOP wired directly to motor driver — independent of all software",
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
    function draw() {
      ctx.clearRect(0, 0, W, H);
      const a = theme.accent;
      // grid
      ctx.strokeStyle = theme === LIGHT ? "rgba(0,153,204,0.06)" : "rgba(0,212,255,0.03)";
      ctx.lineWidth = 1;
      for (let x=0;x<W;x+=60){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
      for (let y=0;y<H;y+=60){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
      // particles
      for (let i=0;i<N;i++) {
        const p=pts[i]; p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = theme===LIGHT?"rgba(0,153,204,0.5)":"rgba(0,212,255,0.55)"; ctx.fill();
        for(let j=i+1;j<N;j++){
          const q=pts[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.sqrt(dx*dx+dy*dy);
          if(d<110){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);
            ctx.strokeStyle=theme===LIGHT?`rgba(0,153,204,${.09*(1-d/110)})`:`rgba(0,212,255,${.11*(1-d/110)})`;
            ctx.lineWidth=.5;ctx.stroke();}
        }
      }
      anim=requestAnimationFrame(draw);
    }
    init(); draw();
    window.addEventListener("resize",init);
    return()=>{cancelAnimationFrame(anim);window.removeEventListener("resize",init);};
  },[theme]);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.75}}/>;
}

// ── Scanlines ──
function Scanlines() {
  return <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",
    backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.02) 2px,rgba(0,0,0,0.02) 4px)"}}/>;
}

// ── Tag ──
function Tag({t,th}){
  return(
    <span style={{fontFamily:"monospace",fontSize:11,color:th.accent,
      background:`${th.accent}10`,border:`1px solid ${th.accent}30`,
      borderRadius:4,padding:"2px 8px",letterSpacing:.5}}>{t}</span>
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
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,
      display:"flex",alignItems:"center",justifyContent:"space-between",
      padding:"0 1rem",height:52,boxSizing:"border-box",
      background:dark?"rgba(7,8,15,0.9)":"rgba(240,244,248,0.9)",
      backdropFilter:"blur(18px)",borderBottom:`1px solid ${th.border}`,transition:"background .3s"}}>
      <span onClick={()=>setPage("home")} style={{fontFamily:"monospace",fontSize:17,
        color:th.text,cursor:"pointer",letterSpacing:1,fontWeight:700}}>
       <span style={{color:th.accent,fontWeight:400}}> AI Engineer</span>
      </span>
      <div style={{display:"flex",alignItems:"center",gap:"1.8rem"}}>
        {PAGES.filter(p=>p!=="home").map(p=>(
          <span key={p} onClick={()=>setPage(p)} style={{fontFamily:"monospace",fontSize:11,cursor:"pointer",
            letterSpacing:1.5,color:page===p?th.accent:th.textSub,textTransform:"uppercase",
            transition:"color .2s",position:"relative"}}>
            {page===p&&<span style={{position:"absolute",bottom:-4,left:0,right:0,height:1,background:th.accent,borderRadius:2}}/>}
            {p}
          </span>
        ))}
        {CONFIG.resume&&(
          <a href={CONFIG.resume} target="_blank" rel="noreferrer" style={{fontFamily:"monospace",fontSize:12,
            letterSpacing:1.5,color:th.accent,border:`1px solid ${th.accent}50`,borderRadius:5,
            padding:"4px 12px",textDecoration:"none",transition:"all .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.background=`${th.accent}15`;}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>RESUME ↗</a>
        )}
        {/* Dark/Light toggle */}
        <button onClick={()=>setDark(d=>!d)} style={{background:"transparent",border:`1px solid ${th.border}`,
          borderRadius:20,padding:"4px 10px",cursor:"pointer",fontSize:14,transition:"all .2s",
          color:th.textSub}}>
          {dark?"☀":"☾"}
        </button>
      </div>
    </nav>
  );
}

// ── HOME ──
function Home({setPage,th,dark}){
  const [typed,setTyped]=useState("");
  const [cur,setCur]=useState(true);
  const full=CONFIG.tagline;
  useEffect(()=>{let i=0;const iv=setInterval(()=>{setTyped(full.slice(0,i+1));i++;if(i>=full.length)clearInterval(iv);},38);return()=>clearInterval(iv);},[]);
  useEffect(()=>{const iv=setInterval(()=>setCur(c=>!c),530);return()=>clearInterval(iv);},[]);
  return(
    <div style={{position:"relative",height:"100vh",display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
      <TechBg theme={dark?DARK:LIGHT}/>
      <div style={{position:"absolute",inset:0,
        background:dark?"radial-gradient(ellipse at center,transparent 30%,rgba(7,8,15,0.85) 100%)":"radial-gradient(ellipse at center,transparent 30%,rgba(240,244,248,0.85) 100%)",
        zIndex:1,pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:200,
        background:dark?"linear-gradient(to top,rgba(7,8,15,1),transparent)":"linear-gradient(to top,rgba(240,244,248,1),transparent)",
        zIndex:2,pointerEvents:"none"}}/>
      <div style={{position:"relative",zIndex:3,textAlign:"center",padding:"0 1.5rem",maxWidth:740}}>
        
        <h1 style={{fontSize:"clamp(2.8rem,5vw,4.5rem)",fontWeight:900,color:th.text,margin:0,lineHeight:1.04,letterSpacing:-2}}>{CONFIG.name}</h1>
        <p style={{color:th.textSub,fontSize:"clamp(.95rem,1.8vw,1.15rem)",marginTop:22,minHeight:34,fontStyle:"italic",letterSpacing:.3}}>
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
              color:th.textMuted,textDecoration:"none",letterSpacing:1,transition:"color .2s"}}
              onMouseEnter={e=>e.currentTarget.style.color=th.accent}
              onMouseLeave={e=>e.currentTarget.style.color=th.textMuted}>{l} ↗</a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── PROJECTS ──
function Projects({setPage,th}){
  return(
    <div style={{padding:"7rem 2.5rem 6rem",maxWidth:1040,margin:"0 auto"}}>
      <BackBtn setPage={setPage} th={th}/>
      <p style={{fontFamily:"monospace",color:th.accent,fontSize:11,letterSpacing:4,textTransform:"uppercase",marginBottom:8}}>&gt; projects</p>
      <h2 style={{fontSize:"2.4rem",fontWeight:900,color:th.text,margin:"0 0 .4rem",letterSpacing:-1}}>Things I've Built</h2>
      <p style={{color:th.textMuted,fontFamily:"monospace",fontSize:12,marginBottom:44}}>// grows as I ship more</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:"1.25rem"}}>
        {CONFIG.projects.map((p,i)=>(
          <div key={i} style={{background:th.bgCard,border:`1px solid ${th.border}`,borderRadius:10,
            padding:"1.6rem",display:"flex",flexDirection:"column",gap:12,transition:"border-color .2s,transform .2s,box-shadow .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`${th.accent}60`;e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 40px rgba(0,0,0,0.3)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <h3 style={{color:th.text,fontSize:16,fontWeight:700,margin:0,lineHeight:1.3}}>{p.title}</h3>
              <span style={{fontFamily:"monospace",color:th.textMuted,fontSize:11}}>0{i+1}</span>
            </div>
            <p style={{color:th.textSub,fontSize:13.5,lineHeight:1.65,margin:0,flex:1}}>{p.desc}</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{p.stack.map(t=><Tag key={t} t={t} th={th}/>)}</div>
            <div style={{display:"flex",gap:"1rem",borderTop:`1px solid ${th.border}`,paddingTop:12}}>
              {p.github&&<a href={p.github} target="_blank" rel="noreferrer" style={{fontFamily:"monospace",fontSize:12,color:th.accent,textDecoration:"none"}}>GitHub ↗</a>}
              {p.live&&<a href={p.live} target="_blank" rel="noreferrer" style={{fontFamily:"monospace",fontSize:12,color:th.textMuted,textDecoration:"none"}}>Live ↗</a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SKILLS ──
function Skills({setPage,th}){
  return(
    <div style={{padding:"7rem 2.5rem 6rem",maxWidth:860,margin:"0 auto"}}>
      <BackBtn setPage={setPage} th={th}/>
      <p style={{fontFamily:"monospace",color:th.accent,fontSize:11,letterSpacing:4,textTransform:"uppercase",marginBottom:8}}>&gt; skills</p>
      <h2 style={{fontSize:"2.4rem",fontWeight:900,color:th.text,margin:"0 0 .4rem",letterSpacing:-1}}>Stack & Skills</h2>
      <p style={{color:th.textMuted,fontFamily:"monospace",fontSize:12,marginBottom:48}}>// tools I actually use in production</p>
      <div style={{display:"flex",flexDirection:"column",gap:"2rem"}}>
        {CONFIG.skillGroups.map((g,i)=>(
          <div key={i}>
            <p style={{fontFamily:"monospace",color:th.accent,fontSize:11,letterSpacing:3,textTransform:"uppercase",marginBottom:14,opacity:.8}}>// {g.label}</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
              {g.skills.map(s=>(
                <div key={s} style={{background:th.bgCard,border:`1px solid ${th.border}`,borderRadius:8,
                  padding:"10px 18px",fontFamily:"monospace",fontSize:13,color:th.textSub,
                  transition:"all .2s",cursor:"default"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=`${th.accent}60`;e.currentTarget.style.color=th.accent;e.currentTarget.style.background=`${th.accent}08`;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=th.border;e.currentTarget.style.color=th.textSub;e.currentTarget.style.background=th.bgCard;}}>
                  {s}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── BLOG ──
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

// ── APP ──
export default function App(){
  const [page,setPage]=useState("home");
  const [dark,setDark]=useState(true);
  const th=dark?DARK:LIGHT;
  return(
    <div style={{background:th.bg,minHeight:"100vh",color:th.text,fontFamily:"'Syne',sans-serif",transition:"background .3s,color .3s",overflowX:"hidden",maxWidth:"100vw"}}>
      <Scanlines/>
      <Nav page={page} setPage={setPage} dark={dark} setDark={setDark} th={th}/>
      <div style={{position:"relative",zIndex:2}}>
        {page==="home"&&<Home setPage={setPage} th={th} dark={dark}/>}
        {page==="projects"&&<Projects setPage={setPage} th={th}/>}
        {page==="skills"&&<Skills setPage={setPage} th={th}/>}
        {page==="blog"&&<Blog setPage={setPage} th={th}/>}
        {page==="about"&&<About setPage={setPage} th={th}/>}
        {page==="contact"&&<Contact setPage={setPage} th={th}/>}
      </div>
    </div>
  );
}