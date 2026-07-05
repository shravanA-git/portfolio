"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { SKILL_GROUPS } from "@/lib/content";
import { SkillChip } from "./SkillChip";

const ALL_FILTER = "All";

const FILTERS = [ALL_FILTER, ...SKILL_GROUPS.map((group) => group.label)];

export function Skills() {
  const [activeFilter, setActiveFilter] = useState<string>(ALL_FILTER);

  const skills =
    activeFilter === ALL_FILTER
      ? SKILL_GROUPS.flatMap((group) => group.skills)
      : SKILL_GROUPS.find((group) => group.label === activeFilter)?.skills ?? [];

  return (
    <section id="skills" className="container-page section-padding">
      <SectionHeading
        index="04"
        title="Tools & Disciplines"
        kicker="A working toolkit across machine learning, simulation, and quantitative finance — built through research projects, not just coursework."
      />
      <div className="flex flex-wrap gap-3">
        {FILTERS.map((filter) => {
          const isActive = filter === activeFilter;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(filter)}
              className={`min-h-11 rounded-full border px-4 font-mono text-label uppercase tracking-[0.08em] transition-[border-color,color] duration-fast ease-out-expo ${
                isActive
                  ? "border-accent text-foreground"
                  : "border-border text-foreground-muted hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>
      <div className="mt-8">
        {skills.length > 0 ? (
          <ul className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <SkillChip key={skill} label={skill} />
            ))}
          </ul>
        ) : (
          <p className="text-body text-foreground-muted">
            No skills in this category yet. Try another filter.
          </p>
        )}
      </div>
    </section>
  );
}
