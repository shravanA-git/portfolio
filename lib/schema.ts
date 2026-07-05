import { AWARDS, PERSON, PROJECTS, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "./content";

function firstSentence(text: string): string {
  const match = text.match(/^[^.]+\./);
  return match ? match[0] : text;
}

export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: PERSON.name,
        url: SITE_URL,
        email: `mailto:${PERSON.email}`,
        jobTitle: "Student Researcher",
        sameAs: [PERSON.github, PERSON.linkedin],
        affiliation: {
          "@type": "CollegeOrUniversity",
          name: "Duke University",
        },
        knowsAbout: [
          "Machine Learning",
          "Computational Fluid Dynamics",
          "Quantitative Finance",
          "Data Science",
        ],
        award: AWARDS.map((award) =>
          award.detail ? `${award.title} · ${award.detail}` : award.title
        ),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: PERSON.name,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
        about: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#person` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
      },
      ...PROJECTS.map((project) => ({
        "@type": "CreativeWork",
        "@id": `${SITE_URL}/#${project.slug}`,
        url: `${SITE_URL}/#${project.slug}`,
        name: project.title,
        description: firstSentence(project.description),
        creator: { "@id": `${SITE_URL}/#person` },
        keywords: project.tags.join(", "),
        sameAs: project.links.map((link) => link.href),
      })),
    ],
  };
}
