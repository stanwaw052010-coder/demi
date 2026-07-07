import type { Metadata } from "next";
import Header from "@/components/kolibri/Header";
import Hero from "@/components/kolibri/Hero";
import About from "@/components/kolibri/About";
import Services from "@/components/kolibri/Services";
import PromoBanner from "@/components/kolibri/PromoBanner";
import Doctors from "@/components/kolibri/Doctors";
import Gallery from "@/components/kolibri/Gallery";
import Reviews from "@/components/kolibri/Reviews";
import Contact from "@/components/kolibri/Contact";
import Footer from "@/components/kolibri/Footer";

export const metadata: Metadata = {
  title: "KOLIBRI — Центр щелепно-лицевої хірургії та стоматології",
  description:
    "KOLIBRI — досвід, професіоналізм та найсучасніші методи для найкращих результатів. Стоматологія та щелепно-лицева хірургія. вул. Дмитра Майбороди, 2а.",
};

export default function KolibriPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Hero />
        <About />
        <Services />
        <PromoBanner />
        <Doctors />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
