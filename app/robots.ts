import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://asdecided.com/sitemap.xml",
    host: "https://asdecided.com",
  };
}
