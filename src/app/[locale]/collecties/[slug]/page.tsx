import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl, alternatesFor } from "@/lib/alternates";
import { getCollection, getCollections, getProductsByCategory } from "@/lib/catalog";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getCollections().map((collection) => ({ locale, slug: collection.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = raw as AppLocale;
  const collection = getCollection(slug);
  if (!collection) return {};

  return {
    title: collection.title[locale],
    description: collection.intro[locale].slice(0, 160),
    alternates: alternatesFor({ pathname: "/collecties/[slug]", params: { slug } }, locale),
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  setRequestLocale(raw);
  const locale = raw as AppLocale;

  const collection = getCollection(slug);
  if (!collection) notFound();

  const t = await getTranslations("collections");
  const catalogT = await getTranslations("catalog");
  const products = getProductsByCategory(collection.category);

  return (
    <div className="wy-shell" style={{ paddingBlock: "clamp(3rem, 7vw, 5.5rem)" }}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Well’s of Yunnan", url: absoluteUrl("/", locale) },
          { name: t("title"), url: absoluteUrl("/collecties", locale) },
          {
            name: collection.title[locale],
            url: absoluteUrl({ pathname: "/collecties/[slug]", params: { slug } }, locale),
          },
        ])}
      />

      <nav aria-label={t("title")} className="wy-meta">
        <span>
          <Link href="/collecties" className="wy-link">
            {t("title")}
          </Link>
        </span>
        <span aria-current="page">{collection.title[locale]}</span>
      </nav>

      <header className="wy-grid mt-8 gap-y-4">
        <div className="wy-margin">
          {collection.hanzi ? (
            <p className="wy-hanzi text-[1.75rem] text-pine">{collection.hanzi}</p>
          ) : null}
          <p className="wy-label mt-2 tnum">{t("count", { count: products.length })}</p>
        </div>
        <div className="wy-main">
          <h1>{collection.title[locale]}</h1>
          {/* The introduction is the reason the collection exists. */}
          <p className="wy-prose mt-6">{collection.intro[locale]}</p>
        </div>
      </header>

      <div className="wy-grid mt-16">
        <div className="wy-main">
          <h2 id="wy-in-collection" className="wy-label pb-3 wy-rule-b">
            {t("inCollection")}
          </h2>
        </div>
      </div>

      <div className="mt-10">
        <ProductGrid products={products} locale={locale} labelledBy="wy-in-collection" />
      </div>

      <p className="mt-16">
        <Link href="/thee" className="wy-btn">
          {catalogT("title")}
        </Link>
      </p>
    </div>
  );
}
