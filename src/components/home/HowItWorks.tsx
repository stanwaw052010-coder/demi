"use client";

import { motion } from "framer-motion";
import { Search, ShoppingCart, Truck } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/utils";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Знайдіть запчастину",
    desc: "Введіть артикул, назву або оберіть модель авто. Підберемо точну деталь за VIN-кодом безкоштовно.",
  },
  {
    num: "02",
    icon: ShoppingCart,
    title: "Оформіть замовлення",
    desc: "Додайте в кошик і оформіть замовлення онлайн або зателефонуйте. Оплата будь-яким зручним способом.",
  },
  {
    num: "03",
    icon: Truck,
    title: "Отримайте доставку",
    desc: "Відправляємо щодня Новою Поштою. Доставка по Україні 1–2 дні. Самовивіз у Харкові того ж дня.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-orange-500 uppercase tracking-widest mb-3">
              Як це працює
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Замовлення за 3 кроки
            </h2>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Від пошуку до доставки — максимально просто
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-14 left-1/3 right-1/3 h-px bg-gradient-to-r from-orange-500/40 via-orange-500/20 to-orange-500/40" />

            {steps.map(({ num, icon: Icon, title, desc }) => (
              <motion.div key={num} variants={fadeUp} className="relative flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-orange-500" />
                  </div>
                  <span className="absolute -top-2 -right-2 text-xs font-black text-orange-500/40 leading-none select-none">
                    {num}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
