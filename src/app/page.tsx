import dynamic from "next/dynamic";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileCta } from "@/components/site/mobile-cta";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";

import { Doctor } from "@/components/sections/doctor";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Contacts } from "@/components/sections/contacts";
import { RevealObserver } from "@/components/ui/reveal-observer";

const BeforeAfter = dynamic(() =>
  import("@/components/sections/before-after").then((m) => m.BeforeAfter),
);

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <WhyUs />
        <BeforeAfter />
        <Doctor />
        <Testimonials />
        <Faq />
        <Contacts />
      </main>
      <Footer />
      <MobileCta />
      <RevealObserver />
    </>
  );
}
