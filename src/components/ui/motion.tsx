"use client";

import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────
   Тонка золота смужка прогресу згори сторінки
   ───────────────────────────────────────────── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold/50 via-gold to-gold-light"
    />
  );
}

/* ─────────────────────────────────────────────
   Заголовок, що виїжджає з-під маски по словах
   ───────────────────────────────────────────── */
export type TextPart = { text: string; className?: string };

export function MaskText({
  parts,
  className,
  as: Tag = "h2",
  delay = 0,
  once = true,
  stagger = 0.055,
  duration = 0.9,
  immediate = false,
}: {
  parts: TextPart[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  once?: boolean;
  /** менші значення — швидша поява */
  stagger?: number;
  duration?: number;
  /** для hero: анімація на CSS, стартує до гідратації React */
  immediate?: boolean;
}) {
  const reduced = useReducedMotion();
  const label = parts.map((part) => part.text).join(" ");

  const words = parts.flatMap((part, partIndex) =>
    part.text
      .split(" ")
      .filter(Boolean)
      .map((word, wordIndex) => ({ word, className: part.className, key: `${partIndex}-${wordIndex}` })),
  );

  if (reduced) {
    return (
      <Tag className={className}>
        {parts.map((part, index) => (
          <span key={index} className={part.className}>
            {part.text}
            {index < parts.length - 1 ? " " : null}
          </span>
        ))}
      </Tag>
    );
  }

  if (immediate) {
    return (
      <Tag className={className}>
        <span className="sr-only">{label}</span>
        {words.map(({ word, className: wordClass, key }, index) => (
          <span key={key} aria-hidden className="word-mask">
            <span
              className={cn("word-in", wordClass)}
              style={{ animationDelay: `${delay + index * stagger}s` }}
            >
              {word}
            </span>
            <span className="inline-block">&nbsp;</span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{label}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-90px" }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        className="inline"
      >
        {words.map(({ word, className: wordClass, key }) => (
          <span
            key={key}
            className="inline-block overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em]"
          >
            <motion.span
              variants={{
                hidden: { y: "115%", opacity: 0 },
                visible: { y: "0%", opacity: 1 },
              }}
              transition={{ duration, ease: EASE }}
              className={cn("inline-block", wordClass)}
            >
              {word}
            </motion.span>
            <span className="inline-block">&nbsp;</span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ─────────────────────────────────────────────
   Літери лейбла, що проявляються одна за одною
   ───────────────────────────────────────────── */
export function LetterLabel({ text, className }: { text: string; className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) return <span className={className}>{text}</span>;

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          aria-hidden
          className="letter-in inline-block whitespace-pre"
          style={{ animationDelay: `${index * 0.025}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Число, що набігає до значення
   ───────────────────────────────────────────── */
export function CountUp({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: reduced ? 0 : 1.6,
      ease: EASE,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Зображення, що відкривається шторкою знизу
   ───────────────────────────────────────────── */
export function RevealImage({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 1.15, ease: EASE, delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 1.5, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Кнопка, що м'яко тягнеться за курсором
   ───────────────────────────────────────────── */
export function Magnetic({ children, strength = 10 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 });

  if (reduced) return <>{children}</>;

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy }}
      className="inline-block"
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set(((event.clientX - rect.left) / rect.width - 0.5) * strength * 2);
        y.set(((event.clientY - rect.top) / rect.height - 0.5) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────
   Тепле світло, що йде за курсором у hero
   ───────────────────────────────────────────── */
export function CursorGlow() {
  const reduced = useReducedMotion();
  const x = useMotionValue(30);
  const y = useMotionValue(40);
  const sx = useSpring(x, { stiffness: 40, damping: 20 });
  const sy = useSpring(y, { stiffness: 40, damping: 20 });
  const background = useMotionTemplate`radial-gradient(34% 42% at ${sx}% ${sy}%, color-mix(in srgb, var(--gold) 26%, transparent) 0%, transparent 72%)`;

  useEffect(() => {
    if (reduced) return;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set((event.clientX / window.innerWidth) * 100);
      y.set((event.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, x, y]);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      style={{ background }}
      className="pointer-events-none absolute inset-0 mix-blend-screen"
    />
  );
}

/* ─────────────────────────────────────────────
   Рядок, що повільно пливе (стрічка послуг)
   ───────────────────────────────────────────── */
export function Marquee({ items }: { items: string[] }) {
  const track = [...items, ...items];

  return (
    <div className="marquee group relative z-20 mx-3 my-2 flex overflow-hidden rounded-[var(--r-pill)] border border-gold/15 bg-espresso py-6 shadow-[var(--shadow-soft)] sm:mx-6">
      <div className="marquee-track flex shrink-0 items-center gap-10 pr-10">
        {track.map((item, index) => (
          <span key={`${item}-${index}`} className="flex shrink-0 items-center gap-10">
            <span className="label-spaced text-beige/70 transition-colors duration-500 group-hover:text-beige">
              {item}
            </span>
            <svg
              viewBox="0 0 12 12"
              aria-hidden
              className="h-2.5 w-2.5 shrink-0 text-gold"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <path d="M6 1 11 6 6 11 1 6 6 1Z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Плавне розкриття акордеона по висоті
   ───────────────────────────────────────────── */
export function Collapse({
  open,
  id,
  children,
}: {
  open: boolean;
  id: string;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          key={id}
          id={id}
          initial={reduced ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
          transition={{
            height: { duration: 0.5, ease: EASE },
            opacity: { duration: 0.35, ease: "easeOut" },
          }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export { EASE, motion, AnimatePresence, useReducedMotion, useScroll, useTransform };
