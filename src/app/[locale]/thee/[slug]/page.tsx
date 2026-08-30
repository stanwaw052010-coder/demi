import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { ProductImage } from "@/components/visuals/ProductImage";
import { Gallery } from "@/components/product/Gallery";
import { Passport } from "@/components/product/Passport";
import { FlavourWheel } from "@/components/product/FlavourWheel";
import { Brewing } from "@/components/product/Brewing";
import { GongfuTimer } from "@/components/product/GongfuTimer";
import { AddToCart } from "@/components/product/AddToCart";
import { StickyBuy } from "@/components/product/StickyBuy";
import { Reviews } from "@/components/product/Reviews";
import { ProductRegister } from "@/components/catalog/ProductRegister";
import { JsonLd, breadcrumbJsonLd, productJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { formatPrice } from "@/lib/format";
import {
  cheapestVariant,
  getAllProducts,
  getProduct,
  getRegion,
  getRelated,
} from "@/lib/catalog";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllProducts().map((product) => ({ locale, slug: product.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = raw as AppLocale;
  const product = getProduct(slug);
  if (!product) return {};

  const t = await getTranslations({ locale, namespace: "meta" });
  const region = product.passport ? getRegion(product.passport.regionId) : undefined;

  const description = t("productDescription", {
    name: product.name,
    region: region?.name ?? "Yunnan",
    year: product.passport?.harvestYear ?? "",
  });

  return {
    title: product.name,
    description,
    alternates: {
      canonical: locale === "nl" ? `/nl/thee/${slug}` : `/en/tea/${slug}`,
      languages: {
        nl: `/nl/thee/${slug}`,
        en: `/en/tea/${slug}`,
        "x-default": `/nl/thee/${slug}`,
      },
    },
    openGraph: {
      title: `${product.name} — Well’s of Yunnan`,
      description,
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  setRequestLocale(raw);
  const locale = raw as AppLocale;

  const product = getProduct(slug);
  if (!product) notFound();

  const t = await getTranslations("product");
  const catalogT = await getTranslations("catalog");
  const categoryT = await getTranslations("category");
  const vesselT = await getTranslations("vessel");
  const cartT = await getTranslations("cart");

  const region = product.passport ? getRegion(product.passport.regionId) : undefined;
  const related = getRelated(product, 3);
  const cheapest = cheapestVariant(product);
  const url = `${SITE_URL}/${locale}/${locale === "nl" ? "thee" : "tea"}/${slug}`;

  const alt = `${product.name} — ${product.copy.tagline[locale]}`;
  const views = (["dry", "liquor", "wet", "pack"] as const).map((view) => ({
    key: view,
    node: (
      <ProductImage
        slug={product.slug}
        form={product.form}
        liquor={product.liquor}
        alt={alt}
        view={view}
        shared={view === "dry"}
        priority={view === "dry"}
        sizes="(max-width: 60rem) 92vw, 42vw"
      />
    ),
  }));

  return (
    <div className="wy-shell" style={{ paddingBlock: "clamp(2rem, 4vw, 3.5rem)" }}>
      <JsonLd data={productJsonLd(product, locale, url)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Well’s of Yunnan", url: `${SITE_URL}/${locale}` },
          { name: catalogT("title"), url: `${SITE_URL}/${locale}/${locale === "nl" ? "thee" : "tea"}` },
          { name: product.name, url },
        ])}
      />

      <nav aria-label={t("breadcrumb")} className="wy-meta">
        <span>
          <Link href="/thee" className="wy-link">
            {catalogT("title")}
          </Link>
        </span>
        <span>
          <Link
            href={{ pathname: "/thee", query: { type: product.category } }}
            className="wy-link"
          >
            {categoryT(product.category)}
          </Link>
        </span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="wy-grid mt-8 gap-y-12">
        <div className="col-span-6 lg:col-span-5">
          <Gallery views={views} />
        </div>

        <div className="col-span-6 lg:col-span-6 lg:col-start-7">
          <h1 style={{ fontSize: "clamp(2rem, 1.4rem + 2.2vw, 3rem)" }}>{product.name}</h1>

          {product.hanzi ? (
            <p className="wy-hanzi text-[1.5rem] text-pine mt-2">{product.hanzi}</p>
          ) : null}
          {product.pinyin && product.pinyin !== product.name ? (
            <p
              className="wy-latin text-[var(--text-micro)] text-stone mt-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {product.pinyin}
            </p>
          ) : null}

          <p className="wy-lead mt-5 text-ink">{product.copy.tagline[locale]}</p>
          <p className="wy-prose mt-5">{product.copy.description[locale]}</p>

          <Passport product={product} locale={locale} />

          <div id="wy-buy" className="scroll-mt-24">
            <AddToCart
              slug={product.slug}
              name={product.name}
              liquor={product.liquor}
              vat={product.vat}
              variants={product.variants}
              vaultEligible={product.vaultEligible}
              vaultLabel={cartT("vaultOption")}
            />
          </div>

          {product.vaultEligible ? (
            <p className="wy-label mt-4">
              {t("vault")}{" "}
              <Link href="/puerh-vault" className="wy-link-static text-ink">
                {t("vaultLink")}
              </Link>
            </p>
          ) : null}
        </div>
      </div>

      {/* ── Brewing: the tool, then the flavour, then the numbers ─────────── */}
      {product.gongfu ? (
        <div className="mt-[var(--section)] wy-grid">
          <div className="wy-wide lg:col-span-10">
            <GongfuTimer
              gongfu={product.gongfu}
              liquor={product.liquor}
              vesselLabel={`${vesselT(product.gongfu.vessel)} ${product.gongfu.vesselMl} ml`}
            />
          </div>
        </div>
      ) : product.category === "matcha" ? (
        <section className="mt-[var(--section)] wy-grid">
          <div className="wy-main">
            <h2 className="text-[1.5rem]">{t("matchaTitle")}</h2>
            <p className="wy-prose mt-3">{t("matchaLede")}</p>
            <Link
              href={{ pathname: "/zetgids/[slug]", params: { slug: "matcha" } }}
              className="wy-btn mt-6"
            >
              {t("matchaToGuide")}
            </Link>
          </div>
        </section>
      ) : (
        <p className="wy-label mt-[var(--section)]">{t("objectNoBrewing")}</p>
      )}

      {product.notes.length > 0 || product.gongfu ? (
        <div className="mt-[var(--section)] wy-grid gap-y-14">
          {product.notes.length > 0 ? (
            <div className="col-span-6 lg:col-span-5">
              <FlavourWheel product={product} liquor={product.liquor} />
            </div>
          ) : null}
          {product.gongfu ? (
            <div className="col-span-6 lg:col-span-6 lg:col-start-7">
              <Brewing gongfu={product.gongfu} western={product.western} />
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-[var(--section)] wy-grid gap-y-14">
        <div className="col-span-6 lg:col-span-7">
          <h2 id="wy-related" className="wy-label pb-2 wy-rule-b">
            {t("related")}
          </h2>
          <div className="mt-2">
            <ProductRegister products={related} locale={locale} labelledBy="wy-related" />
          </div>
        </div>
        <div className="col-span-6 lg:col-span-4 lg:col-start-9">
          <Reviews reviews={product.reviews ?? []} locale={locale} />
        </div>
      </div>

      <StickyBuy name={product.name} price={formatPrice(cheapest.price, locale)} />
    </div>
  );
}
