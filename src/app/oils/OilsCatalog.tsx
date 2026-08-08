"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { SlidersHorizontal, X, ChevronDown, ChevronUp, ArrowRight, Droplets, ShoppingCart, CheckCircle } from "lucide-react";
import { oils, BRANDS, TYPES, VISCOSITIES, type OilType } from "@/data/oils";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

const TYPE_COLORS: Record<OilType, string> = {
  Синтетичне: "bg-blue-100 text-blue-700",
  Напівсинтетичне: "bg-amber-100 text-amber-700",
  Мінеральне: "bg-green-100 text-green-700",
};

const BRAND_COLORS: Record<string, string> = {
  Aral: "bg-red-500",
  Castrol: "bg-green-600",
  "Mobil 1": "bg-red-600",
  Shell: "bg-yellow-500",
  MOTUL: "bg-blue-700",
  "KROON OIL": "bg-indigo-600",
  Хадо: "bg-orange-600",
};

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full text-left mb-3 group"
      >
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
          {title}
        </span>
        {open ? (
          <ChevronUp className="w-3.5 h-3.5 text-gray-400 group-hover:text-orange-500 transition-colors" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-orange-500 transition-colors" />
        )}
      </button>
      {open && children}
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group mb-2">
      <div
        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
          checked
            ? "bg-orange-500 border-orange-500"
            : "border-gray-300 group-hover:border-orange-400"
        }`}
        onClick={onChange}
      >
        {checked && (
          <svg viewBox="0 0 10 8" className="w-2.5 h-2 text-white fill-current">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span
        onClick={onChange}
        className={`text-sm transition-colors ${
          checked ? "text-gray-900 font-medium" : "text-gray-600 group-hover:text-gray-900"
        }`}
      >
        {label}
      </span>
    </label>
  );
}

export default function OilsCatalog() {
  const { addToCart, isInCart } = useCart();
  const [addedId, setAddedId] = useState<number | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [selectedTypes, setSelectedTypes] = useState<Set<OilType>>(new Set());
  const [selectedViscosities, setSelectedViscosities] = useState<Set<string>>(new Set());
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleAdd = (oil: typeof oils[0]) => {
    addToCart({
      productId: `oil-${oil.id}`,
      quantity: 1,
      price: oil.price,
      name: `${oil.brand} ${oil.name}`,
      image: oil.image,
      sku: `OIL-${oil.id}`,
      brand: oil.brand,
    });
    setAddedId(oil.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const toggleBrand = (b: string) =>
    setSelectedBrands((prev) => {
      const next = new Set(prev);
      next.has(b) ? next.delete(b) : next.add(b);
      return next;
    });

  const toggleType = (t: OilType) =>
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      next.has(t) ? next.delete(t) : next.add(t);
      return next;
    });

  const toggleViscosity = (v: string) =>
    setSelectedViscosities((prev) => {
      const next = new Set(prev);
      next.has(v) ? next.delete(v) : next.add(v);
      return next;
    });

  const clearFilters = () => {
    setSelectedBrands(new Set());
    setSelectedTypes(new Set());
    setSelectedViscosities(new Set());
  };

  const activeFiltersCount =
    selectedBrands.size + selectedTypes.size + selectedViscosities.size;

  const filtered = useMemo(() => {
    return oils.filter((p) => {
      if (selectedBrands.size > 0 && !selectedBrands.has(p.brand)) return false;
      if (selectedTypes.size > 0 && !selectedTypes.has(p.type)) return false;
      if (selectedViscosities.size > 0 && !selectedViscosities.has(p.viscosity))
        return false;
      return true;
    });
  }, [selectedBrands, selectedTypes, selectedViscosities]);

  const Sidebar = () => (
    <div className="space-y-0">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-gray-900 text-sm">Фільтри</h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-orange-500 hover:text-orange-700 font-semibold transition-colors"
          >
            <X className="w-3 h-3" /> Скинути ({activeFiltersCount})
          </button>
        )}
      </div>

      <FilterSection title="Бренд">
        <div>
          {BRANDS.map((b) => (
            <Checkbox
              key={b}
              label={b}
              checked={selectedBrands.has(b)}
              onChange={() => toggleBrand(b)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Тип оливи">
        <div>
          {TYPES.map((t) => (
            <Checkbox
              key={t}
              label={t}
              checked={selectedTypes.has(t)}
              onChange={() => toggleType(t)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="В'язкість">
        <div className="flex flex-wrap gap-2">
          {VISCOSITIES.map((v) => (
            <button
              key={v}
              onClick={() => toggleViscosity(v)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                selectedViscosities.has(v)
                  ? "bg-orange-500 border-orange-500 text-white"
                  : "border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-600"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </FilterSection>

      <div className="pt-2">
        <a
          href="tel:+380672546266"
          className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-orange-600 border border-orange-200 hover:bg-orange-50 rounded-xl transition-colors"
        >
          Допомога з підбором
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header banner */}
      <div className="bg-[#0a0a0a] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <a href="/shop" className="hover:text-orange-400 transition-colors">
              Головна
            </a>
            <span>/</span>
            <a href="/#catalog" className="hover:text-orange-400 transition-colors">
              Каталог
            </a>
            <span>/</span>
            <span className="text-orange-400 font-medium">Моторна олива</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-orange-400" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Моторна олива
                </h1>
              </div>
              <p className="text-gray-400 text-sm max-w-xl">
                Понад <span className="text-orange-400 font-semibold">493 позиції</span> від провідних брендів.
                Підбір за в&apos;язкістю, допуском OEM та типом двигуна.
              </p>
            </div>
            <a
              href="tel:+380672546266"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-colors shrink-0"
            >
              Допомога з підбором
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile filter bar */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <p className="text-sm text-gray-600">
            <span className="font-bold text-gray-900">{filtered.length}</span> позицій
          </p>
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 bg-white rounded-xl text-sm font-semibold text-gray-700 hover:border-orange-300 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Фільтри
            {activeFiltersCount > 0 && (
              <span className="ml-1 w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile sidebar overlay */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-80 bg-white shadow-2xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-gray-900">Фільтри</h2>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <Sidebar />
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="w-full mt-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors text-sm"
              >
                Показати {filtered.length} результатів
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
              <Sidebar />
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {/* Result count */}
            <div className="hidden lg:flex items-center justify-between mb-5">
              <p className="text-sm text-gray-600">
                Знайдено{" "}
                <span className="font-bold text-gray-900">{filtered.length}</span>{" "}
                позицій
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="ml-3 text-orange-500 hover:text-orange-700 font-semibold transition-colors"
                  >
                    Скинути фільтри
                  </button>
                )}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                  <Droplets className="w-7 h-7 text-gray-300" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Нічого не знайдено</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Спробуйте змінити або скинути фільтри
                </p>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-colors"
                >
                  Скинути фільтри
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-lg hover:shadow-orange-50 transition-all duration-300 hover:-translate-y-0.5 flex flex-col overflow-hidden group"
                  >
                    {/* Product image */}
                    <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute top-2 left-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${TYPE_COLORS[product.type]}`}>
                          {product.type}
                        </span>
                      </div>
                      {!product.inStock && (
                        <div className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-800/80 text-gray-300">
                          Під замовлення
                        </div>
                      )}
                    </div>

                    {/* Card top brand bar */}
                    <div className={`h-1 ${BRAND_COLORS[product.brand] ?? "bg-gray-400"}`} />

                    <div className="p-4 flex flex-col flex-1">
                      {/* Brand + viscosity */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                          {product.brand}
                        </span>
                        <div className="flex gap-1">
                          <span className="px-2 py-0.5 bg-orange-50 border border-orange-100 text-orange-700 text-xs font-bold rounded-lg">
                            {product.viscosity}
                          </span>
                          <span className="px-2 py-0.5 bg-gray-50 border border-gray-100 text-gray-600 text-xs font-semibold rounded-lg">
                            {product.volume} л
                          </span>
                        </div>
                      </div>

                      {/* Name */}
                      <h3 className="text-sm font-bold text-gray-900 leading-snug mb-3 group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>

                      {/* Specs */}
                      <div className="space-y-1 mb-3 flex-1">
                        {product.acea.length > 0 && (
                          <div className="flex gap-1.5 text-xs">
                            <span className="text-gray-400 shrink-0 font-medium w-10">ACEA</span>
                            <span className="text-gray-700 font-semibold">{product.acea.join(" | ")}</span>
                          </div>
                        )}
                        {product.api.length > 0 && (
                          <div className="flex gap-1.5 text-xs">
                            <span className="text-gray-400 shrink-0 font-medium w-10">API</span>
                            <span className="text-gray-700 font-semibold">{product.api.join(" | ")}</span>
                          </div>
                        )}
                        {product.oem.length > 0 && (
                          <div className="flex gap-1.5 text-xs">
                            <span className="text-gray-400 shrink-0 font-medium w-10">OEM</span>
                            <span className="text-gray-600 leading-relaxed">
                              {product.oem.slice(0, 2).join(" · ")}
                              {product.oem.length > 2 && <span className="text-gray-400"> +{product.oem.length - 2}</span>}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Price + Cart */}
                      <div className="mt-auto pt-3 border-t border-gray-50 flex items-end justify-between">
                        <div>
                          <div className="text-lg font-black text-gray-900">{formatPrice(product.price)}</div>
                          {product.priceOld && (
                            <div className="text-xs text-gray-400 line-through">{formatPrice(product.priceOld)}</div>
                          )}
                          <div className={`text-xs font-semibold flex items-center gap-1 mt-0.5 ${product.inStock ? "text-green-600" : "text-amber-500"}`}>
                            <CheckCircle className="w-3 h-3" />
                            {product.inStock ? "В наявності" : "Під замовлення"}
                          </div>
                        </div>
                        <button
                          onClick={() => handleAdd(product)}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                            addedId === product.id
                              ? "bg-green-500 text-white"
                              : isInCart(`oil-${product.id}`)
                              ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                              : "bg-orange-500 text-white hover:bg-orange-600 hover:shadow-md hover:shadow-orange-500/20"
                          }`}
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          {addedId === product.id ? "Додано!" : isInCart(`oil-${product.id}`) ? "В кошику" : "Купити"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Contact CTA */}
            {filtered.length > 0 && (
              <div className="mt-10 p-8 bg-[#0a0a0a] rounded-2xl text-center">
                <div className="text-white font-bold text-lg mb-2">
                  Потрібна допомога з підбором?
                </div>
                <p className="text-gray-400 text-sm mb-5">
                  Наш спеціаліст підбере оптимальну оливу за характеристиками вашого авто
                </p>
                <a
                  href="tel:+380672546266"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 text-sm"
                >
                  Зателефонувати
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
