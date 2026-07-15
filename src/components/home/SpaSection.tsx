"use client";

import { motion } from "framer-motion";
import { Waves, Sparkle, HeartPulse } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookButton } from "@/components/booking/BookButton";

const points = [
  { icon: Waves, text: "Один із небагатьох салонів міста з SPA-капсулою Neoqi Medic" },
  { icon: Sparkle, text: "Комплексний ритуал відновлення тіла й емоційного стану" },
  { icon: HeartPulse, text: "Поєднання сучасних технологій із глибоким розслабленням" },
];

export function SpaSection() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 sm:py-28">
      <div className="container-spa grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading eyebrow="SPA-капсула Neoqi Medic" title="Більше, ніж процедура" light />
          <p className="mt-6 text-base leading-relaxed text-white/65">
            Ми пишаємося тим, що Спабель — один із небагатьох салонів, де
            представлена SPA-капсула Neoqi Medic. Це комплексний ритуал
            відновлення, який поєднує сучасні технології, глибоке
            розслаблення та турботу про фізичне й емоційне самопочуття.
          </p>
          <ul className="mt-8 space-y-5">
            {points.map((p) => (
              <li key={p.text} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-gold-400">
                  <p.icon className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <span className="text-sm leading-relaxed text-white/75">{p.text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <BookButton variant="gold" size="lg" serviceName="SPA-капсула Neoqi Medic">
              Записатися на SPA
            </BookButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative grid grid-cols-2 gap-4"
        >
          <div className="relative col-span-2 h-64 overflow-hidden rounded-2xl sm:h-80">
            <Photo
              src="/images/spa/spa-1.jpg"
              alt="SPA-капсула Neoqi Medic у Спабель"
              label="SPA-капсула Neoqi Medic"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="relative h-40 overflow-hidden rounded-2xl">
            <Photo src="/images/spa/spa-2.jpg" alt="SPA-ритуал Спабель" label="SPA" fill sizes="25vw" />
          </div>
          <div className="relative h-40 overflow-hidden rounded-2xl border border-gold-500/30 bg-navy-800 p-6">
            <div className="flex h-full flex-col justify-between">
              <span className="font-serif text-4xl text-gold-400">01</span>
              <span className="text-xs uppercase tracking-widest text-white/60">
                салон із SPA-капсулою в Запоріжжі
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
