import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { Filters, type FacetGroup } from "@/components/catalog/Filters";
import { SortSelect } from "@/components/catalog/SortSelect";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import {
  ALL_CATEGORIES,
  filterProducts,
  getAllProducts,
  getRegion,
  harvestYears,
  inStock,
  sortProducts,
  usedRegionIds,
  OXIDATION_BANDS,
  PRICE_BANDS,
  type CatalogFilters,
  type SortKey,
} from "@/lib/catalog";
import type { Category } from "@content/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const path = locale === "nl" ? "/nl/thee" : "/en/tea";
  return {
    title: t("catalogTitle"),
    description: t("catalogDescription"),
    alternates: {
      canonical: path,
      languages: { nl: "/nl/thee", en: "/en/tea", "x-default": "/nl/thee" },
    },
  };
}

const asArray = (value: string | string[] | undefined): string[] =>
  value === undefined ? [] : Array.isArray(value) ? value : [value];

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as AppLocale;
  const query = await searchParams;

  const t = await getTranslations("catalog");
  const categoryT = await getTranslations("category");
  const caffeineT = await getTranslations("caffeine");
  const formT = await getTranslations("form");

  const all = getAllProducts();

  const filters: CatalogFilters = {
    type: asArray(query.type).filter((v): v is Category =>
      (ALL_CATEGORIES as string[]).includes(v),
    ),
    region: asArray(query.region),
    year: asArray(query.year).map(Number).filter((n) => !Number.isNaN(n)),
    caffeine: asArray(query.caffeine),
    form: asArray(query.form),
    oxidation: asArray(query.oxidation),
    price: asArray(query.price),
    inStockOnly: query.stock === "1",
  };

  const sort = (typeof query.sort === "string" ? query.sort : "relevance") as SortKey;
  const results = sortProducts(filterProducts(all, filters), sort);

  /** Counts are computed against the other facets, so a facet never shows zero
      for something that is reachable by unticking only itself. */
  const countFor = (key: keyof CatalogFilters, value: string | number) => {
    const probe: CatalogFilters = { ...filters, [key]: [value] } as CatalogFilters;
    return filterProducts(all, probe).length;
  };

  const groups: FacetGroup[] = [
    {
      key: "type",
      label: t("filterType"),
      options: ALL_CATEGORIES.map((category) => ({
        value: category,
        label: categoryT(category),
        count: countFor("type", category),
      })).filter((o) => o.count > 0 || filters.type?.includes(o.value as Category)),
    },
    {
      key: "region",
      label: t("filterRegion"),
      options: usedRegionIds()
        .map((id) => ({
          value: id,
          label: getRegion(id)?.name ?? id,
          count: countFor("region", id),
        }))
        .filter((o) => o.count > 0 || filters.region?.includes(o.value))
        .sort((a, b) => a.label.localeCompare(b.label)),
    },
    {
      key: "year",
      label: t("filterYear"),
      options: harvestYears().map((year) => ({
        value: String(year),
        label: String(year),
        count: countFor("year", year),
      })),
    },
    {
      key: "oxidation",
      label: t("filterOxidation"),
      options: OXIDATION_BANDS.map((band) => ({
        value: band.id,
        label: t(
          band.id === "none"
            ? "oxNone"
            : band.id === "light"
              ? "oxLight"
              : band.id === "medium"
                ? "oxMedium"
                : "oxFull",
        ),
        count: countFor("oxidation", band.id),
      })).filter((o) => o.count > 0 || filters.oxidation?.includes(o.value)),
    },
    {
      key: "price",
      label: t("filterPrice"),
      options: PRICE_BANDS.map((band) => ({
        value: band.id,
        label: t(
          band.id === "under20" ? "priceUnder20" : band.id === "20to35" ? "price20to35" : "priceOver35",
        ),
        count: countFor("price", band.id),
      })).filter((o) => o.count > 0 || filters.price?.includes(o.value)),
    },
    {
      key: "caffeine",
      label: t("filterCaffeine"),
      options: (["low", "medium", "high", "none"] as const).map((level) => ({
        value: level,
        label: caffeineT(level),
        count: countFor("caffeine", level),
      })).filter((o) => o.count > 0),
    },
    {
      key: "form",
      label: t("filterForm"),
      options: (["loose", "cake", "tuocha", "powder", "object", "voucher"] as const).map(
        (form) => ({
          value: form,
          label: formT(form),
          count: countFor("form", form),
        }),
      ).filter((o) => o.count > 0),
    },
  ];

  const base = locale === "nl" ? "/nl/thee" : "/en/tea";

  return (
    <div className="wy-shell" style={{ paddingBlock: "clamp(3rem, 7vw, 6rem)" }}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Well’s of Yunnan", url: `${SITE_URL}/${locale}` },
          { name: t("title"), url: `${SITE_URL}${base}` },
        ])}
      />

      <header className="wy-grid gap-y-6">
        <div className="wy-main">
          <h1>{t("title")}</h1>
          <p className="wy-lead mt-5 text-stone">{t("lede")}</p>
        </div>
      </header>

      <div className="wy-grid mt-16 gap-y-10">
        <aside className="wy-margin lg:sticky lg:top-20 lg:self-start lg:max-h-[80svh] lg:overflow-y-auto">
          <Filters groups={groups} inStockLabel={t("onlyInStock")} />
        </aside>

        <div className="wy-main">
          <div className="flex flex-wrap items-baseline justify-between gap-4 pb-5 wy-rule-b">
            <p className="tnum text-[var(--text-micro)] text-stone" aria-live="polite">
              {t("resultCount", { count: results.length })}
            </p>
            <SortSelect />
          </div>

          {results.length === 0 ? (
            <div className="py-20 max-w-[38ch]">
              <h2 className="text-[1.5rem]">{t("emptyTitle")}</h2>
              <p className="wy-prose mt-3 text-[1rem]">{t("emptyBody")}</p>
            </div>
          ) : (
            <div className="mt-10">
              <ProductGrid products={results} locale={locale} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
