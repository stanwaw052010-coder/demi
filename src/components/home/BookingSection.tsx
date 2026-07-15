"use client";

import { motion } from "framer-motion";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingForm } from "@/components/booking/BookingForm";

export function BookingSection() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28">
      <Photo
        src="/images/spa/spa-2.jpg"
        alt="Запис у SPA-салон Спабель"
        fill
        sizes="100vw"
        className="opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/95 to-navy-950/70" />

      <div className="container-spa relative grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading eyebrow="Запис" title="Забронюйте свій візит" light />
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/65">
            Залиште контакти — адміністратор Спабель зв&apos;яжеться з вами,
            щоб підтвердити зручний час і підібрати спеціаліста під ваш запит.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
        >
          <BookingForm />
        </motion.div>
      </div>
    </section>
  );
}
