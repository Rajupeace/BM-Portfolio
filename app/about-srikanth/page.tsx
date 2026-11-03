import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/footer";
import { StatusBadge } from "@/components/site/project-card";
import { education, profile, skillGroups } from "@/content/profile";
import { projects } from "@/content/projects";
import { srivoratech } from "@/content/srivoratech";
import { SITE_URL } from "@/lib/site";

const TITLE = "About Badisa Srikanth | AI Engineer & Full Stack Developer";
const DESCRIPTION =
  "Meet Badisa Srikanth, AI Engineer and Full Stack Developer, Founder of SriVoraTech. Explore his AI projects, software engineering work, research and technical expertise.";
const PATH = "/about-srikanth";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "profile", title: TITLE, description: DESCRIPTION, url: PATH, siteName: "Badisa Srikanth", images: [{ url: "/og.png", width: 1200, height: 630, alt: TITLE }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og.png"] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}${PATH}#page`,
      url: `${SITE_URL}${PATH}`,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "About Srikanth", item: `${SITE_URL}${PATH}` },
      ],
    },
  ],
};

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-zinc-200 py-10 dark:border-zinc-800">
      <h2 id={id} className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
        {title}
      </h2>
      <div className="mt-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">{children}</div>
    </section>
  );
}

export default function AboutSrikanth() {
  const ai = projects.filter((p) => p.slug === "careeros" || p.slug === "roadsense-ai");
  const fullStack = projects.filter((p) => p.category.includes("Full Stack") && !ai.includes(p));
  const profiles = [
    { label: "GitHub", href: profile.contact.github },
    { label: "LeetCode", href: profile.contact.leetcode },
    { label: "HackerRank", href: profile.contact.hackerrank },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-zinc-900 focus:shadow">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="container-page max-w-3xl pb-20 pt-28">
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-600 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-950 dark:hover:text-white">Home</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">About Srikanth</span>
        </nav>

        <header className="mt-6">
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{profile.titles.join("  |  ")}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">About Badisa Srikanth</h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            <p>
              Badisa Srikanth (also written Srikanth Badisa) is an AI Engineer and Full Stack Developer, and the Founder &amp; CEO of{" "}
              <a href={srivoratech.url} {...ext} className="btn-link">SriVoraTech</a>. He is in the final year of a B.Tech in Computer Science Engineering at Vignan University.
            </p>
            <p>
              His work sits where web engineering meets applied AI: role-based platforms built with React, Node.js and NestJS, and assistants and
              retrieval pipelines that run on local language models through Ollama and LangChain. He is currently learning DevOps and MLOps by shipping
              small, real pipelines with GitHub Actions, Docker and Render.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={profile.resume} download className="btn-primary">
              <Download className="h-4 w-4" aria-hidden="true" /> Download resume
            </a>
            <Link href="/#work" className="btn-secondary">
              See all projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </header>

        <div className="mt-12">
          <Block id="ai-work" title="AI projects and research">
            <ul className="grid gap-4">
              {ai.map((p) => (
                <li key={p.slug} className="card p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold">
                      <Link href={`/projects/${p.slug}`} className="hover:underline">{p.title}</Link>
                    </h3>
                    <StatusBadge status={p.status} />
                  </div>
                  <p className="mt-2">{p.tagline}</p>
                  {p.statusNote && <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{p.statusNote}</p>}
                  <Link href={`/projects/${p.slug}`} className="btn-link mt-3">
                    Read the {p.title} case study
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              The research plan, stages and publication status are tracked openly in the{" "}
              <Link href="/#ai-lab" className="btn-link">AI &amp; Research Lab</Link> section. Nothing is reported as published or evaluated until it is.
            </p>
          </Block>

          <Block id="full-stack" title="Full stack projects">
            <ul className="grid gap-3">
              {fullStack.map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}`} className="btn-link font-medium">{p.title}</Link>
                  <span className="text-zinc-600 dark:text-zinc-400"> · {p.tagline}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="srivoratech" title="Leading SriVoraTech">
            <p>{srivoratech.summary}</p>
            <p className="mt-3">
              Srikanth founded SriVoraTech in {srivoratech.founded} in {srivoratech.location}. {srivoratech.roleSummary.replace("As Founder & CEO, I lead", "As Founder & CEO, he leads")}
            </p>
            <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/projects/srivoratech" className="btn-link">SriVoraTech case study</Link>
              <Link href="/#startup" className="btn-link">SriVoraTech products</Link>
              <a href={srivoratech.founderPage} {...ext} className="btn-link">Founder page on srivoratech.in</a>
            </p>
          </Block>

          <Block id="skills" title="Technical skills">
            <dl className="grid gap-4 sm:grid-cols-2">
              {skillGroups.map((g) => (
                <div key={g.title}>
                  <dt className="text-sm font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">{g.title}</dt>
                  <dd className="mt-1">{g.skills.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block id="education" title="Education">
            <ul className="grid gap-4">
              {education.map((e) => (
                <li key={e.degree}>
                  <p className="font-semibold">{e.degree}</p>
                  <p>{e.institution} · {e.period}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{e.grade}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="contact" title="Profiles and contact">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {profiles.map((l) => (
                <li key={l.label}>
                  <a href={l.href} {...ext} className="btn-link">
                    {l.label}<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              <a href={`mailto:${profile.contact.email}`} className="btn-link">
                <Mail className="h-4 w-4" aria-hidden="true" /> {profile.contact.email}
              </a>
              <Link href="/#contact" className="btn-link">Send a message</Link>
            </p>
          </Block>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
