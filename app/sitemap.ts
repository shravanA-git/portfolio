import type { MetadataRoute } from "next";
import { NAV_LINKS, SITE_URL } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    // NAV_LINKS is the same list the header renders, so a new section page
    // lands in the sitemap without a second edit here.
    ...NAV_LINKS.map((link) => ({
      url: `${SITE_URL}${link.href}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
