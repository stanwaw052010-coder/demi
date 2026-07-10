import { Cursor } from "@/components/fx/Cursor";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { Header } from "@/components/Header";
import { Preloader } from "@/components/Preloader";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Booking } from "@/components/sections/Booking";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Preloader />
      <Cursor />
      <ScrollProgress />
      <Header />
      <div className="grain" aria-hidden />

      <main>
        <Hero />
        <Manifesto />
        <Services />
        <Gallery />
        <BeforeAfter />
        <Testimonials />
        <Stats />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
