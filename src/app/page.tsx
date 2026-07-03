import Header from "@/components/mentor/Header";
import Hero from "@/components/mentor/Hero";
import About from "@/components/mentor/About";
import Quote from "@/components/mentor/Quote";
import Program from "@/components/mentor/Program";
import Why from "@/components/mentor/Why";
import Gallery from "@/components/mentor/Gallery";
import Salon from "@/components/mentor/Salon";
import Cta from "@/components/mentor/Cta";
import Footer from "@/components/mentor/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Hero />
        <About />
        <Quote />
        <Program />
        <Why />
        <Gallery />
        <Salon />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
