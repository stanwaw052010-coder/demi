"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { aboutFeatures } from "@/data/content";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="about" className="scroll-mt-24 bg-white py-24 md:py-32">
      <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Про нас"
            lines={["Більше, ніж", "стоматологія"]}
            description="Ми створили простір, у якому стоматологія стає комфортною частиною турботи про себе. Поєднуємо сучасні підходи, естетику та уважне ставлення до кожного пацієнта."
          />

          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {aboutFeatures.map((feature, index) => (
              <Reveal as="li" key={feature.title} delay={index * 0.08} className="flex flex-col gap-2">
                <span className="hairline block pt-5 text-[1.0625rem] text-graphite">
                  {feature.title}
                </span>
                <p className="text-[0.9375rem] leading-relaxed text-muted">{feature.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        <div ref={ref} className="relative">
          <Reveal y={40}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-second lg:aspect-[3/4]">
              <motion.div className="absolute -inset-y-[6%] inset-x-0" style={reduced ? undefined : { y }}>
                <Image
                  src="/images/about.svg"
                  alt="Інтерʼєр клініки: спокійне світло й натуральні матеріали"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
