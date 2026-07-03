import type { Metadata } from "next";
import PageHeader from "@/components/mentor/PageHeader";
import Salon from "@/components/mentor/Salon";
import Gallery from "@/components/mentor/Gallery";
import Cta from "@/components/mentor/Cta";
import { SALON_NAME } from "@/lib/mentor";

export const metadata: Metadata = {
  title: SALON_NAME,
  description:
    "Салон краси BEAUTY FORMULA — перукарські послуги, манікюр, косметолог, брови/вії/ламінування, макіяж. Адреса, карта та запис в Instagram.",
};

export default function SalonPage() {
  return (
    <>
      <PageHeader
        eyebrow="Мій салон"
        title={SALON_NAME}
        subtitle="Салон краси на позитиві — простір, де я щодня працюю з клієнтками та ученицями"
      />
      <Salon />
      <Gallery />
      <Cta />
    </>
  );
}
