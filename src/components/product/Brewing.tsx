import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Gongfu, Western } from "@content/types";

/** Gongfu parameters as data, with the western method underneath as the
    alternative it is — deliberately secondary, and honest about the trade. */
export async function Brewing({
  gongfu,
  western,
}: {
  gongfu: Gongfu;
  western: Western | null;
}) {
  const t = await getTranslations("product");
  const vesselT = await getTranslations("vessel");

  const rows: [string, string][] = [
    [t("gongfuVessel"), `${vesselT(gongfu.vessel)}, ${gongfu.vesselMl} ml`],
    [t("gongfuLeaf"), `${gongfu.grams} g`],
    [t("gongfuTemp"), `${gongfu.celsius} °C`],
    [
      t("gongfuRinse"),
      gongfu.rinseSeconds === null ? t("gongfuNoRinse") : `${gongfu.rinseSeconds} s`,
    ],
    [t("gongfuFirst"), `${gongfu.firstSeconds} s`],
    [t("gongfuStep"), `+${gongfu.incrementSeconds} s`],
    [t("gongfuCount"), String(gongfu.infusions)],
  ];

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <section aria-labelledby="wy-gongfu">
        <h2 id="wy-gongfu" className="wy-label pb-2 wy-rule-b">
          {t("gongfu")}
        </h2>
        <dl className="text-[var(--text-micro)]">
          {rows.map(([label, value]) => (
            <div
              key={label}
              className="grid grid-cols-[9rem_minmax(0,1fr)] gap-4 py-2.5 wy-rule-b items-baseline"
            >
              <dt className="text-stone">{label}</dt>
              <dd className="tnum text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {western ? (
        <section aria-labelledby="wy-western">
          <h2 id="wy-western" className="wy-label pb-2 wy-rule-b">
            {t("western")}
          </h2>
          <dl className="text-[var(--text-micro)]">
            <div className="grid grid-cols-[9rem_minmax(0,1fr)] gap-4 py-2.5 wy-rule-b items-baseline">
              <dt className="text-stone">{t("gongfuLeaf")}</dt>
              <dd className="tnum">{t("westernLeaf", { grams: western.grams, ml: western.ml })}</dd>
            </div>
            <div className="grid grid-cols-[9rem_minmax(0,1fr)] gap-4 py-2.5 wy-rule-b items-baseline">
              <dt className="text-stone">{t("gongfuTemp")}</dt>
              <dd className="tnum">{t("westernTemp", { celsius: western.celsius })}</dd>
            </div>
            <div className="grid grid-cols-[9rem_minmax(0,1fr)] gap-4 py-2.5 wy-rule-b items-baseline">
              <dt className="text-stone">{t("gongfuFirst")}</dt>
              <dd className="tnum">{t("westernTime", { minutes: western.minutes })}</dd>
            </div>
            <div className="grid grid-cols-[9rem_minmax(0,1fr)] gap-4 py-2.5 wy-rule-b items-baseline">
              <dt className="text-stone">{t("gongfuCount")}</dt>
              <dd className="tnum">{t("westernResteeps", { count: western.resteeps })}</dd>
            </div>
          </dl>
          <p className="wy-prose mt-4 text-[1rem]">{t("westernLede")}</p>
          <Link
            href={{ pathname: "/zetgids/[slug]", params: { slug: "gongfu" } }}
            className="wy-link-static text-[var(--text-micro)] mt-4 inline-block"
          >
            {t("gongfu")}
          </Link>
        </section>
      ) : null}
    </div>
  );
}
