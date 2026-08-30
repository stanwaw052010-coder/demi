import { defineRouting } from "next-intl/routing";

export const locales = ["nl", "en"] as const;
export type AppLocale = (typeof locales)[number];

export const defaultLocale = "nl" satisfies AppLocale;

/**
 * Localised pathnames. The key is the internal route (which matches the folder
 * name under src/app/[locale]); the value maps it to a real URL per locale.
 *
 * Adding French later means adding "fr" to `locales` and one line per entry
 * here; nothing else in the app needs to change.
 */
export const pathnames = {
  "/": "/",
  "/thee": { nl: "/thee", en: "/tea" },
  "/thee/[slug]": { nl: "/thee/[slug]", en: "/tea/[slug]" },
  "/collecties": { nl: "/collecties", en: "/collections" },
  "/collecties/[slug]": { nl: "/collecties/[slug]", en: "/collections/[slug]" },
  "/theeproever": { nl: "/theeproever", en: "/tea-finder" },
  "/zetgids": { nl: "/zetgids", en: "/brewing-guide" },
  "/zetgids/[slug]": { nl: "/zetgids/[slug]", en: "/brewing-guide/[slug]" },
  "/puerh-vault": { nl: "/puerh-vault", en: "/puerh-vault" },
  "/over-ons": { nl: "/over-ons", en: "/about" },
  "/journaal": { nl: "/journaal", en: "/journal" },
  "/journaal/[slug]": { nl: "/journaal/[slug]", en: "/journal/[slug]" },
  "/proeverijen": { nl: "/proeverijen", en: "/tastings" },
  "/afrekenen": { nl: "/afrekenen", en: "/checkout" },
  "/bedankt/[orderId]": { nl: "/bedankt/[orderId]", en: "/thank-you/[orderId]" },
  "/faq": { nl: "/faq", en: "/faq" },
  "/verzending-retour": { nl: "/verzending-retour", en: "/shipping-returns" },
  "/contact": { nl: "/contact", en: "/contact" },
  "/algemene-voorwaarden": { nl: "/algemene-voorwaarden", en: "/terms" },
  "/privacybeleid": { nl: "/privacybeleid", en: "/privacy" },
  "/cookiebeleid": { nl: "/cookiebeleid", en: "/cookies" },
  "/herroepingsrecht": { nl: "/herroepingsrecht", en: "/right-of-withdrawal" },
} as const;

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  pathnames,
});

export type AppPathname = keyof typeof pathnames;

/**
 * Routes without a dynamic segment. Navigation lists (header, footer, mobile
 * menu) are typed with this so a `[slug]` route cannot be linked without params.
 */
export type StaticPathname = Exclude<AppPathname, `${string}[${string}`>;
