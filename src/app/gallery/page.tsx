import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Gallery from "@/components/sections/Gallery";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Галерея робіт",
  description:
    "Портфоліо робіт майстрів GIN Barbershop у Хмельницькому: стрижки, fade, борода та атмосфера барбершопу.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        overline="Галерея · Портфоліо"
        title="Наші роботи"
        subtitle="Живі кадри стрижок, деталей та атмосфери GIN. Кожна робота — це історія стилю."
      />
      <Gallery />
      <CTA />
    </>
  );
}
