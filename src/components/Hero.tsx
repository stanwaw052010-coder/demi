"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Phone, ArrowRight, Shield, Truck, Clock, ChevronDown } from "lucide-react";

const badges = [
  { icon: Shield, text: "Гарантія якості" },
  { icon: Truck, text: "Доставка по Україні" },
  { icon: Clock, text: "Пн–Сб: 9:00–18:00" },
];

const popularSearches = [
  "Фільтр масляний",
  "Гальмівні колодки",
  "Амортизатор",
  "Радіатор охолодження",
  "Свічки запалювання",
];

export default function Hero() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const code = query.replace(/[^a-z0-9]/gi, "");
    if (code) window.location.href = `http://sprinter.org.ua/price/${code}.html`;
  };

  const scrollDown = () => {
    const el = document.querySelector("#stats");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Orange gradient blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-orange-500/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-orange-600/6 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-orange-500/3 blur-[140px] pointer-events-none" />

      {/* Decorative car icon large */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.025] pointer-events-none hidden xl:block">
        <svg viewBox="0 0 200 80" className="w-[700px] h-auto fill-white">
          <path d="M175,40 L160,20 C155,12 148,8 140,8 L50,8 C42,8 35,12 30,20 L15,40 L8,42 C4,43 2,46 2,50 L2,62 C2,66 5,68 8,68 L20,68 L20,64 C20,56 26,50 35,50 C44,50 50,56 50,64 L50,68 L130,68 L130,64 C130,56 136,50 145,50 C154,50 160,56 160,64 L160,68 L172,68 C175,68 178,66 178,62 L178,50 C178,46 176,43 172,42 Z M90,35 L35,35 L45,18 L90,18 Z M95,35 L95,18 L140,18 L150,35 Z" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex flex-col items-center text-center">

        {/* Top badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium mb-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
          Харків, Проспект Героїв Харкова, 210
        </div>

        {/* Main headline */}
        <h1
          className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] tracking-tight max-w-4xl mb-6 transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Автозапчастини{" "}
          <span className="text-gradient">в Харкові</span>
          <br />
          <span className="text-white/90">швидко і надійно</span>
        </h1>

        {/* Sub */}
        <p
          className={`text-lg sm:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Понад{" "}
          <span className="text-white font-semibold">100 000 позицій</span> у
          наявності. Знайдіть деталь за артикулом, каталогом або назвою — і
          отримайте її вже сьогодні.
        </p>

        {/* Search bar */}
        <div
          className={`w-full max-w-2xl mb-8 transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <form onSubmit={handleSearch} className="relative">
            <div
              className={`relative flex items-center rounded-2xl border transition-all duration-300 ${
                focused
                  ? "border-orange-500 shadow-lg shadow-orange-500/20 bg-white/5"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <Search className="absolute left-5 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Введіть артикул або назву деталі..."
                className="flex-1 bg-transparent py-4 pl-14 pr-4 text-white placeholder-gray-500 text-base outline-none w-full"
                autoComplete="off"
              />
              <button
                type="submit"
                className="m-2 flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 shrink-0 text-sm"
              >
                <span className="hidden sm:inline">Знайти</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Popular searches */}
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            <span className="text-gray-500 text-xs py-1">Популярне:</span>
            {popularSearches.map((s) => (
              <button
                key={s}
                onClick={() => { setQuery(s); inputRef.current?.focus(); }}
                className="text-xs text-gray-400 hover:text-orange-400 py-1 px-2 rounded hover:bg-orange-500/10 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 mb-14 transition-all duration-700 delay-400 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href="#catalog"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#catalog")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 text-base"
          >
            Переглянути каталог
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="tel:+380672546266"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all duration-200 text-base"
          >
            <Phone className="w-4 h-4 text-orange-400" />
            Зателефонувати
          </a>
        </div>

        {/* Trust badges */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 transition-all duration-700 delay-500 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          {badges.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500/15 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-orange-400" />
              </div>
              <span className="text-sm text-gray-400">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors group"
        aria-label="Прокрутити вниз"
      >
        <span className="text-xs tracking-widest uppercase">Детальніше</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
}
