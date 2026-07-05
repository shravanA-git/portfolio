"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SectionHeadingProps = {
  index: string;
  title: string;
  kicker?: string;
};

export function SectionHeading({ index, title, kicker }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        gsap.set(textRef.current, { clipPath: "inset(0 0 0% 0)" });
        return;
      }

      const trigger = ScrollTrigger.create({
        trigger: ref.current,
        start: "top 85%",
        onEnter: () =>
          gsap.to(textRef.current, {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.6,
            ease: "expo.out",
          }),
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="mb-12 flex flex-col gap-3">
      <span className="font-mono text-label tracking-[0.08em] text-accent-on-text uppercase">
        {index}
      </span>
      <span className="inline-block overflow-hidden">
        <h2
          ref={textRef}
          className="inline-block text-display-lg font-semibold text-foreground"
          style={{ clipPath: "inset(0 0 100% 0)" }}
        >
          {title}
        </h2>
      </span>
      {kicker && (
        <p className="max-w-[65ch] text-body-lg text-foreground-muted">{kicker}</p>
      )}
    </div>
  );
}
