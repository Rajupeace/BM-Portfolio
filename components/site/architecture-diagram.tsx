import { ArrowDown } from "lucide-react";

/** Vertical flow diagram of architecture steps; pure HTML/CSS so it stays crisp and themeable. */
export function ArchitectureDiagram({ steps, label, caption }: { steps: string[]; label: string; caption?: string }) {
  return (
    <figure className="not-prose">
      <ol aria-label={label} className="grid gap-0">
        {steps.map((s, i) => (
          <li key={s} className="grid justify-items-center">
            <div className="flex w-full items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-300"
              >
                {i + 1}
              </span>
              <span className="min-w-0">{s}</span>
            </div>
            {i < steps.length - 1 && <ArrowDown className="my-1 h-4 w-4 text-zinc-400 dark:text-zinc-600" aria-hidden="true" />}
          </li>
        ))}
      </ol>
      {caption && <figcaption className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">{caption}</figcaption>}
    </figure>
  );
}
