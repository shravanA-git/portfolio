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

- **App Router** under `app/`. Currently only the default `create-next-app` scaffold: `app/layout.tsx` (root layout), `app/page.tsx` (home page), `app/globals.css`.
- `app/layout.tsx` loads `Geist`/`Geist_Mono` via `next/font/google` and exposes them as CSS variables (`--font-geist-sans`, `--font-geist-mono`) consumed by `globals.css`.
- `app/globals.css` is the Tailwind v4 entry point (`@import "tailwindcss"`). Theme tokens (`--color-background`, `--color-foreground`, font vars) are defined via `@theme inline`, with dark-mode overrides under `prefers-color-scheme`. Tailwind v4 is config-less/CSS-first — there is no `tailwind.config.*`.
- Path alias `@/*` resolves to the repo root (`tsconfig.json`).
- `next.config.ts` is currently empty — add Next 16 options here (`turbopack`, `cacheComponents`, `images.remotePatterns`, etc.) as needed.

## Animation/3D stack

The following are installed (in `package.json`) for building out an animated portfolio, but not yet wired into any pages:

- **GSAP** + `@gsap/react` (`useGSAP` hook) — timeline/scroll-driven animation.
- **Framer Motion** — component-level animation/transitions.
- **three** + **@react-three/fiber** + **@react-three/drei** — 3D scenes.
- **lenis** — smooth scrolling.

Any code using these (GSAP timelines, R3F canvases, Framer Motion components, Lenis) touches the DOM/browser APIs and must be in a Client Component (`"use client"`).
