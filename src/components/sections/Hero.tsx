"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import SplitReveal from "@/components/ui/SplitReveal";
import PhotoSlot from "@/components/ui/PhotoSlot";
import OrganicBlob from "@/components/decorative/OrganicBlob";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 md:pt-32"
    >
      {/* decorative brand shapes */}
      <OrganicBlob
        variant={2}
        className="pointer-events-none absolute -left-40 top-[-10%] h-[520px] w-[520px] text-green/15"
      />
      <OrganicBlob
        variant={3}
        className="pointer-events-none absolute -right-24 bottom-[-15%] h-[420px] w-[420px] text-green-soft"
      />

      <div className="container-x relative grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-12">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 lg:col-span-6"
        >
          <Reveal variant="fade" duration={0.6}>
            <span className="mb-6 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-olive">
              <span className="h-px w-8 bg-green" />
              Rayskaya Beauty Space
            </span>
          </Reveal>

          <SplitReveal
            as="h1"
            text="Косметологія і естетика обличчя та тіла."
            className="font-display max-w-xl text-[2.6rem] leading-[1.08] text-ink sm:text-[3.4rem] lg:text-[3.75rem]"
          />

          <Reveal variant="up" delay={0.15}>
            <p className="mt-8 max-w-md text-[17px] leading-relaxed text-body">
              Індивідуальний підхід — сучасні методики.
            </p>
          </Reveal>

          <Reveal variant="up" delay={0.28}>
            <div className="mt-11 flex flex-wrap items-center gap-4">
              <MagneticButton href="#booking" className="bg-green-dark text-warm hover:bg-ink">
                Записатися
              </MagneticButton>
              <MagneticButton
                href="#services"
                className="border border-ink/15 bg-transparent text-ink hover:border-ink/30"
              >
                Консультація
              </MagneticButton>
            </div>
          </Reveal>
        </motion.div>

        <div className="relative lg:col-span-6">
          <motion.div
            style={{ y: imageY }}
            className="animate-float relative mx-auto aspect-[4/5] w-full max-w-[520px] rounded-xl lg:ml-auto lg:mr-0"
          >
            <PhotoSlot
              src="/images/hero-interior.jpg"
              alt="Інтер'єр Rayskaya Beauty Space"
              className="h-full w-full rounded-xl shadow-[0_40px_80px_-30px_rgba(28,30,21,0.35)]"
              blobVariant={1}
            />
            <div className="absolute -bottom-8 -left-8 hidden h-40 w-40 rounded-full border border-green/40 sm:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
