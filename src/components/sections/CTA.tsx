"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/Reveal";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -z-10 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2000&auto=format&fit=crop"
          alt="Атмосфера GIN Barbershop"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-bg/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg" />
      </motion.div>

      <div className="container-lux flex flex-col items-center py-32 text-center sm:py-44">
        <p className="overline mb-8">Ваш новий образ чекає</p>
        <h2 className="h-display max-w-4xl font-display text-balance text-fg">
          <TextReveal text="Час виглядати" />
          <br />
          <span className="text-gradient-gold">
            <TextReveal text="бездоганно" delay={0.1} />
          </span>
        </h2>
        <p className="mt-8 max-w-lg text-lg text-muted-2">
          Приєднуйтесь до тисяч чоловіків, які довірили свій стиль GIN.
          Забронюйте візит просто зараз.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href={site.bookingUrl} external>
            Записатися онлайн
          </Button>
          <Button href={site.phoneHref} variant="outline" arrow={false} magnetic={false}>
            {site.phonePretty}
          </Button>
        </div>
      </div>
    </section>
  );
}
