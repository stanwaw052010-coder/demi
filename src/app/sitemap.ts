import type { MetadataRoute } from "next";
import { routing, type AppLocale } from "@/i18n/routing";
import { getAllProducts, getCollections } from "@/lib/catalog";
import { guideChapters } from "@content/guide";
import { articles } from "@content/journal";
import { SITE_URL } from "@/lib/site";

/**
 * Every route in both locales, each entry carrying its own hreflang
 * alternates so the two language versions are linked from the sitemap itself.
 */
type Pair = { nl: string; en: string; priority?: number; changeFrequency?: "daily" | "weekly" | "monthly" | "yearly" };

export default function sitemap(): MetadataRoute.Sitemap {
  const pairs: Pair[] = [
    { nl: "", en: "", priority: 1, changeFrequency: "weekly" },
    { nl: "/thee", en: "/tea", priority: 0.9, changeFrequency: "weekly" },
    { nl: "/collecties", en: "/collections", priority: 0.7 },
    { nl: "/theeproever", en: "/tea-finder", priority: 0.7 },
    { nl: "/zetgids", en: "/brewing-guide", priority: 0.8 },
    { nl: "/puerh-vault", en: "/puerh-vault", priority: 0.8 },
    { nl: "/over-ons", en: "/about", priority: 0.6 },
    { nl: "/journaal", en: "/journal", priority: 0.7, changeFrequency: "weekly" },
    { nl: "/proeverijen", en: "/tastings", priority: 0.8, changeFrequency: "weekly" },
    { nl: "/faq", en: "/faq", priority: 0.5 },
    { nl: "/verzending-retour", en: "/shipping-returns", priority: 0.4 },
    { nl: "/contact", en: "/contact", priority: 0.5 },
    { nl: "/algemene-voorwaarden", en: "/terms", priority: 0.2 },
    { nl: "/privacybeleid", en: "/privacy", priority: 0.2 },
    { nl: "/cookiebeleid", en: "/cookies", priority: 0.2 },
    { nl: "/herroepingsrecht", en: "/right-of-withdrawal", priority: 0.2 },
  ];

  for (const product of getAllProducts()) {
    pairs.push({
      nl: `/thee/${product.slug}`,
      en: `/tea/${product.slug}`,
      priority: 0.8,
      changeFrequency: "weekly",
    });
  }
  for (const collection of getCollections()) {
    pairs.push({
      nl: `/collecties/${collection.slug}`,
      en: `/collections/${collection.slug}`,
      priority: 0.6,
    });
  }
  for (const chapter of guideChapters) {
    pairs.push({ nl: `/zetgids/${chapter.slug}`, en: `/brewing-guide/${chapter.slug}`, priority: 0.6 });
  }
  for (const article of articles) {
    pairs.push({ nl: `/journaal/${article.slug}`, en: `/journal/${article.slug}`, priority: 0.6 });
  }

  const now = new Date();

  return pairs.flatMap((pair) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${pair[locale as AppLocale]}`,
      lastModified: now,
      changeFrequency: pair.changeFrequency ?? "monthly",
      priority: pair.priority ?? 0.5,
      alternates: {
        languages: {
          nl: `${SITE_URL}/nl${pair.nl}`,
          en: `${SITE_URL}/en${pair.en}`,
          "x-default": `${SITE_URL}/nl${pair.nl}`,
        },
      },
    })),
  );
}
