import { getTranslations } from "next-intl/server";
import type { Product } from "@content/types";
import type { AppLocale } from "@/i18n/routing";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { LiquorDrop } from "./LiquorDrop";
import { ProductImage } from "@/components/visuals/ProductImage";
import { cheapestVariant, getRegion, inStock } from "@/lib/catalog";
import { formatPrice, formatNumber } from "@/lib/format";

/**
 * A field in the register, not a card: hairline above, square corners, no
 * shadow, and the only hover is the drop filling and the name underlining.
 */
export async function ProductCard({
  product,
  locale,
  priority = false,
}: {
  product: Product;
  locale: AppLocale;
  priority?: boolean;
}) {
  const t = await getTranslations("catalog");
  const state = await getTranslations("state");
  const variant = cheapestVariant(product);
  const region = product.passport ? getRegion(product.passport.regionId) : undefined;
  const available = inStock(product);

  return (
    <li className="wy-row wy-field block" data-row>
      <TransitionLink
        href={{ pathname: "/thee/[slug]", params: { slug: product.slug } }}
        className="block group"
      >
        <ProductImage
          slug={product.slug}
          form={product.form}
          liquor={product.liquor}
          alt={`${product.name} — ${product.copy.tagline[locale]}`}
          priority={priority}
          sizes="(max-width: 40rem) 92vw, (max-width: 72rem) 44vw, 28vw"
        />

        <div className="flex items-baseline gap-2.5 mt-4">
          <LiquorDrop liquor={product.liquor} />
          <h3 className="text-[1.25rem] leading-tight">
            <span className="wy-link">{product.name}</span>
          </h3>
        </div>

        {product.hanzi ? (
          <p className="wy-hanzi text-micro text-stone mt-1 ml-[1.6rem]">
            {product.hanzi}
          </p>
        ) : null}

        <dl className="wy-meta mt-3 ml-[1.6rem]">
          {region ? (
            <div>
              <dt className="sr-only">{t("columnOrigin")}</dt>
              <dd>
                {region.name}
                {product.passport?.altitudeM
                  ? `, ${formatNumber(product.passport.altitudeM, locale)} m`
                  : ""}
              </dd>
            </div>
          ) : null}
          {product.passport?.harvestYear ? (
            <div>
              <dt className="sr-only">{t("columnYear")}</dt>
              <dd className="tnum">{product.passport.harvestYear}</dd>
            </div>
          ) : null}
        </dl>

        <p className="mt-3 ml-[1.6rem]">
          <span className="price text-ui">
            {formatPrice(variant.price, locale)}
          </span>
          <span className="wy-label ml-2">
            {variant.label ? variant.label[locale] : t("perGrams", { grams: variant.grams })}
          </span>
          {!available ? (
            <span className="wy-label ml-2 text-amber-ink">{state("soldOut")}</span>
          ) : null}
        </p>
      </TransitionLink>
    </li>
  );
}
