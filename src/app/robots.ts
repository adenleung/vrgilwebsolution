import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-data";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: siteUrl
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    ...(siteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
