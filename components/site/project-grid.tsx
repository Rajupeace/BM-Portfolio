"use client";

import { useState } from "react";
import { projectCategories, type Project, type ProjectCategory } from "@/content/projects";
import { ProjectCard } from "./project-card";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category.includes(filter));
  const options: (ProjectCategory | "All")[] = ["All", ...projectCategories.filter((c) => projects.some((p) => p.category.includes(c)))];

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {options.map((o) => {
          const count = o === "All" ? projects.length : projects.filter((p) => p.category.includes(o)).length;
          const active = filter === o;
          return (
            <button
              key={o}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(o)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              {o} <span className="ml-1 text-xs opacity-60">{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
      </p>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <li key={p.slug} className="relative">
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
