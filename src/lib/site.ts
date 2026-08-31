/** One place for the things that are true about the shop itself. */

const FALLBACK_ORIGIN = "https://wellsofyunnan.be";

/**
 * The absolute origin, for canonical URLs, hreflang, the sitemap, JSON-LD and
 * the Open Graph image.
 *
 * Every candidate is validated rather than trusted. An empty or malformed value
 * has to fall through to the next one: `??` only catches null and undefined, so
 * an env var that exists but is blank used to survive as "" and take down the
 * build at `new URL("")`. A misconfigured variable should cost a wrong
 * canonical at worst, never a deploy.
 *
 * Order of preference:
 *   1. NEXT_PUBLIC_SITE_URL — an explicit decision, so it wins.
 *   2. The host's stable production domain. A preview deploy pointing its
 *      canonicals at production is the correct thing to do anyway.
 *   3. The per-deployment URL, so a preview at least resolves to itself.
 *   4. The real domain.
 *
 * This module is imported only on the server (metadata, sitemap, robots, the
 * order route), which is why the unprefixed platform variables are readable.
 */
function normaliseOrigin(value: string | undefined): string | null {
  const trimmed = value?.trim().replace(/\/+$/, "");
  if (!trimmed) return null;
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    return new URL(withScheme).origin;
  } catch {
    return null;
  }
}

export const SITE_URL: string =
  normaliseOrigin(process.env.NEXT_PUBLIC_SITE_URL) ??
  normaliseOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  normaliseOrigin(process.env.VERCEL_URL) ??
  FALLBACK_ORIGIN;

export const COMPANY = {
  legalName: "Well’s BV",
  tradingName: "Well’s of Yunnan",
  vat: "BE 0785.412.907",
  email: "hallo@wellsofyunnan.be",
  privacyEmail: "privacy@wellsofyunnan.be",
  phone: "+32 9 396 12 40",
  phoneHref: "+3293961240",
  /**
   * The registered seat, which is a legal detail rather than a shop: there is
   * no counter here until the tea house opens (see lib/venue.ts). Belgian law
   * wants a geographic address on a webshop, so it stays on the legal pages.
   */
  registered: {
    street: "Baudelostraat 24",
    postcode: "9000",
    city: "Gent",
    country: "BE",
  },
  warehouse: {
    street: "Ringlaan 7 bus 3",
    postcode: "8500",
    city: "Kortrijk",
    country: "BE",
  },
} as const;
