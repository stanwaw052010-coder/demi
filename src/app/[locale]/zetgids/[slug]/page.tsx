import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { guideBySlug, guideChapters } from "@content/guide";
import { GuideBlocks } from "@/components/pages/GuideBlocks";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    guideChapters.map((chapter) => ({ locale, slug: chapter.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = raw as AppLocale;
  const chapter = guideBySlug.get(slug);
  if (!chapter) return {};

  const nlPath = `/nl/zetgids/${slug}`;
  const enPath = `/en/brewing-guide/${slug}`;
  return {
    title: chapter.title[locale],
    description: chapter.lede[locale],
    alternates: {
      canonical: locale === "nl" ? nlPath : enPath,
      languages: { nl: nlPath, en: enPath, "x-default": nlPath },
    },
  };
}

export default async function GuideChapterPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  setRequestLocale(raw);
  const locale = raw as AppLocale;

  const chapter = guideBySlug.get(slug);
  if (!chapter) notFound();

  const t = await getTranslations("guide");
  const index = guideChapters.findIndex((c) => c.slug === slug);
  const next = guideChapters[(index + 1) % guideChapters.length];

  return (
    <div className="wy-shell" style={{ paddingBlock: "clamp(3rem, 7vw, 5rem)" }}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Well’s of Yunnan", url: `${SITE_URL}/${locale}` },
          {
            name: t("title"),
            url: `${SITE_URL}/${locale}/${locale === "nl" ? "zetgids" : "brewing-guide"}`,
          },
          {
            name: chapter.title[locale],
            url: `${SITE_URL}/${locale}/${locale === "nl" ? "zetgids" : "brewing-guide"}/${slug}`,
          },
        ])}
      />

      <nav aria-label={t("chapters")} className="wy-meta">
        <span>
          <Link href="/zetgids" className="wy-link">
            {t("title")}
          </Link>
        </span>
        <span aria-current="page">{chapter.title[locale]}</span>
      </nav>

      <header className="wy-grid mt-8 gap-y-4">
        <div className="wy-margin">
          {chapter.hanzi ? (
            <p className="wy-hanzi text-[1.75rem] text-pine">{chapter.hanzi}</p>
          ) : null}
          <p className="wy-label mt-2">{t("readingTime", { minutes: chapter.minutes })}</p>
        </div>
        <div className="wy-main">
          <h1>{chapter.title[locale]}</h1>
          <p className="wy-lead mt-6 text-stone">{chapter.lede[locale]}</p>
        </div>
      </header>

      <div className="wy-grid mt-16">
        <div className="wy-main">
          <GuideBlocks blocks={chapter.blocks} locale={locale} />

          <div className="mt-20 pt-8 wy-rule flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <p className="wy-label">{t("nextChapter")}</p>
            <Link
              href={{ pathname: "/zetgids/[slug]", params: { slug: next.slug } }}
              className="wy-link text-[1.375rem]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {next.title[locale]}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
