import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/lib/alternates";
import type { AppLocale } from "@/i18n/routing";
import { Seal } from "@/components/brand/Logo";
import { COMPANY } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("aboutTitle"), description: t("aboutDescription"),
    alternates: alternatesFor("/over-ons", locale as AppLocale),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const content = await getTranslations("aboutContent");
  const sections = content.raw("sections") as { heading: string; body: string }[];

  return (
    <div className="wy-shell" style={{ paddingBlock: "clamp(3rem, 7vw, 5.5rem)" }}>
      <header className="wy-grid">
        <div className="wy-main">
          <h1>{t("title")}</h1>
          <p className="wy-lead mt-5 text-stone">{t("lede")}</p>
        </div>
      </header>

      <div className="mt-16">
        {sections.map((section, index) => (
          <section key={index} className="wy-grid wy-rule py-10 gap-y-3">
            <h2 className="wy-margin text-[1.25rem] leading-snug">{section.heading}</h2>
            <p className="wy-main wy-prose">{section.body}</p>
          </section>
        ))}
      </div>

      {/*
        The cinnabar seal appears here and nowhere else on the site. It belongs
        to the certificate of origin, which is the one document we actually put
        our mark on.
      */}
      <section aria-labelledby="wy-cert" className="wy-grid mt-[var(--section)] gap-y-8">
        <div className="wy-margin">
          <Seal size={104} label={t("sealAlt")} />
          <p className="wy-label mt-4" style={{ maxWidth: "24ch" }}>
            {t("sealCaption")}
          </p>
        </div>
        <div className="wy-main">
          <h2 id="wy-cert" className="text-[2rem]">
            {t("certificateTitle")}
          </h2>
          <dl className="text-micro mt-8 max-w-[34rem]">
            {[
              [COMPANY.legalName, `${COMPANY.shop.street}, ${COMPANY.shop.postcode} ${COMPANY.shop.city}`],
              [t("vatLabel"), COMPANY.vat],
              [
                t("storagePlace"),
                `${COMPANY.warehouse.street}, ${COMPANY.warehouse.postcode} ${COMPANY.warehouse.city}`,
              ],
            ].map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[9rem_minmax(0,1fr)] gap-4 py-2.5 wy-rule-b items-baseline"
              >
                <dt className="text-stone">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
