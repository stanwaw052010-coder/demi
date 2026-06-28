"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search, ShoppingCart, Heart, User, Menu, X, Phone, ChevronDown, Truck,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { vehicles } from "@/lib/vehicles";
import { categories } from "@/lib/categories";
import { searchProducts } from "@/lib/products";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [vehicleMenuOpen, setVehicleMenuOpen] = useState(false);
  const [catalogMenuOpen, setCatalogMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setVehicleMenuOpen(false);
    setCatalogMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      setSearchResults(searchProducts(searchQuery).slice(0, 6));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isHome = pathname === "/";

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#0a0a0a] text-gray-400 text-xs border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="tel:+380672546266" className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
              <Phone className="w-3 h-3" />
              +38 (067) 254-62-66
            </a>
            <span className="hidden sm:flex items-center gap-1.5">
              <Truck className="w-3 h-3 text-green-500" />
              Доставка по Україні
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:block">Пн–Сб: 9:00–18:00</span>
            <Link href="/contact" className="hover:text-orange-400 transition-colors">Контакти</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled || !isHome
            ? "bg-[#0d0d0d]/95 backdrop-blur-xl shadow-xl shadow-black/20 border-b border-white/5"
            : "bg-[#0d0d0d]"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4 lg:gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <div className="leading-none">
                <div className="text-white font-bold text-lg tracking-wide">СПРИНТЕР</div>
                <div className="text-[10px] text-orange-400 font-medium tracking-widest uppercase">Автозапчастини</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1 flex-1">
              {/* Vehicle dropdown */}
              <div className="relative" onMouseEnter={() => setVehicleMenuOpen(true)} onMouseLeave={() => setVehicleMenuOpen(false)}>
                <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-300 hover:text-white font-medium rounded-lg hover:bg-white/5 transition-all">
                  Авто
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", vehicleMenuOpen && "rotate-180")} />
                </button>
                {vehicleMenuOpen && (
                  <div className="absolute top-full left-0 pt-2 w-72">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden p-2">
                      {vehicles.map((v) => (
                        <Link
                          key={v.slug}
                          href={`/catalog/${v.slug}`}
                          className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-orange-50 group transition-colors"
                        >
                          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 text-lg">🚐</div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">{v.name}</div>
                            <div className="text-xs text-gray-400">{v.years}</div>
                          </div>
                          {v.badge && (
                            <span className="ml-auto text-xs font-semibold px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full">{v.badge}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Catalog dropdown */}
              <div className="relative" onMouseEnter={() => setCatalogMenuOpen(true)} onMouseLeave={() => setCatalogMenuOpen(false)}>
                <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-300 hover:text-white font-medium rounded-lg hover:bg-white/5 transition-all">
                  Каталог
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", catalogMenuOpen && "rotate-180")} />
                </button>
                {catalogMenuOpen && (
                  <div className="absolute top-full left-0 pt-2 w-[520px]">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4">
                      <div className="grid grid-cols-2 gap-1">
                        {categories.slice(0, 10).map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/catalog/mercedes-sprinter/${cat.slug}`}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-orange-50 group transition-colors"
                          >
                            <span className="text-base">{cat.icon}</span>
                            <div>
                              <div className="text-sm font-medium text-gray-800 group-hover:text-orange-600 transition-colors">{cat.name}</div>
                              <div className="text-xs text-gray-400">{cat.count?.toLocaleString()} позицій</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <Link href="/catalog" className="flex items-center justify-center gap-1.5 py-2 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                          Всі категорії →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/delivery" className="px-3 py-2 text-sm text-gray-400 hover:text-white font-medium rounded-lg hover:bg-white/5 transition-all">
                Доставка
              </Link>
              <Link href="/about" className="px-3 py-2 text-sm text-gray-400 hover:text-white font-medium rounded-lg hover:bg-white/5 transition-all">
                Про нас
              </Link>
            </nav>

            {/* Search bar desktop */}
            <div ref={searchRef} className="hidden md:flex flex-1 max-w-sm relative">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchOpen(true)}
                  placeholder="Артикул, назва, авто…"
                  className="w-full pl-9 pr-4 py-2 bg-white/8 border border-white/10 rounded-xl text-sm text-gray-200 placeholder-gray-500 outline-none focus:bg-white/12 focus:border-orange-500/50 transition-all"
                />
              </div>
              {searchOpen && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  {searchResults.map((p) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.slug}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors"
                      onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gray-100 shrink-0 flex items-center justify-center text-sm">🔧</div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-gray-900 truncate">{p.name}</div>
                        <div className="text-xs text-gray-400">{p.brand} · {p.sku}</div>
                      </div>
                      <div className="ml-auto text-sm font-bold text-orange-600 shrink-0">{p.price.toLocaleString()} ₴</div>
                    </Link>
                  ))}
                  <Link
                    href={`/search?q=${encodeURIComponent(searchQuery)}`}
                    className="flex items-center justify-center gap-1.5 py-3 text-sm font-semibold text-orange-500 border-t border-gray-100 hover:bg-orange-50 transition-colors"
                    onClick={() => setSearchOpen(false)}
                  >
                    Всі результати за «{searchQuery}» →
                  </Link>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 ml-auto lg:ml-0">
              {/* Mobile search */}
              <button
                className="md:hidden p-2.5 text-gray-400 hover:text-white hover:bg-white/8 rounded-xl transition-all"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="w-5 h-5" />
              </button>

              <Link href="/account/wishlist" className="relative p-2.5 text-gray-400 hover:text-white hover:bg-white/8 rounded-xl transition-all">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link href="/cart" className="relative p-2.5 text-gray-400 hover:text-white hover:bg-white/8 rounded-xl transition-all">
                <ShoppingCart className="w-5 h-5" />
                {cart.count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cart.count}
                  </span>
                )}
              </Link>

              <Link href="/account" className="hidden sm:flex p-2.5 text-gray-400 hover:text-white hover:bg-white/8 rounded-xl transition-all">
                <User className="w-5 h-5" />
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden p-2.5 text-gray-400 hover:text-white hover:bg-white/8 rounded-xl transition-all"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3 border-t border-white/5">
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Пошук запчастин…"
                className="w-full pl-9 pr-4 py-2.5 bg-white/8 border border-white/10 rounded-xl text-sm text-gray-200 placeholder-gray-500 outline-none"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/5 bg-[#0d0d0d] pb-4">
            <div className="max-w-7xl mx-auto px-4 pt-4 space-y-1">
              {vehicles.map((v) => (
                <Link
                  key={v.slug}
                  href={`/catalog/${v.slug}`}
                  className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <span className="text-lg">🚐</span>
                  <span className="text-sm font-medium">{v.name}</span>
                </Link>
              ))}
              <div className="border-t border-white/5 pt-2 mt-2">
                <Link href="/catalog" className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                  Весь каталог
                </Link>
                <Link href="/delivery" className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                  Доставка
                </Link>
                <Link href="/contact" className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                  Контакти
                </Link>
              </div>
              <div className="pt-3 border-t border-white/5">
                <a href="tel:+380672546266" className="flex items-center gap-2 text-orange-400 text-sm font-semibold px-3">
                  <Phone className="w-4 h-4" />
                  +38 (067) 254-62-66
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
