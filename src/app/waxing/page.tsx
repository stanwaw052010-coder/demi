import Header from "@/components/waxing/Header";
import Hero from "@/components/waxing/Hero";
import Services from "@/components/waxing/Services";
import BeforeAfter from "@/components/waxing/BeforeAfter";
import WhyUs from "@/components/waxing/WhyUs";
import FAQ from "@/components/waxing/FAQ";
import Testimonials from "@/components/waxing/Testimonials";
import Booking from "@/components/waxing/Booking";
import Footer from "@/components/waxing/Footer";

export default function WaxingPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Hero />
        <Services />
        <BeforeAfter />
        <WhyUs />
        <FAQ />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
