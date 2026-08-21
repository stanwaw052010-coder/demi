"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { MapPin, Phone } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CursorGlow, LetterLabel, Magnetic, MaskText } from "@/components/ui/motion";
import { site } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Затримка CSS-появи; при prefers-reduced-motion анімації вимкнені глобально. */
const riseDelay = (seconds: number) => ({ animationDelay: `${seconds}s` });

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-espresso pt-28"
    >
      <motion.div
        aria-hidden
        style={reduced ? undefined : { y: imageY, scale: imageScale }}
        className="absolute inset-0"
      >
        <motion.div
          className="relative h-full w-full"
          initial={reduced ? false : { scale: 1.07 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.9, ease: EASE }}
        >
          <Image
            src="/images/hero-oil.jpg"
            alt="Тепле світло свічок і олія для масажу в студії SISTER'S"
            fill
            priority
            sizes="100vw"
            quality={62}
            className="object-cover opacity-60"
          />
        </motion.div>
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-espresso/85 via-espresso/55 to-espresso"
      />
      <div aria-hidden className="ambient-glow absolute inset-0 mix-blend-screen" />
      <CursorGlow />

      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative mx-auto w-full max-w-[1160px] px-5 pb-10 sm:px-8 sm:pb-14"
      >
        <LetterLabel text={site.nameSpaced} className="label-spaced block text-gold" />

        <MaskText
          as="h1"
          immediate
          delay={0.12}
          stagger={0.06}
          parts={[
            { text: "Тіло, яке" },
            { text: "нарешті", className: "text-gold-light" },
            { text: "видихає", className: "italic" },
          ]}
          className="mt-7 max-w-[16ch] text-balance text-[3rem] leading-[0.98] text-sand sm:text-7xl md:text-[5.6rem]"
        />

        <div>
          <p
            style={riseDelay(0.55)}
            className="rise-in mt-7 max-w-[54ch] text-pretty text-[1.02rem] text-beige sm:text-lg"
          >
            Масаж, обгортання, апаратні процедури, нарощення вій та воскова епіляція у Чернівцях.
          </p>

          <div
            style={riseDelay(0.68)}
            className="rise-in mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Magnetic>
              <Link
                href="#zapys"
                className="btn btn-solid label-spaced block px-8 py-4 text-center sm:inline-block"
              >
                Записатися
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="#prays"
                className="btn btn-outline label-spaced block px-8 py-4 text-center sm:inline-block"
              >
                Подивитися прайс
              </Link>
            </Magnetic>
          </div>

          <div
            style={riseDelay(0.81)}
            className="rise-in mt-12 flex flex-col gap-x-8 gap-y-2.5 border-t border-gold/15 pt-6 text-sm text-beige sm:flex-row sm:flex-wrap sm:items-center"
          >
            <a
              href={site.mapLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 transition-colors hover:text-gold"
            >
              <MapPin className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.25} aria-hidden />
              {site.address.full}
            </a>
            {site.masters.map((master) => (
              <a
                key={master.phone}
                href={`tel:${master.phone}`}
                className="inline-flex items-center gap-2.5 transition-colors hover:text-gold"
              >
                <Phone className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.25} aria-hidden />
                {master.phoneLabel}
                <span className="text-beige/70">— {master.name}</span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Підказка прокрутки: золота крапля стікає по лінії */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={reduced ? undefined : { opacity: contentOpacity }}
        className="pointer-events-none absolute bottom-6 right-5 hidden h-16 w-px overflow-hidden bg-gold/20 sm:right-8 lg:block"
      >
        {reduced ? null : (
          <motion.span
            className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-transparent via-gold to-transparent"
            animate={{ y: ["-100%", "300%"] }}
            transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.4 }}
          />
        )}
      </motion.div>
    </section>
  );
}
