import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileCta } from "@/components/MobileCta";
import { Cursor } from "@/components/ui/Cursor";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Massage } from "@/components/sections/Massage";
import { Benefits } from "@/components/sections/Benefits";
import { GallerySection } from "@/components/sections/GallerySection";
import { Trust } from "@/components/sections/Trust";
import { Reviews } from "@/components/sections/Reviews";
import { Location } from "@/components/sections/Location";
import { ContactCta } from "@/components/sections/ContactCta";
import { Booking } from "@/components/sections/Booking";
import { LocalBusinessSchema } from "@/components/Schema";

export default function Home() {
  return (
    <>
      <LocalBusinessSchema />
      <Cursor />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-sm focus:bg-graphite focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Перейти до вмісту
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Services />
        <Massage />
        <Benefits />
        <GallerySection />
        <Trust />
        <Reviews />
        <Location />
        <ContactCta />
        <Booking />
      </main>

      <Footer />
      {/* Відступ під липку мобільну панель, щоб футер не ховався. */}
      <div aria-hidden className="h-20 bg-graphite lg:hidden" />
      <MobileCta />
    </>
  );
}
