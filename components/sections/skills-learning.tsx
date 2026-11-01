"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed, BookOpen, Target, ListTodo, CalendarDays } from "lucide-react";
import {
  learningSkills,
  currentFocus,
  nextUp,
  lastUpdated,
  statusLabels,
  type LearningStatus,
} from "@/content/learning";

const STATUS_STYLES: Record<LearningStatus, { icon: typeof CheckCircle2; badge: string; accent: string }> = {
  completed: {
    icon: CheckCircle2,
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30",
    accent: "bg-emerald-500",
  },
  "in-progress": {
    icon: CircleDashed,
    badge: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30",
    accent: "bg-amber-500",
  },
  learning: {
    icon: BookOpen,
    badge: "bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/30",
    accent: "bg-sky-500",
  },
};

const GROUPS: { status: LearningStatus; heading: string }[] = [
  { status: "completed", heading: "Completed" },
  { status: "in-progress", heading: "In progress" },
  { status: "learning", heading: "Currently learning" },
];

export function SkillsLearningTracker() {
  const hasFocus = currentFocus.trim().length > 0;
  const hasNext = nextUp.length > 0;

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          A snapshot of what I’ve completed and what I’m learning now.
        </p>
        <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
          Updated {lastUpdated}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {GROUPS.map(({ status, heading }, gi) => {
          const items = learningSkills.filter((s) => s.status === status);
          const style = STATUS_STYLES[status];
          const Icon = style.icon;
          return (
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: gi * 0.08 }}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6"
            >
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                <span className={`h-2 w-2 rounded-full ${style.accent}`} aria-hidden="true" />
                {heading}
                <span className="ml-auto text-xs font-medium normal-case tracking-normal text-slate-500 dark:text-slate-400">
                  {items.length} {items.length === 1 ? "skill" : "skills"}
                </span>
              </h3>
              <ul className="mt-5 space-y-3">
                {items.length === 0 && (
                  <li className="text-sm text-slate-500 dark:text-slate-400">Nothing here yet.</li>
                )}
                {items.map((skill) => (
                  <li
                    key={skill.name}
                    className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 px-4 py-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{skill.name}</span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${style.badge}`}
                      >
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        {statusLabels[skill.status]}
                      </span>
                    </div>
                    {skill.note && (
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{skill.note}</p>
                    )}
                    {typeof skill.progress === "number" && (
                      <div className="mt-3">
                        <div
                          className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
                          role="progressbar"
                          aria-label={`${skill.name} progress`}
                          aria-valuenow={skill.progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <div className={`h-full ${style.accent}`} style={{ width: `${Math.min(100, Math.max(0, skill.progress))}%` }} />
                        </div>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{skill.progress}%</p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {(hasFocus || hasNext) && (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {hasFocus && (
            <div className="flex items-start gap-4 rounded-2xl border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/60 dark:bg-indigo-500/5 p-6">
              <Target className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">Current focus</h3>
                <p className="mt-1 text-slate-800 dark:text-slate-200">{currentFocus}</p>
              </div>
            </div>
          )}
          {hasNext && (
            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6">
              <ListTodo className="mt-0.5 h-5 w-5 shrink-0 text-slate-600 dark:text-slate-300" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">Next up</h3>
                <ul className="mt-1 flex flex-wrap gap-2">
                  {nextUp.map((item) => (
                    <li key={item} className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1 text-sm text-slate-700 dark:text-slate-200">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
