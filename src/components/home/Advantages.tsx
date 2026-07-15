"use client";

import { motion } from "framer-motion";
import { advantages } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Advantages() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-spa">
        <SectionHeading eyebrow="Чому Спабель" title="Переваги нашого салону" />
        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/30 bg-gold-100/40 text-gold-600 transition-colors group-hover:bg-gold-500 group-hover:text-white">
                <a.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-serif text-xl text-navy-900">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-900/60">{a.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
