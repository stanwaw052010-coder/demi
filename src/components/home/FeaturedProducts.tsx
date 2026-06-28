"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, Heart, ArrowRight, Zap } from "lucide-react";
import { getFeaturedProducts } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { formatPrice, staggerContainer, fadeUp } from "@/lib/utils";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";

export default function FeaturedProducts() {
  const products = getFeaturedProducts();
  const { addToCart, isInCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (p: typeof products[0]) => {
    addToCart({
      productId: p.id,
      quantity: 1,
      price: p.price,
      name: p.name,
      image: p.images[0] ?? "",
      sku: p.sku,
      brand: p.brand,
    });
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-12">
            <div>
              <span className="inline-block text-sm font-semibold text-orange-500 uppercase tracking-widest mb-3">
                Популярне
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Хіти продажів
              </h2>
            </div>
            <Link
              href="/catalog"
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
            >
              Весь каталог <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((p) => (
              <motion.div
                key={p.id}
                variants={fadeUp}
                className="group bg-white rounded-3xl border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-50 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image area */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {p.images[0] ? (
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-20">🔧</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {p.isNew && <Badge variant="blue">Новинка</Badge>}
                    {p.isBestseller && (
                      <Badge variant="orange">
                        <Zap className="w-2.5 h-2.5 mr-0.5" />
                        Хіт
                      </Badge>
                    )}
                    {p.priceOld && (
                      <Badge variant="red">
                        -{Math.round(((p.priceOld - p.price) / p.priceOld) * 100)}%
                      </Badge>
                    )}
                  </div>
                  {/* Wishlist */}
                  <button
                    onClick={() => toggle(p.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${isWishlisted(p.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                    />
                  </button>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="text-xs text-gray-400 font-medium mb-1">{p.brand}</div>
                  <Link href={`/product/${p.slug}`}>
                    <h3 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors leading-snug line-clamp-2">
                      {p.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-3">
                    <Rating value={p.rating} size="sm" />
                    <span className="text-xs text-gray-400">({p.reviewCount})</span>
                  </div>

                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded-full font-semibold">
                      {p.inStock ? "В наявності" : "Під замовлення"}
                    </span>
                    <span className="text-xs text-gray-400">· Арт: {p.sku}</span>
                  </div>

                  <div className="mt-auto pt-4 flex items-end justify-between">
                    <div>
                      <div className="text-xl font-black text-gray-900">{formatPrice(p.price)}</div>
                      {p.priceOld && (
                        <div className="text-xs text-gray-400 line-through">{formatPrice(p.priceOld)}</div>
                      )}
                    </div>
                    <button
                      onClick={() => handleAdd(p)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        addedId === p.id
                          ? "bg-green-500 text-white"
                          : isInCart(p.id)
                          ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                          : "bg-orange-500 text-white hover:bg-orange-600 hover:shadow-md hover:shadow-orange-500/20"
                      }`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      {addedId === p.id ? "Додано!" : isInCart(p.id) ? "В кошику" : "До кошика"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="text-center mt-10 sm:hidden">
            <Link href="/catalog" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-orange-500 text-orange-600 font-bold rounded-xl hover:bg-orange-500 hover:text-white transition-all">
              Весь каталог <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
