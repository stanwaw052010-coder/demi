"use client";

import { motion } from "framer-motion";
import { Hand, Footprints, Gem, Palette, Droplets, Sparkles } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/utils";

const services = [
  {
    icon: Hand,
    title: "Манікюр",
    desc: "Класичний, апаратний або комбінований манікюр з ідеальною обробкою кутикули.",
    price: "від 350 ₴",
  },
  {
    icon: Footprints,
    title: "Педикюр",
    desc: "Апаратний педикюр з обробкою стоп, видаленням натоптишів та покриттям.",
    price: "від 550 ₴",
  },
  {
    icon: Gem,
    title: "Нарощування нігтів",
    desc: "Моделювання довжини та форми гелем — міцно, легко та природно.",
    price: "від 800 ₴",
  },
  {
    icon: Palette,
    title: "Дизайн та нейл-арт",
    desc: "Френч, омбре, втирка, стрази, ручний розпис — під будь-який образ.",
    price: "від 20 ₴/ніготь",
  },
  {
    icon: Droplets,
    title: "Зняття покриття",
    desc: "Дбайливе зняття гель-лаку або нарощеного матеріалу без шкоди нігтю.",
    price: "від 150 ₴",
  },
  {
    icon: Sparkles,
    title: "SPA-догляд",
    desc: "Парафінотерапія та живильні маски для рук і стоп.",
    price: "від 250 ₴",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span variants={fadeUp} className="text-rose-dark font-semibold text-sm tracking-widest uppercase">
            Послуги
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-serif text-4xl sm:text-5xl font-bold text-ink mt-3">
            Все для краси ваших рук і ніг
          </motion.h2>
          <motion.p variants={fadeUp} className="text-ink/60 mt-4 text-lg">
            Працюємо тільки з сертифікованими матеріалами преміум-класу та дотримуємось повного циклу стерилізації.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map(({ icon: Icon, title, desc, price }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="group p-7 rounded-3xl border border-rose/12 hover:border-rose/30 bg-cream/40 hover:bg-cream/70 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose/10 group-hover:bg-rose/20 flex items-center justify-center mb-5 transition-colors">
                <Icon className="w-6 h-6 text-rose-dark" />
              </div>
              <h3 className="font-serif text-xl font-bold text-ink mb-2">{title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed mb-4">{desc}</p>
              <span className="text-sm font-bold text-rose-dark">{price}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
