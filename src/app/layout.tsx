import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/site";

/**
 * The real root layout lives at `[locale]/layout.tsx`, because the html lang
 * attribute depends on the locale. This passthrough exists so Next has a layout
 * above the locale segment, and so `metadataBase` is set once for every route,
 * including the generated Open Graph images.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
