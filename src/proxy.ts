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
   * the metadata file conventions. Without that last group the proxy would
   * redirect /opengraph-image to /nl/opengraph-image and the social card would
   * 307 instead of rendering.
   */
  matcher: [
    "/((?!api|_next|_vercel|opengraph-image|twitter-image|apple-icon|icon|sitemap|robots|manifest|.*\\..*).*)",
  ],
};
