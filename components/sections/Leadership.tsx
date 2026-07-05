import { SectionHeading } from "@/components/SectionHeading";
import { LEADERSHIP } from "@/lib/content";
import { LeadershipItem } from "./LeadershipItem";

export function Leadership() {
  return (
    <section id="leadership" className="container-page section-padding">
      <SectionHeading index="05" title="Leadership & Service" />
      <ul className="flex flex-col">
        {LEADERSHIP.map((item) => (
          <LeadershipItem key={item.role} item={item} />
        ))}
      </ul>
    </section>
  );
}
