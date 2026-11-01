/**
 * SKILLS & LEARNING TRACKER — edit this file to update the "Skills & Learning" section.
 *
 * How to update:
 * 1. Change a skill's `status` to one of:
 *      "completed"   -> shown as "Completed"
 *      "in-progress" -> shown as "In progress"
 *      "learning"    -> shown as "Learning"
 * 2. Add a new skill by appending an object to `learningSkills`.
 * 3. `note` is optional short text shown under the skill name.
 * 4. `progress` is optional. Only set it to a real percentage (0–100) that you have
 *    measured yourself; a progress bar is rendered ONLY when `progress` is set.
 * 5. `currentFocus` and `nextUp` are optional. Set `currentFocus` to "" and/or
 *    `nextUp` to [] to hide that block.
 */

export type LearningStatus = "completed" | "in-progress" | "learning";

export interface LearningSkill {
  name: string;
  status: LearningStatus;
  note?: string;
  progress?: number;
}

export const learningSkills: LearningSkill[] = [
  { name: "Git & GitHub", status: "completed" },
  { name: "Docker", status: "in-progress", note: "Just started" },
  { name: "DevOps", status: "learning" },
  { name: "MLOps", status: "learning" },
];

export const currentFocus = "DevOps & MLOps";

export const lastUpdated = "November 2026";

export const nextUp: string[] = [];

export const statusLabels: Record<LearningStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  learning: "Learning",
};
