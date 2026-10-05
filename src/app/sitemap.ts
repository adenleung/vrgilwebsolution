import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-data";
import { projects } from "@/lib/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${siteUrl}/portfolio/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${siteUrl}/privacy`, priority: 0.2 },
    { url: `${siteUrl}/terms`, priority: 0.2 },
  ];
}
