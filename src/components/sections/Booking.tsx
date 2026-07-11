"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ShieldCheck, Sparkles } from "lucide-react";
import { site } from "@/lib/utils";
import { Reveal, TextReveal } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

const points = [
  { icon: <Clock size={16} />, text: "Займає менше однієї хвилини" },
  { icon: <ShieldCheck size={16} />, text: "Підтвердження одразу" },
  { icon: <Sparkles size={16} />, text: "Обирайте майстра та час" },
];

export default function Booking() {
  const [load, setLoad] = useState(false);

  return (
    <section id="booking" className="relative py-28 sm:py-40">
      <div className="container-lux">
        <div className="overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-bg-2 via-bg to-bg-2">
          <div className="grid lg:grid-cols-2">
            {/* Left copy */}
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <Reveal>
                <p className="overline mb-6">Онлайн-запис · Altegio</p>
              </Reveal>
              <h2 className="h-section font-display text-fg">
                <TextReveal text="Забронюйте свій" />
                <br />
                <TextReveal text="візит" delay={0.08} />
                <span className="text-gradient-gold">
                  {" "}
                  <TextReveal text="за хвилину" delay={0.16} />
                </span>
              </h2>
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-md text-lg text-muted-2">
                  Оберіть послугу, майстра та зручний час. Ніяких дзвінків і
                  очікування — усе онлайн.
                </p>
              </Reveal>

              <ul className="mt-10 space-y-4">
                {points.map((p, i) => (
                  <Reveal key={i} delay={0.25 + i * 0.08}>
                    <li className="flex items-center gap-3 text-muted-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/25 bg-gold/5 text-gold">
                        {p.icon}
                      </span>
                      {p.text}
                    </li>
                  </Reveal>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-3">
                <Button href={site.bookingUrl} external>
                  Відкрити запис
                </Button>
                <Button href={site.phoneHref} variant="outline" arrow={false} magnetic={false}>
                  {site.phonePretty}
                </Button>
              </div>
            </div>

            {/* Right: embed */}
            <div className="relative min-h-[520px] border-t border-white/8 lg:border-l lg:border-t-0">
              {!load ? (
                <button
                  onClick={() => setLoad(true)}
                  data-cursor="hover"
                  className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-bg-2/40 p-8 text-center"
                >
                  <motion.span
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-gold"
                  >
                    <Sparkles size={24} strokeWidth={1.4} />
                  </motion.span>
                  <span className="font-display text-xl font-semibold text-fg">
                    Завантажити форму запису
                  </span>
                  <span className="max-w-xs text-sm text-muted">
                    Натисніть, щоб відкрити віджет Altegio прямо тут
                  </span>
                </button>
              ) : (
                <iframe
                  src={site.bookingUrl}
                  title="Онлайн-запис GIN Barbershop"
                  loading="lazy"
                  className="h-full w-full min-h-[520px] bg-white"
                  allow="payment"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
