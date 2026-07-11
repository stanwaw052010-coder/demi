import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Barbers from "@/components/sections/Barbers";
import Reviews from "@/components/sections/Reviews";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Наші барбери",
  description:
    "Команда топ-майстрів GIN Barbershop у Хмельницькому. Роки досвіду, спеціалізація та тисячі задоволених клієнтів.",
  alternates: { canonical: "/barbers" },
};

export default function BarbersPage() {
  return (
    <>
      <PageHero
        overline="Команда · Майстри"
        title="Наші барбери"
        subtitle="Професіонали, для яких стрижка — це ремесло на межі з мистецтвом."
      />
      <Barbers />
      <Reviews />
      <CTA />
    </>
  );
}
