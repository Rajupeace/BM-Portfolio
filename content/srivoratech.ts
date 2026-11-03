/**
 * SriVoraTech details shown in the "Startup" section.
 * Source: https://www.srivoratech.in/ (company, leadership and product listings).
 * Keep this in sync with the official site; do not add metrics, clients or
 * testimonials that are not published there.
 */

export type ProductStatus = "live-demo" | "upcoming";

export interface StartupProduct {
  name: string;
  category: string;
  summary: string;
  tech: string[];
  status: ProductStatus;
  statusDetail?: string;
  url?: string;
}

export const srivoratech = {
  name: "SriVoraTech",
  url: "https://www.srivoratech.in/",
  founderPage: "https://www.srivoratech.in/founder",
  myRole: "Founder & CEO",
  founded: "2024",
  location: "Hyderabad, Telangana, India",
  summary:
    "SriVoraTech is an IT services startup that builds custom software, AI solutions, web and mobile applications, and cloud solutions for businesses.",
  roleSummary:
    "As Founder & CEO, I lead SriVoraTech's product strategy, technology vision and business development.",
  leadership: [
    { name: "Badisa Srikanth", role: "Founder & CEO" },
    { name: "Badisa Vamsi Krishna", role: "Co-Founder & COO" },
    { name: "Garapati Sai Manindra", role: "CTO" },
  ],
  services: [
    "Custom Software Development",
    "AI & Machine Learning Solutions",
    "Web Application Development",
    "Mobile App Development",
    "Cloud & DevOps Engineering",
    "UI/UX Design",
    "E-Commerce Solutions",
    "Healthcare IT Systems",
  ],
  products: [
    {
      name: "SriERP Pro",
      category: "Enterprise Software (ERP)",
      summary: "ERP platform for HR, payroll, inventory, finance, attendance and project workflows. The demo linked on srivoratech.in is the Vu UniVerse360 campus system.",
      tech: ["React.js", "NestJS", "PostgreSQL", "Docker", "AWS"],
      status: "live-demo",
      url: "https://vu-universe-360.vercel.app/",
    },
    {
      name: "SmartAI Assistant",
      category: "Artificial Intelligence",
      summary: "AI virtual assistant that answers customer queries, automates workflows and summarizes documents.",
      tech: ["Python", "FastAPI", "LangChain", "OpenAI / Gemini"],
      status: "live-demo",
      url: "https://srivoratech-ai-virtual-assistant-workflow-automat.ai.studio/",
    },
    {
      name: "ShopSphere Commerce",
      category: "E-Commerce Platform",
      summary: "E-commerce platform with payments, inventory, order tracking and an admin dashboard.",
      tech: ["Next.js", "Node.js", "MongoDB", "Stripe / Razorpay"],
      status: "live-demo",
      url: "https://sritheeagle.github.io/e-commerce-/",
    },
    {
      name: "HealthConnect Healthcare",
      category: "Healthcare Platform",
      summary: "Appointment booking, medical records, teleconsultation and prescription management.",
      tech: ["React.js", "Node.js", "MySQL", "WebRTC", "Firebase"],
      status: "live-demo",
      url: "https://papafoundation09-commits.github.io/hps/",
    },
    {
      name: "EduVerse LMS",
      category: "Education Platform",
      summary: "Learning management system with courses, quizzes, assignment grading and progress analytics.",
      tech: ["React.js", "Node.js", "MySQL", "AWS S3", "JWT Auth"],
      status: "live-demo",
      url: "https://srivoratech-lms-learningmanagement.ai.studio/",
    },
    {
      name: "Business CRM & Collaborative Workspace",
      category: "CRM & Project Management",
      summary: "Leads, clients, sales pipelines, Kanban tasks and calendars in one cloud workspace.",
      tech: ["React.js", "Express.js", "MongoDB", "Socket.IO", "Docker", "Cloud Run"],
      status: "live-demo",
      url: "https://business-crm-collaborative-project-workspace-329194709400.asia-southeast1.run.app/",
    },
    {
      name: "SriVora AI Autonomous Agents",
      category: "Enterprise AI",
      summary: "Planned multi-agent platform for orchestrating enterprise tasks and automated testing.",
      tech: ["Python", "LangGraph", "FastAPI"],
      status: "upcoming",
      statusDetail: "Q4 2026",
    },
    {
      name: "OmniChannel ERP Cloud",
      category: "Cloud ERP",
      summary: "Planned cloud ERP for retail chains to unify point-of-sale and multi-location inventory.",
      tech: ["Golang", "React.js", "Apache Kafka", "PostgreSQL", "Kubernetes"],
      status: "upcoming",
      statusDetail: "Q4 2026",
    },
    {
      name: "FinTech PayShield Gateway v2",
      category: "Fintech",
      summary: "Planned payment gateway with transaction risk scoring and multi-currency payouts.",
      tech: ["Next.js", "Node.js", "ClickHouse", "Redis"],
      status: "upcoming",
      statusDetail: "Q1 2027",
    },
  ] as StartupProduct[],
};
