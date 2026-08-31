import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Locale negotiation and the rewrite from a localised path
 * (/en/tea/da-hong-pao) to the internal route (/en/thee/[slug]).
 */
export default createMiddleware(routing);

export const config = {
  /**
   * Everything except API routes, Next internals, files with an extension, and
   * the metadata routes that live at the root rather than under a locale.
   *
   * The Open Graph image is deliberately not in that list: it sits under
   * [locale], so it needs the same locale handling as a page, and excluding it
   * left the bare /opengraph-image with no locale to render in.
   */
  matcher: [
    "/((?!api|_next|_vercel|apple-icon|icon|sitemap|robots|manifest|.*\\..*).*)",
  ],
};
