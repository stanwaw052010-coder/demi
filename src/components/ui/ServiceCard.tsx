"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Service } from "@/data/services";

type Props = {
  service: Service;
  index: number;
  /** Посилання ведуть на форму запису — окремих сторінок послуг поки немає. */
  href: string;
};

export function ServiceCard({ service, index, href }: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.a
      href={href}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-md border border-line bg-white transition-[border-color,transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-graphite hover:shadow-[var(--shadow-card)] focus-visible:-translate-y-1.5"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-second">
        <Image
          src={service.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
      </div>

      <div className="flex flex-1 items-start justify-between gap-4 p-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-[1.0625rem] leading-snug">{service.title}</h3>
          <p className="text-[0.875rem] leading-relaxed text-muted">{service.summary}</p>
        </div>

        <span
          aria-hidden
          className="mt-1 shrink-0 translate-y-1 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        >
          <ArrowUpRight className="size-5 text-graphite" strokeWidth={1.25} />
        </span>
      </div>
    </motion.a>
  );
}
