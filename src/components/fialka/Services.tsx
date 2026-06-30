"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const CATEGORIES = [
  {
    id: "manicure",
    icon: "💅",
    label: "Манікюр",
    badge: "Хіт",
    intro: "Класичний, апаратний або гель-лак — підберемо під вас",
    services: [
      { name: "Класичний манікюр", price: "від 250" },
      { name: "Апаратний манікюр", price: "від 300" },
      { name: "Гель-лак + манікюр", price: "від 400" },
      { name: "Нарощування нігтів (типси)", price: "від 700" },
      { name: "Зняття гель-лаку", price: "100" },
      { name: "Дизайн (1 ніготь)", price: "від 30" },
    ],
    note: "Тримається 3–4 тижні",
    color: "from-violet-50 to-purple-50",
    accent: "#7C3AED",
  },
  {
    id: "pedicure",
    icon: "🦶",
    label: "Педикюр",
    badge: null,
    intro: "Медичний підхід, стерильні інструменти, ніжні ноги",
    services: [
      { name: "Класичний педикюр", price: "від 400" },
      { name: "Апаратний педикюр", price: "від 450" },
      { name: "SPA-педикюр", price: "від 550" },
      { name: "Педикюр + гель-лак", price: "від 600" },
      { name: "Чоловічий педикюр", price: "від 400" },
    ],
    note: "Включає масаж стоп",
    color: "from-fuchsia-50 to-violet-50",
    accent: "#9333EA",
  },
  {
    id: "brows",
    icon: "✦",
    label: "Брови",
    badge: "Новинка",
    intro: "Форма, яка підкреслює обличчя — архітектура та ламінування",
    services: [
      { name: "Корекція форми", price: "від 150" },
      { name: "Корекція + фарбування", price: "від 300" },
      { name: "Архітектура + фарбування", price: "від 380" },
      { name: "Ламінування брів", price: "від 500" },
      { name: "Татуаж (перманент)", price: "від 1 200" },
    ],
    note: "Результат до 4–6 тижнів",
    color: "from-violet-50 to-indigo-50",
    accent: "#6D28D9",
  },
  {
    id: "lashes",
    icon: "✧",
    label: "Вії",
    badge: null,
    intro: "Об'єм та довжина — від класики до голлівудського ефекту",
    services: [
      { name: "Класичне нарощування (1D)", price: "від 600" },
      { name: "2D ефект", price: "від 750" },
      { name: "3D / Об'єм", price: "від 900" },
      { name: "Корекція (2–3 тиж.)", price: "від 350" },
      { name: "Ламінування вій", price: "від 500" },
      { name: "Ботокс для вій", price: "від 450" },
    ],
    note: "Корекція кожні 2–3 тижні",
    color: "from-purple-50 to-violet-50",
    accent: "#5B21B6",
  },
];

const COMBOS = [
  {
    icon: "🎀",
    title: "Манікюр + Педикюр",
    desc: "Класичний або апаратний — комплексний догляд за руками та ногами",
    price: "від 650 грн",
    save: "Економія 100 грн",
  },
  {
    icon: "👁",
    title: "Брови + Вії",
    desc: "Ламінування брів та вій — ефект свіжого погляду без макіяжу",
    price: "від 900 грн",
    save: "Економія 100 грн",
  },
  {
    icon: "✨",
    title: "Манікюр + Брови",
    desc: "Доглянуті руки та виразні брови за один візит",
    price: "від 650 грн",
    save: "Економія 50 грн",
  },
];

export default function FialkaServices() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400 mb-3">
            Послуги та ціни
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-violet-950 mb-3">
            Що ми пропонуємо
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Натисніть на категорію, щоб побачити повний прайс
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {CATEGORIES.map((cat, i) => {
            const isOpen = active === cat.id;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden cursor-pointer
                  ${isOpen ? "border-violet-300 shadow-lg shadow-violet-100" : "border-violet-100 shadow-sm hover:border-violet-200 hover:shadow-md"}`}
                onClick={() => setActive(isOpen ? null : cat.id)}
              >
                {/* Card header */}
                <div className={`bg-gradient-to-br ${cat.color} p-6`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl" aria-hidden="true">{cat.icon}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-serif text-2xl font-bold text-violet-950">
                            {cat.label}
                          </h3>
                          {cat.badge && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold
                                           bg-violet-600 text-white tracking-wide">
                              {cat.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 leading-snug">{cat.intro}</p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-white/70
                                 flex items-center justify-center"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M6 9l6 6 6-6" stroke="#7C3AED" strokeWidth="2.5"
                          strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Preview (always visible) */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cat.services.slice(0, 2).map((s) => (
                      <span key={s.name}
                        className="px-3 py-1 rounded-full bg-white/70 text-xs text-violet-700
                                   font-medium border border-violet-100">
                        {s.name} — {s.price} грн
                      </span>
                    ))}
                    {!isOpen && (
                      <span className="px-3 py-1 rounded-full bg-white/40 text-xs text-violet-400
                                       border border-violet-100">
                        +{cat.services.length - 2} послуги
                      </span>
                    )}
                  </div>
                </div>

                {/* Expanded price list */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white px-6 pb-6 pt-2">
                        <ul className="divide-y divide-violet-50">
                          {cat.services.map((s) => (
                            <li
                              key={s.name}
                              className="flex items-center justify-between py-3"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{s.name}</span>
                              </div>
                              <span className="text-sm font-bold text-violet-700 whitespace-nowrap ml-4">
                                {s.price} грн
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-4 flex items-center justify-between
                                        pt-4 border-t border-violet-100">
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                              <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round"/>
                            </svg>
                            {cat.note}
                          </div>
                          <motion.a
                            href="tel:+380976757227"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={(e) => e.stopPropagation()}
                            className="px-5 py-2 rounded-full bg-violet-600 text-white
                                       text-sm font-semibold shadow-sm hover:bg-violet-700
                                       transition-colors duration-200"
                          >
                            Записатися
                          </motion.a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Combo section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-violet-100" />
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-violet-400">
              Вигідні комплекси
            </p>
            <div className="h-px flex-1 bg-violet-100" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {COMBOS.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="group relative p-5 rounded-2xl border border-violet-100
                           bg-gradient-to-br from-violet-50/50 to-white
                           hover:border-violet-300 hover:shadow-md
                           transition-all duration-300 overflow-hidden"
              >
                {/* Save badge */}
                <span className="absolute top-3.5 right-3.5 px-2 py-0.5 rounded-full
                                 bg-green-100 text-green-700 text-[10px] font-bold">
                  {c.save}
                </span>

                <span className="text-3xl block mb-3" aria-hidden="true">{c.icon}</span>
                <h4 className="font-serif font-bold text-violet-900 text-base mb-1">
                  {c.title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{c.desc}</p>
                <p className="text-lg font-bold text-violet-700">{c.price}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-xs text-gray-400 mt-8"
        >
          Ціни орієнтовні. Точна вартість залежить від складності роботи.
          Уточнюйте при записі:{" "}
          <a href="tel:+380976757227" className="text-violet-500 hover:text-violet-700 transition-colors">
            +380 97 675 72 27
          </a>
        </motion.p>
      </div>
    </section>
  );
}
