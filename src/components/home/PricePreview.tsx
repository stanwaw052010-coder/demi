"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { highlightServices } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BookButton } from "@/components/booking/BookButton";

export function PricePreview() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-spa">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Прайс" title="Популярні послуги" />
          <Button asChild variant="outline">
            <Link href="/services">
              Повний прайс <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 divide-y divide-navy-900/10 border-y border-navy-900/10">
          {highlightServices.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <Link href={`/services/${service.slug}`} className="group flex-1">
                <p className="text-xs uppercase tracking-widest text-gold-600">
                  {service.categoryTitle}
                </p>
                <p className="mt-1 font-serif text-lg text-navy-900 transition-colors group-hover:text-gold-600">
                  {service.name}
                  {service.duration && (
                    <span className="ml-2 text-sm font-sans text-navy-900/40">
                      · {service.duration}
                    </span>
                  )}
                </p>
              </Link>
              <div className="flex items-center gap-6">
                <span className="font-serif text-xl text-navy-900">{service.price}</span>
                <BookButton variant="outline" size="sm" serviceName={service.name}>
                  Записатися
                </BookButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
