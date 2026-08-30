"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/**
 * Keeps you on the page you were reading. `usePathname` from next-intl returns
 * the internal route, so handing it to `Link` with a different locale resolves
 * to that locale's own slug: /nl/thee/da-hong-pao becomes /en/tea/da-hong-pao.
 */
export function LocaleSwitch() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();

  const other = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  return (
    <Link
      // The route params travel with the switch so dynamic segments survive.
      href={{ pathname, params: params as never }}
      locale={other}
      lang={other}
      hrefLang={other}
      className="wy-link text-[var(--text-micro)] text-stone hover:text-ink"
      aria-label={t("language")}
    >
      {other === "en" ? t("switchToEnglish") : t("switchToDutch")}
    </Link>
  );
}
