import Header from "@/components/nails/Header";
import Hero from "@/components/nails/Hero";
import About from "@/components/nails/About";
import Services from "@/components/nails/Services";
import Prices from "@/components/nails/Prices";
import Gallery from "@/components/nails/Gallery";
import Contact from "@/components/nails/Contact";
import Footer from "@/components/nails/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Hero />
        <Services />
        <Prices />
        <Gallery />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
