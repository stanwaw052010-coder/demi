import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Barbers from "@/components/sections/Barbers";
import Gallery from "@/components/sections/Gallery";
import Reviews from "@/components/sections/Reviews";
import Booking from "@/components/sections/Booking";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Contacts from "@/components/sections/Contacts";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <BeforeAfter />
      <Barbers />
      <Gallery />
      <Reviews />
      <Booking />
      <FAQ />
      <CTA />
      <Contacts />
    </>
  );
}
