import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppLocale, type AppPathname } from "@/i18n/routing";

type Href =
  | AppPathname
  | { pathname: AppPathname; params: Record<string, string | string[]> };

/**
 * Canonical and hreflang for one route, derived from the localised pathname map
 * so the two never drift apart. Without this a page inherits the layout's
 * canonical, which points at the home page — the sort of mistake that is
 * invisible in the browser and expensive in search.
 */
export function alternatesFor(href: Href, locale: AppLocale): Metadata["alternates"] {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, getPathname({ href: href as never, locale: l })]),
  ) as Record<AppLocale, string>;

  return {
    canonical: languages[locale],
    languages: { ...languages, "x-default": languages[routing.defaultLocale] },
  };
}
