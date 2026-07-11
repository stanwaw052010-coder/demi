import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Contacts from "@/components/sections/Contacts";
import Booking from "@/components/sections/Booking";

export const metadata: Metadata = {
  title: "Контакти",
  description:
    "GIN Barbershop, Хмельницький. Графік роботи щодня 10:00–20:00. Телефон +38 (068) 712 42 47. Онлайн-запис та маршрут на карті.",
  alternates: { canonical: "/contacts" },
};

export default function ContactsPage() {
  return (
    <>
      <PageHero
        overline="Контакти · Локація"
        title="Завітайте до нас"
        subtitle="Ми в самому серці Хмельницького. Зателефонуйте, прокладіть маршрут або запишіться онлайн."
      />
      <Contacts />
      <Booking />
    </>
  );
}
