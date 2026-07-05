# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Next.js 16 — verify before writing App Router code

This repo pins **Next.js 16.2.9** with **React 19.2**, which has several breaking changes versus the Next.js 15-era APIs in training data. Before touching routing, caching, images, or middleware, check `node_modules/next/dist/docs/01-app/` (especially `02-guides/upgrading/version-16.md`). Notable changes that apply here:

- `params` and `searchParams` (in pages, layouts, route handlers, metadata image routes) are **always async** — synchronous access has been fully removed. Always `await` them.
- `middleware.ts`/`middleware()` is deprecated in favor of `proxy.ts`/`export function proxy()`. The `proxy` runtime is Node.js only (no `edge` runtime).
- Turbopack is the default bundler for both `next dev` and `next build` — no `--turbopack` flag needed.
- `next lint` has been removed; linting is via the ESLint CLI directly (`npm run lint`, flat config in `eslint.config.mjs`).
- `"use cache"` and related cache APIs (`cacheLife`, `cacheTag`, `updateTag`) require `cacheComponents: true` in `next.config.ts`; the old `experimental.dynamicIO`/`experimental.useCache`/PPR flags are removed. `revalidateTag` now requires a second `cacheLife` profile argument.
- All parallel-route slots (`@slot`) require an explicit `default.js`/`default.tsx`, or the build fails.

## Commands

- `npm run dev` — start the dev server (Turbopack; outputs to `.next/dev`)
- `npm run build` — production build (Turbopack by default)
- `npm run start` — run the production build (run `build` first)
- `npm run lint` — ESLint via flat config (`eslint.config.mjs`, extends `eslint-config-next` core-web-vitals + typescript)

No test suite is configured yet.

## Architecture

This is a **single-page portfolio** (`/`) — all content lives in anchored
`<section>`s, nav links scroll to anchors rather than routing. See
`notes/architecture.md` for the full component hierarchy, URL plan, and
semantic HTML/JSON-LD plan, and `design-system.md` for the visual language
(colors, type scale, spacing tokens).

- **App Router** under `app/`: `app/layout.tsx` (root layout — fonts, metadata,
  JSON-LD, mounts the persistent `<SiteScene>` background plus
  `SmoothScrollProvider`/`CustomCursor`/`Nav`/`Footer`), `app/page.tsx` (assembles
  all sections), `app/globals.css`, plus `not-found.tsx`, `sitemap.ts`, `robots.ts`,
  `icon.tsx`/`apple-icon.tsx`, `opengraph-image.tsx`.
- `app/layout.tsx` loads `Geist`/`Geist_Mono`/`Syne` via `next/font/google`
  and exposes them as CSS variables consumed by `globals.css`.
- `app/globals.css` is the Tailwind v4 entry point (`@import "tailwindcss"`). Theme
  tokens (`--color-background`, `--color-accent`, spacing, type scale, easing/duration)
  are defined via `@theme inline` — see `design-system.md`. Tailwind v4 is
  config-less/CSS-first — there is no `tailwind.config.*`. Custom utilities (e.g.
  `container-page`, `section-padding`, `no-scrollbar`) are defined with `@utility`,
  which supports CSS nesting (`&::-webkit-scrollbar`).
- `components/sections/` holds one component per page section (Hero,
  CategoryCarousel, About, Projects, Awards, Skills, Leadership, Contact) plus
  sub-components (ProjectCard, StatCallout, AwardItem, SkillChip, LeadershipItem).
  `components/scene/SiteScene.tsx` is the persistent R3F background.
  `components/providers/` has `SmoothScrollProvider` (Lenis) and `CustomCursor`.
- `lib/content.ts` is the single source of truth for all copy/data — `PERSON`,
  `NAV_LINKS`, `PROJECTS`, `AWARDS`, `SKILL_GROUPS`, `LEADERSHIP`, `CONTACT_LINKS`,
  `EXPLORE_CARDS` (homepage carousel cards, mirrors `NAV_LINKS`). Edit this file to
  change site content; `lib/schema.ts` builds JSON-LD from the same data.
- Path alias `@/*` resolves to the repo root (`tsconfig.json`).
- `next.config.ts` sets `turbopack.root` only — add other Next 16 options here
  (`cacheComponents`, `images.remotePatterns`, etc.) as needed.

## Animation/3D stack

These are installed **and wired in**:

- **GSAP** + `@gsap/react` (`useGSAP` hook) + `ScrollTrigger` — used in
  `Hero.tsx` (name-reveal animation) and `Projects.tsx` (scroll-triggered
  fade-ins). Both have `prefers-reduced-motion` branches.
- **three** + **@react-three/fiber** + **@react-three/drei** — `components/scene/SiteScene.tsx`
  renders a full-viewport particle "spine" as a fixed background behind all
  content (mounted once in `app/layout.tsx`).
- **lenis** — smooth scrolling via `SmoothScrollProvider`, synced to the GSAP
  ticker. Because of the scroll lag this introduces, `window.scrollY` and
  `scrollTo` calls may not reflect the final position immediately.

**Framer Motion** is installed but currently unused — prefer GSAP for new
scroll-driven animation to stay consistent with the existing code.

Any code using these (GSAP timelines, R3F canvases, Lenis) touches the
DOM/browser APIs and must be in a Client Component (`"use client"`).

## Reduced motion

`globals.css` has a global `@media (prefers-reduced-motion: reduce)` override
that disables animations/transitions and forces `scroll-behavior: auto`. GSAP
components additionally check
`window.matchMedia("(prefers-reduced-motion: reduce)").matches` and skip their
JS-driven animations when true.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
