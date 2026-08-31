import {
  AWARDS,
  CONTACT_LINKS,
  PERSON,
  PROJECTS,
  SITE_URL,
} from "@/lib/content";

/**
 * `/llms.txt` is generated from `lib/content.ts` rather than kept as a static
 * file in `public/`, which had drifted badly out of date (old domain, an
 * obsolete single-page anchor structure, and only three of the projects).
 */
export const dynamic = "force-static";

function firstSentence(text: string): string {
  const match = text.match(/^[^.]+\./);
  return match ? match[0] : text;
}

export function GET() {
  const projects = PROJECTS.map((project) => {
    const links = project.links.map((link) => link.href).join(", ");
    return `- [${project.title}](${SITE_URL}/projects#${project.slug}) — ${project.category}, ${project.period}. ${firstSentence(project.description)} Links: ${links}`;
  }).join("\n");

  const awards = AWARDS.map((award) =>
    award.detail ? `- ${award.title} — ${award.detail}` : `- ${award.title}`
  ).join("\n");

  const contact = CONTACT_LINKS.map(
    (link) => `- ${link.label}: ${link.href.replace(/^mailto:/, "")}`
  ).join("\n");

  const body = `# ${PERSON.name}

> ${PERSON.subtitle}. ${PERSON.kicker}.

${PERSON.about.join("\n\n")}

## Currently

${PERSON.seeking}

## Projects

${projects}

## Awards

${awards}

## Contact

${contact}

## Notes

- Each section is its own route: /about, /projects, /awards, /skills, /leadership, /contact.
- Individual projects are anchors on /projects (e.g. /projects#conviction).
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
