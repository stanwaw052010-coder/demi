import StudioShell from "@/components/studio/StudioShell";
import Nav from "@/components/studio/Nav";
import Hero from "@/components/studio/Hero";
import Marquee from "@/components/studio/Marquee";
import Ritual from "@/components/studio/Ritual";
import Gallery from "@/components/studio/Gallery";
import About from "@/components/studio/About";
import Stats from "@/components/studio/Stats";
import Testimonials from "@/components/studio/Testimonials";
import BookingCTA from "@/components/studio/BookingCTA";
import Footer from "@/components/studio/Footer";
import { MARQUEE_WORDS, SERVICES } from "@/lib/studio/content";

export default function StudioPage() {
  return (
    <StudioShell>
      <a className="skip-link" href="#services">
        Skip to services
      </a>

      <Nav />

      <main>
        <Hero />

        <div className="band band--rule">
          <Marquee items={MARQUEE_WORDS} duration={52} />
        </div>

        <Ritual />
        <Gallery />
        <About />
        <Stats />

        <div className="band band--ink">
          <Marquee
            items={SERVICES.map((service) => service.title.toUpperCase())}
            duration={64}
            reverse
            separator="—"
          />
        </div>

        <Testimonials />
        <BookingCTA />
      </main>

      <Footer />
    </StudioShell>
  );
}
