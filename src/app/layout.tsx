import type { ReactNode } from "react";

/**
 * The real root layout lives at `[locale]/layout.tsx`, because the html lang
 * attribute depends on the locale. This passthrough exists only so Next has a
 * layout above the locale segment.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
