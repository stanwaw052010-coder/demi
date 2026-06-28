"use client";

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";
import { getProductById } from "@/lib/products";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import ProductCard from "@/components/catalog/ProductCard";

export default function WishlistView() {
  const { ids } = useWishlist();
  const products = ids.map((id) => getProductById(id)).filter(Boolean) as ReturnType<typeof getProductById>[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb
        items={[
          { label: "Особистий кабінет", href: "/account" },
          { label: "Список бажань" },
        ]}
      />
      <h1 className="text-3xl font-extrabold text-gray-900 mt-8 mb-8">Список бажань</h1>

      {products.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-gray-200">
          <Heart className="w-14 h-14 text-gray-200 mx-auto mb-5" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Список бажань порожній</h3>
          <p className="text-gray-500 mb-8 text-sm">Натисніть ❤ на товарі, щоб зберегти його</p>
          <Link href="/catalog" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors">
            До каталогу <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((p) => p && <ProductCard key={p.id} product={p} animate={false} />)}
        </div>
      )}
    </div>
  );
}
