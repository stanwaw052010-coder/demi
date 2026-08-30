import type { Product } from "@content/types";
import type { AppLocale } from "@/i18n/routing";
import { ProductRow } from "./ProductRow";

export async function ProductRegister({
  products,
  locale,
  labelledBy,
}: {
  products: Product[];
  locale: AppLocale;
  labelledBy?: string;
}) {
  return (
    <ul className="wy-rule" aria-labelledby={labelledBy}>
      {products.map((product) => (
        <ProductRow key={product.slug} product={product} locale={locale} />
      ))}
    </ul>
  );
}
