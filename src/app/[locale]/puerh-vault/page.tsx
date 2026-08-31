import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/lib/alternates";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { vaultSteps, vaultTiers } from "@content/vault";
import { ProductRegister } from "@/components/catalog/ProductRegister";
import { JsonLd, faqJsonLd } from "@/lib/seo";
import { formatPrice } from "@/lib/format";
import { vaultEligibleProducts } from "@/lib/catalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("vaultTitle"), description: t("vaultDescription"),
    alternates: alternatesFor("/puerh-vault", locale as AppLocale),
  };
}

export default async function VaultPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as AppLocale;

  const t = await getTranslations("vault");
  const faqT = await getTranslations("vaultFaq");
  const items = faqT.raw("items") as { q: string; a: string }[];
  const eligible = vaultEligibleProducts();

  return (
    <div className="wy-shell" style={{ paddingBlock: "clamp(3rem, 7vw, 5.5rem)" }}>
      <JsonLd data={faqJsonLd(items)} />

      <header className="wy-grid gap-y-4">
        <div className="wy-margin">
          <p className="wy-hanzi text-[1.75rem] text-pine">存茶</p>
        </div>
        <div className="wy-main">
          <h1>{t("title")}</h1>
          <p className="wy-lead mt-6 text-stone">{t("lede")}</p>
        </div>
      </header>

      {/* ── How it runs. A real sequence, so it is numbered. ─────────────── */}
      <section aria-labelledby="wy-vault-how" className="mt-[var(--section)]">
        <div className="wy-grid">
          <h2 id="wy-vault-how" className="wy-main text-[2rem]">
            {t("howTitle")}
          </h2>
        </div>
        <ol className="mt-10">
          {vaultSteps.map((step) => (
            <li key={step.n} className="wy-grid wy-rule py-8 gap-y-2">
              <div className="wy-margin">
                <span className="tnum wy-label">{String(step.n).padStart(2, "0")}</span>
              </div>
              <div className="wy-main">
                <h3 className="text-[1.375rem]">{step.title[locale]}</h3>
                <p className="wy-prose mt-2 text-[1rem]">{step.text[locale]}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="wy-vault-price" className="mt-[var(--section)]">
        <div className="wy-grid gap-y-4">
          <div className="wy-main">
            <h2 id="wy-vault-price" className="text-[2rem]">
              {t("pricingTitle")}
            </h2>
            <p className="wy-lead mt-4 text-stone">{t("pricingLede")}</p>
          </div>
        </div>

        <div className="wy-grid mt-10">
          <div className="wy-main grid sm:grid-cols-3 gap-x-6 gap-y-8">
            {vaultTiers.map((tier) => (
              <div key={tier.id} className="wy-rule pt-5">
                <h3 className="text-[1.5rem]">{tier.title[locale]}</h3>
                <p className="price text-ui mt-3">
                  {t("perYear", { price: formatPrice(tier.pricePerCakePerYear, locale) })}
                </p>
                <p className="wy-label mt-1 tnum">
                  {t("totalTerm", {
                    price: formatPrice(tier.pricePerCakePerYear * tier.years, locale),
                    years: tier.years,
                  })}
                </p>
                <p className="wy-prose mt-4 text-[1rem]">{tier.detail[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What can go in ───────────────────────────────────────────────── */}
      <section aria-labelledby="wy-vault-eligible" className="mt-[var(--section)]">
        <div className="wy-grid gap-y-4">
          <div className="wy-main">
            <h2 id="wy-vault-eligible" className="text-[2rem]">
              {t("eligibleTitle")}
            </h2>
            <p className="wy-prose mt-4">{t("eligibleBody")}</p>
          </div>
        </div>

        <div className="wy-grid mt-10">
          <div className="wy-main">
            <h3 id="wy-vault-list" className="wy-label pb-2 wy-rule-b">
              {t("eligibleList")}
            </h3>
            <div className="mt-2">
              <ProductRegister products={eligible} locale={locale} labelledBy="wy-vault-list" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Small print ──────────────────────────────────────────────────── */}
      <section aria-labelledby="wy-vault-faq" className="mt-[var(--section)]">
        <div className="wy-grid">
          <h2 id="wy-vault-faq" className="wy-main text-[2rem]">
            {t("faqTitle")}
          </h2>
        </div>
        <div className="mt-10">
          {items.map((item, index) => (
            <div key={index} className="wy-grid wy-rule py-8 gap-y-2">
              <h3 className="wy-margin text-[1.125rem] leading-snug">{item.q}</h3>
              <p className="wy-main wy-prose text-[1rem]">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="wy-grid mt-16">
        <div className="wy-main">
          <Link href={{ pathname: "/thee", query: { form: "cake" } }} className="wy-btn">
            {t("eligibleList")}
          </Link>
        </div>
      </div>
    </div>
  );
}
