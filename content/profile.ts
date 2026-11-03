/**
 * Profile content for the homepage. Edit text here; the page reads it.
 * Projects live in content/projects.ts, the learning tracker in
 * content/learning.ts and SriVoraTech details in content/srivoratech.ts.
 */
import { srivoratech } from "./srivoratech";

export const profile = {
  name: "Badisa Srikanth",
  alias: "Srikanth Badisa",
  titles: ["AI Engineer", "Full Stack Developer", "Founder & CEO at SriVoraTech"],
  headline: "Building Intelligent AI Systems & Scalable Full Stack Applications.",
  intro:
    "I'm a Computer Science engineer who builds full-stack web apps and AI-powered tools, and the Founder & CEO of SriVoraTech.",
  about: [
    "I'm a final-year B.Tech Computer Science student at Vignan University. I build full-stack web applications and AI-powered tools, from LLM assistants running on local models to role-based university platforms.",
    "I founded SriVoraTech in 2024 with my co-founders. It is an IT services startup in Hyderabad, where I lead product strategy, technology and business development.",
    "Right now I'm learning DevOps and MLOps: CI pipelines, Docker, container registries and deploying machine learning models.",
  ],
  photo: "/profile-circle.jpg",
  /** Shown in the hero. Set to "" to hide the availability badge. */
  availability: "Open to work",
  location: "Madhira, Telangana, India",
  resume: "/Badisa_Srikanth_Resume.pdf",
  contact: {
    email: "rajubhaibhai576@gmail.com",
    github: "https://github.com/Rajupeace",
    linkedin: "https://www.linkedin.com/in/srikanth-b-1b6b452a5/",
    hackerrank: "https://www.hackerrank.com/profile/rajubhaibhai576",
    leetcode: "https://leetcode.com/u/Srikanthsathya/",
  },
};

export const skillGroups: { title: string; skills: string[] }[] = [
  { title: "Languages", skills: ["Python", "Java", "JavaScript", "TypeScript", "SQL"] },
  { title: "Frontend", skills: ["React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "Framer Motion"] },
  { title: "Backend", skills: ["Node.js", "Express", "FastAPI", "NestJS", "Flask"] },
  { title: "AI & ML", skills: ["LangChain", "Ollama", "RAG", "scikit-learn"] },
  { title: "Databases", skills: ["MongoDB", "MySQL", "SQLite", "ChromaDB"] },
  { title: "DevOps & Tools", skills: ["Git", "GitHub Actions", "Docker", "GHCR", "Render", "Vercel", "Postman", "VS Code"] },
  { title: "Core Concepts", skills: ["Data Structures", "Algorithms", "System Design", "OOPs"] },
];

export const experience = [
  {
    company: "SriVoraTech",
    companyUrl: srivoratech.url,
    role: "Founder & CEO",
    period: "2024 – Present",
    description:
      "Leading product strategy, technology vision and business development for an IT services startup based in Hyderabad.",
  },
  {
    company: "Independent projects",
    role: "Student Developer",
    period: "2023 – Present",
    description:
      "Building full-stack and AI projects, including Vu UniVerse360, the VU AI Agent and the DevOps & MLOps practicals shown on this site.",
  },
];

export const education = [
  {
    degree: "B.Tech – Computer Science Engineering",
    institution: "Vignan University",
    period: "2023 – 2027",
    grade: "Percentage: 70% (aggregate)",
    details: "Final year · Vadlamudi, Andhra Pradesh. Coursework: data structures, algorithms, DBMS, OOP, operating systems, computer networks.",
    link: "https://maps.app.goo.gl/b9MyL5AGUDNi37d28",
  },
  {
    degree: "Intermediate (MPC)",
    institution: "Sri Chaitanya Jr College, Khammam",
    period: "2021 – 2023",
    grade: "Percentage: 85%",
    details: "Mathematics, Physics, Chemistry",
  },
  {
    degree: "High School (SSC)",
    institution: "St. Francis English Medium High School",
    period: "2021",
    grade: "GPA: 10/10",
    details: "Secondary School Certificate",
  },
];

export const certifications = [
  { name: "Basics of Data Structures and Algorithms", issuer: "Simplilearn", code: "8398194", date: "28th May 2025", file: "/certificates/data-structures-algorithms.pdf" },
  { name: "Introduction to Cloud Computing", issuer: "Simplilearn", code: "10081714", date: "10th April 2026", file: "/certificates/cloud-computing.pdf" },
  { name: "Power BI for Beginners", issuer: "Microsoft + Simplilearn", code: "10107424", date: "15th April 2026", file: "/certificates/power-bi.pdf" },
  { name: "Python for Beginners", issuer: "Simplilearn", code: "8408331", date: "30th May 2025", file: "/certificates/python-beginners.pdf" },
  { name: "Python (Basic)", issuer: "HackerRank", code: "7B476072F599", date: "30 May, 2025", file: "/certificates/python-hackerrank.pdf" },
  { name: "Problem Solving (Basic)", issuer: "HackerRank", code: "DB1C7CC20DC1", date: "06 Jun, 2025", file: "/certificates/problem-solving.pdf" },
];

export const achievements: { title: string; description: string; year?: string }[] = [
  { title: "250+ problems solved on LeetCode", description: "266 accepted problems (133 easy, 93 medium, 40 hard) on my public LeetCode profile, November 2026." },
  { title: "5-star Python badge on HackerRank", description: "Shown on my public HackerRank profile, along with HackerRank certificates in Python and Problem Solving." },
  { title: "Smart India Hackathon Finalist", description: "Selected for the grand finale for an innovative AI-based solution.", year: "2023" },
  { title: "Best Student Project", description: "Awarded for the 'Friendly-Notebook' project during college tech fest.", year: "2024" },
];

export const personalDetails = {
  name: "Badisa Srikanth",
  phone: "9182030946",
  email: "rajubhaibhai576@gmail.com",
  dob: "09 / 07 / 2004",
  address: "Madhira: Khammam / Ts",
  father: "Venkateshwarlu",
  mother: "Adi Laxmi",
};

export const hobbies = [
  "Playing badminton",
  "Reading books and short stories",
  "Learning new things and exploring technology",
  "Creating and designing websites",
  "Listening to music",
];
