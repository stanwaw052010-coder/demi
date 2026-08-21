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
import { Marquee } from "@/components/ui/motion";

const marqueeItems = [
  "Р У Ч Н И Й   М А С А Ж",
  "С Т О У Н - Т Е Р А П І Я",
  "A R O S H A",
  "B O D Y   C O D E",
  "F I R E M I X",
  "Л І Ф Т И Н Г   Б Е З   П Л А С Т И К И",
  "М А С А Ж   Д Л Я   В А Г І Т Н И Х",
  "Н А Р О Щ Е Н Н Я   В І Й",
  "В О С К О В А   Е П І Л Я Ц І Я",
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Directions />
        <Marquee items={marqueeItems} />
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
