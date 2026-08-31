import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/lib/alternates";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { guideChapters } from "@content/guide";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("guideTitle"), description: t("guideDescription"),
    alternates: alternatesFor("/zetgids", locale as AppLocale),
  };
}

export default async function GuideIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as AppLocale;
  const t = await getTranslations("guide");

  return (
    <div className="wy-shell" style={{ paddingBlock: "clamp(3rem, 7vw, 5.5rem)" }}>
      <header className="wy-grid">
        <div className="wy-main">
          <h1>{t("title")}</h1>
          <p className="wy-lead mt-5 text-stone">{t("lede")}</p>
        </div>
      </header>

      <ul className="mt-16">
        {guideChapters.map((chapter, index) => (
          <li key={chapter.slug} className="wy-rule">
            <Link
              href={{ pathname: "/zetgids/[slug]", params: { slug: chapter.slug } }}
              className="wy-grid py-9 gap-y-3"
            >
              <div className="wy-margin flex items-baseline gap-3">
                <span className="tnum wy-label">{String(index + 1).padStart(2, "0")}</span>
                {chapter.hanzi ? (
                  <span className="wy-hanzi text-[1.125rem] text-pine">{chapter.hanzi}</span>
                ) : null}
              </div>
              <div className="wy-main">
                <h2 className="text-[1.75rem] leading-tight">
                  <span className="wy-link">{chapter.title[locale]}</span>
                </h2>
                <p className="wy-prose mt-3 text-[1rem]">{chapter.lede[locale]}</p>
                <p className="wy-label mt-3">{t("readingTime", { minutes: chapter.minutes })}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
