import { About } from "@/components/sections/About";
import { Advantages } from "@/components/sections/Advantages";
import { Contacts } from "@/components/sections/Contacts";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Pricing } from "@/components/sections/Pricing";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Advantages />
      <Pricing />
      <Gallery />
      <Testimonials />
      <Faq />
      <CtaBanner />
      <Contacts />
    </>
  );
}
