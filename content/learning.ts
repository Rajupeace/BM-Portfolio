/**
 * SKILLS & LEARNING TRACKER — the only file you need to edit to update the
 * "Skills & Learning" section of the site.
 *
 * ─── How to update ──────────────────────────────────────────────────────────
 * 1. Change a skill's status: set `status` to one of
 *      "completed"   -> shown in the "Completed" group
 *      "in-progress" -> shown in the "In progress" group
 *      "learning"    -> shown in the "Learning" group
 * 2. Add a skill: append an object to `learningSkills`. The order of this list is
 *    also the order of the "Learning path" strip.
 * 3. `note` (optional): one short line shown on the card, e.g. "Just started".
 * 4. `icon` (optional): one of the keys in `SkillIcon` below. Defaults to "code".
 * 5. `progress` (optional): ONLY set this to a real percentage (0–100) that you
 *    have measured yourself. A progress bar is shown only when it is set.
 * 6. `currentFocus`: what you are concentrating on right now. Set to "" to hide.
 * 7. `nextUp`: optional list of things you plan to learn next. Use [] to hide.
 * 8. `lastUpdated`: the date you last edited this file, written as "YYYY-MM-DD".
 *    It is shown on the site as e.g. "1 November 2026".
 * 9. `evidence` (optional): links to real work that shows the skill, e.g. a repo
 *    or a CI run: [{ label: "CI run", href: "https://github.com/..." }].
 * ────────────────────────────────────────────────────────────────────────────
 */

export type LearningStatus = "completed" | "in-progress" | "learning";

export type SkillIcon = "git" | "docker" | "devops" | "mlops" | "cloud" | "code";

export interface LearningSkill {
  name: string;
  status: LearningStatus;
  note?: string;
  icon?: SkillIcon;
  progress?: number;
  evidence?: { label: string; href: string }[];
}

export const learningSkills: LearningSkill[] = [
  {
    name: "Git & GitHub",
    status: "completed",
    icon: "git",
    evidence: [{ label: "GitHub profile", href: "https://github.com/Rajupeace" }],
  },
  {
    name: "Docker",
    status: "in-progress",
    note: "Just started",
    icon: "docker",
    evidence: [
      { label: "Docker build in CI", href: "https://github.com/Rajupeace/student-result-ml-ci/actions/runs/39920571729" },
      { label: "GHCR image", href: "https://github.com/Rajupeace/student-result-ml-ci/pkgs/container/student-result-prediction" },
    ],
  },
  {
    name: "DevOps",
    status: "learning",
    icon: "devops",
    evidence: [{ label: "CI/CD practicals", href: "https://github.com/Rajupeace/first-ci-demo" }],
  },
  {
    name: "MLOps",
    status: "learning",
    icon: "mlops",
    evidence: [{ label: "ML quality gate run", href: "https://github.com/Rajupeace/student-result-ml-ci/actions/runs/37278065796" }],
  },
];

export const currentFocus = "DevOps & MLOps";

export const nextUp: string[] = [];

export const lastUpdated = "2026-11-01";

export const statusLabels: Record<LearningStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  learning: "Learning",
};
