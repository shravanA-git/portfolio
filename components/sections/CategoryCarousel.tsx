"use client";

import { useRef } from "react";
import { EXPLORE_CARDS } from "@/lib/content";

/**
 * Horizontal carousel of major site categories on the home screen. Each card
 * links to its full section below, where the individual items (projects,
 * awards, etc.) are laid out in detail.
 */
export function CategoryCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>("[data-explore-card]");
    const amount = (card?.offsetWidth ?? 300) + 24;
    scroller.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <section aria-label="Explore the site" className="container-page py-12 sm:py-20">
      <div className="mb-6 flex items-end justify-between gap-4">
        <p className="font-mono text-label tracking-[0.08em] text-foreground-muted uppercase">
          Explore
        </p>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label="Scroll to previous card"
            onClick={() => scrollByCard(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors duration-fast hover:border-accent hover:text-foreground"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Scroll to next card"
            onClick={() => scrollByCard(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors duration-fast hover:border-accent hover:text-foreground"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 pb-2 sm:gap-6"
      >
        {EXPLORE_CARDS.map((card) => (
          <a
            key={card.href}
            href={card.href}
            data-explore-card
            data-cursor="VIEW"
            className="group flex w-[260px] shrink-0 snap-start flex-col justify-between gap-8 rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-sm transition-colors duration-fast hover:border-accent sm:w-[300px] sm:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-label tracking-[0.08em] text-accent-on-text uppercase">
                {card.index}
              </span>
              <span className="font-mono text-label tracking-[0.08em] text-foreground-muted uppercase">
                {card.meta}
              </span>
            </div>
            <div>
              <h3 className="text-display-md font-semibold text-foreground">{card.label}</h3>
              <p className="mt-3 text-body text-foreground-muted">{card.description}</p>
            </div>
            <span className="font-mono text-label tracking-[0.08em] text-foreground-secondary uppercase transition-colors duration-fast group-hover:text-accent-on-text">
              View →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
