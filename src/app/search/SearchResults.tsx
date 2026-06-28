"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";
import { searchProducts } from "@/lib/products";
import ProductCard from "@/components/catalog/ProductCard";

export default function SearchResults() {
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const results = query ? searchProducts(query) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors mb-8">
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

      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} animate={false} />
          ))}
        </div>
      )}
    </div>
  );
}
