"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Star } from "lucide-react";
import { site } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/Reveal";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-[84px]"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0 -z-10 bg-gradient-to-br from-bg-3 via-bg-2 to-bg"
      >
        <Image
          src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2000&auto=format&fit=crop"
          alt="Інтер'єр GIN Barbershop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-transparent to-bg/50" />
      </motion.div>

      {/* Animated light streak / spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[70vh] w-[40vw] -translate-x-1/2 rounded-full bg-gold/[0.07] blur-[120px]"
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        style={{ y: contentY, opacity }}
        className="container-lux relative w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8 }}
          className="mb-8 flex items-center gap-4"
        >
          <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-muted-2 backdrop-blur">
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} className="fill-gold text-gold" />
              ))}
            </span>
            4.9 · Barbershop №1 у Хмельницькому
          </span>
        </motion.div>

        <h1 className="h-display max-w-5xl text-balance font-display">
          <span className="block text-fg">
            <TextReveal text="Не просто" delay={1.9} trigger="mount" />
          </span>
          <span className="block text-fg">
            <TextReveal text="стрижка." delay={2.05} trigger="mount" />
          </span>
          <span className="block text-gradient-gold">
            <TextReveal text="Стиль, що говорить" delay={2.2} trigger="mount" />
          </span>
          <span className="block text-gradient">
            <TextReveal text="за вас." delay={2.45} trigger="mount" />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-md text-base leading-relaxed text-muted-2 sm:text-lg">
            Преміальний барбершоп у серці Хмельницького. Топ-майстри, атмосфера
            джентльменського клубу та досконалість у кожній деталі.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button href={site.bookingUrl} external>
              Записатися онлайн
            </Button>
            <Button href="/#services" variant="outline" arrow={false}>
              Переглянути послуги
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted sm:flex"
      >
        <span className="text-[0.65rem] tracking-[0.3em]">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
