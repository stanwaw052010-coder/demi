import { getTranslations } from "next-intl/server";
import type { Product } from "@content/types";
import type { AppLocale } from "@/i18n/routing";
import { getRegion } from "@/lib/catalog";
import { formatMonthYear, formatNumber } from "@/lib/format";

/**
 * The batch passport. This is the whole differentiator, so it is a plain
 * label/value table with a hairline per row — no dots, no dashes, no
 * decoration. A field we do not know is printed as unknown rather than left out.
 */
export async function Passport({
  product,
  locale,
}: {
  product: Product;
  locale: AppLocale;
}) {
  const t = await getTranslations("product");
  const caffeineT = await getTranslations("caffeine");
  const roastT = await getTranslations("roast");
  const formT = await getTranslations("form");
  const p = product.passport;

  const rows: { label: string; value: string }[] = [];
  const region = p ? getRegion(p.regionId) : undefined;

  if (region) {
    rows.push({ label: t("region"), value: region.name });
    rows.push({ label: t("province"), value: region.province[locale] });
  }
  if (p) {
    rows.push({
      label: t("altitude"),
      value: p.altitudeM === null ? t("notReported") : `${formatNumber(p.altitudeM, locale)} m`,
    });
    rows.push({
      label: t("harvest"),
      value:
        p.harvestYear === null
          ? t("notReported")
          : formatMonthYear(p.harvestYear, p.harvestMonth, locale),
    });
    rows.push({
      label: t("producer"),
      value: p.producer ? p.producer[locale] : t("notReported"),
    });
    if (p.cultivar) rows.push({ label: t("cultivar"), value: p.cultivar });
    if (p.oxidation !== null) {
      rows.push({ label: t("oxidation"), value: t("percent", { value: p.oxidation }) });
    }
    if (p.fermentation) {
      rows.push({ label: t("fermentation"), value: p.fermentation[locale] });
    }
    rows.push({ label: t("roast"), value: roastT(p.roast) });
  }

  rows.push({ label: t("form"), value: formT(product.form) });
  rows.push({ label: t("caffeine"), value: caffeineT(product.caffeine) });
  if (p) rows.push({ label: t("storage"), value: p.storage[locale] });

  return (
    <section aria-labelledby="wy-passport" className="mt-10">
      <h2 id="wy-passport" className="wy-label pb-2 wy-rule-b">
        {t("passport")}
      </h2>
      <dl className="text-[var(--text-micro)]">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[9rem_minmax(0,1fr)] gap-4 py-2.5 wy-rule-b items-baseline"
          >
            <dt className="text-stone">{row.label}</dt>
            <dd className="text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>

      {p?.unknown ? (
        <div className="mt-6 pl-4" style={{ borderLeft: "2px solid var(--color-sage)" }}>
          <p className="wy-label">{t("unknownLabel")}</p>
          <p className="wy-prose mt-1 text-[1rem]">{p.unknown[locale]}</p>
        </div>
      ) : null}
    </section>
  );
}
