import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { Advantages } from "@/components/home/Advantages";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { SpaHighlight } from "@/components/home/SpaHighlight";
import { AboutPreview } from "@/components/home/AboutPreview";
import { Specialists } from "@/components/home/Specialists";
import { PriceList } from "@/components/home/PriceList";
import { Testimonials } from "@/components/home/Testimonials";
import { Contacts } from "@/components/home/Contacts";
import { BookingForm } from "@/components/home/BookingForm";
import { SITE } from "@/data/site";
import { LocalBusinessJsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Головна",
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Hero />
      <Advantages />
      <ServicesGrid />
      <SpaHighlight />
      <AboutPreview />
      <Specialists />
      <PriceList />
      <Testimonials />
      <Contacts />
      <BookingForm />
    </>
  );
}
