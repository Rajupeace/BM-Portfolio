import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CircleAlert, ExternalLink, Github } from "lucide-react";
import { getProject, projectSeo, projects, statusLabels } from "@/content/projects";
import { profile } from "@/content/profile";
import { SITE_URL } from "@/lib/site";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/footer";
import { StatusBadge } from "@/components/site/project-card";
import { ArchitectureDiagram } from "@/components/site/architecture-diagram";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const seo = projectSeo[project.slug] ?? { title: `${project.title} | Badisa Srikanth`, description: `${project.title}: ${project.tagline}` };
  const images = [{ url: project.image ?? "/og.png", alt: project.imageAlt ?? seo.title }];
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { type: "article", title: seo.title, description: seo.description, url: `/projects/${project.slug}`, siteName: "Badisa Srikanth", images },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: images.map((i) => i.url) },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-zinc-200 py-8 first:border-t-0 dark:border-zinc-800">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">{title}</h2>
      <div className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2">
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" aria-hidden="true" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const url = `${SITE_URL}/projects/${project.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/#work` },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
      {
        "@type": "CreativeWork",
        name: project.title,
        url,
        description: projectSeo[project.slug]?.description ?? project.tagline,
        creativeWorkStatus: statusLabels[project.status],
        keywords: project.tech.join(", "),
        author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: profile.name },
        ...(project.image ? { image: `${SITE_URL}${project.image}` } : {}),
        ...(project.github || project.live ? { sameAs: [project.github, project.live].filter(Boolean) } : {}),
      },
    ],
  };

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:shadow">
        Skip to content
      </a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main id="main" className="container-page pb-20 pt-28">
        <Link href="/#work" className="btn-link">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All projects
        </Link>

        <header className="mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={project.status} />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">{project.category.join(" · ")}</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">{project.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <ExternalLink className="h-4 w-4" aria-hidden="true" /> Live demo<span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Github className="h-4 w-4" aria-hidden="true" /> Source code<span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        </header>

        {project.statusNote && (
          <p className="mt-8 flex max-w-3xl gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {project.statusNote}
          </p>
        )}

        {project.image && (
          <div className="card relative mt-10 aspect-[16/9] overflow-hidden">
            <Image src={project.image} alt={project.imageAlt ?? ""} fill priority sizes="(min-width: 1152px) 1104px, 100vw" className="object-cover object-top" />
          </div>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
          <div>
            {project.related && getProject(project.related.slug) && (
              <Block title={`How it differs from ${getProject(project.related.slug)!.title}`}>
                {project.related.note}{" "}
                <Link href={`/projects/${project.related.slug}`} className="btn-link">
                  View {getProject(project.related.slug)!.title} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </Block>
            )}
            {project.problem && <Block title="Problem">{project.problem}</Block>}
            {project.solution && <Block title="Solution">{project.solution}</Block>}
            {project.architecture && (
              <Block title={project.status === "research" || project.status === "in-progress" ? "Architecture (planned design)" : "Architecture"}>
                <ArchitectureDiagram
                  steps={project.architecture}
                  label={`${project.title} architecture`}
                  caption={project.status === "research" || project.status === "in-progress" ? "Design only. Components are not verified as built." : undefined}
                />
              </Block>
            )}
            {project.contribution && <Block title="My contribution">{project.contribution}</Block>}
            {project.implemented ? (
              <Block title="Implemented">
                <List items={project.implemented} />
              </Block>
            ) : (
              (project.status === "research" || project.status === "in-progress") && (
                <Block title="Implemented">Nothing verified yet. Features move here once a public repository, demo or screenshots show them working.</Block>
              )
            )}
            {project.inProgress && (
              <Block title="In progress (not verified yet)">
                <List items={project.inProgress} />
              </Block>
            )}
            {project.planned && (
              <Block title={project.status === "research" ? "Proposed (not built yet)" : "Planned (not built yet)"}>
                <List items={project.planned} />
              </Block>
            )}
            {project.challenges && (
              <Block title="Challenges">
                <List items={project.challenges} />
              </Block>
            )}
            {project.results && (
              <Block title="Results">
                <List items={project.results} />
              </Block>
            )}
          </div>
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">Technologies</h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <nav aria-label="Related pages" className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-zinc-200 pt-8 text-sm dark:border-zinc-800">
          {project.category.includes("AI") && (
            <Link href="/#ai-lab" className="btn-link">
              AI & Research Lab
            </Link>
          )}
          {project.slug === "srivoratech" && (
            <Link href="/#startup" className="btn-link">
              SriVoraTech founder details
            </Link>
          )}
          <Link href="/#work" className="btn-link">
            All projects by {profile.name}
          </Link>
          <a href={profile.resume} className="btn-link">
            Resume (PDF)
          </a>
          <Link href="/#contact" className="btn-link">
            Contact me about {project.title}
          </Link>
        </nav>

        <nav aria-label="More projects" className="mt-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <Link href={`/projects/${next.slug}`} className="card card-hover flex items-center justify-between gap-4 p-5">
            <span>
              <span className="block text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-400">Next project</span>
              <span className="mt-1 block font-semibold">{next.title}</span>
            </span>
            <ArrowRight className="h-5 w-5 text-zinc-400" aria-hidden="true" />
          </Link>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
