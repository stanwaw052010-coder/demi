import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WhyUs from "@/components/sections/WhyUs";
import Services from "@/components/sections/Services";
import MobileApp from "@/components/sections/MobileApp";
import Testimonials from "@/components/sections/Testimonials";
import Booking from "@/components/sections/Booking";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Hero />
        <About />
        <WhyUs />
        <Services />
        <MobileApp />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
