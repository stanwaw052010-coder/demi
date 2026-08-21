import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Directions } from "@/components/sections/Directions";
import { PriceList } from "@/components/sections/PriceList";
import { Arosha } from "@/components/sections/Arosha";
import { Benefits } from "@/components/sections/Benefits";
import { Gallery } from "@/components/sections/Gallery";
import { Reviews } from "@/components/sections/Reviews";
import { Faq } from "@/components/sections/Faq";
import { Booking } from "@/components/sections/Booking";
import { Contacts } from "@/components/sections/Contacts";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Directions />
        <PriceList />
        <Arosha />
        <Benefits />
        <Gallery />
        <Reviews />
        <Faq />
        <Booking />
        <Contacts />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
