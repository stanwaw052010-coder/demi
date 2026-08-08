"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowLeft, Phone } from "lucide-react";
import { searchAll, isCatalogItem, getCategoryLabel, getVehicleLabel } from "@/lib/search";
import ProductCard from "@/components/catalog/ProductCard";

export default function SearchResults() {
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const results = query ? searchAll(query, 60) : [];

  const detailed = results.filter((r) => !isCatalogItem(r));
  const catalog = results.filter(isCatalogItem);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> На головну
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
          {query ? `Результати: «${query}»` : "Пошук запчастин"}
        </h1>
        {query && (
          <p className="text-gray-500 text-sm">
            {results.length > 0 ? `Знайдено ${results.length} позицій` : "Нічого не знайдено"}
          </p>
        )}
      </div>

      {!query && (
        <div className="text-center py-20">
          <Search className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Введіть запит у рядку пошуку</p>
        </div>
      )}

      {query && results.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Нічого не знайдено</h3>
          <p className="text-gray-500 mb-6">Спробуйте інший запит або зверніться до нас</p>
          <a
            href="tel:+380672546266"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors"
          >
            Зателефонувати
          </a>
        </div>
      )}

      {detailed.length > 0 && (
        <div className="mb-10">
          {catalog.length > 0 && (
            <h2 className="text-lg font-bold text-gray-800 mb-4">Детальні товари</h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {detailed.map((r) => {
              if (isCatalogItem(r)) return null;
              return <ProductCard key={r.id} product={r} animate={false} />;
            })}
          </div>
        </div>
      )}

      {catalog.length > 0 && (
        <div>
          {detailed.length > 0 && (
            <h2 className="text-lg font-bold text-gray-800 mb-4">Каталог (доступні для замовлення)</h2>
          )}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {catalog.map((r, i) => (
              <Link
                key={r.sku}
                href={`/catalog-item/${encodeURIComponent(r.sku)}`}
                className={`flex items-center gap-4 px-5 py-4 hover:bg-orange-50 transition-colors ${i > 0 ? "border-t border-gray-50" : ""}`}
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 shrink-0 flex items-center justify-center text-xl">🔧</div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-gray-900">{r.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {r.brand} · <span className="font-mono">{r.sku}</span>
                    {r.vehicles && (
                      <span className="ml-2 text-gray-300">· {getVehicleLabel(r.vehicles)}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-bold text-orange-600">{r.price.toLocaleString()} ₴</div>
                    <div className="text-xs text-gray-400">{getCategoryLabel(r.category)}</div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-lg hover:bg-orange-600 transition-colors">
                    <Phone className="w-3 h-3" />
                    Замовити
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
