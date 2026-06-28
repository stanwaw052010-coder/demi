"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/utils";

const reviews = [
  {
    name: "Олександр Петренко",
    role: "Власник СТО, Харків",
    text: "Замовляємо запчастини вже 4 роки. Ціни нижчі ніж у конкурентів, якість не підводила жодного разу. Доставка завжди вчасно. Рекомендую всім майстрам!",
    rating: 5,
    initials: "ОП",
    color: "bg-orange-500",
  },
  {
    name: "Сергій Ковальчук",
    role: "Водій-підприємець, Київ",
    text: "Маю Sprinter 2018 року. Завжди знаходжу потрібні деталі на цьому сайті. Менеджери допомогли підібрати ремкомплект підвіски — все підійшло ідеально.",
    rating: 5,
    initials: "СК",
    color: "bg-blue-500",
  },
  {
    name: "Максим Іваненко",
    role: "Логістична компанія, Одеса",
    text: "Закупляємо запчастини для парку з 6 Кравтерів. Великий асортимент, швидко обробляють замовлення. Виставляють рахунок на підприємство без проблем.",
    rating: 5,
    initials: "МІ",
    color: "bg-green-500",
  },
  {
    name: "Ігор Дмитренко",
    role: "Механік, Дніпро",
    text: "Давно шукав якісні гальмівні колодки Bosch за нормальною ціною. Тут знайшов з доставкою наступного дня. Стало постійним постачальником нашого сервісу.",
    rating: 5,
    initials: "ІД",
    color: "bg-purple-500",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="inline-block text-sm font-semibold text-orange-500 uppercase tracking-widest mb-3">
              Відгуки
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Нам довіряють тисячі клієнтів
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Понад 8 500 задоволених замовлень щороку
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((r) => (
              <motion.div
                key={r.name}
                variants={fadeUp}
                className="bg-gray-50 rounded-3xl p-6 border border-gray-100 flex flex-col"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-5">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${r.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                    {r.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{r.name}</div>
                    <div className="text-xs text-gray-400">{r.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats bar */}
          <motion.div variants={fadeUp} className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 text-white">
            {[
              { num: "8 500+", label: "Замовлень на рік" },
              { num: "98%", label: "Задоволених клієнтів" },
              { num: "15", label: "Років на ринку" },
              { num: "8 000+", label: "Позицій у наявності" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black mb-1">{s.num}</div>
                <div className="text-sm text-orange-100">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
