"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, TextReveal } from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { stats } from "@/lib/content";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="about" ref={ref} className="relative py-28 sm:py-40">
      <div className="container-lux">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Text */}
          <div className="flex flex-col justify-center">
            <Reveal>
              <p className="overline mb-6">Філософія · Est. 2014</p>
            </Reveal>
            <h2 className="h-section max-w-xl font-display text-fg">
              <TextReveal text="Мистецтво чоловічого стилю" />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-2">
                GIN — це не про поспіх. Це про ритуал. Про крісло з натуральної
                шкіри, аромат дерева й тютюну, склянку віскі та майстра, який
                знає вашу форму краще за вас самих.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-5 max-w-lg leading-relaxed text-muted">
                Ми зібрали команду барберів, для яких стрижка — це ремесло на
                межі з мистецтвом. Кожна лінія, кожен перехід, кожна деталь
                створені так, щоб ви виходили звідси іншою людиною.
              </p>
            </Reveal>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08}>
                  <div>
                    <div className="font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
                      <Counter
                        value={s.value}
                        suffix={s.suffix}
                        decimals={s.value % 1 !== 0 ? 1 : 0}
                      />
                    </div>
                    <div className="mt-2 text-xs leading-snug text-muted">
                      {s.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Images composition */}
          <div className="relative h-[520px] sm:h-[640px]">
            <motion.div
              style={{ y: y1 }}
              className="absolute right-0 top-0 h-[62%] w-[68%] overflow-hidden rounded-2xl shine border-gradient"
            >
              <Image
                src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200&auto=format&fit=crop"
                alt="Майстер за роботою"
                fill
                sizes="(max-width: 1024px) 60vw, 30vw"
                className="object-cover"
              />
            </motion.div>
            <motion.div
              style={{ y: y2 }}
              className="absolute bottom-0 left-0 h-[55%] w-[58%] overflow-hidden rounded-2xl shine border-gradient"
            >
              <Image
                src="https://images.unsplash.com/photo-1512690459411-b9245aed614b?q=80&w=1200&auto=format&fit=crop"
                alt="Атмосфера барбершопу"
                fill
                sizes="(max-width: 1024px) 55vw, 28vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute bottom-6 right-4 z-10 rounded-xl glass border border-white/10 px-5 py-4">
              <p className="font-display text-2xl font-bold text-gold">4.9★</p>
              <p className="text-xs text-muted">480+ відгуків Google</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
