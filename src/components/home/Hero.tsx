"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ArrowRight, Shield, Truck, Clock, Star } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/utils";

const quickSearches = ["амортизатор Sprinter", "колодки Vito", "фільтр масляний", "диск гальмівний"];

const trust = [
  { icon: Shield, label: "Гарантія якості" },
  { icon: Truck, label: "Доставка 1–2 дні" },
  { icon: Clock, label: "15+ років на ринку" },
  { icon: Star, label: "8 000+ позицій" },
];

export default function Hero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (q: string = query) => {
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center bg-[#0a0a0a] overflow-hidden">
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Orange glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {/* Pill tag */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/15 border border-orange-500/25 rounded-full text-orange-400 text-sm font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                Понад 8 000 позицій в наявності
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeUp}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
                Запчастини для{" "}
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  комерційного
                </span>{" "}
                транспорту
              </h1>
            </motion.div>

            <motion.p variants={fadeUp} className="text-xl text-gray-400 leading-relaxed max-w-xl">
              Mercedes Sprinter, Vito, VW Crafter, LT — оригінальні та аналогові запчастини з доставкою по всій Україні.
            </motion.p>

            {/* Search bar */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Введіть артикул, назву або модель авто…"
                  className="w-full pl-12 pr-5 py-4 bg-white/8 backdrop-blur border border-white/10 rounded-2xl text-white placeholder-gray-500 outline-none focus:border-orange-500/60 focus:bg-white/12 transition-all text-base"
                />
              </div>
              <button
                onClick={() => handleSearch()}
                className="flex items-center justify-center gap-2 px-7 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 shrink-0 text-base"
              >
                Знайти
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Quick searches */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              <span className="text-xs text-gray-600 self-center">Популярне:</span>
              {quickSearches.map((q) => (
                <button
                  key={q}
                  onClick={() => { setQuery(q); handleSearch(q); }}
                  className="px-3 py-1.5 bg-white/5 hover:bg-orange-500/15 border border-white/8 hover:border-orange-500/30 rounded-full text-xs text-gray-400 hover:text-orange-400 transition-all duration-200"
                >
                  {q}
                </button>
              ))}
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {trust.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/15 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-orange-400" />
                  </div>
                  <span className="text-xs text-gray-400 leading-tight">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <div className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-orange-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
