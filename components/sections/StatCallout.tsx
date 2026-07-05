"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Stat } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

function toAccessibleLabel(value: string): string {
  return value.replace(/R²/g, "R-squared").replace(/²/g, " squared").replace(/→/g, "to");
}

export function StatCallout({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const value = stat.value;

      // Skip if value contains → or leading non-numeric chars (not a bare number)
      if (value.includes("→")) return;

      const numMatch = value.match(/^([\d.]+)(.*)$/);
      if (!numMatch) return;

      const final = parseFloat(numMatch[1]);
      const suffix = numMatch[2];
      const isInt = Number.isInteger(final);
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const trigger = ScrollTrigger.create({
        trigger: ref.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          if (prefersReduced) return;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: final,
            duration: 1.2,
            ease: "power2.out",
            onUpdate: () => {
              if (!spanRef.current) return;
              const display = isInt
                ? Math.round(obj.val).toString()
                : obj.val.toFixed(1);
              spanRef.current.textContent = display + suffix;
            },
          });
        },
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: ref, dependencies: [stat.value] }
  );

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span
        ref={spanRef}
        aria-label={toAccessibleLabel(stat.value)}
        className="text-display-md font-mono text-foreground"
      >
        {stat.value}
      </span>
      <span className="text-label font-mono tracking-[0.08em] uppercase text-foreground-muted">
        {stat.label}
      </span>
    </div>
  );
}
