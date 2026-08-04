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
import { Process } from "@/components/sections/process";
import { Contacts } from "@/components/sections/contacts";
import { RevealObserver } from "@/components/ui/reveal-observer";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const BeforeAfter = dynamic(() =>
  import("@/components/sections/before-after").then((m) => m.BeforeAfter),
);

const Space = dynamic(() =>
  import("@/components/sections/space").then((m) => m.Space),
);

/* Below the fold — its form logic loads after the page is interactive */
const Booking = dynamic(() =>
  import("@/components/sections/booking").then((m) => m.Booking),
);

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <WhyUs />
        <BeforeAfter />
        <Process />
        <Doctor />
        <Space />
        <Testimonials />
        <Faq />
        <Booking />
        <Contacts />
      </main>
      <Footer />
      <MobileCta />
      <RevealObserver />
    </>
  );
}
