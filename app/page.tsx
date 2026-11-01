"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useSpring, AnimatePresence, MotionConfig } from "framer-motion";
import { useTheme } from "next-themes";
import {
  ArrowUp,
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  Code2,
  X,
  User,
  Terminal,
  Cpu,
  Globe,
  Phone,
  Info,
  Database,
  Layers,
  ExternalLink,
  Download,
  Eye,
  Award,
  GraduationCap,
  Send,
  Home,
  FolderGit2,
  Building2,
  Wrench,
  Route,
  AtSign,
  Briefcase,
  FileText,
  AlertTriangle,
  Trophy,
  Menu,
  Heart,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SkillsLearningTracker } from "@/components/sections/skills-learning";
import { StartupSection } from "@/components/sections/startup-section";
import { srivoratech } from "@/content/srivoratech";
import { currentFocus } from "@/content/learning";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// ---- DATA ----
const DATA = {
  name: "Badisa Srikanth",
  alias: "Srikanth Badisa",
  role: "Full Stack Developer",
  headline: "Full Stack Developer & Founder of SriVoraTech",
  bio: "I'm a Computer Science engineer who builds full-stack web apps and AI-powered tools, and the Founder & CEO of SriVoraTech.",
  resume: "/Srikanthsathya_Resume.pdf",
  contact: {
    email: "rajubhaibhai576@gmail.com",
    github: "https://github.com/Rajupeace",
    linkedin: "https://www.linkedin.com/in/srikanth-b-1b6b452a5/",
    hackerrank: "https://www.hackerrank.com/profile/rajubhaibhai576",
    leetcode: "https://leetcode.com/u/Srikanthsathya/",
  },
  experience: [
    {
      company: "SriVoraTech",
      companyUrl: srivoratech.url,
      role: "Founder & CEO",
      period: "2024 – Present",
      description: "Leading product strategy, technology vision and business development for an IT services startup based in Hyderabad.",
    },
    {
      company: "Self-Employed",
      role: "Fresher / Student Developer",
      period: "2023 – Present",
      description: "Building personal projects, open-source contributions, and mastering the MERN stack.",
    },
  ],
  education: [
    {
      degree: "B.Tech – Computer Science Engineering",
      institution: "Vignan University",
      period: "2023 – 2027",
      grade: "3rd Year",
      details: "Core CS, Data Structures, Algorithms, Web Development",
      link: "https://maps.app.goo.gl/b9MyL5AGUDNi37d28",
    },
    {
      degree: "Intermediate (MPC)",
      institution: "Sri Chaitanya Jr College, Khammam",
      period: "2021 – 2023",
      grade: "Marks: 810",
      details: "Mathematics, Physics, Chemistry",
    },
    {
      degree: "High School (SSC)",
      institution: "St. Frances English Medium High School",
      period: "2009 – 2020",
      grade: "GPA: 10/10",
      details: "School Topper",
    },
  ],
  skills: [
    { name: "React", icon: Code2 },
    { name: "Next.js", icon: Globe },
    { name: "TypeScript", icon: Terminal },
    { name: "Node.js", icon: ServerIcon },
    { name: "Tailwind", icon: Layers },
    { name: "Python", icon: Cpu },
    { name: "Java", icon: CoffeeIcon },
    { name: "SQL", icon: Database },
  ],
  skillCategories: [
    {
      title: "Languages",
      skills: ["Python", "Java", "JavaScript", "TypeScript", "SQL"],
    },
    {
      title: "Frontend",
      skills: ["React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "Framer Motion"],
    },
    {
      title: "Backend & Tools",
      skills: ["Node.js", "Git", "VS Code", "Postman", "MongoDB"],
    },
    {
      title: "Core Concepts",
      skills: ["Data Structures", "Algorithms", "System Design", "OOPs"],
    },
  ],
  projects: [
    {
      title: "Vu Universe 360",
      description: "An advanced AI agent designed for university assistance, capable of handling student queries with context awareness.",
      problem: "Students, faculty and visitors need quick, reliable answers about university programs, admissions and campus life.",
      contribution: "Built the AI assistant with Python and LangChain: a FastAPI backend, LLM integration and a web chat frontend.",
      features: [
        "Role-aware answers for students, faculty, visitors, staff and admins",
        "Conversation history with MongoDB-backed chat storage",
        "Local LLM support through Ollama (Llama 3 and others)",
      ],
      tags: ["Python", "FastAPI", "LangChain", "LLM", "MongoDB"],
      github: "https://github.com/Rajupeace/VU--AI-AGENT",
      // Previous live link https://vu-ai-agent.vercel.app returns DEPLOYMENT_NOT_FOUND (404).
      // Add a working URL here to show the "Live demo" button again.
      live: "",
      image: "/vu-ai-agent.png",
    },
    {
      title: "VU - UniVerse-360",
      description: "A 360° Unified University Management Ecosystem. A next-generation, full-stack, cloud-ready Educational Management System providing complete digital transformation of academic, administrative, and operational workflows. Built with React.js 18, NestJS, MongoDB Atlas, and Python AI microservices.",
      problem: "Institutions juggle separate tools for students, faculty and administration, which scatters academic and operational data.",
      contribution: "Developed the full-stack application: React frontend, NestJS REST APIs, database design and deployment.",
      features: [
        "Student dashboard for notes, results and attendance",
        "Faculty portal for student records and study materials",
        "Admin suite with role-based access control and real-time updates (SSE)",
      ],
      tags: ["React", "NestJS", "MongoDB", "Python", "AI"],
      github: "https://github.com/Rajupeace/VUUniverse-360",
      live: "https://vu-universe-360.vercel.app/",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80",
    },
    {
      title: "BM Portfolio",
      description: "My personal portfolio showcasing my journey, built with Next.js, Framer Motion, and premium styling.",
      problem: "One place to present my work, startup, skills and learning progress to recruiters and collaborators.",
      contribution: "Designed and built the site, including the editable skills & learning tracker and the SriVoraTech section.",
      features: [
        "Light and dark themes with reduced-motion support",
        "Skills & learning tracker driven by a single data file",
        "Certificates viewable inline as PDFs",
      ],
      tags: ["Next.js", "Tailwind", "Framer Motion"],
      github: "https://github.com/Rajupeace/BM-Portfolio",
      live: "https://srikanth.portfolio.srivoratech.in",
      image: "/bm-portfolio.png",
    },
  ],
  services: [
    { title: "Web Architecture", description: "Scalable, responsive web applications built with Next.js and React.", icon: Globe },
    { title: "AI Augmentation", description: "AI assistants and LLM-powered features that answer questions and automate tasks.", icon: Cpu },
    { title: "Experience Design", description: "Clean, accessible interfaces with purposeful motion and clear hierarchy.", icon: Layers },
    { title: "Full Stack Orchestration", description: "End-to-end delivery, from database schema and APIs to deployment.", icon: Database },
  ],
  certifications: [
    { name: "Basics of Data Structures and Algorithms", issuer: "Simplilearn", year: "2025", code: "8398194", date: "28th May 2025", image: "/certificates/data-structures-algorithms.pdf" },
    { name: "Introduction to Cloud Computing", issuer: "Simplilearn", year: "2026", code: "10081714", date: "10th April 2026", image: "/certificates/cloud-computing.pdf" },
    { name: "Power BI for Beginners", issuer: "Microsoft + Simplilearn", year: "2026", code: "10107424", date: "15th April 2026", image: "/certificates/power-bi.pdf" },
    { name: "Python for Beginners", issuer: "Simplilearn", year: "2025", code: "8408331", date: "30th May 2025", image: "/certificates/python-beginners.pdf" },
    { name: "Python (Basic)", issuer: "HackerRank", year: "2025", code: "7B476072F599", date: "30 May, 2025", image: "/certificates/python-hackerrank.pdf" },
    { name: "Problem Solving (Basic)", issuer: "HackerRank", year: "2025", code: "DB1C7CC20DC1", date: "06 Jun, 2025", image: "/certificates/problem-solving.pdf" },
  ],
  achievements: [
    { title: "Smart India Hackathon Finalist", description: "Selected for the grand finale for an innovative AI-based solution.", year: "2023", icon: "🏆" },
    { title: "5 Star Coder at HackerRank", description: "Achieved 5-star rating in Problem Solving and Python.", year: "2023", icon: "⭐" },
    { title: "Best Student Project", description: "Awarded for the 'Friendly-Notebook' project during college tech fest.", year: "2024", icon: "🥇" },
  ],
  personalDetails: {
    name: "Badisa Srikanth",
    phone: "9182030946",
    email: "rajubhaibhai576@gmail.com",
    dob: "09 / 07 / 2004",
    address: "Madhira: Khammam / Ts",
    father: "Venkateshwarlu",
    mother: "Adi Laxmi",
  },
  hobbies: [
    "Playing badminton",
    "Reading books and short stories",
    "Learning new things and exploring technology",
    "Creating and designing websites",
    "Listening to music",
  ],
};

const NAV_ITEMS = [
  { label: "Home", id: "home", icon: Home },
  { label: "Work", id: "work", icon: FolderGit2 },
  { label: "Startup", id: "startup", icon: Building2 },
  { label: "Skills", id: "skills", icon: Wrench },
  { label: "Journey", id: "career", icon: Route },
  { label: "Contact", id: "contact", icon: AtSign },
];
// ---- UTILITY COMPONENTS ----

function HackerRankIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2z" />
      <path d="M7 7v10" />
      <path d="M17 7v10" />
      <path d="M7 12h10" />
    </svg>
  );
}

function LeetCodeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m10.3 8.7 6.4-3.7c.6-.3.8-1.1.5-1.7-.3-.6-1.1-.8-1.7-.5l-7.7 4.5c-.7.4-.9 1.3-.5 2l3 5.2" />
      <path d="m14.9 16.3 1.8 1c.6.3 1.3.1 1.7-.5.3-.6.1-1.3-.5-1.7l-1.8-1" />
      <path d="m8.6 15.1-4.6 2.7c-.6.3-.8 1.1-.5 1.7.3.6 1.1.8 1.7.5l5.2-3" />
      <path d="M11.6 4.3 9.8 1.2c-.3-.6-1.1-.8-1.7-.5-.6.3-.8 1.1-.5 1.7l1.8 3.1" />
    </svg>
  );
}

function ServerIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
}

function CoffeeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
    </svg>
  );
}

function useDialog(open: boolean, onClose: () => void) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const dialog = closeRef.current?.closest<HTMLElement>('[role="dialog"]');
      if (!dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !dialog.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !dialog.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [open, onClose]);
  return closeRef;
}

// Sticky site header with section links, theme toggle and mobile menu
const SiteHeader = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (id: string) =>
    `rounded-full px-3 py-2 text-sm font-medium transition-colors ${
      active === id
        ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
        : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={`mx-auto max-w-6xl rounded-3xl border transition-[background-color,border-color,box-shadow] duration-300 ${
          open
            ? "border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-[#0a1220]"
            : scrolled
              ? "border-slate-200/80 bg-white/80 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#0a1220]/80"
              : "border-transparent bg-transparent"
        }`}
      >
      <div className="flex h-14 items-center justify-between gap-4 px-3 sm:px-4">
        <a href="#home" className="flex items-center gap-2.5 rounded-lg font-bold text-slate-900 dark:text-white">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-sky-700 font-display text-sm text-white shadow-sm" aria-hidden="true">BS</span>
          <span className="hidden sm:block">{DATA.name}</span>
          <span className="sr-only sm:hidden">{DATA.name}, home</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.filter((item) => item.id !== "home").map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} aria-current={active === item.id ? "true" : undefined} className={linkClass(item.id)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="rounded-full p-2.5 text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <a
            href={DATA.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 sm:inline-flex"
          >
            Resume <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">(PDF, opens in a new tab)</span>
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-full p-2.5 text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10 md:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-slate-200 px-4 pb-4 dark:border-slate-800 md:hidden">
          <ul className="grid gap-1 pt-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`flex items-center gap-3 ${linkClass(item.id)} rounded-xl py-3`}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" /> {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={DATA.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-900"
              >
                <FileText className="h-4 w-4" aria-hidden="true" /> View resume
                <span className="sr-only">(PDF, opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>
      )}
      </div>
    </header>
  );
};

// Contact Form Component — opens the visitor's email app with the message pre-filled.
const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${DATA.contact.email}?subject=${subject}&body=${body}`;
    toast.success("Opening your email app", {
      description: `If nothing opens, email me directly at ${DATA.contact.email}.`,
    });
  };

  const inputClass =
    "w-full bg-black/20 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 transition-colors";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl"
    >
      <h3 className="text-2xl font-bold text-white mb-2">Send me a message</h3>
      <p className="text-sm text-brand-100/80 mb-6">This opens your email app with your message ready to send.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-brand-100">Your Name</label>
            <input required type="text" id="name" name="name" autoComplete="name" className={inputClass} placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-brand-100">Your Email</label>
            <input required type="email" id="email" name="email" autoComplete="email" className={inputClass} placeholder="john@example.com" />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-brand-100">Message</label>
          <textarea required id="message" name="message" rows={4} className={`${inputClass} resize-none`} placeholder="How can I help you?"></textarea>
        </div>
        <Button
          type="submit"
          className="w-full py-6 rounded-xl bg-white text-slate-900 hover:bg-brand-50 font-bold text-lg transition-colors"
        >
          <span className="flex items-center gap-2">
            Send Message <Send className="h-5 w-5" aria-hidden="true" />
          </span>
        </Button>
      </form>
    </motion.div>
  );
};

const SectionHeading = ({ eyebrow, title, description, id }: { eyebrow: string; title: string; description?: string; id?: string }) => (
  <div className="mb-12">
    <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-300">
      <span className="h-px w-10 bg-gradient-to-r from-brand-500 to-sky-400" aria-hidden="true" />
      {eyebrow}
    </p>
    <h2 id={id} className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight text-balance">{title}</h2>
    {description && <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">{description}</p>}
  </div>
);

const extLinkClass =
  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors";

// ---- MAIN COMPONENT ----

export default function ProfessionalPortfolio() {
  const { scrollYProgress } = useScroll();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [flippedCert, setFlippedCert] = useState<number | null>(null);
  useEffect(() => {
    if (flippedCert === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (document.querySelector('[role="dialog"]')) return;
        const i = flippedCert;
        setFlippedCert(null);
        setTimeout(() => document.getElementById(`cert-preview-${i}`)?.focus(), 50);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [flippedCert]);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const closeProject = useCallback(() => setSelectedProject(null), []);
  const closePersonal = useCallback(() => setShowPersonalInfo(false), []);
  const projectCloseRef = useDialog(selectedProject !== null, closeProject);
  const personalCloseRef = useDialog(showPersonalInfo, closePersonal);

  const profileImages = [
    "/profile-circle.jpg",
    "https://github.com/Rajupeace.png",
  ];

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("home")?.focus({ preventScroll: true });
  };

  const project = selectedProject !== null ? DATA.projects[selectedProject] : null;

  const liveProducts = srivoratech.products.filter((p) => p.status === "live-demo").length;
  const glance = [
    { href: "#work", icon: FolderGit2, label: "Projects", value: `${DATA.projects.length} featured builds` },
    { href: "#startup", icon: Building2, label: "SriVoraTech", value: `${liveProducts} live product demos` },
    { href: "#skills", icon: Wrench, label: currentFocus.trim() ? "Current focus" : "Skills & learning", value: currentFocus.trim() || "Explore the tracker" },
    { href: "#contact", icon: AtSign, label: "Contact", value: "Hiring or collaborating?" },
  ];

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-slate-50 dark:bg-[#04080f] text-slate-900 dark:text-slate-50 transition-colors duration-300 font-sans selection:bg-brand-500/30">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900 focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(rgb(100_116_139/0.22)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black_20%,transparent_80%)] dark:bg-[radial-gradient(rgb(148_163_184/0.14)_1px,transparent_1px)]" />
        <div className="absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-400/20 via-sky-400/15 to-violet-400/10 blur-[110px] dark:from-brand-500/20 dark:via-sky-500/10 dark:to-violet-500/10" />
        <div className="absolute top-[40%] right-[-12%] w-[420px] h-[420px] bg-sky-500/10 rounded-full blur-[120px] animate-blob animation-delay-4000" />
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-brand-500 origin-left z-[100]"
        style={{ scaleX }}
        aria-hidden="true"
      />

      <SiteHeader />

      <main id="main" className="relative z-10">
      {/* HERO SECTION */}
      <section id="home" tabIndex={-1} aria-labelledby="hero-heading" className="relative min-h-[92vh] flex items-center justify-center overflow-x-clip px-6 pt-28 pb-24 outline-none">
        <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-700 dark:text-brand-300 text-sm font-medium"
            >
              <span className="h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
              <span className="whitespace-nowrap">{DATA.name}</span> <span className="whitespace-nowrap text-brand-600/80 dark:text-brand-300/80">· also known as {DATA.alias}</span>
            </motion.p>

            <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-[1.05] mb-6 text-balance">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                  className="block text-slate-900 dark:text-white"
                >
                  Full Stack Developer
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, delay: 0.08, ease: [0.33, 1, 0.68, 1] }}
                  className="block bg-gradient-to-r from-brand-600 via-teal-600 to-sky-700 dark:from-brand-300 dark:via-teal-300 dark:to-sky-300 bg-clip-text text-transparent"
                >
                  & Founder of SriVoraTech
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-8"
            >
              {DATA.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <Button size="lg" className="h-12 px-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-200 font-semibold" asChild>
                <a href="#work">View Projects <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></a>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6 rounded-full border-slate-300 dark:border-slate-700 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800" asChild>
                <a href={srivoratech.url} target="_blank" rel="noopener noreferrer">
                  SriVoraTech <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6 rounded-full border-slate-300 dark:border-slate-700 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800" asChild>
                <a href={DATA.resume} target="_blank" rel="noopener noreferrer">
                  View Resume <Eye className="ml-2 h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(PDF, opens in a new tab)</span>
                </a>
              </Button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-600 dark:text-slate-400"
              aria-label="Quick links"
            >
              <li>
                <a href={DATA.resume} download="Badisa_Srikanth_Resume.pdf" className="inline-flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400 underline-offset-4 hover:underline">
                  <Download className="h-3.5 w-3.5" aria-hidden="true" /> Download CV
                </a>
              </li>
              <li>
                <a href={DATA.contact.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400 underline-offset-4 hover:underline">
                  <Github className="h-3.5 w-3.5" aria-hidden="true" /> GitHub<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </motion.ul>
          </div>

          {/* Profile card */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            aria-label="Profile summary"
            className="relative mx-auto w-full max-w-sm lg:mr-0"
          >
            <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-brand-500/20 to-sky-500/20 blur-2xl" aria-hidden="true" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 sm:block" aria-hidden="true">
              <svg viewBox="0 0 400 400" fill="none" className="absolute inset-0 h-full w-full text-slate-300 dark:text-slate-700">
                <circle cx="200" cy="200" r="150" stroke="currentColor" strokeDasharray="2 6" />
                <circle cx="200" cy="200" r="196" stroke="currentColor" strokeOpacity="0.6" strokeDasharray="1 8" />
              </svg>
              <div className="absolute inset-[12.5%] animate-orbit">
                <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500 shadow-[0_0_0_4px_rgb(20_184_166/0.15)]" />
                <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-sky-500" />
              </div>
              <div className="absolute inset-[1%] animate-orbit-reverse">
                <span className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400" />
                <span className="absolute right-0 top-1/2 h-1.5 w-1.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400" />
              </div>
            </div>
            <div className="relative rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
              <button
                type="button"
                aria-label="Show next profile photo"
                className="relative block aspect-square w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800"
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % profileImages.length)}
              >
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={profileImages[currentImageIndex]}
                    alt={`Portrait of ${DATA.name}`}
                    fill
                    sizes="(min-width: 1024px) 384px, 90vw"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </button>

              <div className="mt-5 flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{DATA.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{DATA.role}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" /> Open to Work
                </span>
              </div>

              <a
                href={srivoratech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3 transition-colors hover:border-brand-300 dark:border-slate-800 dark:hover:border-brand-500/50"
              >
                <span className="flex items-center gap-3">
                  <span className="rounded-lg bg-brand-50 p-2 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
                    <Building2 className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400">{srivoratech.myRole}</span>
                    <span className="block text-sm font-bold text-slate-900 dark:text-white">{srivoratech.name}</span>
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>

              {currentFocus.trim() && (
                <a
                  href="#skills"
                  className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 text-sm transition-colors hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-violet-400 animate-ping-slow" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-500" />
                    </span>
                    <span className="text-slate-600 dark:text-slate-300">
                      Now learning <span className="font-semibold text-slate-900 dark:text-white">{currentFocus}</span>
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                </a>
              )}

              <ul className="mt-4 flex gap-2" aria-label="Profiles">
                {[
                  { icon: Github, href: DATA.contact.github, label: "GitHub (opens in a new tab)", external: true },
                  { icon: Linkedin, href: DATA.contact.linkedin, label: "LinkedIn (opens in a new tab)", external: true },
                  { icon: Mail, href: `mailto:${DATA.contact.email}`, label: `Email ${DATA.contact.email}`, external: false },
                ].map((item) => (
                  <li key={item.label} className="flex-1">
                    <a
                      href={item.href}
                      aria-label={item.label}
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex items-center justify-center rounded-xl border border-slate-200 p-2.5 text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <item.icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* AT A GLANCE */}
      <section aria-label="At a glance" className="relative px-6 pb-8">
        <ul className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {glance.map((g) => (
            <li key={g.href}>
              <a
                href={g.href}
                className="group flex h-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-brand-500/50"
              >
                <span className="rounded-xl bg-brand-50 p-3 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
                  <g.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{g.label}</span>
                  <span className="block font-semibold text-slate-900 dark:text-white">{g.value}</span>
                </span>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* PROJECTS SECTION */}
      <section id="work" aria-labelledby="work-heading" className="scroll-mt-24 py-28 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
            <SectionHeading id="work-heading" eyebrow="Projects" title="Featured Projects" description="What I built, the problem behind it, and what I contributed." />
            <Button variant="ghost" className="gap-2 group mb-12 self-start md:self-auto" asChild>
              <a href={DATA.contact.github} target="_blank" rel="noopener noreferrer">
                All repositories on GitHub <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Button>
          </div>

          <div className="space-y-8">
            {DATA.projects.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                aria-labelledby={`project-${i}-title`}
                className="group grid overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm transition-[border-color,box-shadow] duration-300 hover:shadow-lg hover:border-brand-300 dark:hover:border-brand-500/50 lg:grid-cols-2"
              >
                <div className={`relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800 lg:aspect-auto lg:min-h-[380px] ${i % 2 ? "lg:order-2" : ""}`}>
                  <Image
                    src={p.image}
                    alt={`Screenshot of ${p.title}`}
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span
                    className={`absolute top-3 left-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${p.live ? "bg-emerald-600 text-white" : "bg-slate-800/90 text-white"}`}
                  >
                    {p.live ? "Live demo" : "Source only"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400" aria-hidden="true">
                    Project {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 id={`project-${i}-title`} className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{p.title}</h3>
                  <dl className="mt-3 space-y-3 text-sm leading-relaxed">
                    <div>
                      <dt className="font-semibold text-slate-900 dark:text-slate-100">Problem</dt>
                      <dd className="text-slate-600 dark:text-slate-400">{p.problem}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-900 dark:text-slate-100">My contribution</dt>
                      <dd className="text-slate-600 dark:text-slate-400">{p.contribution}</dd>
                    </div>
                  </dl>

                  <ul className="mt-4 space-y-1.5 text-sm text-slate-600 dark:text-slate-400" aria-label="Key features">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                    {p.tags.map((tag) => (
                      <li key={tag} className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6 flex flex-wrap items-center gap-2">
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className={`${extLinkClass} bg-brand-600 text-white hover:bg-brand-700`}>
                        <ExternalLink className="h-4 w-4" aria-hidden="true" /> Live demo
                        <span className="sr-only">of {p.title} (opens in a new tab)</span>
                      </a>
                    )}
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className={`${extLinkClass} border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800`}>
                      <Github className="h-4 w-4" aria-hidden="true" /> Source
                      <span className="sr-only">code of {p.title} on GitHub (opens in a new tab)</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(i)}
                      className={`${extLinkClass} text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800`}
                    >
                      <Info className="h-4 w-4" aria-hidden="true" /> Details
                      <span className="sr-only">about {p.title}</span>
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <StartupSection />

      {/* SKILLS & LEARNING SECTION */}
      <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-24 py-28 px-6">
        <div className="container mx-auto max-w-6xl">
          <SectionHeading
            id="skills-heading"
            eyebrow="Skills & Learning"
            title="What I've learned, and what I'm learning now"
            description="Completed skills, the ones I've started, and what I'm studying now."
          />
          <SkillsLearningTracker />

          <h3 className="mt-20 mb-6 font-display text-2xl font-bold">Toolkit</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DATA.skillCategories.map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800"
              >
                <h4 className="text-base font-semibold mb-4 text-brand-700 dark:text-brand-300">{category.title}</h4>
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium">
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

      </section>

      {/* SERVICES SECTION */}
      <section aria-labelledby="services-heading" className="py-28 px-6 bg-white dark:bg-[#07101c] border-y border-slate-200 dark:border-slate-800/60">
        <div className="container mx-auto max-w-6xl">
          <SectionHeading id="services-heading" eyebrow="What I do" title="Technical Arsenal" description="I don't just write code; I engineer solutions that bridge the gap between human intuition and machine logic." />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DATA.services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-500/50 transition-colors"
              >
                <div className="mb-4 inline-flex p-3 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300">
                  <service.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY SECTION */}
      <section id="career" aria-labelledby="career-heading" className="scroll-mt-24 py-28 px-6">
        <div className="container mx-auto max-w-5xl">
          <SectionHeading id="career-heading" eyebrow="Journey" title="Experience, education & certifications" />

          <Tabs defaultValue="experience">
            <TabsList aria-label="Journey" className="h-auto flex flex-wrap justify-start gap-1 rounded-2xl bg-slate-100 p-1.5 dark:bg-slate-900">
              {[
                { value: "experience", label: "Experience", icon: Briefcase },
                { value: "education", label: "Education", icon: GraduationCap },
                { value: "certifications", label: "Certifications", icon: Award },
                { value: "achievements", label: "Achievements", icon: Trophy },
                { value: "hobbies", label: "Beyond code", icon: Heart },
              ].map((t) => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="gap-2 rounded-xl px-4 py-2 text-slate-600 dark:text-slate-400 data-[state=active]:bg-white data-[state=active]:text-slate-900 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-white"
                >
                  <t.icon className="h-4 w-4" aria-hidden="true" /> {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="experience" className="mt-10">
            <div>
              <h3 className="sr-only">
                <Briefcase className="h-6 w-6 text-brand-500" aria-hidden="true" />
                Work Experience
              </h3>
              <ol className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 md:ml-6 space-y-8 pl-6 md:pl-10 py-2">
                {DATA.experience.map((exp, i) => (
                  <motion.li
                    key={exp.company + exp.role}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="relative"
                  >
                    <span className="absolute -left-[33px] md:-left-[49px] top-0 p-2 rounded-full bg-slate-50 dark:bg-slate-900 border-2 border-brand-500 text-brand-500" aria-hidden="true">
                      <Briefcase className="h-4 w-4" />
                    </span>
                    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                        <div>
                          <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">{exp.role}</h4>
                          {"companyUrl" in exp && exp.companyUrl ? (
                            <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="text-brand-700 dark:text-brand-300 font-medium hover:underline inline-flex items-center gap-1">
                              {exp.company} <ExternalLink className="h-3 w-3" aria-hidden="true" />
                              <span className="sr-only">(opens in a new tab)</span>
                            </a>
                          ) : (
                            <span className="text-brand-700 dark:text-brand-300 font-medium">{exp.company}</span>
                          )}
                        </div>
                        <span className="inline-block self-start px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">{exp.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
            </TabsContent>

            <TabsContent value="education" className="mt-10">
            <div>
              <h3 className="sr-only">
                <GraduationCap className="h-6 w-6 text-brand-500" aria-hidden="true" />
                Education History
              </h3>
              <ol className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 md:ml-6 space-y-8 pl-6 md:pl-10 py-2">
                {DATA.education.map((edu, i) => (
                  <motion.li
                    key={edu.degree}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="relative"
                  >
                    <span className="absolute -left-[33px] md:-left-[49px] top-0 p-2 rounded-full bg-slate-50 dark:bg-slate-900 border-2 border-brand-500 text-brand-500" aria-hidden="true">
                      <GraduationCap className="h-4 w-4" />
                    </span>
                    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                        <div>
                          <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">{edu.degree}</h4>
                          {edu.link ? (
                            <a href={edu.link} target="_blank" rel="noopener noreferrer" className="text-brand-700 dark:text-brand-300 font-medium hover:underline inline-flex items-center gap-1">
                              {edu.institution} <ExternalLink className="h-3 w-3" aria-hidden="true" />
                              <span className="sr-only">(map, opens in a new tab)</span>
                            </a>
                          ) : (
                            <span className="text-brand-700 dark:text-brand-300 font-medium">{edu.institution}</span>
                          )}
                        </div>
                        <span className="inline-block self-start px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">{edu.details}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 text-sm font-semibold">
                        <Award className="h-4 w-4" aria-hidden="true" /> {edu.grade}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
            </TabsContent>

            <TabsContent value="certifications" className="mt-10">
            <div>
              <h3 className="sr-only">
                <Award className="h-6 w-6 text-brand-500" aria-hidden="true" />
                Certifications
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DATA.certifications.map((cert, i) => {
                  const flipped = flippedCert === i;
                  return (
                    <div key={cert.code} className="relative h-80 [perspective:1200px]">
                      <motion.div
                        className="relative w-full h-full"
                        animate={{ rotateY: flipped ? 180 : 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* Front Side */}
                        <div
                          className="absolute inset-0 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-500/60 transition-colors overflow-hidden flex flex-col"
                          style={{ backfaceVisibility: "hidden" }}
                          aria-hidden={flipped}
                        >
                          <div className="relative h-28 shrink-0 bg-gradient-to-br from-brand-500/10 to-sky-500/10 dark:from-brand-500/15 dark:to-sky-500/15 flex items-center justify-center">
                            <Award className="h-14 w-14 text-brand-500/30 dark:text-brand-300/30" aria-hidden="true" />
                            <span className="absolute bottom-3 left-3 text-xs font-bold px-3 py-1 rounded-full bg-brand-600 text-white">
                              {cert.issuer}
                            </span>
                          </div>
                          <div className="p-5 flex flex-1 flex-col">
                            <h4 className="font-bold text-lg mb-2 line-clamp-2">{cert.name}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Credential: {cert.code}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{cert.date}</p>
                            <div className="mt-auto flex flex-wrap gap-2 pt-4">
                              <button
                                type="button"
                                id={`cert-preview-${i}`}
                                onClick={() => {
                                  setFlippedCert(i);
                                  setTimeout(() => document.getElementById(`cert-close-${i}`)?.focus(), 50);
                                }}
                                tabIndex={flipped ? -1 : 0}
                                className="text-sm font-semibold text-brand-700 dark:text-brand-300 hover:underline underline-offset-2"
                              >
                                Preview certificate
                              </button>
                              <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">|</span>
                              <a
                                href={cert.image}
                                target="_blank"
                                rel="noopener noreferrer"
                                tabIndex={flipped ? -1 : 0}
                                className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:underline underline-offset-2"
                              >
                                Open PDF<span className="sr-only"> for {cert.name} (opens in a new tab)</span>
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Back Side - Certificate PDF */}
                        <div
                          className="absolute inset-0 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
                          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                          aria-hidden={!flipped}
                        >
                          {flipped && (
                            <iframe src={cert.image} className="w-full h-full" title={`${cert.name} certificate`} loading="lazy" tabIndex={-1} />
                          )}
                          <button
                            type="button"
                            id={`cert-close-${i}`}
                            onClick={() => {
                              setFlippedCert(null);
                              setTimeout(() => document.getElementById(`cert-preview-${i}`)?.focus(), 50);
                            }}
                            tabIndex={flipped ? 0 : -1}
                            aria-label={`Close ${cert.name} preview`}
                            className="absolute top-2 right-2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors z-10"
                          >
                            <X className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
            </TabsContent>

            <TabsContent value="achievements" className="mt-10">
            <div>
              <h3 className="sr-only">
                <Trophy className="h-6 w-6 text-brand-500" aria-hidden="true" />
                Achievements
              </h3>
              <ul className="space-y-4">
                {DATA.achievements.map((item, i) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-5 p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800"
                  >
                    <div className="text-3xl" aria-hidden="true">{item.icon}</div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">{item.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
                      <span className="text-xs font-semibold text-brand-700 dark:text-brand-300 mt-1 inline-block">{item.year}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
            </TabsContent>

            <TabsContent value="hobbies" className="mt-10">
              <h3 className="sr-only">Hobbies & interests</h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DATA.hobbies.map((hobby) => (
              <li
                key={hobby}
                className="flex items-center gap-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-500/50 transition-colors"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                <span className="font-medium text-slate-800 dark:text-slate-100">{hobby}</span>
              </li>
            ))}
          </ul>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" aria-labelledby="contact-heading" className="relative pt-28 pb-36 px-6 overflow-hidden bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" aria-hidden="true" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
          <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 id="contact-heading" className="font-display text-4xl md:text-5xl font-bold mb-4">Let&apos;s Connect</h2>
            <p className="text-lg md:text-xl text-brand-100/90 max-w-xl">
              Hiring, collaborating, or interested in SriVoraTech? Get in touch.
            </p>
          </motion.div>

          {/* Contact Cards Grid */}
          <ul className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              { href: `mailto:${DATA.contact.email}`, icon: Mail, title: "Email", value: DATA.contact.email, external: false },
              { href: `tel:+91${DATA.personalDetails.phone}`, icon: Phone, title: "Phone", value: DATA.personalDetails.phone, external: false },
              { href: DATA.resume, icon: FileText, title: "Resume", value: "View PDF", external: true },
              { href: srivoratech.url, icon: Building2, title: "SriVoraTech", value: "srivoratech.in", external: true },
            ].map((c) => (
              <li key={c.title}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full flex-col p-6 rounded-2xl bg-white/5 border border-white/15 hover:border-brand-300/60 hover:bg-white/10 transition-colors"
                >
                  <span className="mb-4 w-11 h-11 rounded-xl bg-brand-500/20 text-brand-200 flex items-center justify-center">
                    <c.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-lg font-bold">{c.title}</span>
                  <span className="text-brand-100/80 text-sm break-all">{c.value}</span>
                  {c.external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>

          {/* Social Links */}
          <ul className="flex gap-3" aria-label="Profiles">
            {[
              { icon: Github, href: DATA.contact.github, label: "GitHub" },
              { icon: Linkedin, href: DATA.contact.linkedin, label: "LinkedIn" },
              { icon: HackerRankIcon, href: DATA.contact.hackerrank, label: "HackerRank" },
              { icon: LeetCodeIcon, href: DATA.contact.leetcode, label: "LeetCode" },
            ].map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (opens in a new tab)`}
                  className="flex p-3.5 rounded-xl bg-white/5 border border-white/15 hover:bg-white/15 hover:border-white/30 transition-colors"
                >
                  <social.icon className="h-5 w-5 text-white" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          </div>
          <ContactForm />
          </div>

          <footer className="mt-20 text-center pt-8 border-t border-white/10">
            <p className="text-brand-100/90 text-sm">
              © {new Date().getFullYear()} <span className="font-bold text-white">{DATA.name}</span> · Founder & CEO,{" "}
              <a href={srivoratech.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
                SriVoraTech
              </a>
            </p>
            <p className="text-brand-100/60 text-xs mt-2">Built with Next.js & Tailwind CSS</p>
          </footer>
        </div>
      </section>
      </main>

      {/* PROJECT DETAILS MODAL */}
      <AnimatePresence>
        {project && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeProject}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 relative"
            >
              <button
                ref={projectCloseRef}
                type="button"
                onClick={closeProject}
                aria-label="Close project details"
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 transition-colors z-50"
              >
                <X className="h-5 w-5 text-slate-700 dark:text-slate-200" aria-hidden="true" />
              </button>

              <div className="p-8 md:p-10 bg-gradient-to-br from-brand-600 to-sky-700 text-white">
                <h3 id="project-dialog-title" className="text-3xl font-bold pr-10">{project.title}</h3>
                <ul className="flex flex-wrap gap-2 mt-4" aria-label="Technologies">
                  {project.tags.map((tag) => (
                    <li key={tag} className="px-3 py-1 text-xs font-semibold bg-white/20 rounded-full border border-white/20">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <h4 className="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100">Overview</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{project.description}</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100">Problem</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{project.problem}</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100">My contribution</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{project.contribution}</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100">Features</h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
                    {project.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                </div>
                {!project.live && (
                  <p className="flex items-start gap-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 p-3 text-sm text-amber-900 dark:text-amber-200">
                    <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                    The live demo is currently unavailable. The source code is on GitHub.
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors"
                  >
                    <Github className="h-5 w-5" aria-hidden="true" />
                    View GitHub<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" aria-hidden="true" />
                      View Live<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PERSONAL DETAILS MODAL */}
      <AnimatePresence>
        {showPersonalInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closePersonal}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="personal-dialog-title"
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 relative"
            >
              <button
                ref={personalCloseRef}
                type="button"
                onClick={closePersonal}
                aria-label="Close personal details"
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors z-50"
              >
                <X className="h-5 w-5 text-white" aria-hidden="true" />
              </button>

              <div className="p-8 md:p-10 bg-gradient-to-br from-brand-600 to-sky-700 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10" aria-hidden="true">
                  <User className="h-64 w-64" />
                </div>
                <div className="relative z-10">
                  <h3 id="personal-dialog-title" className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <span className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white/50 shadow-lg">
                      <Image src="/profile-circle.jpg" alt="" fill sizes="64px" className="object-cover" />
                    </span>
                    About Me
                  </h3>

                  <dl className="space-y-6">
                    <div className="border-b border-white/20 pb-4">
                      <dt className="text-brand-100 text-sm font-medium mb-1">Name</dt>
                      <dd className="text-2xl font-bold">{DATA.personalDetails.name}</dd>
                    </div>
                    <div className="border-b border-white/20 pb-4">
                      <dt className="text-brand-100 text-sm font-medium mb-1">Born</dt>
                      <dd className="text-xl font-semibold">{DATA.personalDetails.dob}</dd>
                    </div>
                    <div className="border-b border-white/20 pb-4">
                      <dt className="text-brand-100 text-sm font-medium mb-1">Contact</dt>
                      <dd className="text-lg font-mono">{DATA.personalDetails.phone}</dd>
                      <dd className="text-lg font-mono break-all">{DATA.personalDetails.email}</dd>
                    </div>
                    <div className="border-b border-white/20 pb-4">
                      <dt className="text-brand-100 text-sm font-medium mb-1">Family</dt>
                      <dd className="text-lg">Father: {DATA.personalDetails.father}</dd>
                      <dd className="text-lg">Mother: {DATA.personalDetails.mother}</dd>
                    </div>
                    <div>
                      <dt className="text-brand-100 text-sm font-medium mb-1">Address</dt>
                      <dd className="text-lg">{DATA.personalDetails.address}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating actions */}
      <div className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-[40] flex flex-col items-end gap-3">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-3 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow"
            >
              <ArrowUp className="h-5 w-5" aria-hidden="true" />
            </motion.button>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={() => setShowPersonalInfo(true)}
          aria-label="Show personal details"
          aria-haspopup="dialog"
          className="h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-lg transition-colors"
        >
          <Info className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
    </MotionConfig>
  );
}
