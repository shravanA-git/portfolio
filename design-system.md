# Design System — Shravan Anand Portfolio

Aesthetic direction: **dark, cinematic, engineered**. Reference: activetheory.net —
full-bleed WebGL backgrounds, oversized type, minimal chrome, scroll-driven reveals,
technical/mono annotations (coordinates, indices, stats) treated as design elements.

This is a single committed aesthetic (no light mode toggle) — the dark theme IS the brand.

---

## 1. Color Palette

Three-layer tokens: primitive → semantic → component (see `app/globals.css` for the
`@theme inline` implementation).

### Primitives
| Token | Value | Notes |
|---|---|---|
| `--color-black-950` | `#0a0a0a` | Base canvas |
| `--color-black-900` | `#121317` | Elevated surfaces (cards, nav) |
| `--color-black-800` | `#1c1e24` | Borders/dividers (solid fallback) |
| `--color-white-50` | `#f4f6f9` | Ice white — primary text |
| `--color-white-200` | `#c7ccd6` | Secondary text |
| `--color-grey-400` | `#8b93a3` | Muted/tertiary text |
| `--color-blue-500` | `#4d8dff` | Electric blue — primary accent |
| `--color-blue-300` | `#85b4ff` | Light blue — accent on small text/links |
| `--color-blue-700` | `#1f4fb8` | Deep blue — gradients, glows, pressed state |

### Semantic
| Token | Value |
|---|---|
| `--color-background` | `var(--color-black-950)` |
| `--color-surface` | `var(--color-black-900)` |
| `--color-foreground` | `var(--color-white-50)` |
| `--color-foreground-muted` | `var(--color-grey-400)` |
| `--color-accent` | `var(--color-blue-500)` |
| `--color-accent-on-text` | `var(--color-blue-300)` (meets 4.5:1 on `--color-background` for body-size links) |
| `--color-border` | `rgba(244, 246, 249, 0.08)` |
| `--color-border-strong` | `rgba(244, 246, 249, 0.16)` |
| `--color-glow` | `rgba(77, 141, 255, 0.35)` |

Contrast check: `--color-foreground` on `--color-background` ≈ 18:1 (AAA). `--color-accent-on-text`
on `--color-background` ≈ 5.2:1 (AA for normal text). `--color-accent` reserved for large
text (≥24px), icons, borders, focus rings, and underlined links.

Color is never the sole signal — interactive elements also use underline, weight, or icon changes.

---

## 2. Typography

| Role | Font | Source | Usage |
|---|---|---|---|
| Display | **Space Grotesk** | `next/font/google` | Hero name, section titles, nav wordmark |
| Body | **Geist Sans** | already wired in `app/layout.tsx` | Paragraphs, nav links, UI text |
| Mono | **Geist Mono** | already wired in `app/layout.tsx` | Stats, tags, section indices, coordinates, dates |

Geist pairs cleanly with Space Grotesk's geometric forms without converging on
Inter — keeps the "engineered" feel and reuses fonts already in the scaffold.

### Type scale (mobile-first, `clamp()` for fluid desktop scaling)
| Token | Value | Use |
|---|---|---|
| `--text-display-xl` | `clamp(3rem, 13vw, 9rem)` | Hero name |
| `--text-display-lg` | `clamp(2.25rem, 6vw, 4.5rem)` | Section titles (H2) |
| `--text-display-md` | `clamp(1.5rem, 3vw, 2.25rem)` | Card titles (H3) |
| `--text-body-lg` | `1.125rem` | Lead paragraphs |
| `--text-body` | `1rem` | Body copy |
| `--text-label` | `0.8125rem` | Mono labels — uppercase, `letter-spacing: 0.08em` |

Line height: 1.1 for display sizes, 1.6 for body. Body line length capped at `65ch`.

---

## 3. Spacing

8px base scale (also used for the 4/8pt touch-spacing rules):
`--space-1: 4px`, `--space-2: 8px`, `--space-3: 12px`, `--space-4: 16px`,
`--space-6: 24px`, `--space-8: 32px`, `--space-12: 48px`, `--space-16: 64px`,
`--space-24: 96px`, `--space-32: 128px`.

Section vertical rhythm: `--space-section: clamp(6rem, 12vw, 12rem)` (96–192px).
Content max-width: `--container-max: 1280px`, with `--container-pad: clamp(1.5rem, 5vw, 3rem)`
horizontal gutters.

---

## 4. Animation Language

- **Smooth scroll**: Lenis wraps the page; GSAP's ticker is synced to Lenis's `scroll` event.
- **Page intro**: one orchestrated GSAP timeline on load — hero name reveals via
  staggered `clip-path` line-mask (40–60ms stagger per word), subtitle fades up after,
  nav fades in last, scroll-cue pulses in. This is the single "big moment" rather than
  scattered micro-animations (per frontend-design guidance).
- **Scroll reveals**: ScrollTrigger-driven fade + 24px translate-Y + clip-path reveal
  for section headings and content blocks, triggered at `top 80%`.
- **3D hero background**: R3F scene (particle field / fluid-style GLSL shader) with
  camera/uniform parameters subtly driven by scroll progress (parallax), capped at
  a small magnitude.
- **Custom cursor**: a small ring (8px dot, 32px ring) that lerps toward the pointer
  via `requestAnimationFrame`; scales to ~64px and shows a label (`VIEW`, `→`) over
  interactive project cards using `mix-blend-mode: difference`. Hidden entirely on
  `(pointer: coarse)` (touch) and under `prefers-reduced-motion`.
- **Timing tokens**:
  - `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)` — entrances
  - `--ease-in-out-circ: cubic-bezier(0.85, 0, 0.15, 1)` — section transitions
  - `--duration-fast: 200ms` — hover/micro-interactions
  - `--duration-base: 500ms` — content reveals
  - `--duration-slow: 1000ms` — hero intro, section transitions
- **Reduced motion**: `prefers-reduced-motion: reduce` disables Lenis smoothing,
  cursor trail, parallax, and the hero intro timeline — content renders in its
  final state immediately with at most a 150ms opacity fade.

---

## 5. Component Patterns

- **Nav** — fixed top, `backdrop-blur` over `--color-background` at 70% opacity,
  Space Grotesk wordmark left, mono section links right, active section gets an
  accent underline (driven by ScrollTrigger/IntersectionObserver).
- **Hero** — full-viewport (`min-h-dvh`), R3F canvas background (`aria-hidden`,
  decorative), centered name in `--text-display-xl`, subtitle below in mono,
  scroll-cue at bottom.
- **SectionHeading** — mono index (`01`, `02`, …) in accent color + display-font
  title (H2) + optional one-line kicker.
- **ProjectCard** — large bordered panel; header row (title + tag pills in mono);
  body copy; stat row (`StatCallout` repeated); footer link row
  (`View Publication →`, `Read on Medium →`) using `--color-accent-on-text`.
- **StatCallout** — big mono numeral (`--text-display-md`) + small uppercase label
  underneath (e.g. `R² 0.989` / `MODEL ACCURACY`).
- **AwardItem / LeadershipItem** — row layout: title + org (display/body) on the
  left, descriptor on the right/below, hairline `--color-border` divider between rows.
- **SkillChip** — mono pill, `--color-surface` bg, `--color-border` outline,
  accent border + glow on hover/focus.
- **ContactLink** — large (`--text-display-md`) link row with icon; underline +
  accent on hover/focus.
- **Footer** — minimal: copyright, back-to-top link.
- **Empty/placeholder states** — for any project visual we can't source from the
  repos, use a generated SVG/Three.js diagram or a styled `StatCallout` grid
  instead of a missing `<img>`.

---

## 6. CSS Tokens (implementation note)

All tokens live in `app/globals.css` under `@theme inline` (Tailwind v4, CSS-first —
no `tailwind.config.*`). Primitive → semantic mapping happens there; components
consume only semantic tokens (e.g. `bg-background`, `text-foreground`,
`text-accent`, `border-border`) — never raw hex values in component files.

---

## 7. Accessibility Decisions

- WCAG AA contrast verified for all text/background pairs (see §1).
- Visible focus state on every interactive element: `2px solid var(--color-accent)`
  outline with `2px` offset — never `outline: none` without a replacement.
- Single committed dark theme is intentional (not a missing light mode).
- Custom cursor and parallax are decorative enhancements only; hidden under
  `prefers-reduced-motion` and `(pointer: coarse)` with no loss of functionality.
- Semantic landmarks: one `<h1>` (hero name), `<h2>` per major section, `<nav>`,
  `<main>`, `<footer>`; skip-to-content link before the nav.
- All interactive cards/links are real `<a>`/`<button>` elements (keyboard +
  screen-reader operable), not click-handlers on `<div>`s.
- 3D/decorative canvases are `aria-hidden="true"`; no meaningful content is
  conveyed only through the WebGL background.
- Touch targets ≥44×44px for nav links and skill chips.
