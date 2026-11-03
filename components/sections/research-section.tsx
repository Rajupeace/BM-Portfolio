import Link from "next/link";
import { ArrowRight, FlaskConical } from "lucide-react";
import { research, type ResearchStageStatus } from "@/content/research";
import { ArchitectureDiagram } from "@/components/site/architecture-diagram";

const STAGE: Record<ResearchStageStatus, { label: string; className: string }> = {
  done: { label: "Written", className: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300" },
  "in-progress": { label: "In progress", className: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-300" },
  proposed: { label: "Proposed", className: "border-brand-200 bg-brand-50 text-brand-800 dark:border-brand-900 dark:bg-brand-950/50 dark:text-brand-300" },
  "not-started": { label: "Not written yet", className: "border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400" },
};

export function ResearchSection({ caseStudyLink = true }: { caseStudyLink?: boolean }) {
  return (
    <article className="reveal card p-5 sm:p-8" aria-labelledby="research-title">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand-700 dark:text-brand-300">
          <FlaskConical className="h-4 w-4" aria-hidden="true" /> Research
        </span>
        <span className="rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
          Publication status: {research.publicationStatus}
        </span>
      </div>
      <h3 id="research-title" className="mt-3 max-w-3xl text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
        {research.title}
      </h3>
      <div className="mt-4 max-w-3xl">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">Abstract</h4>
        <p className="mt-1 leading-relaxed text-zinc-700 dark:text-zinc-300">{research.abstract}</p>
      </div>
      <dl className="mt-8 grid gap-x-8 gap-y-5 border-t border-zinc-200 pt-6 md:grid-cols-2 dark:border-zinc-800">
        {research.stages.map((s) => (
          <div key={s.label} className="min-w-0">
            <dt className="flex flex-wrap items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
              {s.label}
              <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${STAGE[s.status].className}`}>{STAGE[s.status].label}</span>
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {s.text}
              {s.points && (
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {s.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              )}
              {s.items && (
                <div className="mt-2">
                  <ArchitectureDiagram steps={s.items} label={`${s.label} diagram`} />
                </div>
              )}
              {!s.text && !s.items && !s.points && "Will be added once this stage is written."}
            </dd>
          </div>
        ))}
      </dl>
      {caseStudyLink && (
        <Link href={`/projects/${research.projectSlug}`} className="btn-link mt-8">
          RoadSense AI case study <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </article>
  );
}
