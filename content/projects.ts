/**
 * Projects shown on the homepage and on /projects/[slug].
 *
 * Rules for editing:
 * - Only write what is true and verifiable. Leave optional fields out instead
 *   of guessing; empty sections are hidden on the detail page.
 * - `status` is shown as a badge: "live", "source", "in-progress" or "research".
 * - Put features that already work in `implemented`, and planned work in `planned`.
 * - Screenshots live in /public/projects. Use real screenshots only.
 */

export type ProjectStatus = "live" | "source" | "in-progress" | "research";
export type ProjectCategory = "AI" | "Full Stack" | "DevOps & MLOps" | "Startup";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory[];
  status: ProjectStatus;
  /** Shown as a short warning on the card and detail page. */
  statusNote?: string;
  problem?: string;
  solution?: string;
  architecture?: string[];
  contribution?: string;
  implemented?: string[];
  /** A closely related project and how this one differs from it. */
  related?: { slug: string; note: string };
  /** Features being built now, not yet verified as working. */
  inProgress?: string[];
  planned?: string[];
  challenges?: string[];
  results?: string[];
  tech: string[];
  github?: string;
  live?: string;
  image?: string;
  imageAlt?: string;
  featured?: boolean;
}

export const statusLabels: Record<ProjectStatus, string> = {
  live: "Live demo",
  source: "Source only",
  "in-progress": "In progress",
  research: "Research proposal",
};

export const projects: Project[] = [
  {
    slug: "careeros",
    title: "CareerOS",
    tagline: "AI-powered career intelligence platform.",
    category: ["AI", "Full Stack"],
    status: "in-progress",
    statusNote: "Not public yet: there is no repository, demo or screenshot to verify, so every feature is listed as in progress.",
    problem: "Job seekers rarely know how well their resume matches a specific job description or which skills they are missing.",
    solution: "Analyse a resume against a job description with a local LLM (Qwen3 through Ollama) and retrieval-augmented generation over ChromaDB, then report skill gaps.",
    architecture: [
      "FastAPI backend",
      "Qwen3 running locally through Ollama",
      "ChromaDB vector store with Sentence Transformers embeddings",
      "Retrieval-Augmented Generation (RAG) pipeline",
    ],
    inProgress: [
      "Resume intelligence: parse and understand a resume",
      "Job description analysis",
      "Skill gap analysis between resume and job description",
      "RAG over ChromaDB for grounded answers",
    ],
    tech: ["Python", "FastAPI", "React", "Qwen3", "Ollama", "ChromaDB", "Sentence Transformers", "RAG"],
    featured: true,
  },
  {
    slug: "roadsense-ai",
    title: "RoadSense AI",
    tagline: "AI-based Indian road damage detection and research project.",
    category: ["AI"],
    status: "research",
    statusNote: "Research proposal. No dataset, experiments or results are published yet, so every feature is listed as proposed.",
    problem: "Damaged roads in India (potholes, cracks, waterlogging and damaged manholes) are reported slowly and repaired without a clear priority order.",
    solution: "Detect road damage from images, estimate severity and risk, and prioritise repairs, with a corrective RAG layer for grounded explanations.",
    architecture: [
      "Image input from road photos",
      "Damage detection: potholes, cracks, waterlogging, damaged manholes",
      "Severity and risk assessment for each detection",
      "Corrective RAG: retrieve guidance, check its relevance, re-retrieve when it is weak",
      "Prioritised damage report",
    ],
    planned: [
      "Pothole detection",
      "Road crack detection",
      "Waterlogging detection",
      "Damaged manhole detection",
      "Severity and risk prioritisation",
      "Corrective RAG architecture",
      "Documented research methodology, dataset and evaluation",
    ],
    tech: ["Python", "Computer Vision", "Deep Learning", "Corrective RAG"],
    featured: true,
  },
  {
    slug: "vu-universe-360",
    title: "Vu UniVerse360",
    tagline: "Campus management platform with student, faculty and admin portals. Repository: VUUniverse-360.",
    related: {
      slug: "vu-ai-agent",
      note: "Vu UniVerse360 is the full campus platform (portals, attendance, records). The VU AI Agent is a separate chatbot project; Vu UniVerse360 includes it as its AI module.",
    },
    category: ["Full Stack"],
    status: "live",
    problem: "Institutions juggle separate tools for students, faculty and administration, which scatters academic and operational data.",
    solution: "One web platform with dedicated portals for students, faculty and administrators, backed by shared APIs and real-time updates.",
    architecture: [
      "React.js frontend",
      "NestJS REST API",
      "MongoDB for student data, logs and activity; MySQL/SQLite for identities and academic records",
      "Server-Sent Events (SSE) for live dashboard updates",
      "Python AI microservice for the integrated VU AI Agent",
    ],
    contribution: "Developed the full-stack application: React frontend, NestJS REST APIs, database design and deployment.",
    implemented: [
      "Student dashboard for notes, results and attendance",
      "Faculty portal for student records, study materials and announcements",
      "Admin suite with role-based access control",
      "Dashboards for finance, hostel, library, transport and placement managers",
      "Real-time updates over SSE",
    ],
    tech: ["React", "NestJS", "MongoDB", "MySQL", "Python", "SSE"],
    github: "https://github.com/Rajupeace/VUUniverse-360",
    live: "https://vu-universe-360.vercel.app/",
    image: "/projects/vu-universe-360.webp",
    imageAlt: "Vu UniVerse360 home screen with Student, Faculty and Admin portals",
    featured: true,
  },
  {
    slug: "vu-ai-agent",
    title: "VU AI Agent",
    tagline: "Standalone AI assistant for university questions; Vu UniVerse360 integrates it as its AI module.",
    related: {
      slug: "vu-universe-360",
      note: "This is only the AI assistant, built and run on its own. Vu UniVerse360 is the separate campus management platform that uses it.",
    },
    category: ["AI"],
    status: "source",
    statusNote: "The earlier demo at vu-ai-agent.vercel.app no longer exists. The source code is on GitHub.",
    problem: "Students, faculty and visitors need quick, reliable answers about university programs, admissions and campus life.",
    solution: "A chat assistant that answers from a curated university knowledge base and adapts its answers to the user's role.",
    architecture: [
      "FastAPI backend with LangChain",
      "Local LLM through Ollama (auto-detects Llama 3, Mistral, Gemma or Llama 2)",
      "MongoDB for persistent chat history",
      "Web chat frontend",
    ],
    contribution: "Built the AI assistant with Python and LangChain: the FastAPI backend, LLM integration and the web chat frontend.",
    implemented: [
      "Role-aware answers for students, faculty, visitors, staff and admins",
      "Conversation history (last 10 messages) stored in MongoDB",
      "30-second LLM timeout with fallbacks and health checks",
    ],
    tech: ["Python", "FastAPI", "LangChain", "Ollama", "MongoDB"],
    github: "https://github.com/Rajupeace/VU--AI-AGENT",
    image: "/vu-ai-agent.png",
    imageAlt: "Screenshot of the Vu AI Agent chat interface",
    featured: true,
  },
  {
    slug: "student-result-prediction",
    title: "Student Result Prediction (MLOps)",
    tagline: "ML model shipped through CI, a quality gate, Docker, GHCR and Render.",
    category: ["DevOps & MLOps"],
    status: "live",
    problem: "Practise taking a machine learning model from training to a tested, containerised and deployed service.",
    solution: "A small prediction model with a GitHub Actions pipeline that trains, tests, gates on model quality, builds a Docker image, publishes it to GHCR and deploys it to Render.",
    architecture: [
      "Python training script and Flask prediction API",
      "GitHub Actions: tests, ML quality gate and artifact upload",
      "Docker image with a health check",
      "GitHub Container Registry tags: latest, v1 and commit SHA",
      "Deployed from GHCR to Render",
    ],
    contribution: "Built the model, tests, workflows, Dockerfile and deployment.",
    implemented: [
      "Automated tests for the app and ML pipeline",
      "ML quality gate in the CI pipeline",
      "Preserved ML artifacts and a release package",
      "Docker health-check failure and recovery demonstration",
      "Automated GHCR publishing",
      "Deployed API with a /health endpoint (free Render instance, so the first request can be slow)",
    ],
    results: [
      "Successful GitHub Actions runs for each practical, linked in the DevOps & MLOps journey",
      "Public container image on GHCR",
    ],
    tech: ["Python", "scikit-learn", "Flask", "Prometheus client", "GitHub Actions", "Docker", "GHCR", "Render"],
    github: "https://github.com/Rajupeace/student-result-ml-ci",
    live: "https://student-result-prediction-hh09.onrender.com/health",
  },
  {
    slug: "srivoratech",
    title: "SriVoraTech",
    tagline: "My startup's website and software development platform.",
    category: ["Startup", "Full Stack"],
    status: "live",
    problem: "SriVoraTech needed one place to present its services, products, careers and client enquiries.",
    solution: "A company website with service pages, a careers portal with resume upload and an enquiry form synced to Google Sheets.",
    architecture: [
      "React 18 + Vite frontend",
      "Node.js + Express API for uploads and enquiries",
      "Google Sheets integration for enquiry and application tracking",
    ],
    implemented: [
      "Services hub for software, AI, cloud, web and mobile work",
      "Careers portal with job listings and resume upload",
      "Consultation and contact forms",
    ],
    tech: ["React", "Vite", "Node.js", "Express", "Google Sheets API"],
    github: "https://github.com/Rajupeace/SriVoraTech",
    live: "https://www.srivoratech.in/",
    image: "/projects/srivoratech.webp",
    imageAlt: "SriVoraTech website home page",
  },
  {
    slug: "bm-portfolio",
    title: "BM Portfolio",
    tagline: "This portfolio: projects, startup, skills and learning in one place.",
    category: ["Full Stack"],
    status: "live",
    problem: "One place to present my work, startup, skills and learning progress to recruiters and collaborators.",
    contribution: "Designed and built the site, including the editable skills & learning tracker and the SriVoraTech section.",
    implemented: [
      "Light and dark themes with reduced-motion support",
      "Skills & learning tracker driven by a single data file",
      "Project detail pages generated from one data file",
      "Certificates viewable inline as PDFs",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Rajupeace/BM-Portfolio",
    live: "https://srikanth.portfolio.srivoratech.in",
    image: "/projects/bm-portfolio.webp",
    imageAlt: "Screenshot of the BM Portfolio site",
  },
];

export const projectCategories: ProjectCategory[] = ["AI", "Full Stack", "DevOps & MLOps", "Startup"];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
