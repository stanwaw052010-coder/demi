"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { categories } from "@/lib/categories";
import { staggerContainer, fadeUp } from "@/lib/utils";

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-orange-500 uppercase tracking-widest mb-3">
              Каталог
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Категорії запчастин
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Понад 8 000 позицій по всіх системах комерційного автомобіля
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {categories.map((cat, i) => {
              const href =
                cat.slug === "oils-fluids"
                  ? "/oils"
                  : `/catalog/mercedes-sprinter/${cat.slug}`;
              return (
              <motion.div key={cat.slug} variants={fadeUp} style={{ animationDelay: `${i * 40}ms` }}>
                <Link
                  href={href}
                  className="group flex flex-col items-center p-5 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50 transition-all duration-300 hover:-translate-y-0.5 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-3 text-2xl group-hover:bg-orange-100 transition-colors group-hover:scale-110 transform duration-300">
                    {cat.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors leading-tight mb-1">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-gray-400">{cat.count?.toLocaleString()} позицій</span>
                </Link>
              </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
