import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import VehicleSelector from "@/components/home/VehicleSelector";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyUs from "@/components/home/WhyUs";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import ContactBanner from "@/components/home/ContactBanner";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Hero />
        <VehicleSelector />
        <CategoryGrid />
        <FeaturedProducts />
        <WhyUs />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <ContactBanner />
      </main>
      <Footer />
    </>
  );
}
