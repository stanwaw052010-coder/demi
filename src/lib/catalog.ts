import { products } from "@content/products";
import { collections, collectionBySlug } from "@content/collections";
import { regions, regionById, flavourByKey, flavourAxes } from "@content/taxonomy";
import type {
  Category,
  FlavourAxis,
  Product,
  TeaCategory,
  Variant,
} from "@content/types";

/**
 * The data access layer. Every page reads the catalogue through this module and
 * never imports `content/products` directly, so swapping the source for Sanity
 * or Shopify later is a change in one file.
 */

export const TEA_CATEGORIES: TeaCategory[] = [
  "sheng",
  "shou",
  "oolong",
  "white",
  "red",
  "green",
  "yellow",
  "matcha",
];

export const ALL_CATEGORIES: Category[] = [...TEA_CATEGORIES, "teaware", "sets"];

export function getAllProducts(): Product[] {
  return products;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeatured(limit = 6): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function getTeas(): Product[] {
  return products.filter((p) => TEA_CATEGORIES.includes(p.category as TeaCategory));
}

export function getCollections() {
  return collections;
}

export function getCollection(slug: string) {
  return collectionBySlug.get(slug);
}

export function getRegions() {
  return regions;
}

export function getMapRegions() {
  return regions.filter((r) => r.onMap);
}

export function getRegion(id: string) {
  return regionById.get(id);
}

export function getRelated(product: Product, limit = 3): Product[] {
  const explicit = (product.related ?? [])
    .map((slug) => getProduct(slug))
    .filter((p): p is Product => Boolean(p));
  if (explicit.length >= limit) return explicit.slice(0, limit);

  const sameCategory = products.filter(
    (p) => p.category === product.category && p.slug !== product.slug && !explicit.includes(p),
  );
  return [...explicit, ...sameCategory].slice(0, limit);
}

/** Cheapest variant, which is what the register row shows. */
export function cheapestVariant(product: Product): Variant {
  return product.variants.reduce((a, b) => (b.price < a.price ? b : a));
}

export function priceFrom(product: Product): number {
  return cheapestVariant(product).price;
}

export function inStock(product: Product): boolean {
  return product.variants.some((v) => v.stock > 0);
}

export function totalStock(product: Product): number {
  return product.variants.reduce((a, v) => a + v.stock, 0);
}

export function findVariant(product: Product, sku: string): Variant | undefined {
  return product.variants.find((v) => v.sku === sku);
}

/** Price per 100 g, so a 25 g pouch and a 357 g cake can be compared. */
export function pricePer100g(variant: Variant): number {
  if (variant.grams <= 0) return variant.price;
  return Math.round((variant.price / variant.grams) * 100);
}

export function harvestRange(): { from: number; to: number } {
  const years = products
    .map((p) => p.passport?.harvestYear)
    .filter((y): y is number => typeof y === "number");
  return { from: Math.min(...years), to: Math.max(...years) };
}

export function harvestYears(): number[] {
  const years = new Set<number>();
  for (const p of products) {
    if (p.passport?.harvestYear) years.add(p.passport.harvestYear);
  }
  return [...years].sort((a, b) => b - a);
}

/** Regions that actually carry stock, for the catalogue facet. */
export function usedRegionIds(): string[] {
  const ids = new Set<string>();
  for (const p of products) {
    if (p.passport?.regionId) ids.add(p.passport.regionId);
  }
  return [...ids];
}

/** Counts the tasting notes of a tea onto the six flavour axes. */
export function flavourProfile(product: Product): Record<FlavourAxis, number> {
  const profile = Object.fromEntries(
    flavourAxes.map((a) => [a, 0]),
  ) as Record<FlavourAxis, number>;
  for (const note of product.notes) {
    const flavour = flavourByKey.get(note);
    if (flavour) profile[flavour.axis] += 1;
  }
  return profile;
}

// ─── Faceted filtering ───────────────────────────────────────────────────────

export interface CatalogFilters {
  type?: Category[];
  region?: string[];
  year?: number[];
  oxidation?: [number, number];
  caffeine?: string[];
  form?: string[];
  maxPrice?: number;
  inStockOnly?: boolean;
}

export type SortKey =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "year-desc"
  | "year-asc"
  | "name";

export function filterProducts(list: Product[], f: CatalogFilters): Product[] {
  return list.filter((p) => {
    if (f.type?.length && !f.type.includes(p.category)) return false;
    if (f.region?.length && !(p.passport && f.region.includes(p.passport.regionId))) return false;
    if (f.year?.length && !(p.passport?.harvestYear && f.year.includes(p.passport.harvestYear)))
      return false;
    if (f.caffeine?.length && !f.caffeine.includes(p.caffeine)) return false;
    if (f.form?.length && !f.form.includes(p.form)) return false;
    if (f.oxidation) {
      const ox = p.passport?.oxidation;
      if (ox === null || ox === undefined) return false;
      if (ox < f.oxidation[0] || ox > f.oxidation[1]) return false;
    }
    if (typeof f.maxPrice === "number" && priceFrom(p) > f.maxPrice) return false;
    if (f.inStockOnly && !inStock(p)) return false;
    return true;
  });
}

const categoryOrder = new Map(ALL_CATEGORIES.map((c, i) => [c, i]));

export function sortProducts(list: Product[], key: SortKey): Product[] {
  const copy = [...list];
  switch (key) {
    case "price-asc":
      return copy.sort((a, b) => priceFrom(a) - priceFrom(b));
    case "price-desc":
      return copy.sort((a, b) => priceFrom(b) - priceFrom(a));
    case "year-desc":
      return copy.sort(
        (a, b) => (b.passport?.harvestYear ?? 0) - (a.passport?.harvestYear ?? 0),
      );
    case "year-asc":
      return copy.sort(
        (a, b) => (a.passport?.harvestYear ?? 9999) - (b.passport?.harvestYear ?? 9999),
      );
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return copy.sort(
        (a, b) =>
          (categoryOrder.get(a.category) ?? 99) - (categoryOrder.get(b.category) ?? 99) ||
          priceFrom(b) - priceFrom(a),
      );
  }
}

/** Everything eligible for the Puerh Vault. */
export function vaultEligibleProducts(): Product[] {
  return products.filter((p) => p.vaultEligible);
}
