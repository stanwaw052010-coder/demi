"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/catalog/ProductCard";
import type { Product, Subcategory } from "@/lib/types";

interface Props {
  products: Product[];
  subcategories: Subcategory[];
  categoryName: string;
  vehicleName: string;
}

export default function CategoryCatalog({ products, subcategories, categoryName, vehicleName }: Props) {
  const [activeSub, setActiveSub] = useState<string | null>(null);

  const relevantSubs = subcategories.filter((sub) =>
    products.some((p) => p.subcategory === sub.slug)
  );

  const filtered = activeSub
    ? products.filter((p) => p.subcategory === activeSub)
    : products;

  const activeName = relevantSubs.find((s) => s.slug === activeSub)?.name;

  return (
    <>
      {/* Subcategory filter bar */}
      {relevantSubs.length > 1 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <SlidersHorizontal className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold text-gray-700">Підтип:</span>
            {activeSub && (
              <button
                onClick={() => setActiveSub(null)}
                className="ml-auto flex items-center gap-1 text-xs text-gray-400 hover:text-orange-500 transition-colors"
              >
                <X className="w-3 h-3" /> Скинути
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveSub(null)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                activeSub === null
                  ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20"
                  : "bg-white border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600"
              }`}
            >
              Всі
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeSub === null ? "bg-white/25 text-white" : "bg-gray-100 text-gray-500"}`}>
                {products.length}
              </span>
            </button>
            {relevantSubs.map((sub) => {
              const count = products.filter((p) => p.subcategory === sub.slug).length;
              const isActive = activeSub === sub.slug;
              return (
                <button
                  key={sub.slug}
                  onClick={() => setActiveSub(isActive ? null : sub.slug)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                    isActive
                      ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20"
                      : "bg-white border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600"
                  }`}
                >
                  {sub.name}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/25 text-white" : "bg-gray-100 text-gray-500"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          {activeSub && (
            <p className="mt-3 text-sm text-gray-500">
              Показано: <span className="font-semibold text-gray-900">{activeName}</span> · {filtered.length} позицій
            </p>
          )}
        </div>
      )}

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} animate={false} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Товари не знайдено</h3>
          <p className="text-gray-500 mb-4">
            У категорії «{activeName}» для {vehicleName} немає товарів
          </p>
          <button
            onClick={() => setActiveSub(null)}
            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-sm transition-colors"
          >
            Показати всі
          </button>
        </div>
      )}
    </>
  );
}
