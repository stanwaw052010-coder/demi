import Header from "@/components/mentor/Header";
import Hero from "@/components/mentor/Hero";
import About from "@/components/mentor/About";
import Program from "@/components/mentor/Program";
import Why from "@/components/mentor/Why";
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
        <Program />
        <Why />
        <Salon />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
