import type { MetadataRoute } from "next";
import { landingPages, landingUrl } from "@/lib/landing";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...landingPages.map((page) => ({
      url: landingUrl(page.slug),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
