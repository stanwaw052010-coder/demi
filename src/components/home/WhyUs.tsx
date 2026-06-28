"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, Headphones, Award, CreditCard, RefreshCw } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/utils";

const advantages = [
  {
    icon: ShieldCheck,
    title: "Гарантія якості",
    desc: "Лише сертифіковані запчастини від провідних брендів. Кожна позиція проходить перевірку перед відправкою.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Truck,
    title: "Швидка доставка",
    desc: "Відправляємо Новою Поштою щодня до 18:00. Доставка по всій Україні за 1–2 дні.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: Headphones,
    title: "Технічна підтримка",
    desc: "Досвідчені фахівці допоможуть підібрати запчастину за VIN-кодом або артикулом.",
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    icon: Award,
    title: "15+ років досвіду",
    desc: "З 2008 року спеціалізуємось виключно на комерційному транспорті Mercedes та VW.",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: CreditCard,
    title: "Зручна оплата",
    desc: "Приймаємо картки, безготівковий розрахунок для юридичних осіб, оплата при отриманні.",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  {
    icon: RefreshCw,
    title: "Просте повернення",
    desc: "Якщо деталь не підійшла — повернемо кошти або обміняємо протягом 14 днів без питань.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="inline-block text-sm font-semibold text-orange-500 uppercase tracking-widest mb-3">
              Чому ми
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Переваги роботи з нами
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Понад 8 000 задоволених клієнтів обирають нас щороку — ось чому
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map(({ icon: Icon, title, desc, color, bg }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="bg-white rounded-3xl p-7 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`w-13 h-13 rounded-2xl ${bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
