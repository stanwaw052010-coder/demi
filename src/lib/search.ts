"use client";

import { products } from "./products";
import { catalog, type CatalogRow } from "./catalog";
import type { Product } from "./types";

export interface CatalogItem {
  sku: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  subcategory: string;
  vehicles: string; // "s", "v", "c", "s,v", etc.
  isCatalogOnly: true;
}

export type SearchResult = Product | CatalogItem;

export function isCatalogItem(r: SearchResult): r is CatalogItem {
  return (r as CatalogItem).isCatalogOnly === true;
}

function normalize(s: string) {
  return s.toLowerCase().replace(/[\s\-\.\/\\()]/g, "");
}

function matchesCatalogRow(row: CatalogRow, q: string, qn: string): boolean {
  const [sku, name, brand] = row;
  return (
    sku.toLowerCase().includes(q) ||
    normalize(sku).includes(qn) ||
    name.toLowerCase().includes(q) ||
    brand.toLowerCase().includes(q)
  );
}

function rowToItem(row: CatalogRow): CatalogItem {
  const [sku, name, brand, price, category, subcategory, vehicles] = row;
  return { sku, name, brand, price, category, subcategory, vehicles, isCatalogOnly: true };
}

const detailedSkus = new Set(products.map((p) => p.sku.toLowerCase()));

export function searchAll(query: string, limit = 30): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];
  const qn = normalize(q);

  // Search detailed products first
  const detailedResults = products.filter((p) => {
    const pn = normalize(p.sku);
    return (
      p.name.toLowerCase().includes(q) ||
      p.nameUK.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      pn.includes(qn) ||
      (p.oem ?? []).some((o) => o.toLowerCase().includes(q) || normalize(o).includes(qn)) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q)
    );
  });

  // Search catalog for items not already in detailed results
  const catalogResults: CatalogItem[] = [];
  for (const row of catalog) {
    if (catalogResults.length + detailedResults.length >= limit) break;
    const sku = row[0].toLowerCase();
    if (detailedSkus.has(sku)) continue; // already shown as detailed product
    if (matchesCatalogRow(row, q, qn)) {
      catalogResults.push(rowToItem(row));
    }
  }

  return [...detailedResults, ...catalogResults].slice(0, limit);
}

export function getVehicleLabel(vehicles: string): string {
  const map: Record<string, string> = {
    s: "Sprinter",
    v: "Vito/Viano",
    c: "Crafter",
    lt: "VW LT",
  };
  return vehicles.split(",").map((k) => map[k] ?? k).join(", ");
}

export function getCategoryLabel(category: string): string {
  const map: Record<string, string> = {
    suspension: "Підвіска",
    brakes: "Гальма",
    engine: "Двигун",
    transmission: "Трансмісія",
    electrical: "Електрика",
    body: "Кузов",
    lighting: "Освітлення",
    fuel: "Паливна система",
    heating: "Опалення",
    interior: "Салон",
    "oils-fluids": "Оливи",
    accessories: "Аксесуари",
  };
  return map[category] ?? category;
}
