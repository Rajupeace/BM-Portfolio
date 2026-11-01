# BM-Portfolio

Personal portfolio of **Badisa Srikanth** — Full Stack Developer and Founder & CEO of [SriVoraTech](https://www.srivoratech.in/).

Live: https://bm-portfolio-xi.vercel.app

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
| Bio, projects, education, certifications, achievements, contact | `DATA` object at the top of `app/page.tsx` |
| Page title / SEO description | `app/layout.tsx` |
| Resume PDF | `public/Srikanthsathya_Resume.pdf` |

### Skills & Learning tracker

Edit `content/learning.ts`. Each skill has a `status`:

- `"completed"` → **Completed**
- `"in-progress"` → **In progress**
- `"learning"` → **Learning**

Progress bars only appear when you set `progress` to a real percentage (0–100).
Set `currentFocus` to `""` or `nextUp` to `[]` to hide those blocks.
