import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Download,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/footer";
import { RevealObserver } from "@/components/site/reveal-observer";
import { ProjectGrid } from "@/components/site/project-grid";
import { StatusBadge } from "@/components/site/project-card";
import { Certificates } from "@/components/site/certificates";
import { PersonalDetails } from "@/components/site/personal-details";
import { ContactForm } from "@/components/site/contact-form";
import { SkillsLearningTracker } from "@/components/sections/skills-learning";
import { StartupSection } from "@/components/sections/startup-section";
import {
  achievements,
  certifications,
  education,
  experience,
  hobbies,
  personalDetails,
  profile,
  skillGroups,
} from "@/content/profile";
import { projects } from "@/content/projects";
import { devopsSteps, journeyRepo } from "@/content/devops-journey";
import { currentFocus } from "@/content/learning";
import { srivoratech } from "@/content/srivoratech";

const services = [
  { title: "Web applications", description: "Scalable, responsive web applications built with Next.js and React." },
  { title: "AI features", description: "AI assistants and LLM-powered features that answer questions and automate tasks." },
  { title: "Interface design", description: "Clean, accessible interfaces with purposeful motion and clear hierarchy." },
  { title: "Full stack delivery", description: "End-to-end delivery, from database schema and APIs to deployment." },
];

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const NewTab = () => <span className="sr-only"> (opens in a new tab)</span>;

function SectionHeader({ id, eyebrow, title, lead }: { id: string; eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={`${id}-heading`} className="section-title">
        {title}
      </h2>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  lead,
  tinted,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  tinted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`section ${tinted ? "border-y border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30" : ""}`}
    >
      <div className="container-page">
        <SectionHeader id={id} eyebrow={eyebrow} title={title} lead={lead} />
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="relative overflow-hidden pb-20 pt-32 sm:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]"
      />
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.35fr_1fr]">
        <div>
          {profile.availability && (
            <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              {profile.availability}
            </p>
          )}
          <p className="mt-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">{profile.titles.join("  |  ")}</p>
          <h1 id="hero-heading" className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08] dark:text-white">
            {profile.name}
          </h1>
          <p className="mt-4 text-xl font-medium leading-snug text-zinc-800 sm:text-2xl dark:text-zinc-200">{profile.headline}</p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">{profile.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={profile.resume} download className="btn-primary">
              <Download className="h-4 w-4" aria-hidden="true" /> Download resume
            </a>
            <a href="#work" className="btn-secondary">
              Explore projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap items-center gap-2" aria-label="Profiles">
            <li>
              <a href={profile.contact.github} {...ext} className="icon-btn h-10 w-10" aria-label="GitHub (opens in a new tab)">
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={profile.contact.linkedin} {...ext} className="icon-btn h-10 w-10" aria-label="LinkedIn (opens in a new tab)">
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.contact.email}`} className="icon-btn h-10 w-10" aria-label={`Email ${profile.contact.email}`}>
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <div className="mx-auto w-full max-w-sm lg:max-w-none">
          <div className="card overflow-hidden">
            <div className="relative aspect-[4/4] bg-zinc-100 dark:bg-zinc-900">
              <Image src={profile.photo} alt={`Portrait of ${profile.name}`} fill priority sizes="(min-width: 1024px) 400px, 384px" className="object-cover" />
            </div>
            <ul className="grid gap-3 p-5 text-sm">
              <li className="flex items-start gap-3">
                <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" aria-hidden="true" />
                <span>
                    Founder &amp; CEO,{" "}
                    <a href={srivoratech.url} {...ext} className="font-medium underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-600 dark:decoration-zinc-600">
                      SriVoraTech
                      <NewTab />
                    </a>
                  </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" aria-hidden="true" />
                <span>{profile.location}</span>
              </li>
              {currentFocus.trim() && (
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                  <span>
                    Now learning{" "}
                    <a href="#learning" className="font-medium underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-600 dark:decoration-zinc-600">
                      {currentFocus}
                    </a>
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const aiProjects = projects.filter((p) => p.category.includes("AI"));

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-zinc-900 focus:shadow">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />

        <Section id="about" eyebrow="About" title="Developer, founder, and still learning every day" tinted>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div className="reveal space-y-4 text-base leading-relaxed text-zinc-700 sm:text-lg dark:text-zinc-300">
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="reveal grid gap-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">What I do</h3>
                <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {services.map((s) => (
                    <li key={s.title} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
                      <p className="font-medium">{s.title}</p>
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{s.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">Beyond code</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {hobbies.map((h) => (
                    <li key={h} className="chip px-2.5 py-1 text-sm">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>

        <Section id="skills" eyebrow="Technical skills" title="Tools I build with" lead="Languages, frameworks and tools I've used in my projects.">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((g) => (
              <li key={g.title} className="reveal card p-5">
                <h3 className="font-semibold">{g.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {g.skills.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="work" eyebrow="Featured projects" title="Things I've built" lead="Each project has a case study with the problem, architecture, what works today and what is still planned." tinted>
          <ProjectGrid projects={projects} />
        </Section>

        <Section
          id="ai-lab"
          eyebrow="AI & research"
          title="AI & Research Lab"
          lead="My AI work, with an honest status for each one. Planned features are labelled as planned."
        >
          <ul className="grid gap-4">
            {aiProjects.map((p) => (
              <li key={p.slug} className="reveal card card-hover p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold">
                        <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0">
                          {p.title}
                        </Link>
                      </h3>
                      <StatusBadge status={p.status} />
                    </div>
                    <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">{p.tagline}</p>
                    {p.statusNote && <p className="mt-2 text-sm text-amber-800 dark:text-amber-300">{p.statusNote}</p>}
                  </div>
                  <ul className="flex flex-wrap gap-1.5 sm:max-w-xs sm:justify-end">
                    {p.tech.slice(0, 6).map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <StartupSection />

        <section id="learning" aria-labelledby="learning-heading" className="section">
          <div className="container-page">
            <SectionHeader id="learning" eyebrow="Skills & learning" title="What I've learned and what I'm learning now" lead="Completed skills, the ones I've started, and what I'm studying now." />
            <div className="mt-10">
              <SkillsLearningTracker />
            </div>
          </div>
        </section>

        <Section
          id="devops"
          eyebrow="DevOps & MLOps journey"
          title="From first CI pipeline to a deployed ML service"
          lead="Ten hands-on practicals. Each step links to the successful run or artifact on GitHub."
          tinted
        >
          <ol className="grid gap-3 md:grid-cols-2">
            {devopsSteps.map((s, i) => (
              <li key={s.title} className="reveal flex items-start gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/40">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-zinc-300 font-mono text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:text-zinc-300" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="font-medium">
                    <span className="sr-only">Practical {i + 1}: </span>
                    {s.title}
                  </p>
                  <a href={s.link} {...ext} className="btn-link mt-1">
                    {s.linkLabel} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    <NewTab />
                  </a>
                </div>
              </li>
            ))}
          </ol>
          <a href={journeyRepo} {...ext} className="btn-secondary mt-8">
            <Github className="h-4 w-4" aria-hidden="true" /> Practical index on GitHub
            <NewTab />
          </a>
        </Section>

        <Section id="career" eyebrow="Experience" title="Professional experience">
          <ol className="relative grid gap-6 border-l border-zinc-200 pl-6 dark:border-zinc-800">
            {experience.map((e) => (
              <li key={e.company} className="reveal relative">
                <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-brand-600 dark:border-[#0b0b0d] dark:bg-brand-400" aria-hidden="true" />
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{e.period}</p>
                <h3 className="mt-1 text-lg font-semibold">
                  {e.role} ·{" "}
                  {e.companyUrl ? (
                    <a href={e.companyUrl} {...ext} className="underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-600 dark:decoration-zinc-600">
                      {e.company}
                      <NewTab />
                    </a>
                  ) : (
                    e.company
                  )}
                </h3>
                <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">{e.description}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="education" eyebrow="Education" title="Education" tinted>
          <ul className="grid gap-4 md:grid-cols-3">
            {education.map((e) => (
              <li key={e.degree} className="reveal card flex flex-col p-5">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{e.period}</p>
                <h3 className="mt-2 font-semibold leading-snug">{e.degree}</h3>
                <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                  {e.link ? (
                    <a href={e.link} {...ext} className="underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-600 dark:decoration-zinc-600">
                      {e.institution}
                      <span className="sr-only"> (map, opens in a new tab)</span>
                    </a>
                  ) : (
                    e.institution
                  )}
                </p>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{e.details}</p>
                <p className="mt-auto pt-4">
                  <span className="chip">{e.grade}</span>
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="certifications" eyebrow="Certifications" title="Certifications" lead="Open any certificate to view the original PDF.">
          <Certificates items={certifications} />
        </Section>

        <Section id="achievements" eyebrow="Achievements" title="Achievements" tinted>
          <ul className="grid gap-4 md:grid-cols-3">
            {achievements.map((a) => (
              <li key={a.title} className="reveal card p-5">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{a.year}</p>
                <h3 className="mt-2 font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{a.description}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="profiles" eyebrow="GitHub & coding profiles" title="Find my code and practice">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "GitHub", handle: "Rajupeace", href: profile.contact.github, note: "Source code for my projects" },
              { name: "LinkedIn", handle: "srikanth-b", href: profile.contact.linkedin, note: "Professional profile" },
              { name: "LeetCode", handle: "Srikanthsathya", href: profile.contact.leetcode, note: "Problem-solving practice" },
              { name: "HackerRank", handle: "rajubhaibhai576", href: profile.contact.hackerrank, note: "Certificates and practice" },
            ].map((p) => (
              <li key={p.name} className="reveal">
                <a href={p.href} {...ext} className="card card-hover flex h-full flex-col p-5">
                  <span className="flex items-center justify-between font-semibold">
                    {p.name} <ArrowUpRight className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                  </span>
                  <span className="mt-1 font-mono text-sm text-zinc-600 dark:text-zinc-400">{p.handle}</span>
                  <span className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{p.note}</span>
                  <NewTab />
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="resume" eyebrow="Resume" title="Resume" tinted>
          <div className="reveal card flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-zinc-100 dark:bg-zinc-800" aria-hidden="true">
                <FileText className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
              </span>
              <div>
                <p className="font-semibold">Badisa Srikanth — Resume</p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">PDF · Education, projects, skills and certifications</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={profile.resume} {...ext} className="btn-secondary">
                View<span className="sr-only"> resume (PDF, opens in a new tab)</span>
              </a>
              <a href={profile.resume} download className="btn-primary">
                <Download className="h-4 w-4" aria-hidden="true" /> Download PDF
              </a>
            </div>
          </div>
        </Section>

        <Section id="contact" eyebrow="Contact" title="Let's work together" lead="Questions, internships, freelance work or SriVoraTech projects: send a message and I'll reply by email.">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div className="reveal grid content-start gap-4">
              <a href={`mailto:${profile.contact.email}`} className="card card-hover flex items-center gap-4 p-5">
                <Mail className="h-5 w-5 text-zinc-500" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-zinc-600 dark:text-zinc-400">Email</span>
                  <span className="block break-all font-medium">{profile.contact.email}</span>
                </span>
              </a>
              <a href={profile.contact.linkedin} {...ext} className="card card-hover flex items-center gap-4 p-5">
                <Linkedin className="h-5 w-5 text-zinc-500" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-zinc-600 dark:text-zinc-400">LinkedIn</span>
                  <span className="block font-medium">Badisa Srikanth</span>
                </span>
                <NewTab />
              </a>
              <div className="card flex items-center gap-4 p-5">
                <MapPin className="h-5 w-5 text-zinc-500" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-zinc-600 dark:text-zinc-400">Location</span>
                  <span className="block font-medium">{profile.location}</span>
                </span>
              </div>
              <div>
                <PersonalDetails details={personalDetails} />
              </div>
            </div>
            <div className="reveal">
              <ContactForm to={profile.contact.email} />
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
      <RevealObserver />
    </>
  );
}
