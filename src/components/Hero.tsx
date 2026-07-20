"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { PhotoArt, SealBadge } from "./Decor";
import { Counter } from "./Counter";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const ySeal = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden bg-cream pt-32 pb-16 sm:pt-40 lg:pt-44"
    >
      {/* ambient gradient orbs */}
      <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-rose-soft/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-64 h-[28rem] w-[28rem] rounded-full bg-gold-soft/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* Left — copy */}
        <div className="relative z-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/50 px-4 py-2 backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-rose-deep" />
            <span className="eyebrow text-rose-deep">Ендосфера · LPG · Антицелюліт</span>
          </motion.div>

          <h1 className="mt-6 font-display text-5xl leading-[1.02] text-ink sm:text-6xl lg:text-7xl">
            {["Ваше тіло —", "витвір", "мистецтва"].map((line, i) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease }}
              >
                {i === 1 ? <em className="text-rose-gradient not-italic">{line}</em> : line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft"
          >
            Студія корекції фігури Анжели Кропивницької у Бучі. Позбавляю від
            целюліту та набряків, зменшую в об&apos;ємі й повертаю тілу легкість.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-cream transition-all duration-300 hover:bg-rose-deep"
            >
              Записатися на сеанс
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-ink"
            >
              Переглянути послуги
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex items-center gap-8"
          >
            {[
              { n: 8, suffix: "+", label: "років практики" },
              { n: 2000, suffix: "+", label: "щасливих клієнток" },
              { n: 5, suffix: "", label: "авторських методик" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl text-ink sm:text-4xl">
                  <Counter to={s.n} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-ink-soft">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — portrait art + seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative">
            <motion.div style={{ y: yImg }}>
              <PhotoArt
                variant="mauve"
                motif="face"
                className="aspect-[4/5] w-full rounded-[2rem] shadow-2xl ring-1 ring-white/30"
              />
            </motion.div>

            {/* rotating seal */}
            <motion.div
              style={{ y: ySeal }}
              className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-cream text-ink-soft shadow-xl sm:-left-10 sm:-top-10 sm:h-32 sm:w-32"
            >
              <SealBadge className="h-full w-full p-1" />
            </motion.div>

            {/* floating info card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease }}
              className="animate-floaty absolute -bottom-6 -right-3 flex items-center gap-3 rounded-2xl bg-cream/90 px-5 py-4 shadow-xl backdrop-blur sm:-right-8"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose/15 text-rose-deep">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-ink">Буча</div>
                <div className="text-xs text-ink-soft">вул. Б. Хмельницького, 4</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* marquee trust band */}
      <Marquee />
    </section>
  );
}

function Marquee() {
  const items = [
    "Ендосфера-терапія",
    "LPG-масаж",
    "Антицелюлітний масаж",
    "Вакуумний масаж",
    "Лімфодренаж",
    "Корекція фігури",
    "Курси навчання",
  ];
  const row = [...items, ...items];
  return (
    <div className="relative mt-20 overflow-hidden border-y border-gold/15 py-5">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-xl italic text-ink-soft">{t}</span>
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
