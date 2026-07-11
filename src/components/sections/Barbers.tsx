"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Instagram } from "@/components/ui/Icons";
import { barbers } from "@/lib/content";
import { Reveal, TextReveal } from "@/components/ui/Reveal";

export default function Barbers() {
  return (
    <section id="barbers" className="relative py-28 sm:py-40">
      <div className="container-lux">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="overline mb-6">Команда · Майстри</p>
            </Reveal>
            <h2 className="h-section max-w-2xl font-display text-fg">
              <TextReveal text="Майстри своєї" />
              <br />
              <TextReveal text="справи" delay={0.1} />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-xs text-muted-2">
              Кожен барбер GIN — це роки практики, тисячі стрижок і бездоганна
              увага до вашого образу.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {barbers.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              data-cursor="hover"
              className="group relative overflow-hidden rounded-2xl border border-white/5"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={b.image}
                  alt={b.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />

                {/* Social */}
                <a
                  href={b.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${b.name} в Instagram`}
                  className="absolute right-4 top-4 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full glass border border-white/10 text-fg opacity-0 transition-all duration-500 hover:text-gold group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <Instagram size={16} strokeWidth={1.6} />
                </a>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs text-gold">{b.exp}</p>
                <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-fg">
                  {b.name}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-2">{b.role}</p>
                  <ArrowUpRight
                    className="h-4 w-4 -translate-x-2 text-gold opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                    strokeWidth={1.6}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
