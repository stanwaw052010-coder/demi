"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useRef } from "react";
import { AnimatedText } from "../ui/AnimatedText";
import { MagneticButton } from "../ui/MagneticButton";
import { site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Легкий паралакс зображення під час скролу першого екрана.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white pt-28 pb-16 md:pt-32 lg:pt-36">
      {/* м’яка підкладка, що проявляється першою */}
      <motion.div
        aria-hidden
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease }}
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_80%_0%,var(--soft)_0%,var(--white)_60%)]"
      />

      <div className="shell grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
            className="eyebrow inline-flex items-center gap-3"
          >
            <span className="inline-block h-px w-8 bg-line" aria-hidden />
            Стоматологія · {site.city}
          </motion.span>

          <AnimatedText
            as="h1"
            immediate
            delay={0.5}
            lines={["Центр здоров’я", "та естетики"]}
            className="text-[2.75rem] leading-[0.98] sm:text-[4rem] lg:text-[5.25rem]"
          />

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95, ease }}
            className="max-w-md text-[1rem] leading-relaxed text-muted sm:text-[1.0625rem]"
          >
            Сучасна стоматологія, де турбота про здоровʼя поєднується з естетикою та комфортом.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <MagneticButton href="#booking" className="w-full sm:w-auto">
              Записатися на консультацію
              <ArrowRight
                className="size-4 transition-transform duration-500 group-hover:translate-x-1"
                strokeWidth={1.5}
                aria-hidden
              />
            </MagneticButton>

            <MagneticButton href="#services" variant="outline" className="w-full sm:w-auto">
              Переглянути послуги
            </MagneticButton>
          </motion.div>

          <motion.a
            href={site.phone.href}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.35, ease }}
            className="link-underline w-fit text-sm text-ink"
          >
            {site.phone.label}
          </motion.a>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-second sm:aspect-[5/6] lg:aspect-[4/5]">
            <motion.div
              className="absolute inset-0"
              style={reduced ? undefined : { y: imageY }}
              initial={reduced ? false : { scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, delay: 0.25, ease }}
            >
              <Image
                src="/images/hero.svg"
                alt="Візуальний образ клініки Clinic Stomatology"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </motion.div>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.4, ease }}
            className="mt-4 flex items-center justify-between gap-4 text-xs text-muted lg:absolute lg:-bottom-8 lg:left-0 lg:mt-0 lg:max-w-[17rem] lg:flex-col lg:items-start lg:gap-1.5 lg:rounded-md lg:border lg:border-line lg:bg-white lg:p-6"
          >
            <span className="eyebrow whitespace-nowrap">{site.claim}</span>
            <span className="text-ink">Усі види стоматологічних послуг</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Перейти до розділу «Про нас»"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6, ease }}
        className="shell mt-16 hidden items-center gap-3 text-xs tracking-[0.2em] text-muted uppercase lg:mt-24 lg:flex"
      >
        <ArrowDown className="size-4" strokeWidth={1.25} aria-hidden />
        Гортайте
      </motion.a>
    </section>
  );
}
