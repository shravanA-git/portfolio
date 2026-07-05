# Shravan Anand — Personal Portfolio

**Live site: https://portfolio-hazel-sigma-58.vercel.app**

## What is this?

My personal portfolio — a single-page site with smooth-scrolling sections for projects, awards,
skills, and leadership, rendered over an animated 3D particle background. Everything respects
`prefers-reduced-motion` for visitors who disable animations.

Featured projects (each with its own repo and live deployment):

| Project | What it does | Links |
| --- | --- | --- |
| **Argus** | Multi-agent RAG platform that answers questions about your documents with citations, then grades its own answers with RAGAS metrics | [repo](https://github.com/shravanA-git/argus) · [live](https://argus-five-tau.vercel.app) |
| **MacroScope** | ML dashboard that detects which phase of the economic cycle we're in and forecasts transitions | [repo](https://github.com/shravanA-git/macroscope) · [live](https://macroscope-red.vercel.app) |
| **EarningsEdge** | Scores the tone of corporate earnings calls with FinBERT, adjusted for the macro climate | [repo](https://github.com/shravanA-git/earningsedge) · [live](https://frontend-vert-nu-e3dizlrvd1.vercel.app) |

## Run it locally

You'll need [Node.js](https://nodejs.org) (LTS version) and [Git](https://git-scm.com) installed.
Then, in a terminal:

```bash
git clone https://github.com/shravanA-git/portfolio.git
cd portfolio
npm install
npm run dev
```

Open http://localhost:3000. No API keys or configuration needed.

**Want to adapt it for yourself?** All copy and data — name, projects, awards, links — live in
one file: `lib/content.ts`. Edit that file and the whole site updates; you never have to touch
the components.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + TypeScript
- **Tailwind v4** (CSS-first config) with a documented design system (`design-system.md`)
- **GSAP + ScrollTrigger** for scroll-driven animation, **three.js / React Three Fiber** for the
  particle background, **Lenis** for smooth scrolling
- JSON-LD structured data, sitemap, and OpenGraph images generated from the same content file
- Deployed on Vercel

## Structure

```
portfolio/
├── app/               # layout (fonts, metadata, JSON-LD, 3D scene) + single page
├── components/
│   ├── sections/      # Hero, About, Projects, Awards, Skills, Leadership, Contact
│   ├── scene/         # persistent R3F particle background
│   └── providers/     # smooth scroll, custom cursor
├── lib/content.ts     # ← all site content lives here
├── lib/schema.ts      # JSON-LD built from the same content
└── design-system.md   # colors, type scale, spacing rules
```
