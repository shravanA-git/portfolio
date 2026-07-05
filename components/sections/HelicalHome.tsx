"use client";

import { useRef, type CSSProperties } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPLORE_CARDS, PERSON, type ExploreCard } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

// ── Bioluminescent step hues — one identity color per staircase step ─────────
const HUES = ["#4d8dff", "#8a63ff", "#3ddad0", "#ff5d8f", "#ffb454", "#7fd0ff"];

// ── Staircase geometry ────────────────────────────────────────────────────────
const STEP_ANGLE = 60; // 6 steps × 60° = one full revolution
const STEP_DROP = 120; // px each step descends
const RADIUS = 430; // px from the central axis

// ── Card component ────────────────────────────────────────────────────────────
function HelixCard({ card, hue }: { card: ExploreCard; hue: string }) {
  const mix = (pct: number) => `color-mix(in srgb, ${hue} ${pct}%, transparent)`;
  return (
    <Link
      href={card.href}
      className="group relative block overflow-hidden rounded-2xl p-6 sm:p-8"
      style={
        {
          "--hue": hue,
          background:
            "linear-gradient(145deg, rgba(28,30,36,0.88) 0%, rgba(15,16,20,0.96) 100%)",
          border: `1px solid ${mix(18)}`,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: `0 0 0 1px ${mix(6)}, 0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`,
          transition: "border-color 0.45s ease, box-shadow 0.45s ease",
        } as CSSProperties
      }
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = mix(45);
        e.currentTarget.style.boxShadow = `0 0 0 1px ${mix(18)}, 0 8px 56px rgba(0,0,0,0.55), 0 0 56px ${mix(12)}, inset 0 1px 0 rgba(255,255,255,0.07)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = mix(18);
        e.currentTarget.style.boxShadow = `0 0 0 1px ${mix(6)}, 0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`;
      }}
    >
      {/* Top accent line in the step's own hue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 8%, ${mix(60)} 50%, transparent 92%)`,
        }}
      />

      {/* Radial inner glow — revealed on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 50% -10%, ${mix(14)} 0%, transparent 60%)`,
        }}
      />

      <div className="relative">
        <div className="mb-6 flex items-center justify-between">
          <span
            className="font-mono text-label uppercase tracking-[0.14em]"
            style={{ color: mix(80) }}
          >
            {card.index}
          </span>
          <span
            className="font-mono text-label uppercase tracking-[0.08em]"
            style={{ color: "rgba(139,147,163,0.38)" }}
          >
            {card.meta}
          </span>
        </div>

        <h2 className="font-display text-display-md font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-white">
          {card.label}
        </h2>

        <p className="mt-3 max-w-[52ch] text-body leading-relaxed text-foreground-muted">
          {card.description}
        </p>

        <div className="mt-7 flex items-center gap-2">
          <span
            className="font-mono text-label uppercase tracking-[0.1em] transition-colors duration-300"
            style={{ color: mix(70) }}
          >
            Explore
          </span>
          <svg
            aria-hidden="true"
            className="h-3 w-3 translate-x-0 transition-all duration-300 group-hover:translate-x-1"
            style={{ color: mix(70) }}
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 6h8M7 3l3 3-3 3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

// ── HelicalHome ────────────────────────────────────────────────────────────────
export function HelicalHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const stairSectionRef = useRef<HTMLElement>(null);
  const assemblyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // ── Name reveal ──────────────────────────────────────────────────────
      const words = gsap.utils.toArray<HTMLElement>("[data-hw]");
      const kicker = document.querySelector("[data-hk]");

      if (rm) {
        gsap.set([words, kicker], {
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          yPercent: 0,
          y: 0,
        });
        gsap.set("[data-stair-card]", { opacity: 1, scale: 1 });
        gsap.set("[data-progress]", { opacity: 0 });
        return;
      }

      gsap.set(words, { clipPath: "inset(100% 0 0 0)", yPercent: 100 });
      gsap.set(kicker, { opacity: 0, y: 12 });
      gsap.timeline()
        .to(words, {
          clipPath: "inset(0% 0 0 0)",
          yPercent: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.07,
        })
        .to(kicker, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }, "-=0.4");

      // ── Page scroll progress bar ─────────────────────────────────────────
      gsap.to("[data-progress]", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });

      // ── Cinematic hero exit — scrubbed ───────────────────────────────────
      gsap
        .timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom 30%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
        .to("[data-h1]", { yPercent: -16, scale: 1.06, letterSpacing: "0.05em", opacity: 0.12, ease: "none" }, 0)
        .to("[data-hk]", { yPercent: -140, opacity: 0, ease: "none" }, 0)
        .to("[data-hs]", { yPercent: -70, opacity: 0, ease: "none" }, 0)
        .to("[data-hc]", { opacity: 0, ease: "none" }, 0);

      // ── 3D spiral staircase ──────────────────────────────────────────────
      const mm = gsap.matchMedia();

      // Desktop: pinned cylinder — scroll rotates the staircase past the
      // camera, one step per 60°, descending as it turns.
      mm.add("(min-width: 768px)", () => {
        const steps = gsap.utils.toArray<HTMLElement>("[data-stair-step]");
        const cards = gsap.utils.toArray<HTMLElement>("[data-stair-card]");
        const counter = document.querySelector("[data-stair-count]");
        const label = document.querySelector<HTMLElement>("[data-stair-label]");
        const total = steps.length;

        // Place each step on the cylinder. A raw transform string gives us
        // rotate-then-translate ordering, which GSAP's component transforms
        // can't express.
        steps.forEach((step, i) => {
          gsap.set(step, {
            transform: `translate(-50%, -50%) rotateY(${i * STEP_ANGLE}deg) translateZ(${RADIUS}px) translateY(${i * STEP_DROP}px)`,
          });
        });

        const applyFocus = (progress: number) => {
          const rotation = -progress * (total - 1) * STEP_ANGLE;
          let frontIdx = 0;
          let frontFocus = -1;
          cards.forEach((cardEl, i) => {
            const rel = i * STEP_ANGLE + rotation; // 0 = facing camera
            const focus = 1 - Math.min(Math.abs(rel) / 110, 1);
            if (focus > frontFocus) {
              frontFocus = focus;
              frontIdx = i;
            }
            gsap.set(cardEl, {
              opacity: 0.1 + 0.9 * Math.pow(focus, 1.5),
              scale: 0.86 + 0.14 * focus,
            });
            cardEl.style.pointerEvents = focus > 0.72 ? "auto" : "none";
          });
          if (counter) counter.textContent = EXPLORE_CARDS[frontIdx]?.index ?? "01";
          if (label) {
            label.textContent = EXPLORE_CARDS[frontIdx]?.label ?? "";
            label.style.color = HUES[frontIdx % HUES.length] ?? HUES[0]!;
          }
        };

        applyFocus(0);

        gsap.to(assemblyRef.current, {
          rotationY: -(total - 1) * STEP_ANGLE,
          y: -(total - 1) * STEP_DROP,
          ease: "none",
          scrollTrigger: {
            trigger: stairSectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
            invalidateOnRefresh: true,
            onUpdate: (self) => applyFocus(self.progress),
          },
        });
      });

      // Mobile: flat stacked list with scrubbed fade-ups — the cylinder is
      // too cramped below md.
      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-stair-step]").forEach((step) => {
          gsap.from(step, {
            opacity: 0,
            y: 36,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: { trigger: step, start: "top 88%", invalidateOnRefresh: true },
          });
        });
      });

      return () => {
        mm.revert();
      };
    },
    { scope: rootRef }
  );

  const NAME_WORDS = PERSON.name.split(" ");

  return (
    <div ref={rootRef}>
      {/* ── Page scroll progress ──────────────────────────────────────────── */}
      <div
        data-progress
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left"
        style={{
          transform: "scaleX(0)",
          background:
            "linear-gradient(90deg, #4d8dff 0%, #8a63ff 45%, #3ddad0 100%)",
        }}
      />

      {/* ── Name header ───────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="container-page flex min-h-dvh flex-col justify-center pt-24 pb-12"
      >
        <p
          data-hk
          className="mb-6 font-mono text-label tracking-[0.08em] text-accent-on-text uppercase"
        >
          {PERSON.kicker}
        </p>
        <h1
          data-h1
          className="font-display text-display-xl font-semibold tracking-tight text-foreground"
        >
          {NAME_WORDS.map((word, w) => (
            <span
              key={word}
              className="mr-[0.25ch] inline-block overflow-hidden pb-[0.1em] align-bottom last:mr-0"
            >
              {/* Gradient lives on the animated span itself — background-clip
                  breaks if a transformed child paints the text separately. */}
              <span
                data-hw
                className="inline-block"
                style={{
                  backgroundImage:
                    w === 0
                      ? "linear-gradient(100deg, #f4f6f9 35%, #85b4ff 100%)"
                      : "linear-gradient(100deg, #85b4ff 0%, #8a63ff 55%, #3ddad0 115%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>
        <p data-hs className="mt-6 font-mono text-body-lg text-foreground-secondary">
          {PERSON.subtitle}
        </p>
        <p
          data-hc
          className="mt-16 font-mono text-label tracking-[0.08em] text-foreground-muted uppercase animate-bounce"
        >
          Scroll
        </p>
      </section>

      {/* ── 3D spiral staircase ───────────────────────────────────────────── */}
      {/*
        Desktop: the outer section is a tall scroll runway; the inner viewport
        is sticky and shows a preserve-3d cylinder of cards. Scroll scrubs the
        cylinder's rotation + elevation, so descending the page reads as
        walking down a spiral staircase. Only the front-facing card accepts
        pointer events, which sidesteps 3D hit-area mismatches.
        Mobile: a plain stacked list (no 3D), animated with simple fade-ups.
      */}
      <section
        ref={stairSectionRef}
        aria-label="Site sections"
        className="relative md:h-[560vh]"
      >
        <div
          className="container-page md:sticky md:top-0 md:flex md:h-dvh md:items-center md:justify-center md:overflow-hidden"
          style={{ perspective: "1500px" }}
        >
          {/* Central axis */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[8%] bottom-[8%] hidden w-px -translate-x-1/2 md:block"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(138,99,255,0.35) 30%, rgba(77,141,255,0.35) 70%, transparent)",
            }}
          />

          {/* Ghost step counter + label */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-center md:block"
          >
            <div
              data-stair-count
              className="font-display font-bold leading-none"
              style={{
                fontSize: "clamp(10rem, 26vw, 20rem)",
                color: "transparent",
                WebkitTextStroke: "1px rgba(244,246,249,0.07)",
              }}
            >
              01
            </div>
            <div
              data-stair-label
              className="mt-2 font-mono text-label uppercase tracking-[0.3em] opacity-70"
            />
          </div>

          <div
            ref={assemblyRef}
            className="relative md:absolute md:left-1/2 md:top-1/2"
            style={{ transformStyle: "preserve-3d" }}
          >
            {EXPLORE_CARDS.map((card, i) => (
              <div
                key={card.href}
                data-stair-step
                className="mx-auto mb-8 w-full max-w-sm md:absolute md:left-0 md:top-0 md:mb-0 md:w-[26rem] md:max-w-none"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div data-stair-card>
                  <HelixCard card={card} hue={HUES[i % HUES.length] ?? HUES[0]!} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
