"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { SlidersHorizontal, X, ChevronDown, ChevronUp, Zap, ShoppingCart, CheckCircle } from "lucide-react";
import { batteries, BATTERY_BRANDS, BATTERY_TECHS, BATTERY_CAPACITIES } from "@/lib/batteries";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

const TECH_COLORS = {
  AGM: "bg-blue-100 text-blue-700",
  EFB: "bg-purple-100 text-purple-700",
  WET: "bg-green-100 text-green-700",
  GEL: "bg-amber-100 text-amber-700",
};

const BRAND_COLORS: Record<string, string> = {
  Bosch: "bg-blue-600",
  Varta: "bg-indigo-600",
  Optima: "bg-yellow-500",
  Exide: "bg-red-600",
  Banner: "bg-green-600",
  Moll: "bg-gray-700",
};

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full text-left mb-3 group"
      >
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{title}</span>
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

export default function BatteriesCatalog() {
  const { addToCart, isInCart } = useCart();
  const [addedId, setAddedId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedCapacities, setSelectedCapacities] = useState<number[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const toggleArr = <T,>(arr: T[], val: T) =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  const filtered = useMemo(() => {
    return batteries.filter((b) => {
      if (selectedBrands.length && !selectedBrands.includes(b.brand)) return false;
      if (selectedTechs.length && !selectedTechs.includes(b.technology)) return false;
      if (selectedCapacities.length && !selectedCapacities.includes(b.capacity)) return false;
      if (inStockOnly && !b.inStock) return false;
      return true;
    });
  }, [selectedBrands, selectedTechs, selectedCapacities, inStockOnly]);

  const handleAdd = (b: typeof batteries[0]) => {
    addToCart({
      productId: `bat-${b.id}`,
      quantity: 1,
      price: b.price,
      name: `${b.brand} ${b.name}`,
      image: b.image,
      sku: `BAT-${b.id}`,
      brand: b.brand,
    });
    setAddedId(b.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const filters = (
    <div className="space-y-0">
      <FilterSection title="Бренд">
        <div className="space-y-2">
          {BATTERY_BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => setSelectedBrands((p) => toggleArr(p, brand))}
                className="w-4 h-4 rounded accent-orange-500"
              />
              <div className={`w-2.5 h-2.5 rounded-full ${BRAND_COLORS[brand] ?? "bg-gray-400"}`} />
              <span className="text-sm text-gray-700 group-hover:text-orange-600 transition-colors">{brand}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Технологія">
        <div className="flex flex-wrap gap-2">
          {BATTERY_TECHS.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTechs((p) => toggleArr(p, tech))}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                selectedTechs.includes(tech)
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:border-orange-300"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Ємність (Ah)">
        <div className="flex flex-wrap gap-2">
          {BATTERY_CAPACITIES.map((cap) => (
            <button
              key={cap}
              onClick={() => setSelectedCapacities((p) => toggleArr(p, cap))}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                selectedCapacities.includes(cap)
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:border-orange-300"
              }`}
            >
              {cap} Ah
            </button>
          ))}
        </div>
      </FilterSection>

      <div className="flex items-center gap-2.5 pt-2">
        <input
          id="instock-bat"
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
          className="w-4 h-4 rounded accent-orange-500"
        />
        <label htmlFor="instock-bat" className="text-sm text-gray-700 cursor-pointer">
          Лише в наявності
        </label>
      </div>

      {(selectedBrands.length > 0 || selectedTechs.length > 0 || selectedCapacities.length > 0 || inStockOnly) && (
        <button
          onClick={() => { setSelectedBrands([]); setSelectedTechs([]); setSelectedCapacities([]); setInStockOnly(false); }}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-orange-50 text-gray-600 hover:text-orange-600 rounded-xl text-sm font-medium transition-all"
        >
          <X className="w-3.5 h-3.5" /> Скинути фільтри
        </button>
      )}
    </div>
  );

  return (
    <section className="min-h-screen bg-gray-50 pb-20">
      {/* Page header */}
      <div className="bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-orange-500/5 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Акумулятори
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-xl">
            Оригінальні акумулятори для Mercedes Sprinter, Vito, VW Crafter та LT.
            AGM, EFB, WET — всі технології в наявності.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <span className="text-sm text-gray-500">{batteries.length} позицій</span>
            <span className="text-gray-600">·</span>
            <span className="text-sm text-green-400">{batteries.filter((b) => b.inStock).length} в наявності</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-5">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 hover:border-orange-300 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Фільтри
          </button>
          {sidebarOpen && (
            <div className="mt-3 bg-white rounded-2xl border border-gray-200 p-5">
              {filters}
            </div>
          )}
        </div>

        <div className="flex gap-7">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sticky top-24">
              <div className="text-sm font-bold text-gray-900 mb-5 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-orange-500" />
                Фільтри
              </div>
              {filters}
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm text-gray-500 font-medium">
                Знайдено: <span className="text-gray-900 font-bold">{filtered.length}</span> акумуляторів
              </span>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                <div className="text-5xl mb-4">🔋</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Нічого не знайдено</h3>
                <p className="text-gray-500">Змініть фільтри або зверніться до нас</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-3xl border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-50 transition-all duration-300 p-6 flex flex-col"
                  >
                    {/* Brand + tech */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${BRAND_COLORS[b.brand] ?? "bg-gray-400"}`} />
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{b.brand}</span>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${TECH_COLORS[b.technology]}`}>
                        {b.technology}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="relative h-36 -mx-6 -mt-0 mb-4 overflow-hidden rounded-t-none">
                      <Image
                        src={b.image}
                        alt={`${b.brand} ${b.name}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
                    </div>

                    <h3 className="text-sm font-bold text-gray-900 mb-1 leading-snug">{b.brand} {b.name}</h3>

                    {/* Specs grid */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4 text-xs text-gray-500">
                      <div><span className="font-medium text-gray-700">{b.capacity} Ah</span> · ємність</div>
                      <div><span className="font-medium text-gray-700">{b.coldCranking} A</span> · пусковий</div>
                      <div><span className="font-medium text-gray-700">{b.voltage} В</span> · напруга</div>
                      <div><span className="font-medium text-gray-700">{b.weight} кг</span> · вага</div>
                    </div>

                    {/* Compatibility */}
                    <div className="mb-4 flex flex-wrap gap-1">
                      {b.suitableFor.slice(0, 2).map((s) => (
                        <span key={s} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-lg leading-tight">
                          {s}
                        </span>
                      ))}
                      {b.suitableFor.length > 2 && (
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-400 rounded-lg">
                          +{b.suitableFor.length - 2}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto flex items-end justify-between pt-2">
                      <div>
                        <div className="text-xl font-black text-gray-900">{formatPrice(b.price)}</div>
                        {b.priceOld && (
                          <div className="text-xs text-gray-400 line-through">{formatPrice(b.priceOld)}</div>
                        )}
                        <div className={`text-xs font-semibold mt-0.5 flex items-center gap-1 ${b.inStock ? "text-green-600" : "text-amber-500"}`}>
                          <CheckCircle className="w-3 h-3" />
                          {b.inStock ? "В наявності" : "Під замовлення"}
                        </div>
                      </div>
                      <button
                        onClick={() => handleAdd(b)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          addedId === b.id
                            ? "bg-green-500 text-white"
                            : isInCart(`bat-${b.id}`)
                            ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                            : "bg-orange-500 text-white hover:bg-orange-600 hover:shadow-md hover:shadow-orange-500/20"
                        }`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        {addedId === b.id ? "Додано!" : isInCart(`bat-${b.id}`) ? "В кошику" : "Купити"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
