import type { Metadata } from "next";

import { PhotoSlot } from "@/components/shared/PhotoSlot";
import { Contacts } from "@/components/home/Contacts";
import { BookingForm } from "@/components/home/BookingForm";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Контакти",
  description: `Адреса, телефон та графік роботи салону ${SITE.name} у Запоріжжі. Запишіться на процедуру онлайн.`,
  alternates: { canonical: "/contacts" },
  openGraph: {
    title: `Контакти — ${SITE.name}`,
    description: "Адреса, телефон, графік роботи та форма запису салону Спабель.",
  },
};

export default function ContactsPage() {
  return (
    <>
      <section className="relative flex min-h-[36vh] items-end overflow-hidden bg-navy-950">
        <PhotoSlot
          category="spa"
          index={4}
          alt="Контакти Спабель"
          label="Спа — фото 4"
          className="absolute inset-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/30" />
        <div className="container-lux section-x relative z-10 flex flex-col gap-4 pb-16 pt-32">
          <span className="text-xs sm:text-sm tracking-[0.4em] uppercase text-gold-400">
            Спабель
          </span>
          <h1 className="max-w-2xl text-4xl font-medium leading-[1.1] text-white sm:text-5xl">
            Контакти
          </h1>
        </div>
      </section>

      <Contacts />
      <BookingForm />
    </>
  );
}
