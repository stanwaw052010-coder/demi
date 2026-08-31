import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/lib/alternates";
import type { AppLocale } from "@/i18n/routing";
import { COMPANY } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("lede"),
    alternates: alternatesFor("/contact", locale as AppLocale),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const about = await getTranslations("about");

  const blocks = [
    { title: t("addressTitle"), body: t("addressBody") },
    { title: t("hoursTitle"), body: t("hoursBody") },
    { title: t("warehouseTitle"), body: t("warehouseBody") },
  ];

  return (
    <div className="wy-shell" style={{ paddingBlock: "clamp(3rem, 7vw, 5.5rem)" }}>
      <header className="wy-grid">
        <div className="wy-main">
          <h1>{t("title")}</h1>
          <p className="wy-lead mt-5 text-stone">{t("lede")}</p>
        </div>
      </header>

      <div className="wy-grid mt-16 gap-y-10">
        <div className="wy-margin space-y-8">
          <div>
            <h2 className="wy-label pb-2 wy-rule-b">{t("emailTitle")}</h2>
            <p className="mt-2">
              <a href={`mailto:${COMPANY.email}`} className="wy-link text-ui">
                {COMPANY.email}
              </a>
            </p>
          </div>
          <div>
            <h2 className="wy-label pb-2 wy-rule-b">{t("phoneTitle")}</h2>
            <p className="mt-2">
              <a href={`tel:${COMPANY.phoneHref}`} className="wy-link tnum text-ui">
                {COMPANY.phone}
              </a>
            </p>
          </div>
        </div>

        <div className="wy-main grid sm:grid-cols-3 gap-8">
          {blocks.map((block) => (
            <section key={block.title}>
              <h2 className="wy-label pb-2 wy-rule-b">{block.title}</h2>
              <p className="wy-prose mt-3 text-[1rem]">{block.body}</p>
            </section>
          ))}
        </div>
      </div>

      <div className="wy-grid mt-20">
        <div className="wy-main">
          <h2 className="wy-label pb-2 wy-rule-b">{t("companyTitle")}</h2>
          <dl className="text-micro mt-3">
            <div className="grid grid-cols-[9rem_minmax(0,1fr)] gap-4 py-2 wy-rule-b">
              <dt className="text-stone">{COMPANY.legalName}</dt>
              <dd>
                {COMPANY.shop.street}, {COMPANY.shop.postcode} {COMPANY.shop.city}
              </dd>
            </div>
            <div className="grid grid-cols-[9rem_minmax(0,1fr)] gap-4 py-2 wy-rule-b">
              <dt className="text-stone">{about("vatLabel")}</dt>
              <dd className="tnum">{COMPANY.vat}</dd>
            </div>
          </dl>
          <p className="wy-label mt-6">
            {t("quoteOrderNumber")}
          </p>
        </div>
      </div>
    </div>
  );
}
