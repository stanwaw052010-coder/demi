import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The cart and the order pages have nothing to index and the
        // confirmation carries someone's address.
        disallow: ["/api/", "/nl/afrekenen", "/en/checkout", "/nl/bedankt/", "/en/thank-you/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
