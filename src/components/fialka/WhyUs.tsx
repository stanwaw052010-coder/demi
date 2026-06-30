"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: "🧴",
    title: "Стерильність",
    desc: "Одноразові інструменти, автоклав, міжнародні стандарти гігієни — завжди і без компромісів.",
  },
  {
    icon: "✦",
    title: "Досвід майстрів",
    desc: "Команда сертифікованих спеціалістів із постійним підвищенням кваліфікації.",
  },
  {
    icon: "💎",
    title: "Якість матеріалів",
    desc: "Використовуємо лише перевірені бренди преміум-класу для довготривалого результату.",
  },
  {
    icon: "🛋",
    title: "Комфорт",
    desc: "Затишний простір, зручні крісла та уважне ставлення — ви в хороших руках.",
  },
  {
    icon: "🌸",
    title: "Атмосфера",
    desc: "Приємна обстановка та фіолетовий настрій роблять кожен візит особливим.",
  },
];

export default function FialkaWhyUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400 mb-3">
            Чому ми
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-violet-950">
            Наші переваги
          </h2>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="group flex flex-col gap-4 p-7 rounded-3xl
                         bg-gradient-to-br from-violet-50/60 to-white
                         border border-violet-100 hover:border-violet-200
                         hover:shadow-lg hover:shadow-violet-50
                         transition-all duration-300"
            >
              <span
                className="text-4xl group-hover:scale-110 transition-transform duration-300 w-fit"
                aria-hidden="true"
              >
                {f.icon}
              </span>
              <div>
                <h3 className="font-serif text-xl font-bold text-violet-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}

          {/* Final CTA mini card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: FEATURES.length * 0.1 }}
            className="flex flex-col items-center justify-center gap-4 p-7 rounded-3xl
                       bg-violet-600 text-white text-center
                       hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-200
                       transition-all duration-300 cursor-pointer"
            onClick={() => {
              document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="text-5xl" aria-hidden="true">💜</span>
            <div>
              <p className="font-serif text-xl font-bold mb-1">Хочеш переконатись?</p>
              <p className="text-violet-200 text-sm">Запишись і відчуй різницю</p>
            </div>
            <span className="text-sm font-semibold text-white/80">Записатися →</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
