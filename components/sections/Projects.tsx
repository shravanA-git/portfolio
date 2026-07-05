"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeading } from "@/components/SectionHeading";
import { PROJECTS } from "@/lib/content";
import { ProjectCard } from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]");

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 24,
            clipPath: "inset(0% 0% 100% 0%)",
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="projects" className="container-page section-padding">
      <SectionHeading
        index="02"
        title="Selected Work"
        kicker="Six research projects spanning applied AI, aerospace, public safety, financial markets, and macro economics, each shipped as working code and data."
      />
      <div ref={containerRef} className="flex flex-col gap-8 sm:gap-12">
        {PROJECTS.map((project, i) => (
          <div key={project.slug} id={project.slug} data-project-card>
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
