"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { vehicles } from "@/lib/vehicles";
import { staggerContainer, fadeUp } from "@/lib/utils";

export default function VehicleSelector() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="inline-block text-sm font-semibold text-orange-500 uppercase tracking-widest mb-3">
              Оберіть модель
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Запчастини для вашого авто
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Оберіть модель — покажемо всі доступні запчастини з підбором за рік та двигун
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {vehicles.map((v, i) => (
              <motion.div key={v.slug} variants={fadeUp}>
                <Link
                  href={`/catalog/${v.slug}`}
                  className="group relative flex flex-col p-6 rounded-3xl border-2 border-gray-100 hover:border-orange-200 bg-white hover:bg-orange-50/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100 overflow-hidden"
                >
                  {v.badge && (
                    <span className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 bg-orange-500 text-white rounded-full">
                      {v.badge}
                    </span>
                  )}

                  {/* Van illustration */}
                  <div className="mb-6 h-28 flex items-center justify-center">
                    <svg viewBox="0 0 200 90" className="w-full h-full" fill="none">
                      <rect x="10" y="35" width="160" height="45" rx="8" fill="#f1f5f9" />
                      <rect x="10" y="35" width="90" height="45" rx="8" fill="#e2e8f0" />
                      <rect x="15" y="20" width="85" height="40" rx="6" fill="#cbd5e1" />
                      <rect x="20" y="25" width="35" height="28" rx="4" fill="#93c5fd" opacity="0.8" />
                      <rect x="60" y="25" width="32" height="28" rx="4" fill="#93c5fd" opacity="0.8" />
                      <circle cx="45" cy="82" r="10" fill="#475569" />
                      <circle cx="45" cy="82" r="5" fill="#94a3b8" />
                      <circle cx="140" cy="82" r="10" fill="#475569" />
                      <circle cx="140" cy="82" r="5" fill="#94a3b8" />
                      <rect x="105" y="50" width="60" height="25" rx="4" fill="#e2e8f0" />
                      <rect x="160" y="45" width="18" height="15" rx="3" fill="#cbd5e1" />
                      <rect x="160" y="55" width="18" height="20" rx="0" fill="#e2e8f0" />
                    </svg>
                  </div>

                  <div className="mt-auto">
                    <div className="text-xs text-gray-400 font-medium mb-1">{v.brand}</div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-1">
                      {v.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">{v.years}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {v.engines.slice(0, 3).map((e) => (
                        <span key={e} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-lg font-medium">
                          {e}
                        </span>
                      ))}
                      {v.engines.length > 3 && (
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-400 rounded-lg">
                          +{v.engines.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-orange-500 text-sm font-semibold group-hover:gap-2 transition-all">
                      Переглянути каталог
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
