"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CalendarCheck, MapPin, ShieldCheck, Sparkles, Tag } from "lucide-react";
import { useRef } from "react";
import { Aurora } from "@/components/ui/Aurora";
import { BrandGlyph } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const trust = [
  { icon: ShieldCheck, label: "Стерильний інструмент" },
  { icon: CalendarCheck, label: "Онлайн запис 24/7" },
  { icon: Tag, label: "−20% на першу процедуру" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yArt = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "14%"]);
  const yCopy = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "26%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduced ? 1 : 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative isolate grain overflow-hidden bg-brand-950 pt-32 pb-20 md:pt-40 md:pb-28 lg:min-h-dvh lg:pt-44 lg:pb-32"
    >
      <Aurora />

      <div className="container-x relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-24">
          {/* ---------------- Копірайт ---------------- */}
          <motion.div style={{ y: yCopy, opacity: fade }} className="max-w-2xl">
            <motion.a
              href="#contacts"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[0.72rem] font-bold tracking-[0.16em] text-white/75 uppercase transition-colors duration-300 glass hover:text-white"
            >
              <MapPin className="size-3.5 text-aqua-400" strokeWidth={2.6} />
              Вишгород · пл. Шевченка, 3
            </motion.a>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
              className="mt-7 text-[clamp(2.6rem,1.4rem+4.6vw,5.1rem)] leading-[0.98] font-extrabold tracking-[-0.045em] text-white text-balance"
            >
              Здорові стопи
              <br />
              та <span className="font-serif font-medium text-aqua-300 italic">естетика нігтів</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.18, ease: EASE }}
              className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-white/65 text-pretty md:text-[1.18rem]"
            >
              Простір подології та нігтьового сервісу в одному місці. Розбираємось у причині, а не лише в
              наслідках: працюємо стерильним інструментом і повертаємо стопам комфорт — без болю й поспіху.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.28, ease: EASE }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href={site.booking.url} size="lg">
                Замовити консультацію
                <ArrowRight
                  className="size-[1.15rem] transition-transform duration-300 group-hover/btn:translate-x-1"
                  strokeWidth={2.4}
                />
              </Button>
              <Button href="#price" variant="ghost" size="lg">
                Переглянути прайс
              </Button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.42 }}
              className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-3.5"
            >
              {trust.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 text-[0.83rem] font-semibold text-white/55">
                  <Icon className="size-4 text-aqua-400" strokeWidth={2.3} />
                  {label}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ---------------- Композиція ---------------- */}
          <motion.div style={{ y: yArt }} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
              className="relative aspect-4/5 w-full overflow-hidden rounded-6xl bg-linear-to-br from-brand-800 via-brand-900 to-brand-950 shadow-[0_60px_120px_-40px_rgb(4_12_36/0.9)] ring-1 ring-white/12"
            >
              {/* світло всередині панелі */}
              <div
                aria-hidden
                className="absolute -top-24 -right-16 size-[26rem] animate-float-slow rounded-full bg-aqua-500/25 blur-[90px]"
              />
              <div
                aria-hidden
                className="absolute -bottom-20 -left-20 size-[22rem] animate-float rounded-full bg-brand-500/30 blur-[80px]"
              />

              {/* концентричні дуги */}
              <svg
                aria-hidden
                viewBox="0 0 400 500"
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0 size-full"
              >
                <defs>
                  <linearGradient id="hero-arc" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#c2e7ff" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#c2e7ff" stopOpacity="0.04" />
                  </linearGradient>
                </defs>
                {[90, 150, 210, 270, 330, 390, 450].map((r, i) => (
                  <circle
                    key={r}
                    cx="200"
                    cy="255"
                    r={r}
                    fill="none"
                    stroke="url(#hero-arc)"
                    strokeWidth={i % 2 === 0 ? 1.4 : 0.7}
                    opacity={0.6 - i * 0.07}
                  />
                ))}
              </svg>

              <BrandGlyph className="absolute top-1/2 left-1/2 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 text-white/90 drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]" />

              {/* нижня скляна підпис-панель */}
              <div className="absolute inset-x-5 bottom-5 rounded-4xl px-6 py-5 glass">
                <p className="text-[0.68rem] font-bold tracking-[0.2em] text-aqua-300 uppercase">
                  ProfiTime · Вишгород
                </p>
                <p className="mt-2 text-[1.05rem] leading-snug font-bold text-white text-balance">
                  Подологія та нігтьовий сервіс в одному місці
                </p>
              </div>
            </motion.div>

            {/* плаваючі картки */}
            <FloatingCard
              className="-top-5 -left-4 md:-left-10 lg:-left-16"
              delay={0.6}
              icon={<CalendarCheck className="size-[1.15rem]" strokeWidth={2.4} />}
              title="Онлайн запис"
              subtitle="Доступно 24/7"
            />
            <FloatingCard
              className="top-[56%] right-0 md:-right-8 lg:-right-14"
              delay={0.78}
              float="slow"
              icon={<Sparkles className="size-[1.15rem]" strokeWidth={2.4} />}
              title="Консультація подолога"
              subtitle="0 грн для нових клієнтів"
            />
          </motion.div>
        </div>
      </div>

      {/* перехід до світлої секції */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-white/0"
      />
    </section>
  );
}

function FloatingCard({
  className,
  icon,
  title,
  subtitle,
  delay,
  float = "normal",
}: {
  className?: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  delay: number;
  float?: "normal" | "slow";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={`absolute z-10 ${className}`}
    >
      <div
        className={`flex items-center gap-3.5 rounded-3xl bg-white/95 px-5 py-4 shadow-[0_30px_60px_-25px_rgb(4_12_36/0.75)] ring-1 ring-white/60 backdrop-blur-xl ${
          float === "slow" ? "animate-float-slow" : "animate-float"
        }`}
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-brand-600 to-brand-900 text-white">
          {icon}
        </span>
        <span className="flex flex-col">
          <span className="text-[0.92rem] leading-tight font-extrabold tracking-[-0.02em] text-ink">
            {title}
          </span>
          <span className="mt-0.5 text-[0.78rem] font-medium text-graphite-500">{subtitle}</span>
        </span>
      </div>
    </motion.div>
  );
}
