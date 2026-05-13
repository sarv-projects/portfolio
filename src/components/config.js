// ============================================================
//  CONFIG — Edit this to update everything
// ============================================================
export const CONFIG = {
  name: "Sarvesh Bhattacharyya",
  title: "AI Engineer",
  tagline: "I build systems that make LLMs act, not just talk.",
  email: "sarveshbh.2022@gmail.com",
  phone: "+91 97317 37460",
  location: "Bengaluru, Karnataka",
  github: "https://github.com/sarv-projects",
  linkedin: "https://www.linkedin.com/in/sarvesh-bhattacharyya-485360270/",
  medium: "https://medium.com/@sarveshbh.2022",
  resume: "/resume.pdf",
  homeTags: ["Multi-Agent Systems", "Voice AI", "RAG Pipelines", "Backend Engineering"],
  education: [
    {
      school: "MS Ramaiah Institute of Technology",
      degree: "B.E. Electronics & Communication Engineering",
      period: "2022 – 2026",
      cgpa: "7.5/10",
    },
    {
      school: "DeepLearning.AI",
      degree: "Machine Learning Specialization",
      period: "",
    },
  ],
  about: `Final year ECE student at MSRIT Bengaluru, currently interning as an AI Engineer. I work across the full stack of making AI systems actually work in production — from how agents are orchestrated, to how they connect with the real world, to why they sometimes don't behave the way you expect.`,
  experience: [
    {
      role: "AI Engineer Intern",
      company: "Beaut Group",
      link: "https://business.superowl.in/",
      period: "Feb 2026 – Present",
      location: "Bengaluru, Karnataka · On-site",
      desc: "Independently designed and shipped a production multi-tenant AI automation platform for small businesses as a solo intern — given only a problem statement, no existing codebase. Built end-to-end from infrastructure to product, handling real customer interactions across multiple live business clients simultaneously. Reduced end-to-end response latency from ~10s to ~3s.\n\nEngineered real-time communication and control workflows enabling business owners to stay aware of and intervene in live customer interactions instantly, without manual effort — increasing owner responsiveness while keeping operations fully automated by default.\n\nDelivered the complete product solo across backend, integrations, and a React Native mobile app with real-time notifications — taking a B2B SaaS product from blank problem statement to production across the full stack in under 3 months.",
    },
  ],
  skillGroups: [
    {
      label: "Languages",
      skills: ["Python", "JavaScript", "C++", "Rust"],
    },
    {
      label: "AI / ML",
      skills: ["Multi-Agent Systems", "RAG Pipelines", "Voice AI", "LLM Fine-tuning (QLoRA)", "LangChain / LangGraph / Langfuse"],
    },
    {
      label: "Infra & Data",
      skills: ["Docker", "GitHub Actions", "Redis", "SQLite", "Neo4j", "Vector DBs (Qdrant, Chroma, Pinecone)", "Firebase"],
    },
    {
      label: "Frameworks",
      skills: ["FastAPI", "React Native", "Bash", "Ubuntu"],
    },
  ],
  projects: [
    {
      title: "🔥 ROAST — Resume Critic AI",
      status: "live",
      thumbGradient: ["#00d4ff", "#0066ff"],
      desc: "A 6-agent pipeline providing calibrated market intelligence and actionable feedback for resumes. Features an offline market intelligence store (SQLite+FTS5+sqlite-vec), WebSocket streaming for real-time critique generation, Redis-backed sessions with progress tracking, and automatic LLM provider fallback for production reliability.",
      stack: ["Python", "FastAPI", "LangGraph", "WebSocket", "Redis", "SQLite", "Docker"],
      github: "https://github.com/sarv-projects/Roast",
      live: "https://roast-app-ckard.ondigitalocean.app/",
    },
    {
      title: "🧬 SYNAPSE — Live AI Knowledge Graph Platform",
      status: "live",
      thumbGradient: ["#a78bfa", "#7c3aed"],
      desc: "A hybrid Neo4j/Qdrant knowledge graph that ingests 11 sources daily. Features an auto-updating architecture and schema-constrained NL-to-Cypher query layer for natural language querying of structured knowledge.",
      stack: ["Neo4j Aura", "Qdrant", "PostgreSQL", "LangGraph", "React 19", "FastAPI"],
      github: "https://github.com/sarv-projects",
    },
    {
      title: "⚕️ ACARE — Autonomous Clinical Assistance Robot (In Progress)",
      status: "in-progress",
      thumbGradient: ["#00ff88", "#00cc6a"],
      desc: "Developed the software architecture for a 6-DOF clinical robotic arm for plastic surgery departments — covering ROS2 node design, voice pipeline, dialogue, and task planning.\n\n- 10+ ROS2 nodes on Raspberry Pi 5 — MultiThreadedExecutor, typed custom messages, QoS policy per topic\n- Voice pipeline: Silero VAD → Deepgram Nova-2 STT → Groq intent parsing → LangGraph clarification\n- Bayesian NBV search with clamped probability updates [0.05, 0.90] to prevent saturation\n- Graded safety system: WARNING / CRITICAL / ESTOP tiers with deterministic safe deposit\n- YOLOv11 TFLite INT8 detection → DLS IK solver → motion → biometric handover verification",
      stack: ["ROS2", "Python", "C++", "YOLOv11 TFLite INT8", "LangGraph", "Groq", "Deepgram", "Silero VAD", "SQLite"],
    },
    {
      title: "🧠 LLM Twin",
      status: "experiment",
      thumbGradient: ["#ff6b9d", "#d946ef"],
      desc: "Fine-tuned a personal LLM to replicate writing style while preserving base reasoning capabilities:\n\n- QLoRA fine-tuning on 4,670 personal message pairs using Unsloth on Colab T4 — loss 4.4 → 1.10 in 12 minutes\n- 4-bit GGUF quantization via Ollama for fully local inference on consumer hardware\n- RAG memory layer using ChromaDB + Sentence Transformers for long-context recall\n- Key finding: domain transfer confirmed, style transfer partial — professional tone requires professional training data",
      stack: ["Python", "Llama 3.2 3B", "QLoRA", "Unsloth", "Ollama", "ChromaDB", "Sentence Transformers"],
      github: "https://github.com/sarv-projects/llmtwin",
      live: "",
    },
  ],
  blogs: [
    {
      title: "The Wrong Question Is Holding AI Back",
      desc: "An engineering case for AI memory that updates over time: reinforce repeated signals, decay stale ones, resolve contradictions, and compress patterns into stronger beliefs.",
      tags: ["AI Agent", "Memory Management", "AI Engineering"],
      date: "Mar 24, 2026",
      link: "https://medium.com/@sarveshbh.2022/the-wrong-question-is-holding-ai-back-af243980f52a",
    },
  ],
};

export const PAGES = ["home", "projects", "skills", "blog", "about", "contact"];

// ── Theme ──
export const DARK = {
  bg: "#0b0d14",
  bgCard: "#11141c",
  border: "#1e2230",
  text: "#f1f5f9",
  textSub: "#b8c9e0",
  textMuted: "#6c7e98",
  accent: "#38bdf8",
};

export const LIGHT = {
  bg: "#f8fafc",
  bgCard: "#ffffff",
  border: "#cbd5e1",
  text: "#050a14",
  textSub: "#1e293b",
  textMuted: "#334155",
  accent: "#0369a1",
};

export const SKILL_COLORS = ["#00d4ff", "#00ff88", "#ff6b9d", "#ffd700", "#a78bfa"];
