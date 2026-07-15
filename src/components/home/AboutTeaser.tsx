"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function AboutTeaser() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-spa grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative order-2 grid grid-cols-5 gap-4 lg:order-1"
        >
          <div className="relative col-span-3 h-80 overflow-hidden rounded-2xl sm:h-96">
            <Photo
              src="/images/about/about-1.jpg"
              alt="Простір салону Спабель"
              label="Спабель"
              fill
              sizes="(min-width: 1024px) 30vw, 60vw"
            />
          </div>
          <div className="relative col-span-2 mt-10 h-64 overflow-hidden rounded-2xl sm:h-80">
            <Photo
              src="/images/about/about-2.jpg"
              alt="Догляд у салоні Спабель"
              label="Belle"
              fill
              sizes="(min-width: 1024px) 20vw, 40vw"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="order-1 lg:order-2"
        >
          <SectionHeading eyebrow="Про нас" title="Місце, де можна зупинитися" />
          <p className="mt-6 text-base leading-relaxed text-navy-900/65">
            SPA — мистецтво відновлення тіла й душі, а belle — французьке
            «гарна». Спабель поєднує ці ідеї у просторі, де кожна деталь
            працює на ваш комфорт: м&apos;яка атмосфера, уважний сервіс,
            бездоганна чистота та команда професіоналів, які досконало
            володіють своєю справою.
          </p>
          <p className="mt-4 text-base leading-relaxed text-navy-900/65">
            Салон повного циклу — від манікюру до косметологічних процедур —
            без поспіху, в атмосфері спокою.
          </p>
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link href="/about">
                Дізнатися більше <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
