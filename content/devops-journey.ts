/**
 * DevOps & MLOps practicals 1–10, copied from the first-ci-demo README.
 * Each item links to the successful run or file that proves it.
 */
export const journeyRepo = "https://github.com/Rajupeace/first-ci-demo";

const ml = "https://github.com/Rajupeace/student-result-ml-ci";

export const devopsSteps: { title: string; link: string; linkLabel: string }[] = [
  { title: "First CI pipeline with GitHub Actions", link: `${journeyRepo}/actions/runs/37212177466`, linkLabel: "Successful run" },
  { title: "Student result prediction ML and CI", link: `${ml}/actions`, linkLabel: "Actions runs" },
  { title: "ML quality gate", link: `${ml}/actions/runs/37278065796`, linkLabel: "Successful run" },
  { title: "Preserve ML artifacts", link: `${ml}/actions/runs/37278720124`, linkLabel: "Run and artifact" },
  { title: "Prediction API and release artifact", link: `${ml}/actions/runs/39911031603`, linkLabel: "Run and artifacts" },
  { title: "Docker image and CI release package", link: `${ml}/actions/runs/39920571729`, linkLabel: "Successful run" },
  { title: "Docker health check failure and recovery", link: `${ml}/actions/runs/40620801646`, linkLabel: "Final successful run" },
  { title: "Publish GHCR image tags (latest, v1, commit SHA)", link: `${ml}/pkgs/container/student-result-prediction`, linkLabel: "Container package" },
  { title: "Automate GHCR publishing with GitHub Actions", link: `${ml}/actions/runs/40621078962`, linkLabel: "Publish run" },
  { title: "Deploy the GHCR image to Render", link: "https://student-result-prediction-hh09.onrender.com/health", linkLabel: "Health check" },
];
