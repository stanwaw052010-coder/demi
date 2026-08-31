import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/lib/alternates";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { getCollections, getProductsByCategory } from "@/lib/catalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "collections" });
  return { title: t("title"), description: t("lede"),
    alternates: alternatesFor("/collecties", locale as AppLocale),
  };
}

export default async function CollectionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as AppLocale;
  const t = await getTranslations("collections");

  return (
    <div className="wy-shell" style={{ paddingBlock: "clamp(3rem, 7vw, 5.5rem)" }}>
      <header className="wy-grid">
        <div className="wy-main">
          <h1>{t("title")}</h1>
          <p className="wy-lead mt-5 text-stone">{t("lede")}</p>
        </div>
      </header>

      <ul className="mt-16">
        {getCollections().map((collection) => {
          const count = getProductsByCategory(collection.category).length;
          return (
            <li key={collection.slug} className="wy-rule">
              <Link
                href={{ pathname: "/collecties/[slug]", params: { slug: collection.slug } }}
                className="wy-grid py-9 gap-y-3 group"
              >
                <div className="wy-margin flex items-baseline gap-3">
                  <span
                    className="wy-drop"
                    data-full="true"
                    style={{
                      ["--drop" as string]: `var(--color-liquor-${collection.liquor})`,
                      width: "1.1rem",
                      height: "1.1rem",
                    }}
                    aria-hidden="true"
                  />
                  {collection.hanzi ? (
                    <span className="wy-hanzi text-[1.125rem] text-pine">{collection.hanzi}</span>
                  ) : null}
                </div>
                <div className="wy-main">
                  <h2 className="text-[1.75rem] leading-tight">
                    <span className="wy-link">{collection.title[locale]}</span>
                    <span className="wy-label ml-3 tnum">{t("count", { count })}</span>
                  </h2>
                  <p className="wy-prose mt-3 text-[1rem]">
                    {collection.intro[locale].split(". ").slice(0, 2).join(". ")}.
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
