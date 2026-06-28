"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/utils";

const faqs = [
  {
    q: "Як підібрати запчастину за моїм авто?",
    a: "Вкажіть модель, рік випуску та двигун — або передайте нам VIN-код. Наші спеціалісти безкоштовно підберуть точну деталь. Зв'яжіться за телефоном або через форму зворотного зв'язку.",
  },
  {
    q: "Чи є гарантія на запчастини?",
    a: "Так, на всі запчастини надається гарантія від виробника. На оригінальні деталі — 12 місяців, на аналоги якісних брендів — від 6 до 12 місяців залежно від виробника.",
  },
  {
    q: "Як швидко надходить замовлення?",
    a: "Якщо деталь є в наявності, відправляємо того ж дня (замовлення до 16:00). Нова Пошта доставляє по Україні 1–2 дні. Самовивіз у Харкові з нашого складу — щодня з 9:00 до 18:00.",
  },
  {
    q: "Яка оплата доступна?",
    a: "Приймаємо картки Visa/MasterCard онлайн, банківський переказ, оплату готівкою при самовивозі або накладним платежем через Нову Пошту. Для юридичних осіб — безготівковий розрахунок із ПДВ.",
  },
  {
    q: "Що робити, якщо запчастина не підійшла?",
    a: "Зверніться до нас протягом 14 днів — повернемо кошти або обміняємо деталь. Деталь повинна бути в оригінальній упаковці, без слідів монтажу. Повернення за наш рахунок, якщо помилка на нашій стороні.",
  },
  {
    q: "Чи є у вас оригінальні деталі Mercedes?",
    a: "Так, у каталозі є як оригінальні деталі Mercedes-Benz та Volkswagen, так і якісні аналоги від Bosch, Febi, Mahle, Meyle, Valeo, Mann-Filter та інших провідних виробників.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="inline-block text-sm font-semibold text-orange-500 uppercase tracking-widest mb-3">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Часті запитання
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 bg-white rounded-2xl px-6 py-5 border border-gray-100 hover:border-orange-200 text-left transition-all duration-200"
                >
                  <span className="text-sm font-semibold text-gray-900">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${open === i ? "rotate-180 text-orange-500" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pt-3 pb-5 bg-white rounded-b-2xl -mt-2 border-x border-b border-gray-100">
                        <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
