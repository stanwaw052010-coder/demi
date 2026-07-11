import type { MetadataRoute } from "next";
import { site } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/privacy"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
