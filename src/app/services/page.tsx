import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Services from "@/components/sections/Services";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Booking from "@/components/sections/Booking";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Послуги та ціни",
  description:
    "Чоловічі стрижки, fade, корекція бороди, королівське гоління, фарбування та комплексний догляд у GIN Barbershop, Хмельницький. Актуальні ціни та онлайн-запис.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        overline="Послуги · Прайс"
        title="Наші послуги"
        subtitle="Повний спектр преміального догляду для сучасного чоловіка — від класичної стрижки до королівського гоління."
      />
      <Services />
      <BeforeAfter />
      <Booking />
      <FAQ />
    </>
  );
}
