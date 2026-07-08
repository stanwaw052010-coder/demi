import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Advantages from "@/components/Advantages";
import Services from "@/components/Services";
import Reviews from "@/components/Reviews";
import AppShowcase from "@/components/AppShowcase";
import Booking from "@/components/Booking";
import FindUs from "@/components/FindUs";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Advantages />
        <Services />
        <Reviews />
        <AppShowcase />
        <Booking />
        <FindUs />
        <CTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
