"use client";

import { motion } from "framer-motion";
import { Activity, Wind, Droplets, Waves, Ruler, HandHeart, ArrowUpRight } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { PhotoArt } from "./Decor";

type Service = {
  title: string;
  desc: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  variant: "rose" | "gold" | "sand" | "mauve" | "ink";
  motif: "sprig" | "face" | "wave" | "lotus";
  tag: string;
};

const services: Service[] = [
  {
    title: "Ендосфера-терапія",
    desc: "Компресійна мікровібрація глибоко опрацьовує тканини, розганяє лімфу та вирівнює рельєф шкіри.",
    Icon: Activity,
    variant: "mauve",
    motif: "wave",
    tag: "Апаратний",
  },
  {
    title: "LPG-масаж",
    desc: "Вакуумно-роликова методика для корекції силуету, зменшення об'ємів та пружності шкіри.",
    Icon: Wind,
    variant: "rose",
    motif: "lotus",
    tag: "Апаратний",
  },
  {
    title: "Антицелюлітний масаж",
    desc: "Інтенсивна ручна техніка, що руйнує фіброзні вузли та повертає шкірі гладкість.",
    Icon: HandHeart,
    variant: "gold",
    motif: "sprig",
    tag: "Ручний",
  },
  {
    title: "Вакуумний масаж",
    desc: "Глибока пропрацьовка проблемних зон, стимуляція кровообігу та відтоку рідини.",
    Icon: Droplets,
    variant: "sand",
    motif: "wave",
    tag: "Апаратний",
  },
  {
    title: "Лімфодренаж",
    desc: "М'яка техніка виведення зайвої рідини — легкість, менші набряки та здоровий вигляд.",
    Icon: Waves,
    variant: "rose",
    motif: "wave",
    tag: "Оздоровчий",
  },
  {
    title: "Корекція фігури",
    desc: "Комплексні програми під вашу мету: зменшення об'ємів, тонус і красивий контур тіла.",
    Icon: Ruler,
    variant: "mauve",
    motif: "face",
    tag: "Програма",
  },
];

export function Services() {
  return (
    <section id="services" className="relative bg-cream-2 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow text-rose-deep">Послуги</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Процедури, що дарують{" "}
              <em className="text-rose-gradient not-italic">результат</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-ink-soft">
              Апаратні та ручні методики, підібрані індивідуально під ваше тіло
              та ваші цілі.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <RevealItem key={s.title}>
              <motion.a
                href="#contact"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-cream shadow-[0_2px_20px_-12px_rgba(28,28,32,0.28)] ring-1 ring-gold/10 transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgba(140,74,90,0.4)]"
              >
                <div className="relative">
                  <PhotoArt variant={s.variant} motif={s.motif} className="aspect-[16/10] w-full" />
                  <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-ink-soft backdrop-blur">
                    {s.tag}
                  </span>
                  <div className="absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-cream shadow-lg ring-4 ring-cream transition-colors duration-300 group-hover:bg-rose-deep">
                    <s.Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6 pt-9">
                  <h3 className="font-display text-2xl text-ink">{s.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {s.desc}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-deep">
                    Записатися
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </motion.a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
