import { SectionHeading } from "@/components/SectionHeading";
import { AWARDS } from "@/lib/content";
import { AwardItem } from "./AwardItem";

export function Awards() {
  return (
    <section id="awards" className="container-page section-padding">
      <SectionHeading index="03" title="Awards & Recognition" />
      <ul className="flex flex-col">
        {AWARDS.map((award) => (
          <AwardItem key={award.title} award={award} />
        ))}
      </ul>
    </section>
  );
}
