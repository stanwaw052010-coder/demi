"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { serviceCategories } from "@/data/services";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function ServicesOverview() {
  return (
    <section className="bg-navy-50 py-20 sm:py-28">
      <div className="container-spa">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Послуги" title="Все для вашої краси в одному салоні" />
          <Button asChild variant="outline">
            <Link href="/services">
              Всі послуги <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <Link
                href={`/services?category=${cat.slug}`}
                className="group relative block h-72 overflow-hidden rounded-2xl"
              >
                <Photo
                  src={`/images/services/${cat.slug}.jpg`}
                  alt={cat.title}
                  label={cat.shortTitle}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs uppercase tracking-widest text-gold-400">
                    {cat.count} послуг
                  </p>
                  <h3 className="mt-2 font-serif text-xl text-white">{cat.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-white/70 opacity-0 transition-opacity group-hover:opacity-100">
                    Переглянути <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
