import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { articleBody, articleBySlug, articles } from "@content/journal";
import { ProductRegister } from "@/components/catalog/ProductRegister";
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { getProduct } from "@/lib/catalog";
import type { Product } from "@content/types";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    articles.map((article) => ({ locale, slug: article.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = raw as AppLocale;
  const article = articleBySlug.get(slug);
  if (!article) return {};

  const nlPath = `/nl/journaal/${slug}`;
  const enPath = `/en/journal/${slug}`;
  return {
    title: article.title[locale],
    description: article.lede[locale],
    alternates: {
      canonical: locale === "nl" ? nlPath : enPath,
      languages: { nl: nlPath, en: enPath, "x-default": nlPath },
    },
    openGraph: {
      type: "article",
      publishedTime: article.date,
      title: article.title[locale],
      description: article.lede[locale],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  setRequestLocale(raw);
  const locale = raw as AppLocale;

  const article = articleBySlug.get(slug);
  const loader = articleBody[slug]?.[locale];
  if (!article || !loader) notFound();

  const t = await getTranslations("journal");
  const { default: Body } = await loader();

  const mentioned = article.related
    .map((s) => getProduct(s))
    .filter((p): p is Product => Boolean(p));
  const more = articles.filter((a) => a.slug !== slug).slice(0, 3);
  const url = `${SITE_URL}/${locale}/${locale === "nl" ? "journaal" : "journal"}/${slug}`;

  return (
    <div className="wy-shell" style={{ paddingBlock: "clamp(3rem, 7vw, 5rem)" }}>
      <JsonLd
        data={articleJsonLd({
          headline: article.title[locale],
          description: article.lede[locale],
          datePublished: article.date,
          url,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Well’s of Yunnan", url: `${SITE_URL}/${locale}` },
          {
            name: t("title"),
            url: `${SITE_URL}/${locale}/${locale === "nl" ? "journaal" : "journal"}`,
          },
          { name: article.title[locale], url },
        ])}
      />

      <nav aria-label={t("title")} className="wy-meta">
        <span>
          <Link href="/journaal" className="wy-link">
            {t("title")}
          </Link>
        </span>
        <span aria-current="page">{article.title[locale]}</span>
      </nav>

      <header className="wy-grid mt-8 gap-y-4">
        <div className="wy-margin">
          <p className="wy-label">{t("published")}</p>
          <time dateTime={article.date} className="block text-[var(--text-micro)] mt-1">
            {formatDate(article.date, locale)}
          </time>
          <p className="wy-label mt-3">{t("readingTime", { minutes: article.minutes })}</p>
        </div>
        <div className="wy-main">
          <h1>{article.title[locale]}</h1>
          <p className="wy-lead mt-6 text-stone">{article.lede[locale]}</p>
        </div>
      </header>

      <div className="wy-grid mt-16">
        <article className="wy-main wy-article">
          <Body />
        </article>
      </div>

      {mentioned.length > 0 ? (
        <div className="wy-grid mt-20">
          <div className="wy-main">
            <h2 id="wy-mentioned" className="wy-label pb-2 wy-rule-b">
              {t("mentioned")}
            </h2>
            <div className="mt-2">
              <ProductRegister products={mentioned} locale={locale} labelledBy="wy-mentioned" />
            </div>
          </div>
        </div>
      ) : null}

      <div className="wy-grid mt-20">
        <div className="wy-main">
          <h2 className="wy-label pb-2 wy-rule-b">{t("more")}</h2>
          <ul className="mt-2">
            {more.map((other) => (
              <li key={other.slug} className="py-4 wy-rule-b">
                <Link
                  href={{ pathname: "/journaal/[slug]", params: { slug: other.slug } }}
                  className="wy-link text-[1.25rem]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {other.title[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
