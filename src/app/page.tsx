import Header from "@/components/shop/Header";
import Hero from "@/components/shop/Hero";
import Catalog from "@/components/shop/Catalog";
import Advantages from "@/components/shop/Advantages";
import Process from "@/components/shop/Process";
import Contact from "@/components/shop/Contact";
import Footer from "@/components/shop/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Hero />
        <Catalog />
        <Advantages />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
