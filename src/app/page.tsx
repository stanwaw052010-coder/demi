import Header from "@/components/grooming/Header";
import Hero from "@/components/grooming/Hero";
import About from "@/components/grooming/About";
import Services from "@/components/grooming/Services";
import Gallery from "@/components/grooming/Gallery";
import Contact from "@/components/grooming/Contact";
import CtaBanner from "@/components/grooming/CtaBanner";
import Footer from "@/components/grooming/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Contact />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
