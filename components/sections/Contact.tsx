import { SectionHeading } from "@/components/SectionHeading";
import { CONTACT_LINKS } from "@/lib/content";

export function Contact() {
  return (
    <section id="contact" className="container-page section-padding">
      <SectionHeading
        index="06"
        title="Get in Touch"
        kicker="Open to conversations about research, internships, or anything at the intersection of code, data, and flight."
      />
      <ul className="flex flex-col">
        {CONTACT_LINKS.map((link) => {
          const isExternal = link.href.startsWith("http");
          return (
            <li key={link.label} className="border-b border-border last:border-b-0">
              <a
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="group flex min-h-[44px] flex-col gap-1 py-6 transition-colors duration-fast sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span className="font-mono text-label tracking-[0.08em] text-foreground-muted uppercase">
                  {link.label}
                </span>
                <span className="text-display-md font-semibold text-foreground underline-offset-4 group-hover:text-accent-on-text group-hover:underline">
                  {link.value}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
