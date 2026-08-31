import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/lib/alternates";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { articles } from "@content/journal";
import { formatDate } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("journalTitle"), description: t("journalDescription"),
    alternates: alternatesFor("/journaal", locale as AppLocale),
  };
}

export default async function JournalIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as AppLocale;
  const t = await getTranslations("journal");

  return (
    <div className="wy-shell" style={{ paddingBlock: "clamp(3rem, 7vw, 5.5rem)" }}>
      <header className="wy-grid">
        <div className="wy-main">
          <h1>{t("title")}</h1>
          <p className="wy-lead mt-5 text-stone">{t("lede")}</p>
        </div>
      </header>

      <ul className="mt-16">
        {articles.map((article) => (
          <li key={article.slug} className="wy-rule">
            <Link
              href={{ pathname: "/journaal/[slug]", params: { slug: article.slug } }}
              className="wy-grid py-10 gap-y-3"
            >
              <div className="wy-margin flex items-baseline gap-3">
                <span
                  className="wy-drop"
                  data-full="true"
                  style={{
                    ["--drop" as string]: `var(--color-liquor-${article.liquor})`,
                    width: "1rem",
                    height: "1rem",
                  }}
                  aria-hidden="true"
                />
                <time dateTime={article.date} className="wy-label">
                  {formatDate(article.date, locale)}
                </time>
              </div>
              <div className="wy-main">
                <h2 className="text-[1.875rem] leading-tight">
                  <span className="wy-link">{article.title[locale]}</span>
                </h2>
                <p className="wy-prose mt-3 text-[1rem]">{article.lede[locale]}</p>
                <p className="wy-label mt-3">{t("readingTime", { minutes: article.minutes })}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
