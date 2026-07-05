"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import type { Project } from "@/lib/content";
import { StatCallout } from "./StatCallout";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const imgRef = useRef<HTMLDivElement>(null);
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const handleMouseEnter = () => {
    if (reducedMotion || !imgRef.current) return;
    gsap.killTweensOf(imgRef.current);
    gsap.to(imgRef.current, { scale: 1.04, duration: 0.5, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    if (reducedMotion || !imgRef.current) return;
    gsap.killTweensOf(imgRef.current);
    gsap.to(imgRef.current, { scale: 1.0, duration: 0.4, ease: "power2.out" });
  };

  return (
    <article
      className="flex flex-col rounded-2xl border border-border bg-surface/40 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {project.image && (
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <div ref={imgRef} className="absolute inset-0">
            <Image
              src={project.image}
              alt={`${project.title} — project visual`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={index === 0}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent" />
        </div>
      )}

      <div className="flex flex-col gap-8 p-6 sm:p-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <h3 className="text-display-md font-semibold text-foreground">{project.title}</h3>
          <span className="shrink-0 rounded-full border border-border px-3 py-1 font-mono text-label uppercase tracking-[0.08em] text-foreground-muted">
            {project.category}
          </span>
        </header>

        <p className="max-w-[65ch] text-body text-foreground-secondary">{project.description}</p>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
          {project.stats.map((stat) => (
            <StatCallout key={stat.label} stat={stat} />
          ))}
        </div>

        <ul aria-label="Technologies used" className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-surface px-3 py-1 font-mono text-label uppercase tracking-[0.08em] text-foreground-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-6 border-t border-border pt-6">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-body font-mono text-accent-on-text underline-offset-4 hover:underline focus-visible:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
