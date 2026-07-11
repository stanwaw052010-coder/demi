"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Scissors,
  Sparkles,
  User,
  Flame,
  Palette,
  Smile,
  Crown,
  ArrowUpRight,
} from "lucide-react";
import { services } from "@/lib/content";
import { site } from "@/lib/utils";
import { Reveal, TextReveal } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

const iconMap: Record<string, React.ReactNode> = {
  scissors: <Scissors strokeWidth={1.4} />,
  sparkles: <Sparkles strokeWidth={1.4} />,
  user: <User strokeWidth={1.4} />,
  flame: <Flame strokeWidth={1.4} />,
  palette: <Palette strokeWidth={1.4} />,
  smile: <Smile strokeWidth={1.4} />,
  crown: <Crown strokeWidth={1.4} />,
};

function ServiceCard({
  title,
  desc,
  price,
  duration,
  icon,
  index,
  featured,
}: {
  title: string;
  desc: string;
  price: string;
  duration: string;
  icon: string;
  index: number;
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
      data-cursor="hover"
      className={`group card-lux border-gradient relative overflow-hidden rounded-2xl p-8 transition-transform duration-500 hover:-translate-y-1.5 ${
        featured ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""
      }`}
    >
      {/* mouse glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx) var(--my), rgba(201,168,119,0.12), transparent 65%)",
        }}
      />

      <div className="relative flex h-full flex-col">
        <div className="mb-8 flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-gold transition-all duration-500 group-hover:border-gold/40 group-hover:bg-gold/5 [&>svg]:h-6 [&>svg]:w-6">
            {iconMap[icon]}
          </div>
          <ArrowUpRight
            className="h-5 w-5 text-muted transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
            strokeWidth={1.4}
          />
        </div>

        <h3 className="font-display text-2xl font-bold tracking-tight text-fg">
          {title}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          {desc}
        </p>

        <div className="mt-auto flex items-end justify-between pt-8">
          <div>
            <p className="text-[0.65rem] uppercase tracking-widest text-muted">
              {duration}
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-gradient-gold">
              {price}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-28 sm:py-40">
      <div className="container-lux">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="overline mb-6">Послуги · Прайс</p>
            </Reveal>
            <h2 className="h-section max-w-2xl font-display text-fg">
              <TextReveal text="Досконалість" />
              <br />
              <TextReveal text="у кожній деталі" delay={0.1} />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-xs text-muted-2">
              Повний спектр послуг для сучасного чоловіка. Ціни залежать від
              майстра та складності роботи.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard
              key={s.id}
              {...s}
              index={i}
              featured={s.id === "complex"}
            />
          ))}
          {/* CTA card */}
          <Reveal
            className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-gold/15 via-bg-3 to-bg-2 p-8 border border-gold/20"
          >
            <div>
              <p className="overline mb-4 text-gold/80">Готові?</p>
              <h3 className="font-display text-2xl font-bold leading-tight text-fg">
                Запишіться менш ніж за хвилину
              </h3>
            </div>
            <div className="mt-8">
              <Button href={site.bookingUrl} external magnetic={false}>
                Онлайн-запис
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
