"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPLORE_CARDS, PERSON, type ExploreCard } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

// ── Card component ────────────────────────────────────────────────────────────
function HelixCard({ card }: { card: ExploreCard }) {
  return (
    <Link
      href={card.href}
      className="group relative block overflow-hidden rounded-2xl p-6 sm:p-8"
      style={{
        background:
          "linear-gradient(145deg, rgba(28,30,36,0.85) 0%, rgba(15,16,20,0.95) 100%)",
        border: "1px solid rgba(77,141,255,0.14)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow:
          "0 0 0 1px rgba(77,141,255,0.05), 0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        transition:
          "border-color 0.45s ease, box-shadow 0.45s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor =
          "rgba(77,141,255,0.38)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          "0 0 0 1px rgba(77,141,255,0.14), 0 8px 56px rgba(0,0,0,0.55), 0 0 48px rgba(77,141,255,0.07), inset 0 1px 0 rgba(255,255,255,0.07)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor =
          "rgba(77,141,255,0.14)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          "0 0 0 1px rgba(77,141,255,0.05), 0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)";
      }}
    >
      {/* Top accent gradient line — always visible, more vivid on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 8%, rgba(77,141,255,0.55) 50%, transparent 92%)",
        }}
      />

      {/* Radial inner glow from top — revealed on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, rgba(77,141,255,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative">
        {/* Index + meta row */}
        <div className="mb-6 flex items-center justify-between">
          <span
            className="font-mono text-label uppercase tracking-[0.14em]"
            style={{ color: "rgba(133,180,255,0.65)" }}
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

        {/* Title */}
        <h2 className="font-display text-display-md font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-white">
          {card.label}
        </h2>

        {/* Description */}
        <p className="mt-3 max-w-[52ch] text-body leading-relaxed text-foreground-muted">
          {card.description}
        </p>

        {/* Explore link */}
        <div className="mt-7 flex items-center gap-2">
          <span
            className="font-mono text-label uppercase tracking-[0.1em] transition-colors duration-300"
            style={{ color: "rgba(133,180,255,0.55)" }}
          >
            Explore
          </span>
          <svg
            aria-hidden="true"
            className="h-3 w-3 translate-x-0 transition-all duration-300 group-hover:translate-x-1"
            style={{ color: "rgba(133,180,255,0.55)" }}
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
  const helixRef = useRef<HTMLDivElement>(null);

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
      } else {
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
      }

      if (rm) {
        gsap.set("[data-helix-card], [data-helix-node], [data-helix-rung]", {
          opacity: 1,
          rotateY: 0,
          z: 0,
          scale: 1,
          scaleX: 1,
        });
        return;
      }

      // ── Spine draw ───────────────────────────────────────────────────────
      gsap.from("[data-helix-spine]", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: helixRef.current, start: "top 70%", invalidateOnRefresh: true },
      });

      // ── Subtle scrubbed tilt on the whole helix container ────────────────
      // helixRef has NO preserve-3d — this is a 2D-projected 3D tilt from
      // the section's perspective context. Pointer events stay 2D-flat.
      ScrollTrigger.create({
        trigger: helixRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (helixRef.current) {
            gsap.set(helixRef.current, { rotateY: (self.progress - 0.5) * 14 });
          }
        },
      });

      // ── Per-row entrance animations ──────────────────────────────────────
      // Key: perspective is set IN the tween (GSAP's own perspective prop),
      // not via preserve-3d on DOM ancestors. This means the card wrapper
      // is a plain 2D element after animation → pointer events work normally.
      const rows = gsap.utils.toArray<HTMLElement>("[data-helix-row]");
      rows.forEach((row, i) => {
        const isLeft = i % 2 === 0;
        const card = row.querySelector("[data-helix-card]");
        const node = row.querySelector("[data-helix-node]");
        const rung = row.querySelector("[data-helix-rung]");
        const st = { trigger: row, start: "top 84%", invalidateOnRefresh: true };

        gsap.from(node, {
          scale: 0,
          opacity: 0,
          duration: 0.45,
          ease: "back.out(2.5)",
          scrollTrigger: st,
        });

        gsap.from(rung, {
          scaleX: 0,
          transformOrigin: isLeft ? "right center" : "left center",
          duration: 0.5,
          ease: "expo.out",
          scrollTrigger: st,
          delay: 0.08,
        });

        // perspective prop creates a local 3D effect per card —
        // avoids preserve-3d which causes 3D hit-area mismatches
        gsap.from(card, {
          perspective: 1100,
          rotateY: isLeft ? -68 : 68,
          z: -60,
          opacity: 0,
          duration: 1.0,
          ease: "expo.out",
          scrollTrigger: st,
          delay: 0.12,
        });
      });
    },
    { scope: rootRef }
  );

  const NAME_WORDS = PERSON.name.split(" ");

  return (
    <div ref={rootRef}>
      {/* ── Name header ───────────────────────────────────────────────────── */}
      <section className="container-page flex min-h-dvh flex-col justify-center pt-24 pb-12">
        <p
          data-hk
          className="mb-6 font-mono text-label tracking-[0.08em] text-accent-on-text uppercase"
        >
          {PERSON.kicker}
        </p>
        <h1 className="font-display text-display-xl font-semibold tracking-tight text-foreground">
          {NAME_WORDS.map((word) => (
            <span
              key={word}
              className="mr-[0.25ch] inline-block overflow-hidden pb-[0.1em] align-bottom last:mr-0"
            >
              <span data-hw className="inline-block">
                {word}
              </span>
            </span>
          ))}
        </h1>
        <p className="mt-6 font-mono text-body-lg text-foreground-secondary">
          {PERSON.subtitle}
        </p>
        <p className="mt-16 font-mono text-label tracking-[0.08em] text-foreground-muted uppercase animate-bounce">
          Scroll
        </p>
      </section>

      {/* ── RNA / DNA helix card ladder ────────────────────────────────────── */}
      {/*
        perspective on the section gives helixRef's rotateY scrub a 3D look.
        helixRef itself has NO preserve-3d — its children stay flat (2D),
        which makes pointer events work reliably on every card.
      */}
      <section
        aria-label="Site sections"
        className="container-page pb-36"
        style={{ perspective: "1100px" }}
      >
        <div ref={helixRef} className="relative">
          {/* Vertical spine */}
          <div
            data-helix-spine
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(77,141,255,0.28) 12%, rgba(77,141,255,0.28) 88%, transparent 100%)",
            }}
          />

          <div className="flex flex-col gap-12 sm:gap-16">
            {EXPLORE_CARDS.map((card, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={card.href}
                  data-helix-row
                  className="relative flex items-center"
                >
                  {/* Left slot */}
                  <div className="flex flex-1 items-center justify-end">
                    {isLeft ? (
                      <>
                        {/* No transformStyle="preserve-3d" — plain wrapper */}
                        <div
                          data-helix-card
                          className="w-full max-w-xs sm:max-w-sm"
                        >
                          <HelixCard card={card} />
                        </div>
                        <div
                          data-helix-rung
                          className="mx-3 sm:mx-5 h-px w-8 shrink-0 sm:w-14"
                          style={{
                            background:
                              "linear-gradient(to right, rgba(77,141,255,0.1), rgba(77,141,255,0.4))",
                          }}
                        />
                      </>
                    ) : (
                      <div className="w-full" />
                    )}
                  </div>

                  {/* Spine node */}
                  <div
                    data-helix-node
                    className="relative z-10 shrink-0 h-3.5 w-3.5 rounded-full border-2 border-accent bg-background"
                    style={{
                      boxShadow:
                        "0 0 10px var(--color-glow), 0 0 22px rgba(77,141,255,0.12)",
                    }}
                  />

                  {/* Right slot */}
                  <div className="flex flex-1 items-center justify-start">
                    {!isLeft ? (
                      <>
                        <div
                          data-helix-rung
                          className="mx-3 sm:mx-5 h-px w-8 shrink-0 sm:w-14"
                          style={{
                            background:
                              "linear-gradient(to left, rgba(77,141,255,0.1), rgba(77,141,255,0.4))",
                          }}
                        />
                        {/* No transformStyle="preserve-3d" — plain wrapper */}
                        <div
                          data-helix-card
                          className="w-full max-w-xs sm:max-w-sm"
                        >
                          <HelixCard card={card} />
                        </div>
                      </>
                    ) : (
                      <div className="w-full" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
