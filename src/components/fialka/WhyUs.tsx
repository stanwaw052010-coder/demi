"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: "🧴",
    title: "Повна стерильність",
    desc: "Одноразові пилочки та фрезерні насадки після кожного клієнта. Інструменти — автоклав-стерилізація. Без компромісів.",
    tag: "Безпека",
  },
  {
    icon: "🎓",
    title: "Майстри з досвідом 3+ років",
    desc: "Кожен майстер має підтверджену освіту та регулярно проходить навчання у провідних школах України.",
    tag: "Якість",
  },
  {
    icon: "💎",
    title: "Тільки перевірені матеріали",
    desc: "Покриття IBD, KODI Professional, Grattol — тримаються 3–4 тижні без сколів і пожовтіння.",
    tag: "Матеріали",
  },
  {
    icon: "📅",
    title: "Онлайн-запис 24/7",
    desc: "Запишіться у будь-який зручний час через Instagram Direct або по телефону. Нагадаємо про візит.",
    tag: "Зручно",
  },
  {
    icon: "☕",
    title: "Затишна атмосфера",
    desc: "Чай або кава — у подарунок. Просторий кабінет, м'яке освітлення та фіолетовий настрій студії.",
    tag: "Комфорт",
  },
  {
    icon: "🔁",
    title: "Гарантія на роботу",
    desc: "Якщо щось сталося з покриттям протягом 5 днів — виправимо безкоштовно. Ми відповідаємо за результат.",
    tag: "Гарантія",
  },
];

export default function FialkaWhyUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400 mb-3">
            Чому обирають нас
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-violet-950 mb-3">
            6 причин довіряти Fialka
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Не просто слова — конкретні стандарти, яких ми дотримуємось
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group p-7 rounded-3xl bg-gradient-to-br from-violet-50/60 to-white
                         border border-violet-100 hover:border-violet-200
                         hover:shadow-lg hover:shadow-violet-50
                         transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className="text-3xl group-hover:scale-110 transition-transform duration-300"
                  aria-hidden="true"
                >
                  {f.icon}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-violet-100 text-violet-600
                               text-[10px] font-bold tracking-widest uppercase">
                  {f.tag}
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-violet-900 mb-2 leading-snug">
                {f.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Social proof bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10
                     px-6 py-5 rounded-2xl bg-violet-50 border border-violet-100"
        >
          {[
            { num: "500+", label: "задоволених клієнток" },
            { num: "5.0", label: "рейтинг Google" },
            { num: "3+", label: "роки досвіду майстрів" },
            { num: "100%", label: "стерильні інструменти" },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <p className="font-serif text-3xl font-bold text-violet-700">{num}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
