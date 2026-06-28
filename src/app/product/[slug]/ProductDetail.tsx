"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, Truck, Shield, ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { formatPrice } from "@/lib/utils";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import ProductCard from "@/components/catalog/ProductCard";
import type { Product } from "@/lib/types";

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetail({ product: p, related }: Props) {
  const { addToCart, isInCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState<"specs" | "compat" | "delivery">("specs");

  const handleAdd = () => {
    addToCart({
      productId: p.id,
      quantity: qty,
      price: p.price,
      name: p.name,
      image: p.images[0] ?? "",
      sku: p.sku,
      brand: p.brand,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: "Каталог", href: "/catalog" },
            { label: p.name },
          ]}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
          {/* Image panel */}
          <div>
            <div className="bg-white rounded-3xl border border-gray-200 aspect-square flex items-center justify-center relative overflow-hidden">
              <div className="text-[120px] opacity-30">🔧</div>
              <div className="absolute top-4 left-4 flex gap-2">
                {p.isNew && <Badge variant="blue">Новинка</Badge>}
                {p.isBestseller && (
                  <Badge variant="orange">
                    <Zap className="w-2.5 h-2.5 mr-0.5" />Хіт
                  </Badge>
                )}
                {p.priceOld && (
                  <Badge variant="red">
                    -{Math.round(((p.priceOld - p.price) / p.priceOld) * 100)}%
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Info panel */}
          <div>
            <div className="text-sm text-gray-400 font-medium mb-2">{p.brand} · {p.sku}</div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
              {p.name}
            </h1>

            <div className="flex items-center gap-3 mb-5">
              <Rating value={p.rating} />
              <span className="text-sm text-gray-500">{p.reviewCount} відгуків</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-black text-gray-900">{formatPrice(p.price)}</span>
              {p.priceOld && (
                <span className="text-xl text-gray-400 line-through">{formatPrice(p.priceOld)}</span>
              )}
            </div>

            {/* Stock */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-6 ${p.inStock ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
              <CheckCircle className="w-4 h-4" />
              {p.inStock ? `В наявності · ${p.stockCount} шт` : "Під замовлення"}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-7">{p.description}</p>

            {/* Qty + Add */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-lg font-bold"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-bold text-gray-900">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-lg font-bold"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-2xl font-bold text-sm transition-all duration-200 ${
                  added
                    ? "bg-green-500 text-white"
                    : isInCart(p.id)
                    ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                    : "bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30"
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                {added ? "Додано до кошика!" : isInCart(p.id) ? "В кошику" : "До кошика"}
              </button>
              <button
                onClick={() => toggle(p.id)}
                className="w-12 h-12 rounded-2xl border border-gray-200 flex items-center justify-center hover:border-red-200 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isWishlisted(p.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
              </button>
            </div>

            {/* Trust chips */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl">
                <Truck className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-xs text-gray-600 font-medium">Доставка {p.deliveryDays} дні</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl">
                <Shield className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-xs text-gray-600 font-medium">Гарантія виробника</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden mb-12">
          <div className="flex border-b border-gray-100">
            {([
              { key: "specs", label: "Характеристики" },
              { key: "compat", label: "Сумісність" },
              { key: "delivery", label: "Доставка і оплата" },
            ] as const).map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-6 py-4 text-sm font-semibold transition-colors ${
                  tab === t.key
                    ? "text-orange-600 border-b-2 border-orange-500 -mb-px"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="p-7">
            {tab === "specs" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
                {p.specs.map((s) => (
                  <div key={s.label} className="flex items-center justify-between py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-500">{s.label}</span>
                    <span className="text-sm font-semibold text-gray-900">{s.value}</span>
                  </div>
                ))}
                {p.oem && p.oem.length > 0 && (
                  <div className="flex items-center justify-between py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-500">OEM номери</span>
                    <span className="text-sm font-semibold text-gray-900">{p.oem.join(", ")}</span>
                  </div>
                )}
              </div>
            )}
            {tab === "compat" && (
              <div className="space-y-4">
                {p.compatibility.map((c, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 border-b border-gray-50">
                    <span className="font-semibold text-gray-900 text-sm w-48 shrink-0">{c.vehicle}</span>
                    <span className="text-sm text-gray-500 w-32 shrink-0">{c.years}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {c.engines.map((e) => (
                        <span key={e} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-lg">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === "delivery" && (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <div className="flex gap-3">
                  <Truck className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Нова Пошта — 1–2 дні по Україні</div>
                    <div>Відправляємо щодня до 16:00. Оплата при отриманні або онлайн.</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Самовивіз — Харків</div>
                    <div>Просп. Героїв Харкова, 210. Пн–Сб 9:00–18:00. Безкоштовно.</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Схожі товари</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((rp) => (
                <ProductCard key={rp.id} product={rp} animate={false} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
