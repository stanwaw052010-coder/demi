import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Advantages from "@/components/Advantages";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import AppShowcase from "@/components/AppShowcase";
import CTA from "@/components/CTA";
import Booking from "@/components/Booking";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Advantages />
        <Services />
        <Testimonials />
        <AppShowcase />
        <CTA />
        <Booking />
        <MapSection />
      </main>
      <Footer />
    </>
  );
}
