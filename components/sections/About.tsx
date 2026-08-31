import { SectionHeading } from "@/components/SectionHeading";
import { PERSON, RESUME_PATH } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="container-page section-padding">
      <SectionHeading index="01" title="About" />
      <div className="flex max-w-[65ch] flex-col gap-6">
        {PERSON.about.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="text-body-lg text-foreground-secondary">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-10 max-w-[65ch] rounded-2xl border border-border bg-surface/40 p-6 sm:p-8">
        <p className="font-mono text-label tracking-[0.08em] text-accent-on-text uppercase">
          Currently
        </p>
        <p className="mt-3 text-body-lg text-foreground-secondary">{PERSON.seeking}</p>
        <div className="mt-6 flex flex-wrap gap-6">
          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center font-mono text-label tracking-[0.08em] text-accent-on-text uppercase underline-offset-4 hover:underline"
          >
            Download Resume →
          </a>
          <a
            href={`mailto:${PERSON.email}`}
            className="inline-flex min-h-[44px] items-center font-mono text-label tracking-[0.08em] text-accent-on-text uppercase underline-offset-4 hover:underline"
          >
            Email Me →
          </a>
        </div>
      </div>
    </section>
  );
}
