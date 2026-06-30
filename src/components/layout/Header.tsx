"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Phone,
  ChevronDown,
  Truck,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { vehicles } from "@/lib/vehicles";
import { categories } from "@/lib/categories";
import { searchAll, isCatalogItem } from "@/lib/search";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  // Closing transient menus on navigation isn't derivable during render (no prop
  // it can compute from), so it has to stay an effect despite the compiler hint.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setVehicleMenuOpen(false);
    setCatalogMenuOpen(false);
  }, [pathname]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const searchResults = useMemo(
    () => (searchQuery.length >= 2 ? searchAll(searchQuery, 6) : []),
    [searchQuery]
  );

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
      <div className="border-b border-white/5 bg-[#0a0a0a] text-xs text-gray-400">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <a
              href="tel:+380672546266"
              className="flex items-center gap-1.5 transition-colors hover:text-orange-400"
            >
              <Phone className="h-3 w-3" />
              +38 (067) 254-62-66
            </a>
            <a
              href="tel:+380991129526"
              className="hidden items-center gap-1.5 transition-colors hover:text-orange-400 lg:flex"
            >
              +38 (099) 112-95-26
            </a>
            <span className="hidden items-center gap-1.5 sm:flex">
              <Truck className="h-3 w-3 text-green-500" />
              Доставка по Україні
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:block">Пн–Сб: 9:00–18:00</span>
            <Link href="/contact" className="transition-colors hover:text-orange-400">
              Контакти
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled || !isHome
            ? "border-b border-white/5 bg-[#0d0d0d]/95 shadow-xl shadow-black/20 backdrop-blur-xl"
            : "bg-[#0d0d0d]"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center gap-4 lg:gap-8">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 text-white"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
              </div>
              <div className="leading-none">
                <div className="text-lg font-bold tracking-wide text-white">СПРИНТЕР</div>
                <div className="text-[10px] font-medium tracking-widest text-orange-400 uppercase">
                  Автозапчастини
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden flex-1 items-center gap-1 lg:flex">
              {/* Vehicle dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setVehicleMenuOpen(true)}
                onMouseLeave={() => setVehicleMenuOpen(false)}
              >
                <button className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-white/5 hover:text-white">
                  Авто
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      vehicleMenuOpen && "rotate-180"
                    )}
                  />
                </button>
                {vehicleMenuOpen && (
                  <div className="absolute top-full left-0 w-72 pt-2">
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl">
                      {vehicles.map((v) => (
                        <Link
                          key={v.slug}
                          href={`/catalog/${v.slug}`}
                          className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-orange-50"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-lg">
                            🚐
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-orange-600">
                              {v.name}
                            </div>
                            <div className="text-xs text-gray-400">{v.years}</div>
                          </div>
                          {v.badge && (
                            <span className="ml-auto rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-600">
                              {v.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Catalog dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCatalogMenuOpen(true)}
                onMouseLeave={() => setCatalogMenuOpen(false)}
              >
                <button className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-white/5 hover:text-white">
                  Каталог
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      catalogMenuOpen && "rotate-180"
                    )}
                  />
                </button>
                {catalogMenuOpen && (
                  <div className="absolute top-full left-0 w-[520px] pt-2">
                    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl">
                      <div className="grid grid-cols-2 gap-1">
                        {categories.slice(0, 10).map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/catalog/mercedes-sprinter/${cat.slug}`}
                            className="group flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-orange-50"
                          >
                            <span className="text-base">{cat.icon}</span>
                            <div>
                              <div className="text-sm font-medium text-gray-800 transition-colors group-hover:text-orange-600">
                                {cat.name}
                              </div>
                              <div className="text-xs text-gray-400">
                                {cat.count?.toLocaleString()} позицій
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 space-y-1 border-t border-gray-100 pt-3">
                        <Link
                          href="/oils"
                          className="group flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors hover:bg-orange-50"
                        >
                          <span className="text-base">🛢️</span>
                          <div className="text-sm font-medium text-gray-800 transition-colors group-hover:text-orange-600">
                            Моторні оливи
                          </div>
                        </Link>
                        <Link
                          href="/batteries"
                          className="group flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors hover:bg-orange-50"
                        >
                          <span className="text-base">🔋</span>
                          <div className="text-sm font-medium text-gray-800 transition-colors group-hover:text-orange-600">
                            Акумулятори
                          </div>
                        </Link>
                        <Link
                          href="/catalog"
                          className="flex items-center justify-center gap-1.5 py-2 text-sm font-semibold text-orange-500 transition-colors hover:text-orange-600"
                        >
                          Всі категорії →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/delivery"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-white"
              >
                Доставка
              </Link>
              <Link
                href="/about"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-white"
              >
                Про нас
              </Link>
            </nav>

            {/* Search bar desktop */}
            <div ref={searchRef} className="relative hidden max-w-sm flex-1 md:flex">
              <div className="relative w-full">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchOpen(true)}
                  placeholder="Артикул, назва, авто…"
                  className="w-full rounded-xl border border-white/10 bg-white/8 py-2 pr-4 pl-9 text-sm text-gray-200 placeholder-gray-500 transition-all outline-none focus:border-orange-500/50 focus:bg-white/12"
                />
              </div>
              {searchOpen && searchResults.length > 0 && (
                <div className="absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
                  {searchResults.map((r) => {
                    if (isCatalogItem(r)) {
                      return (
                        <Link
                          key={r.sku}
                          href={`/catalog-item/${encodeURIComponent(r.sku)}`}
                          className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-orange-50"
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-lg">
                            🔧
                          </div>
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-gray-900">
                              {r.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              {r.brand} · {r.sku}
                            </div>
                          </div>
                          <div className="ml-auto flex shrink-0 flex-col items-end gap-0.5">
                            <div className="text-sm font-bold text-orange-600">
                              {r.price.toLocaleString()} ₴
                            </div>
                            <span className="rounded-full bg-green-50 px-1.5 py-0.5 text-[10px] font-medium text-green-600">
                              Замовити
                            </span>
                          </div>
                        </Link>
                      );
                    }
                    return (
                      <Link
                        key={r.id}
                        href={`/product/${r.slug}`}
                        className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-orange-50"
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                      >
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                          {r.images[0] ? (
                            <Image
                              src={r.images[0]}
                              alt={r.name}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-sm">
                              🔧
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-gray-900">
                            {r.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {r.brand} · {r.sku}
                          </div>
                        </div>
                        <div className="ml-auto shrink-0 text-sm font-bold text-orange-600">
                          {r.price.toLocaleString()} ₴
                        </div>
                      </Link>
                    );
                  })}
                  <Link
                    href={`/search?q=${encodeURIComponent(searchQuery)}`}
                    className="flex items-center justify-center gap-1.5 border-t border-gray-100 py-3 text-sm font-semibold text-orange-500 transition-colors hover:bg-orange-50"
                    onClick={() => setSearchOpen(false)}
                  >
                    Всі результати за «{searchQuery}» →
                  </Link>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="ml-auto flex items-center gap-1 lg:ml-0">
              {/* Mobile search */}
              <button
                className="rounded-xl p-2.5 text-gray-400 transition-all hover:bg-white/8 hover:text-white md:hidden"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="h-5 w-5" />
              </button>

              <Link
                href="/account/wishlist"
                className="relative rounded-xl p-2.5 text-gray-400 transition-all hover:bg-white/8 hover:text-white"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className="relative rounded-xl p-2.5 text-gray-400 transition-all hover:bg-white/8 hover:text-white"
              >
                <ShoppingCart className="h-5 w-5" />
                {cart.count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                    {cart.count}
                  </span>
                )}
              </Link>

              <Link
                href="/account"
                className="hidden rounded-xl p-2.5 text-gray-400 transition-all hover:bg-white/8 hover:text-white sm:flex"
              >
                <User className="h-5 w-5" />
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="rounded-xl p-2.5 text-gray-400 transition-all hover:bg-white/8 hover:text-white lg:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="border-t border-white/5 px-4 pb-3 md:hidden">
            <div className="relative mt-3">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Пошук запчастин…"
                className="w-full rounded-xl border border-white/10 bg-white/8 py-2.5 pr-4 pl-9 text-sm text-gray-200 placeholder-gray-500 outline-none"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-white/5 bg-[#0d0d0d] pb-4 lg:hidden">
            <div className="mx-auto max-w-7xl space-y-1 px-4 pt-4">
              {vehicles.map((v) => (
                <Link
                  key={v.slug}
                  href={`/catalog/${v.slug}`}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-gray-300 transition-all hover:bg-white/5 hover:text-white"
                >
                  <span className="text-lg">🚐</span>
                  <span className="text-sm font-medium">{v.name}</span>
                </Link>
              ))}
              <div className="mt-2 border-t border-white/5 pt-2">
                <Link
                  href="/catalog"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-300 transition-all hover:bg-white/5 hover:text-white"
                >
                  Весь каталог
                </Link>
                <Link
                  href="/delivery"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-300 transition-all hover:bg-white/5 hover:text-white"
                >
                  Доставка
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-300 transition-all hover:bg-white/5 hover:text-white"
                >
                  Контакти
                </Link>
              </div>
              <div className="border-t border-white/5 pt-3">
                <a
                  href="tel:+380672546266"
                  className="flex items-center gap-2 px-3 text-sm font-semibold text-orange-400"
                >
                  <Phone className="h-4 w-4" />
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
