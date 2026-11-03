/**
 * AI & Research section. Fill a stage's `text` and set `status` once the work
 * is real. Never mark a paper "published" until it has actually been published.
 *
 * status: "done" -> written/completed, "in-progress" -> being worked on,
 *         "proposed" -> planned design only, "not-started" -> nothing yet.
 */
export type ResearchStageStatus = "done" | "in-progress" | "proposed" | "not-started";

export interface ResearchStage {
  label: string;
  status: ResearchStageStatus;
  text?: string;
  items?: string[];
}

export const research = {
  title: "RoadSense AI: Indian road damage detection with severity assessment and corrective RAG",
  projectSlug: "roadsense-ai",
  publicationStatus: "Not published",
  abstract:
    "A proposed system that detects potholes, cracks, waterlogging and damaged manholes on Indian roads from images, scores each finding for severity and risk, and uses a corrective retrieval-augmented generation (CRAG) layer to produce grounded maintenance explanations. This is a research proposal; no results are reported yet.",
  stages: [
    {
      label: "Problem statement",
      status: "done",
      text: "Road damage in India is reported slowly and repaired without a clear priority order, which leaves dangerous potholes, waterlogged stretches and open manholes unattended.",
    },
    { label: "Literature survey", status: "not-started" },
    { label: "Research gap", status: "not-started" },
    {
      label: "Proposed architecture",
      status: "proposed",
      items: [
        "Image input from road photos",
        "Damage detection: potholes, cracks, waterlogging, damaged manholes",
        "Severity and risk assessment for each detection",
        "Corrective RAG: retrieve guidance, check its relevance, re-retrieve when it is weak",
        "Prioritised damage report",
      ],
    },
    { label: "Methodology", status: "not-started" },
    { label: "Dataset", status: "not-started" },
    { label: "Experiments", status: "not-started" },
    { label: "Evaluation results", status: "not-started" },
  ] as ResearchStage[],
};
