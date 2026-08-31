import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { Hero } from "@/components/home/Hero";
import { EightTeas, type TeaPanel } from "@/components/home/EightTeas";
import { OriginMap } from "@/components/home/OriginMap";
import { GongfuSteps } from "@/components/home/GongfuSteps";
import { Newsletter } from "@/components/home/Newsletter";
import { ProductRegister } from "@/components/catalog/ProductRegister";
import { Reveal } from "@/components/ui/Reveal";
import {
  getAllProducts,
  getFeatured,
  getProductsByCategory,
  TEA_CATEGORIES,
} from "@/lib/catalog";
import { articles } from "@content/journal";
import { tastings } from "@content/tastings";
import { collections } from "@content/collections";
import { formatDate, formatPrice } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("homeTitle"), description: t("homeDescription") };
}

/** Oxidation bands as they are actually made, in processing order. */
const OXIDATION: Record<string, [number, number]> = {
  green: [0, 5],
  yellow: [5, 10],
  white: [5, 15],
  sheng: [5, 12],
  oolong: [20, 60],
  red: [85, 95],
  shou: [0, 0],
  matcha: [0, 0],
};

const PANEL_ORDER = ["green", "yellow", "white", "matcha", "oolong", "red", "sheng", "shou"] as const;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as AppLocale;

  const t = await getTranslations("home");
  const actions = await getTranslations("actions");
  const catalog = await getTranslations("catalog");
  const journalT = await getTranslations("journal");
  const tastingsT = await getTranslations("tastings");
  const category = await getTranslations("category");

  const featured = getFeatured(6);
  const total = getAllProducts().length;

  const panels: TeaPanel[] = PANEL_ORDER.map((key) => {
    const collection = collections.find((c) => c.category === key);
    const items = getProductsByCategory(key);
    const band = OXIDATION[key] ?? [0, 0];
    return {
      category: key,
      hanzi: collection?.hanzi ?? "",
      label: category(key),
      collectionSlug: collection?.slug ?? "sheng-puerh",
      oxidation:
        key === "shou"
          ? catalog("oxPostFermented")
          : key === "matcha"
            ? catalog("oxNone")
            : catalog("oxidationBand", { from: band[0], to: band[1] }),
      count: items.length,
      note: collection ? collection.intro[locale].split(". ")[0] + "." : "",
    };
  }).filter((p) => TEA_CATEGORIES.includes(p.category));

  const lead = articles[0];
  const nextTasting = tastings[0];

  return (
    <>
      <Hero />

      <EightTeas panels={panels} />

      {/* ── Now in the pot: the register, not a grid of cards ─────────────── */}
      <Reveal as="section" className="wy-shell wy-section wy-rule">
        <div className="wy-grid items-end gap-y-6">
          <div className="wy-main">
            <h2 id="wy-pot">{t("potTitle")}</h2>
            <p className="wy-lead mt-3 text-stone">{t("potLede")}</p>
          </div>
          <div className="md:col-start-12 md:col-span-1 col-span-6 md:text-right">
            <Link href="/thee" className="wy-link text-micro whitespace-nowrap">
              {actions("allBatches", { count: total })}
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <ProductRegister products={featured} locale={locale} labelledBy="wy-pot" />
        </div>
      </Reveal>

      {/* ── Where it comes from ───────────────────────────────────────────── */}
      <section aria-labelledby="wy-origin" className="wy-shell wy-section wy-rule">
        <div className="wy-grid gap-y-8">
          <div className="wy-margin">
            <p className="wy-hanzi text-[1.5rem] text-pine">产地</p>
          </div>
          <div className="wy-main">
            <h2 id="wy-origin">{t("originTitle")}</h2>
            <p className="wy-lead mt-4 text-stone">{t("originLede")}</p>
          </div>
        </div>

        <OriginMap locale={locale} />

        <div className="wy-grid mt-12">
          <div className="wy-margin">
            <p className="wy-label">{t("originReadMore")}</p>
          </div>
          <div className="wy-main">
            <p className="wy-prose">{t("originHonesty")}</p>
            <Link
              href={{ pathname: "/journaal/[slug]", params: { slug: "wat-er-op-het-etiket-staat" } }}
              className="wy-link-static text-micro mt-5 inline-block"
            >
              {t("originReadMore")}
            </Link>
          </div>
        </div>
      </section>

      <GongfuSteps locale={locale} />

      {/* ── Journal and Vault, asymmetric ─────────────────────────────────── */}
      <Reveal as="section" className="wy-shell wy-section wy-rule">
        <div className="wy-grid gap-y-14">
          <div className="col-span-6 md:col-span-5">
            <h2 className="text-[1.375rem] font-sans font-medium">{t("journalTitle")}</h2>
            <article className="mt-6 wy-rule pt-6">
              <h3 className="text-[1.625rem] leading-tight">
                <Link
                  href={{ pathname: "/journaal/[slug]", params: { slug: lead.slug } }}
                  className="wy-link"
                >
                  {lead.title[locale]}
                </Link>
              </h3>
              <p className="wy-prose mt-3 text-[1rem]">{lead.lede[locale]}</p>
              <p className="wy-meta mt-4">
                <span>{formatDate(lead.date, locale)}</span>
                <span>{journalT("readingTime", { minutes: lead.minutes })}</span>
              </p>
            </article>
          </div>

          <div className="col-span-6 md:col-span-6 md:col-start-7">
            <div className="bg-mist p-8 md:p-12 h-full flex flex-col">
              <p className="wy-hanzi text-[1.375rem] text-pine">存茶</p>
              <h2 className="text-[2rem] mt-3">{t("vaultTitle")}</h2>
              <p className="wy-prose mt-4 text-[1rem]">{t("vaultLede")}</p>
              <Link href="/puerh-vault" className="wy-btn mt-8 self-start">
                {actions("howItWorks")}
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── Tastings ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="wy-tastings" className="wy-shell wy-section wy-rule">
        <div className="wy-grid gap-y-8 items-end">
          <div className="wy-main">
            <h2 id="wy-tastings">{t("tastingsTitle")}</h2>
            <p className="wy-lead mt-4 text-stone">{t("tastingsLede")}</p>
          </div>
        </div>

        <div className="wy-grid mt-10">
          <div className="wy-main">
            <div className="wy-rule pt-5 flex flex-wrap items-baseline gap-x-8 gap-y-2">
              <p className="wy-label">{t("tastingsNext")}</p>
              <h3 className="text-[1.375rem] flex-1 min-w-[16rem]">
                <Link href="/proeverijen" className="wy-link">
                  {nextTasting.title[locale]}
                </Link>
              </h3>
              <p className="wy-meta">
                <span>{formatDate(nextTasting.date, locale)}</span>
                <span>{nextTasting.venue.split(",")[0]}</span>
                <span className="tnum">
                  {tastingsT("perSeat", { price: formatPrice(nextTasting.price, locale) })}
                </span>
                <span>{tastingsT("seatsLeft", { count: nextTasting.seatsLeft })}</span>
              </p>
            </div>
            <Link href="/proeverijen" className="wy-btn mt-8">
              {actions("reserveSeat")}
            </Link>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
