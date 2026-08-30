import type { Product } from "@content/types";
import type { AppLocale } from "@/i18n/routing";
import { ProductCard } from "./ProductCard";

export async function ProductGrid({
  products,
  locale,
  labelledBy,
}: {
  products: Product[];
  locale: AppLocale;
  labelledBy?: string;
}) {
  return (
    <ul
      className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
      aria-labelledby={labelledBy}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.slug}
          product={product}
          locale={locale}
          priority={index < 3}
        />
      ))}
    </ul>
  );
}
