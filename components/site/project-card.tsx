import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { statusLabels, type Project } from "@/content/projects";

export const STATUS_STYLES: Record<Project["status"], string> = {
  live: "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300",
  source: "border-zinc-300 bg-zinc-100 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  "in-progress": "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300",
  research: "border-violet-300 bg-violet-50 text-violet-800 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300",
};

export function StatusBadge({ status }: { status: Project["status"] }) {
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}>{statusLabels[status]}</span>;
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.imageAlt ?? ""}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Screenshot not published yet</p>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} />
          <span className="text-xs text-zinc-600 dark:text-zinc-400">{project.category.join(" · ")}</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold tracking-tight">
          <Link href={`/projects/${project.slug}`} className="rounded-sm after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-brand-500">
            {project.title}
          </Link>
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{project.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tech.slice(0, 5).map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
          {project.tech.length > 5 && <li className="chip">+{project.tech.length - 5}</li>}
        </ul>
        <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 text-sm">
          <Link href={`/projects/${project.slug}`} className="btn-link">
            Case study <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">: {project.title}</span>
          </Link>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">
              <Github className="h-3.5 w-3.5" aria-hidden="true" /> Source<span className="sr-only"> for {project.title} (opens in a new tab)</span>
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /> Live<span className="sr-only"> {project.title} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
