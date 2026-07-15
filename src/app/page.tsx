import { Hero } from "@/components/home/Hero";
import { Advantages } from "@/components/home/Advantages";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { SpaSection } from "@/components/home/SpaSection";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { TeamSection } from "@/components/home/TeamSection";
import { PricePreview } from "@/components/home/PricePreview";
import { Testimonials } from "@/components/home/Testimonials";
import { ContactsSection } from "@/components/home/ContactsSection";
import { BookingSection } from "@/components/home/BookingSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Advantages />
      <ServicesOverview />
      <SpaSection />
      <AboutTeaser />
      <TeamSection />
      <PricePreview />
      <Testimonials />
      <ContactsSection />
      <BookingSection />
    </>
  );
}
