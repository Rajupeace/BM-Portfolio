"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  ArrowUp,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  Code2,
  X,
  Search,
  ShoppingCart,
  User,
  Heart,
  Sparkles,
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
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// ---- DATA ----
const DATA = {
  name: "Srikanth",
  role: "Full Stack Developer",
  tagline: "Building digital experiences that matter.",
  contact: {
    email: "rajubhaibhai576@gmail.com",
    github: "https://github.com/Rajupeace",
    linkedin: "https://www.linkedin.com/in/srikanth-b-1b6b452a5/",
    hackerrank: "https://www.hackerrank.com/profile/rajubhaibhai576",
    leetcode: "https://leetcode.com/u/Srikanthsathya/",
  },
  bio: "I'm a Computer Science engineer driven by the art of possibility. I merge technical depth with creative design to craft intelligent, high-performance digital ecosystems.",
  experience: [
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
      period: "2021 – Present",
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
      tags: ["Python", "AI", "LLM", "Automation"],
      github: "https://github.com/Rajupeace/VU--AI-AGENT",
      live: "https://vu-ai-agent.vercel.app",
      image: "/vu-ai-agent.png",
      bg: "bg-gradient-to-br from-indigo-500 to-purple-600",
    },
    {
      title: "VU - UniVerse-360",
      description: "A 360° Unified University Management Ecosystem. A next-generation, full-stack, cloud-ready Educational Management System providing complete digital transformation of academic, administrative, and operational workflows. Built with React.js 18, NestJS, MongoDB Atlas, and Python AI microservices.",
      tags: ["React", "NestJS", "MongoDB", "Python", "AI"],
      github: "https://github.com/Rajupeace/VUUniverse-360",
      live: "https://vu-universe-360.vercel.app/",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=3840&q=80",
      bg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    },
    {
      title: "BM Portfolio",
      description: "My personal portfolio showcasing my journey, built with Next.js, Framer Motion, and premium styling.",
      tags: ["Next.js", "Tailwind", "Framer Motion"],
      github: "https://github.com/Rajupeace/BM-Portfolio",
      live: "https://bm-portfolio-xi.vercel.app",
      image: "/bm-portfolio.png",
      bg: "bg-gradient-to-br from-orange-400 to-rose-500",
    },
  ],
  services: [
    { title: "Web Architecture", description: "Architecting scalable, pixel-perfect web ecosystems that define the future of interaction using Next.js.", icon: Globe },
    { title: "AI Augmentation", description: "Infusing cognitive intelligence into digital interfaces, creating agents that think, adapt, and assist.", icon: Cpu },
    { title: "Experience Design", description: "Sculpting digital experiences where kinetics meet aesthetics, ensuring every interaction feels profound.", icon: Layers },
    { title: "Full Stack Orchestration", description: "Orchestrating the entire digital lifecycle, from the first line of schema to the final global deployment.", icon: Database },
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
    name: "Srikanth",
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

// Floating Dock Navigation
const FloatingDock = () => {
  const { theme, setTheme } = useTheme();
  const items = [
    { label: "Home", id: "home" },
    { label: "Skills", id: "skills" },
    { label: "Work", id: "work" },
    { label: "Journey", id: "career" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-2xl"
    >
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="px-4 py-2 text-sm font-medium rounded-full text-slate-600 dark:text-slate-300 hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
        >
          {item.label}
        </a>
      ))}
      <div className="h-6 w-[1px] bg-slate-400/30 mx-1" />
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </motion.div>
  );
};

// Contact Form Component
const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully!", {
        description: "Thank you for reaching out. I will get back to you soon.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-xl"
    >
      <h3 className="text-2xl font-bold text-white mb-6">Send me a message</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-indigo-200">Your Name</label>
            <input required type="text" id="name" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-indigo-200">Your Email</label>
            <input required type="email" id="email" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="john@example.com" />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-indigo-200">Message</label>
          <textarea required id="message" rows={4} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none" placeholder="How can I help you?"></textarea>
        </div>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full py-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-lg shadow-lg hover:shadow-indigo-500/25 transition-all"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Sending...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Send Message <Send className="h-5 w-5" />
            </div>
          )}
        </Button>
      </form>
    </motion.div>
  );
};

// ---- MAIN COMPONENT ----

export default function ProfessionalPortfolio() {
  const { scrollYProgress } = useScroll();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [flippedCert, setFlippedCert] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const profileImages = [
    "/profile-circle.jpg",
    "https://github.com/Rajupeace.png", // Github profile pic as fallback/secondary
  ];

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });



  // Scroll to Top Logic
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-50 transition-colors duration-500 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">

      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        {/* Animated Gradient Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000" />
      </div>



      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      <FloatingDock />

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 lg:px-20 overflow-hidden pt-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[128px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[128px] translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Innovating with AI & Modern Web
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-8">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                  className="block bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent"
                >
                  Thinking in Code.
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
                  className="block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                >
                  Dreaming in Pixels.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-10"
            >
              I'm <strong>{DATA.name}</strong>. {DATA.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="h-12 px-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 font-semibold" asChild>
                <a href={`mailto:${DATA.contact.email}`}>Let's Talk <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6 rounded-full border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800" asChild>
                <a href="/Srikanthsathya_Resume.pdf" target="_blank" rel="noopener noreferrer">View Resume <Eye className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button size="lg" variant="ghost" className="h-12 px-6 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" asChild>
                <a href="/Srikanthsathya_Resume.pdf" download="Srikanth_Resume.pdf">Download CV <Download className="ml-2 h-4 w-4" /></a>
              </Button>
            </motion.div>
          </div>

          {/* Profile Picture */}
          <div className="flex justify-center lg:justify-end relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              className="relative z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-40 animate-pulse" />
              <div
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % profileImages.length)}
              >
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={profileImages[currentImageIndex]}
                    alt="Srikanth Profile"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </motion.div>
              </div>

              {/* Floating Badge 1 (Bottom Left) */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-2 -left-2 md:-bottom-6 md:-left-6 bg-white dark:bg-slate-900 p-3 md:p-4 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3 scale-90 md:scale-100 origin-bottom-left"
              >
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <Code2 className="h-5 w-5 md:h-6 md:w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-slate-500 font-bold">Current Status</p>
                  <p className="text-xs md:text-sm font-bold text-green-600 dark:text-green-400">Open to Work</p>
                </div>
              </motion.div>

              {/* Floating Badge 2 (Top Right) */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute -top-2 -right-2 md:-top-6 md:-right-6 bg-white dark:bg-slate-900 p-3 md:p-4 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3 scale-90 md:scale-100 origin-top-right"
              >
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                  <Globe className="h-5 w-5 md:h-6 md:w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-slate-500 font-bold">Location</p>
                  <p className="text-xs md:text-sm font-bold text-indigo-600 dark:text-indigo-400">Remote / India</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SKILLS MARQUEE */}
      <section id="skills" className="py-20 border-y border-slate-200 dark:border-slate-800/50 bg-slate-100/50 dark:bg-black/20 overflow-hidden">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">My Stack</span>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee flex whitespace-nowrap gap-16 ">
            {[...DATA.skills, ...DATA.skills, ...DATA.skills].map((skill, i) => (
              <div key={i} className="flex items-center gap-3 text-2xl font-bold text-slate-400 dark:text-slate-500 md:opacity-60 hover:opacity-100 transition-opacity">
                <skill.icon className="h-8 w-8" />
                {skill.name}
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* DETAILED SKILLS SECTION */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-[#030712] border-b border-slate-200 dark:border-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {DATA.skillCategories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-32 px-6 bg-slate-50 dark:bg-[#030712]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Arsenal</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">I don't just write code; I engineer solutions that bridge the gap between human intuition and machine logic.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DATA.services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors group"
              >
                <div className="mb-4 inline-block p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section >

      {/* PROJECTS SECTION (Re-Added) */}
      < section id="work" className="py-32 px-6" >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">Innovations I've built.</p>
            </div>
            <Button variant="ghost" className="gap-2 group" asChild>
              <a href="https://github.com/Rajupeace" target="_blank" rel="noopener noreferrer">
                View Github <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 auto-rows-[300px]">
            {DATA.projects.map((project, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 ${i === 0 ? "md:col-span-2" : "md:col-span-1"}`}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/70 group-hover:via-black/50 transition-all duration-500" />
                </div>

                {/* Action Buttons - Top Right */}
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedProject(i); }}
                    className="p-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm text-slate-900 transition-colors shadow-lg"
                    title="View Details"
                  >
                    <Info className="h-5 w-5" />
                  </button>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white transition-colors shadow-lg"
                    title="View GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-indigo-500/90 hover:bg-indigo-600 backdrop-blur-sm text-white transition-colors shadow-lg"
                      title="View Live"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 text-white">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-slate-200 mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 text-xs font-semibold bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Links */}
                    <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                      >
                        <Github className="h-4 w-4" />
                        <span>GitHub</span>
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section id="career" className="py-32 px-6 bg-slate-100 dark:bg-[#050a18]">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-16 text-center">My Journey</h2>

          <div className="space-y-12">
            {/* Certifications Block */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Award className="h-8 w-8 text-indigo-500" />
                Certifications
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DATA.certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group relative h-80 cursor-pointer"
                    onClick={() => setFlippedCert(flippedCert === i ? null : i)}
                  >
                    <motion.div
                      className="relative w-full h-full"
                      animate={{ rotateY: flippedCert === i ? 180 : 0 }}
                      transition={{ duration: 0.6 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Front Side */}
                      <motion.div
                        className="absolute inset-0 backface-hidden rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all shadow-sm hover:shadow-xl overflow-hidden"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        {/* Certificate Header with Issuer Badge */}
                        <div className="relative h-32 overflow-hidden bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Award className="h-16 w-16 text-indigo-500/30 dark:text-indigo-400/30" />
                          </div>
                          <div className="absolute bottom-3 left-3 right-3">
                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500 text-white dark:bg-indigo-600">
                              {cert.issuer}
                            </span>
                          </div>
                        </div>

                        {/* Certificate Info */}
                        <div className="p-5">
                          <h4 className="font-bold text-lg mb-3 group-hover:text-indigo-500 transition-colors line-clamp-2">{cert.name}</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                              <Award className="h-4 w-4 text-indigo-500" />
                              <span>Code: {cert.code}</span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-500">{cert.date}</p>
                          </div>
                          <p className="text-xs text-indigo-500 mt-3 font-medium">Click to view certificate</p>
                        </div>
                      </motion.div>

                      {/* Back Side - Certificate PDF */}
                      <motion.div
                        className="absolute inset-0 backface-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden"
                        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                      >
                        <div className="relative w-full h-full">
                          <iframe
                            src={cert.image}
                            className="w-full h-full"
                            title={cert.name}
                          />
                          <button
                            onClick={(e) => { e.stopPropagation(); setFlippedCert(null); }}
                            className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors z-10"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Achievements Block */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="text-3xl">🏆</span>
                Achievements
              </h3>
              <div className="space-y-6">
                {DATA.achievements.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-white dark:from-white/5 dark:to-transparent border border-slate-200 dark:border-white/10 hover:border-indigo-500/50 transition-colors"
                  >
                    <div className="text-4xl">{item.icon}</div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">{item.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
                      <span className="text-xs font-semibold text-indigo-500 mt-2 inline-block">{item.year}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Work Experience Block */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold mb-10 flex items-center gap-3">
                <Globe className="h-8 w-8 text-indigo-500" />
                Work Experience
              </h3>

              <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 md:ml-6 space-y-10 pl-6 md:pl-10 py-2">
                {DATA.experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative"
                  >
                    <span className="absolute -left-[33px] md:-left-[49px] top-0 p-2 rounded-full bg-slate-100 dark:bg-slate-900 border-2 border-indigo-500 text-indigo-500">
                      <Globe className="h-4 w-4" />
                    </span>

                    <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-indigo-500 transition-colors shadow-sm relative group">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                        <div>
                          <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">{exp.role}</h4>
                          <span className="text-indigo-600 dark:text-indigo-400 font-medium">{exp.company}</span>
                        </div>
                        <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-500 whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">{exp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>


            {/* Education Block */}
            <div>
              <h3 className="text-3xl font-bold mb-10 flex items-center gap-3">
                <GraduationCap className="h-8 w-8 text-indigo-500" />
                Education History
              </h3>

              <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 md:ml-6 space-y-10 pl-6 md:pl-10 py-2">
                {DATA.education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline Dot */}
                    <span className="absolute -left-[33px] md:-left-[49px] top-0 p-2 rounded-full bg-slate-100 dark:bg-slate-900 border-2 border-indigo-500 text-indigo-500">
                      <GraduationCap className="h-4 w-4" />
                    </span>

                    {/* Content Card */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-indigo-500 transition-colors shadow-sm relative group">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                        <div>
                          <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">{edu.degree}</h4>
                          {edu.link ? (
                            <a href={edu.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-1">
                              {edu.institution} <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : (
                            <span className="text-indigo-600 dark:text-indigo-400 font-medium">{edu.institution}</span>
                          )}
                        </div>
                        <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-500 whitespace-nowrap">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">{edu.details}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-bold">
                        <Award className="h-4 w-4" /> {edu.grade}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOBBIES SECTION */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-[#030712]">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Hobbies & Interests
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Beyond coding, here's what fuels my creativity and keeps me inspired.
            </p>
          </motion.div>

          {/* Timeline Layout */}
          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 md:ml-6 space-y-8 pl-6 md:pl-10 py-4">
            {DATA.hobbies.map((hobby, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="relative group"
              >
                {/* Timeline Dot */}
                <span className="absolute -left-[33px] md:-left-[49px] top-1 h-6 w-6 rounded-full bg-white dark:bg-slate-900 border-2 border-pink-500 flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 group-hover:animate-ping" />
                </span>

                {/* Content Card */}
                <motion.div
                  whileHover={{
                    x: 10,
                    transition: { duration: 0.3 }
                  }}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-pink-400 dark:hover:border-pink-600 transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-pink-500/5 group-hover:via-purple-500/5 group-hover:to-indigo-500/5 transition-all duration-500" />

                  {/* Text Content */}
                  <div className="relative z-10 flex items-center justify-between">
                    <p className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                      {hobby}
                    </p>

                    {/* Decorative Arrow */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <ArrowRight className="h-5 w-5 text-pink-500" />
                    </motion.div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 group-hover:w-full transition-all duration-500" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT DETAILS MODAL */}
      <AnimatePresence>
        {selectedProject !== null && DATA.projects[selectedProject] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 relative scrollbar-hide"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-50"
              >
                <X className="h-6 w-6 text-slate-500" />
              </button>

              <div className="p-8 md:p-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Github className="h-64 w-64" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-2">{DATA.projects[selectedProject].title}</h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {DATA.projects[selectedProject].tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs font-semibold bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h4 className="text-xl font-bold mb-4 text-slate-900 dark:text-slate-100">Project Description</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{DATA.projects[selectedProject].description}</p>

                <div className="flex gap-4">
                  <a
                    href={DATA.projects[selectedProject].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                    View GitHub
                  </a>
                  {DATA.projects[selectedProject].live && (
                    <a
                      href={DATA.projects[selectedProject].live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                      View Live
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
            onClick={() => setShowPersonalInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 relative scrollbar-hide"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPersonalInfo(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-50"
              >
                <X className="h-6 w-6 text-slate-500" />
              </button>

              <div className="p-8 md:p-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <User className="h-64 w-64" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white/50 shadow-lg">
                      <Image
                        src="/profile-circle.jpg"
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                    About Me
                  </h3>

                  <div className="space-y-6">
                    <div className="border-b border-white/20 pb-4">
                      <p className="text-indigo-200 text-sm font-medium mb-1">Name</p>
                      <p className="text-2xl font-bold">{DATA.personalDetails.name}</p>
                    </div>
                    <div className="border-b border-white/20 pb-4">
                      <p className="text-indigo-200 text-sm font-medium mb-1">Born</p>
                      <p className="text-xl font-semibold">{DATA.personalDetails.dob}</p>
                    </div>
                    <div className="border-b border-white/20 pb-4">
                      <p className="text-indigo-200 text-sm font-medium mb-1">Contact</p>
                      <p className="text-lg font-mono">{DATA.personalDetails.phone}</p>
                      <p className="text-lg font-mono break-all">{DATA.personalDetails.email}</p>
                    </div>
                    <div>
                      <p className="text-indigo-200 text-sm font-medium mb-1">Family</p>
                      <p className="text-lg">Father: {DATA.personalDetails.father}</p>
                      <p className="text-lg">Mother: {DATA.personalDetails.mother}</p>
                    </div>
                    <div>
                      <p className="text-indigo-200 text-sm font-medium mb-1">Address</p>
                      <p className="text-lg opacity-90">{DATA.personalDetails.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-28 right-8 z-[90] p-3 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xl border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-shadow backdrop-blur-sm"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Info Button */}
      <div className="fixed bottom-6 right-6 z-[90] flex items-center justify-center">
        {/* Pulse Ring */}
        <div className="absolute inset-0 rounded-full bg-indigo-500/30 animate-ping duration-1000" />

        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowPersonalInfo(true)}
          className="relative h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl hover:shadow-indigo-500/50 transition-shadow border-2 border-white/20 backdrop-blur-sm"
        >
          <Info className="h-8 w-8" />
        </motion.button>
      </div>


      {/* FOOTER / CONTACT SECTION */}
      <section id="contact" className="relative py-32 px-6 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-white">
              Let's Connect
            </h2>
            <p className="text-xl md:text-2xl text-indigo-200 max-w-2xl mx-auto">
              Have a project in mind? Let's build something amazing together.
            </p>
          </motion.div>

          {/* Contact Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {/* Email Card */}
            <a href={`mailto:${DATA.contact.email}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group p-8 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-indigo-400 transition-all duration-300 cursor-pointer"
              >
                <div className="mb-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Email Me</h3>
                <p className="text-indigo-200 text-sm break-all">{DATA.contact.email}</p>
              </motion.div>
            </a>

            {/* Phone Card */}
            <a href={`tel:${DATA.personalDetails.phone}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group p-8 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-purple-400 transition-all duration-300 cursor-pointer"
              >
                <div className="mb-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Call Me</h3>
                <p className="text-purple-200 text-sm">{DATA.personalDetails.phone}</p>
              </motion.div>
            </a>

            {/* Location Card */}
            <a href="https://maps.app.goo.gl/vtz8onhYBmQ9uBst6" target="_blank" rel="noopener noreferrer">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group p-8 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-pink-400 transition-all duration-300 cursor-pointer"
              >
                <div className="mb-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                <p className="text-pink-200 text-sm">{DATA.personalDetails.address}</p>
              </motion.div>
            </a>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-3xl mx-auto mb-20">
            <ContactForm />
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-4 mb-12"
          >
            {[
              { icon: Github, href: DATA.contact.github, label: 'GitHub', color: 'hover:bg-slate-700' },
              { icon: Linkedin, href: DATA.contact.linkedin, label: 'LinkedIn', color: 'hover:bg-blue-600' },
              { icon: HackerRankIcon, href: DATA.contact.hackerrank, label: 'HackerRank', color: 'hover:bg-green-600' },
              { icon: LeetCodeIcon, href: DATA.contact.leetcode, label: 'LeetCode', color: 'hover:bg-orange-600' },
            ].map((social, i) => (
              <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 ${social.color} transition-all duration-300 group`}
                >
                  <social.icon className="h-6 w-6 text-white" />
                </motion.div>
              </a>
            ))}
          </motion.div>

          {/* Footer Text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center pt-8 border-t border-white/10"
          >
            <p className="text-indigo-200 text-sm">
              © {new Date().getFullYear()} <span className="font-bold text-white">Srikanth</span>
            </p>
            <p className="text-indigo-300/60 text-xs mt-2">
              Crafted with ❤️ using Next.js & Tailwind CSS
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


