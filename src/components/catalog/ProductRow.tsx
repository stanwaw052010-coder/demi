import { getTranslations } from "next-intl/server";
import type { Product } from "@content/types";
import type { AppLocale } from "@/i18n/routing";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { LiquorDrop } from "./LiquorDrop";
import { cheapestVariant, getRegion, inStock } from "@/lib/catalog";
import { formatPrice, formatNumber } from "@/lib/format";

/**
 * A row in the register, not a card. Hairline underneath, no radius, no shadow.
 * The margin data — area, altitude, year — is what a Belgian tea shop cannot
 * put here, which is why the row is shaped like this.
 */
export async function ProductRow({
  product,
  locale,
  showAltitude = true,
}: {
  product: Product;
  locale: AppLocale;
  showAltitude?: boolean;
}) {
  const t = await getTranslations("catalog");
  const state = await getTranslations("state");
  const variant = cheapestVariant(product);
  const region = product.passport ? getRegion(product.passport.regionId) : undefined;
  const available = inStock(product);

  return (
    <li
      className="wy-row grid-cols-[auto_1fr] md:grid-cols-[auto_minmax(0,2.1fr)_minmax(0,1.5fr)_auto_auto] md:items-baseline gap-x-4 md:gap-x-8"
      data-row
    >
      <span className="row-span-2 md:row-span-1 self-center pt-0.5">
        <LiquorDrop liquor={product.liquor} />
      </span>

      <div className="min-w-0">
        <h3 className="text-[1.1875rem] md:text-[1.375rem] leading-tight">
          <TransitionLink
            href={{ pathname: "/thee/[slug]", params: { slug: product.slug } }}
            className="wy-link"
          >
            {product.name}
          </TransitionLink>
        </h3>
        {product.pinyin && product.pinyin !== product.name ? (
          <p className="wy-latin text-[var(--text-micro)] text-stone mt-0.5"
             style={{ fontFamily: "var(--font-display)" }}>
            {product.pinyin}
          </p>
        ) : null}
      </div>

      <p className="col-start-2 md:col-start-3 text-[var(--text-micro)] text-stone min-w-0">
        {region ? (
          <>
            <span className="wy-hanzi text-pine mr-2">{region.hanzi}</span>
            {region.name}
            {showAltitude && product.passport?.altitudeM
              ? `, ${formatNumber(product.passport.altitudeM, locale)} m`
              : ""}
          </>
        ) : (
          <span>{t("noYear")}</span>
        )}
      </p>

      <p className="col-start-2 md:col-start-4 tnum text-[var(--text-micro)] text-stone">
        {product.passport?.harvestYear ?? "—"}
      </p>

      <p className="col-start-2 md:col-start-5 md:text-right">
        <span className="price text-[var(--text-ui)] text-ink">
          {formatPrice(variant.price, locale)}
        </span>
        <span className="wy-label ml-2">
          {variant.label ? variant.label[locale] : t("perGrams", { grams: variant.grams })}
        </span>
        {!available ? (
          <span className="wy-label ml-2 text-amber-ink">{state("soldOut")}</span>
        ) : null}
      </p>
    </li>
  );
}
