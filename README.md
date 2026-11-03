# BM-Portfolio

Personal portfolio of **Badisa Srikanth** — Full Stack Developer and Founder & CEO of [SriVoraTech](https://www.srivoratech.in/).

Live: https://srikanth.portfolio.srivoratech.in (also served at https://bm-portfolio-xi.vercel.app)

## Run locally

```bash
npm install --legacy-peer-deps   # react-day-picker has a peer-dep conflict with React 19
npm run dev                      # http://localhost:3000
npm run build
```

## Updating content

| What | Where |
| --- | --- |
| Skills & Learning tracker (statuses, current focus, next up) | `content/learning.ts` |
| SriVoraTech details and products | `content/srivoratech.ts` |
| Projects and case-study pages (`/projects/[slug]`) | `content/projects.ts` |
| Bio, hero text, availability, skills, experience, education, certifications, achievements, contact | `content/profile.ts` |
| DevOps & MLOps journey steps | `content/devops-journey.ts` |
| Page title / SEO description | `app/layout.tsx` |
| Site URL (canonical, Open Graph, sitemap, robots) | `lib/site.ts` |
| Resume PDF | `public/Srikanthsathya_Resume.pdf` |

### Skills & Learning tracker

Edit `content/learning.ts` — it is the only file you need to touch.

- **Status:** set each skill's `status` to `"completed"`, `"in-progress"` or `"learning"`. The skill moves to the matching group (Completed / In progress / Learning) and the learning path automatically.
- **Add a skill:** append `{ name: "Kubernetes", status: "learning", icon: "cloud" }` to `learningSkills`. List order = learning-path order.
- **Note:** optional `note` adds one short line under the skill (e.g. `"Just started"`).
- **Icon:** optional `icon` — `git`, `docker`, `devops`, `mlops`, `cloud` or `code`.
- **Progress bar:** only shown if you set `progress` to a real percentage (0–100). Leave it out otherwise.
- **Current focus:** `currentFocus` (set to `""` to hide). It also appears in the hero card.
- **Next up:** `nextUp` list (use `[]` to hide).
- **Last updated:** `lastUpdated` as `"YYYY-MM-DD"`; shown as e.g. "1 November 2026".
