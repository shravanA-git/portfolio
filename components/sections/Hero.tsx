"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PERSON } from "@/lib/content";

const NAME_WORDS = PERSON.name.split(" ");

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useGSAP(
    () => {
      const wordEls = gsap.utils.toArray<HTMLElement>("[data-hero-word]");
      const subtitleEl = "[data-hero-subtitle]";
      const kickerEl = "[data-hero-kicker]";
      const scrollCueEl = "[data-hero-scroll-cue]";
      const ruleEl = "[data-hero-rule]";

      if (reducedMotion) {
        gsap.set([wordEls, subtitleEl, kickerEl, scrollCueEl], {
          clearProps: "all",
          opacity: 1,
        });
        gsap.set(wordEls, { clipPath: "inset(0% 0 0 0)", yPercent: 0 });
        gsap.set(subtitleEl, { y: 0 });
        gsap.set(ruleEl, { scaleX: 1 });
        gsap.from([wordEls, subtitleEl, kickerEl, scrollCueEl], {
          opacity: 0,
          duration: 0.15,
          ease: "none",
        });
        return;
      }

      gsap.set(wordEls, { clipPath: "inset(100% 0 0 0)", yPercent: 100 });
      gsap.set(subtitleEl, { opacity: 0, y: 16 });
      gsap.set([kickerEl, scrollCueEl], { opacity: 0 });
      gsap.set(ruleEl, { scaleX: 0 });

      const scrollCuePulse = gsap.to(scrollCueEl, {
        y: 6,
        opacity: 0.4,
        duration: 1.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        paused: true,
      });

      const tl = gsap.timeline();

      tl.to(wordEls, {
        clipPath: "inset(0% 0 0 0)",
        yPercent: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.07,
      })
        .to(
          ruleEl,
          {
            scaleX: 1,
            duration: 0.9,
            ease: "expo.inOut",
          },
          "-=0.3"
        )
        .to(
          subtitleEl,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "expo.out",
          },
          "-=0.4"
        )
        .to(
          [kickerEl, scrollCueEl],
          {
            opacity: 1,
            duration: 0.5,
            ease: "power1.out",
            stagger: 0.08,
          },
          "-=0.2"
        )
        .add(() => {
          scrollCuePulse.play();
        });
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-dvh flex-col justify-between"
    >
      <div className="container-page relative flex flex-1 flex-col justify-center pt-32 pb-16">
        <p
          data-hero-kicker
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
              <span data-hero-word className="inline-block">
                {word}
              </span>
            </span>
          ))}
        </h1>

        <div
          data-hero-rule
          className="my-8 h-px w-full origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
        />

        <p
          data-hero-subtitle
          className="max-w-prose font-mono text-body-lg text-foreground-secondary"
        >
          {PERSON.subtitle}
        </p>
      </div>

      <div className="container-page relative flex justify-center pb-12">
        <span
          data-hero-scroll-cue
          className="font-mono text-label tracking-[0.08em] text-foreground-muted uppercase"
        >
          Scroll
        </span>
      </div>
    </section>
  );
}
