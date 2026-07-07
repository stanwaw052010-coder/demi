import Header from "@/components/salon/Header";
import Footer from "@/components/salon/Footer";
import Hero from "@/components/salon/Hero";
import Services from "@/components/salon/Services";
import Gallery from "@/components/salon/Gallery";
import Pricing from "@/components/salon/Pricing";
import About from "@/components/salon/About";
import Testimonials from "@/components/salon/Testimonials";
import Booking from "@/components/salon/Booking";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Hero />
        <Services />
        <Gallery />
        <Pricing />
        <About />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
