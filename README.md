# Tejaswini Verma — Portfolio

A single-page portfolio for Tejaswini Verma (MBA in Finance, Middlesex University Dubai; B.Tech Electrical Engineering). Emerald-and-gold dark theme, built with Next.js 14, Tailwind, framer-motion and three.js.

All text comes from `public/resume/Tejaswini-Verma-Resume.pdf`. Only email and location are published — no phone numbers.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Requires Node 18.17+.

## Structure

| Path | What it holds |
| --- | --- |
| `lib/content.ts` | Every piece of resume content (profile, projects, experience, education, skills, recognition). Edit here to change the site. |
| `components/hero.tsx` | Name reveal and the 3D DCF sensitivity surface (`surface-scene.tsx`, loaded lazily). |
| `components/work.tsx` | Project cards. On wide screens the section pins and scrolls sideways; each card opens a case-study dialog. |
| `components/visuals.tsx` | Illustrative SVG figures for each project — each is labelled as an illustration, not project output. |
| `components/sections.tsx` | Profile, Experience, Education, Skills, Recognition, Contact, Footer. |
| `scripts/check.mjs` | Browser checks (layout at three widths, no JS errors, no phone numbers, resume facts, dialog, menu, reduced motion). |

## Checks

```bash
npm run build && npm start &
node scripts/check.mjs http://localhost:3000   # needs the `playwright` package
```

## Deploy (Vercel)

Import the repository in Vercel — no environment variables are required. Optionally set `NEXT_PUBLIC_SITE_URL` to the final domain for correct social-preview URLs.

## Notes

- The hero surface is an illustrative Gordon-growth DCF sensitivity (WACC 7–13%, terminal growth 0–4%), not output from her models.
- `?scene-t=<seconds>` pins the hero animation to a moment (used for screenshots).
- Motion respects `prefers-reduced-motion`: the horizontal gallery becomes a normal list and the 3D scene renders a still frame.
