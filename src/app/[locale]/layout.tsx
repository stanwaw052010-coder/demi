import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Newsreader, Inter_Tight } from "next/font/google";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { organisationJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

const HANZI_FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500&display=swap";

/**
 * Two clearly different faces. Newsreader is variable with optical sizing, so
 * a heading is drawn as a display cut rather than as enlarged text.
 */
const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-newsreader",
  axes: ["opsz"],
  style: ["normal", "italic"],
});

const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter-tight",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#FCFDFA",
  colorScheme: "light",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const brand = await getTranslations({ locale, namespace: "brand" });

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("homeTitle"), template: `%s — ${brand("name")}` },
    description: t("homeDescription"),
    applicationName: brand("name"),
    alternates: {
      canonical: `/${locale}`,
      languages: { nl: "/nl", en: "/en", "x-default": "/nl" },
    },
    openGraph: {
      type: "website",
      siteName: brand("name"),
      locale: locale === "nl" ? "nl_BE" : "en_GB",
      alternateLocale: locale === "nl" ? "en_GB" : "nl_BE",
      url: `/${locale}`,
      title: t("homeTitle"),
      description: t("homeDescription"),
    },
    twitter: { card: "summary_large_image" },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      apple: [{ url: "/apple-icon", sizes: "180x180" }],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <html lang={locale} className={`${newsreader.variable} ${interTight.variable}`}>
      <head>
        {/*
          Noto Serif SC comes from Google rather than next/font on purpose: the
          CSS2 endpoint splits CJK into ~100 unicode-range subsets, so a page
          with six characters on it downloads six small files instead of a
          self-hosted 10 MB face.

          It is attached from script rather than as a plain <link> so it never
          blocks the first paint: the characters are an accent, and the
          fallback stack in --font-hanzi carries them until it arrives. With
          scripting off the <noscript> link takes over.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href=${JSON.stringify(HANZI_FONT_HREF)};document.head.appendChild(l);})();`,
          }}
        />
        <noscript>
          <link rel="stylesheet" href={HANZI_FONT_HREF} />
        </noscript>
      </head>
      <body>
        <NextIntlClientProvider>
          <a className="wy-skip" href="#main">
            {t("skipToContent")}
          </a>
          <SmoothScroll />
          <SiteHeader />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
          <CartDrawer />
          <CookieBanner />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          // Organisation data is static and authored here, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd()) }}
        />
      </body>
    </html>
  );
}
