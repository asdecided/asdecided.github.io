import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://asdecided.com/",
      lastModified: new Date("2026-08-03"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://asdecided.com/articles/agents-md-is-not-a-decision-system",
      lastModified: new Date("2026-08-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
