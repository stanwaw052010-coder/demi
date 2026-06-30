import type { MetadataRoute } from "next";

const siteUrl = "https://sprinter.org.ua";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/account/", "/cart"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
