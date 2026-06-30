"use client";

import { motion } from "framer-motion";

const SERVICES = [
  {
    icon: "💅",
    title: "Манікюр",
    desc: "Класичний, апаратний, гель-лак, дизайн",
  },
  {
    icon: "🦶",
    title: "Педикюр",
    desc: "Медичний, апаратний, SPA-педикюр",
  },
  {
    icon: "✦",
    title: "Брови",
    desc: "Корекція, фарбування, ламінування",
  },
  {
    icon: "✧",
    title: "Вії",
    desc: "Нарощування, ламінування, ботокс для вій",
  },
  {
    icon: "🌸",
    title: "Інші послуги",
    desc: "Дізнайтесь про актуальні пропозиції в Instagram",
  },
];

export default function FialkaServices() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400 mb-3">
            Послуги
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-violet-950 leading-tight">
            Що ми робимо
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.09 }}
              whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(109,40,217,0.12)" }}
              className="group relative p-7 rounded-3xl bg-white border border-violet-100
                         shadow-sm transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Hover background */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-violet-50 to-violet-100
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
              />

              <div className="relative z-10">
                <span
                  className="text-4xl block mb-4 group-hover:scale-110 transition-transform duration-300"
                  aria-hidden="true"
                >
                  {s.icon}
                </span>
                <h3
                  className="font-serif text-xl font-bold text-violet-900 mb-2
                             group-hover:text-violet-700 transition-colors"
                >
                  {s.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors">
                  {s.desc}
                </p>
              </div>

              {/* Corner accent */}
              <div
                className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full
                            bg-violet-100 opacity-0 group-hover:opacity-60
                            transition-all duration-300 group-hover:scale-125"
              />
            </motion.div>
          ))}

          {/* Instagram CTA card */}
          <motion.a
            href="https://www.instagram.com/fialka_beauty_bar"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: SERVICES.length * 0.09 }}
            whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(109,40,217,0.25)" }}
            className="group p-7 rounded-3xl flex flex-col items-start justify-between
                       transition-all duration-300 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)",
            }}
          >
            <div>
              <span className="text-4xl block mb-4" aria-hidden="true">
                📲
              </span>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Більше в Instagram
              </h3>
              <p className="text-sm text-violet-200 leading-relaxed">
                Актуальні роботи, дизайни та акції — щодня
              </p>
            </div>
            <span
              className="mt-5 inline-flex items-center gap-2 text-white text-sm font-semibold
                         group-hover:gap-3 transition-all duration-200"
            >
              Перейти
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
