import { SectionHeading } from "@/components/SectionHeading";
import { PERSON } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="container-page section-padding">
      <SectionHeading index="01" title="About" />
      <p className="max-w-[65ch] text-body-lg text-foreground-secondary">
        {PERSON.about.join(" ")}
      </p>
    </section>
  );
}
