/**
 * AI & Research section. Fill a stage's `text` and set `status` once the work
 * is real. Never mark a paper "published" until it has actually been published.
 *
 * status: "done" -> written/completed, "in-progress" -> being worked on,
 *         "proposed" -> planned design only, "not-started" -> nothing yet.
 * `items` render as an architecture diagram, `points` as a plain list.
 */
export type ResearchStageStatus = "done" | "in-progress" | "proposed" | "not-started";

export interface ResearchStage {
  label: string;
  status: ResearchStageStatus;
  text?: string;
  items?: string[];
  points?: string[];
  references?: { title: string; authors: string; year: number; url: string }[];
}

export const research = {
  title: "RoadSense AI: Indian road damage detection with severity assessment and corrective RAG",
  projectSlug: "roadsense-ai",
  publicationStatus: "Not published",
  abstract:
    "A proposed system that detects potholes, cracks, waterlogging and damaged manholes on Indian roads from images, scores each finding for severity and risk, and uses a corrective retrieval-augmented generation (CRAG) layer to produce grounded maintenance explanations. This is a research proposal; no results are reported yet.",
  stages: [
    {
      label: "Introduction",
      status: "in-progress",
      text: "RoadSense AI studies whether road photos can be used to find and rank road damage on Indian roads, and whether a corrective RAG layer can explain each finding with grounded maintenance guidance.",
    },
    {
      label: "Motivation",
      status: "in-progress",
      text: "Potholes, waterlogged stretches and open or broken manholes put road users at risk. Faster detection and a clear repair priority could help authorities act on the most dangerous damage first.",
    },
    {
      label: "Problem statement",
      status: "done",
      text: "Road damage in India is reported slowly and repaired without a clear priority order, which leaves dangerous potholes, waterlogged stretches and open manholes unattended.",
    },
    {
      label: "Literature survey",
      status: "not-started",
      text: "The survey is not written yet. Starting references to review:",
      references: [
        { title: "Road Damage Detection Using Deep Neural Networks with Images Captured Through a Smartphone", authors: "Maeda et al.", year: 2018, url: "https://arxiv.org/abs/1801.09454" },
        { title: "RDD2022: A multi-national image dataset for automatic Road Damage Detection", authors: "Arya et al.", year: 2022, url: "https://arxiv.org/abs/2209.08538" },
        { title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", authors: "Lewis et al.", year: 2020, url: "https://arxiv.org/abs/2005.11401" },
        { title: "Corrective Retrieval Augmented Generation", authors: "Yan et al.", year: 2024, url: "https://arxiv.org/abs/2401.15884" },
      ],
    },
    { label: "Existing system limitations", status: "not-started" },
    { label: "Research gap", status: "not-started" },
    {
      label: "Research objectives",
      status: "proposed",
      points: [
        "Detect potholes, cracks, waterlogging and damaged manholes in road images",
        "Assign a severity and risk level to each detection",
        "Ground maintenance explanations with corrective RAG",
        "Produce a prioritised damage report",
      ],
    },
    {
      label: "Proposed Corrective RAG architecture",
      status: "proposed",
      items: [
        "Image input from road photos",
        "Damage detection: potholes, cracks, waterlogging, damaged manholes",
        "Severity and risk assessment for each detection",
        "Corrective RAG: retrieve guidance, check its relevance, re-retrieve when it is weak",
        "Prioritised damage report",
      ],
    },
    {
      label: "Dataset collection plan",
      status: "proposed",
      text: "Planned classes: potholes, cracks, waterlogging and damaged manholes. The data source, dataset size and per-class counts will be published once the dataset is collected.",
    },
    { label: "Research methodology", status: "not-started" },
    { label: "Model training methodology", status: "not-started" },
    { label: "Evaluation methodology", status: "not-started" },
    { label: "Results", status: "not-started", text: "No experiments have been run, so there are no results yet." },
    { label: "Limitations", status: "not-started" },
    { label: "Future work", status: "not-started" },
    {
      label: "Current research status",
      status: "in-progress",
      text: "Research proposal stage. The problem statement, objectives and proposed architecture are written and starting references are collected. No dataset has been collected and no experiments have been run, so results are pending.",
    },
  ] as ResearchStage[],
};
