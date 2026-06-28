import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollObserver from "@/components/ScrollObserver";

export default function Home() {
  return (
    <>
      <ScrollObserver />
      <Header />
      <main className="flex flex-col">
        <Hero />
        <Stats />
        <Services />
        <WhyUs />
        <HowItWorks />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
