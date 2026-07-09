import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Advantages from "@/components/Advantages";
import Services from "@/components/Services";
import Reviews from "@/components/Reviews";
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
        <Reviews />
        <Booking />
        <MapSection />
      </main>
      <Footer />
    </>
  );
}
