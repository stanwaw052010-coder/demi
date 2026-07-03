import Header from "@/components/salon/Header";
import Hero from "@/components/salon/Hero";
import About from "@/components/salon/About";
import Collection from "@/components/salon/Collection";
import Services from "@/components/salon/Services";
import Contact from "@/components/salon/Contact";
import Footer from "@/components/salon/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Hero />
        <About />
        <Collection />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
