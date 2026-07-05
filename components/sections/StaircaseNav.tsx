"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPLORE_CARDS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export function StaircaseNav() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-stair-card]");

      if (reducedMotion) {
        gsap.set(cards, { x: 0, opacity: 1 });
        return;
      }

      gsap.set(cards, { x: -48, opacity: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
        onEnter: () => {
          gsap.to(cards, {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "expo.out",
            stagger: 0.1,
          });
        },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Explore the site"
      className="container-page py-12 sm:py-20"
    >
      <p className="mb-8 font-mono text-label tracking-[0.08em] text-foreground-muted uppercase">
        Explore
      </p>

      <div className="flex flex-col gap-4 sm:gap-5">
        {EXPLORE_CARDS.map((card, i) => {
          const offsetPct = Math.min(i * 8, 50);
          return (
            <a
              key={card.href}
              href={card.href}
              data-stair-card
              data-cursor="VIEW"
              className="group block rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-sm transition-colors duration-fast hover:border-accent hover:bg-surface/70 sm:p-8"
              style={{
                marginLeft: `clamp(0px, ${offsetPct}%, calc(100% - 25%))`,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-label tracking-[0.08em] text-foreground-muted uppercase opacity-40">
                  {card.index}
                </span>
                <span className="font-mono text-label tracking-[0.08em] text-foreground-muted uppercase">
                  {card.meta}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="text-display-md font-semibold text-foreground">{card.label}</h3>
                <p className="mt-2 text-body text-foreground-muted">{card.description}</p>
              </div>

              <span className="mt-6 block font-mono text-label tracking-[0.08em] text-accent-on-text uppercase">
                Explore →
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
