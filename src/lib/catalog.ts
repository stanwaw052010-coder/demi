import { products } from "@content/products";
import { collections, collectionBySlug } from "@content/collections";
import { regions, regionById, flavourByKey, flavourAxes } from "@content/taxonomy";
import type {
  Badge,
  Category,
  FlavourAxis,
  OolongStyle,
  Product,
  TeaCategory,
  Variant,
} from "@content/types";

/**
 * The data access layer. Every page reads the catalogue through this module and
 * never imports `content/products` directly, so swapping the source for Sanity
 * or Shopify later is a change in one file.
 */

/** Shelf order: the two pu-erhs, the dark family, then by oxidation. */
export const TEA_CATEGORIES: TeaCategory[] = [
  "shou",
  "sheng",
  "heicha",
  "oolong",
  "gaba",
  "black",
  "white",
  "green",
  "yellow",
  "matcha",
  "flavoured",
];

export const OOLONG_STYLES = ["rock", "light", "dancong", "taiwan"] as const;

/** The price ladder from Pricing. One base per 25 g drives every format. */
const LADDER: Record<number, number> = {
  10: 0.45,
  25: 1,
  50: 1.8,
  100: 3.3,
  250: 7.5,
};

/** Round to the nearest price ending in ,50 or ,90. */
export function tidyPrice(cents: number): number {
  const euros = cents / 100;
  const base = Math.floor(euros);
  const candidates = [base - 1 + 0.9, base + 0.5, base + 0.9, base + 1.5];
  let best = candidates[1];
  for (const candidate of candidates) {
    if (candidate > 0 && Math.abs(candidate - euros) < Math.abs(best - euros)) {
      best = candidate;
    }
  }
  return Math.round(best * 100);
}

/**
 * A floor under the 10 g proefje. The ladder puts the sampler at 0,45 x the
 * 25 g price, which on the cheapest tea in the catalogue lands at € 0,90 — less
 * than the pouch, the label and the picking cost together, and a price that
 * reads as a giveaway rather than an invitation. The floor is deliberately low
 * enough to touch only that one tea.
 */
const SAMPLER_FLOOR = 150;

const skuFor = (slug: string, grams: number) =>
  `WY-${slug.toUpperCase().replace(/[^A-Z0-9]+/g, "").slice(0, 10)}-${grams}`;

/**
 * Every format a product is sold in. Derived from the ladder where there is a
 * base price, taken verbatim where there is not (teaware, vouchers, sets).
 */
export function variantsFor(product: Product): Variant[] {
  if (product.variants) return product.variants;
  const pricing = product.pricing;
  if (!pricing) return [];

  const stock = pricing.stock ?? 24;
  const formats = [...new Set([10, ...(pricing.formats ?? [25, 50, 100])])].sort(
    (a, b) => a - b,
  );

  const loose: Variant[] = formats.map((grams) => {
    const laddered = tidyPrice(pricing.base * (LADDER[grams] ?? grams / 25));
    return {
      sku: skuFor(product.slug, grams),
      grams,
      price: grams === 10 ? Math.max(laddered, SAMPLER_FLOOR) : laddered,
      stock,
    };
  });

  if (!pricing.pressed) return loose;

  const { grams, price, kind, stock: pressedStock } = pricing.pressed;
  const label =
    kind === "cake"
      ? { nl: `cake ${grams} g`, en: `cake ${grams} g` }
      : kind === "brick"
        ? { nl: `baksteen ${grams} g`, en: `brick ${grams} g` }
        : { nl: `tuocha ${grams} g`, en: `tuocha ${grams} g` };

  return [...loose, { sku: skuFor(product.slug, grams), grams, price, stock: pressedStock, label }];
}

/** Badges shown on the card. The sampler badge follows from the ladder. */
export function badgesFor(product: Product): Badge[] {
  const authored = product.badges ?? [];
  const hasSampler = variantsFor(product).some((v) => v.grams === 10);
  return hasSampler && !authored.includes("sampler")
    ? [...authored, "sampler"]
    : authored;
}

/** The 10 g sampler, when there is one. Drives the "samplers under €5" sort. */
export function samplerFor(product: Product): Variant | undefined {
  return variantsFor(product).find((v) => v.grams === 10);
}

export const ALL_CATEGORIES: Category[] = [...TEA_CATEGORIES, "teaware", "sets"];

/** The four oolong styles, in the order the sub-facet lists them. */
export const OOLONG_STYLE_IDS = ["rock", "light", "dancong", "taiwan"] as const;

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
  const variants = variantsFor(product);
  return variants.reduce((a, b) => (b.price < a.price ? b : a));
}

/** The 25 g reference price, which is what the shelf quotes. */
export function referenceVariant(product: Product): Variant {
  const variants = variantsFor(product);
  return variants.find((v) => v.grams === 25) ?? cheapestVariant(product);
}

export function priceFrom(product: Product): number {
  return cheapestVariant(product).price;
}

export function inStock(product: Product): boolean {
  return variantsFor(product).some((v) => v.stock > 0);
}

export function totalStock(product: Product): number {
  return variantsFor(product).reduce((a, v) => a + v.stock, 0);
}

export function findVariant(product: Product, sku: string): Variant | undefined {
  return variantsFor(product).find((v) => v.sku === sku);
}

export function getProductsByStyle(style: OolongStyle): Product[] {
  return products.filter((p) => p.style === style);
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
  /** Oolong only: rock, light, dancong, taiwan. */
  style?: string[];
  region?: string[];
  year?: number[];
  /** Ids from OXIDATION_BANDS. */
  oxidation?: string[];
  caffeine?: string[];
  form?: string[];
  /** Ids from PRICE_BANDS, applied to the cheapest variant. */
  price?: string[];
  inStockOnly?: boolean;
}

/** Oxidation as the trade actually talks about it, not as a slider. */
export const OXIDATION_BANDS = [
  { id: "none", min: 0, max: 15 },
  { id: "light", min: 16, max: 45 },
  { id: "medium", min: 46, max: 70 },
  { id: "full", min: 71, max: 100 },
] as const;

/** Price bands on the cheapest way into a tea, in euro cents. */
export const PRICE_BANDS = [
  { id: "under20", min: 0, max: 1999 },
  { id: "20to35", min: 2000, max: 3499 },
  { id: "over35", min: 3500, max: Number.MAX_SAFE_INTEGER },
] as const;

export type SortKey =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "year-desc"
  | "year-asc"
  | "name"
  | "samplers";

export function filterProducts(list: Product[], f: CatalogFilters): Product[] {
  return list.filter((p) => {
    if (f.type?.length && !f.type.includes(p.category)) return false;
    if (f.style?.length && !(p.style && f.style.includes(p.style))) return false;
    if (f.region?.length && !(p.passport && f.region.includes(p.passport.regionId))) return false;
    if (f.year?.length && !(p.passport?.harvestYear && f.year.includes(p.passport.harvestYear)))
      return false;
    if (f.caffeine?.length && !f.caffeine.includes(p.caffeine)) return false;
    if (f.form?.length && !f.form.includes(p.form)) return false;
    if (f.oxidation?.length) {
      const ox = p.passport?.oxidation;
      if (ox === null || ox === undefined) return false;
      const bands = OXIDATION_BANDS.filter((b) => f.oxidation!.includes(b.id));
      if (!bands.some((b) => ox >= b.min && ox <= b.max)) return false;
    }
    if (f.price?.length) {
      const cents = priceFrom(p);
      const bands = PRICE_BANDS.filter((b) => f.price!.includes(b.id));
      if (!bands.some((b) => cents >= b.min && cents <= b.max)) return false;
    }
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
    case "samplers": {
      // Everything with a 10 g sampler under five euro, cheapest first. This is
      // the sort that removes the fear of buying tea you have never tasted.
      const cheap = copy.filter((p) => {
        const sampler = samplerFor(p);
        return sampler && sampler.price < 500;
      });
      return cheap.sort((a, b) => (samplerFor(a)?.price ?? 0) - (samplerFor(b)?.price ?? 0));
    }
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
