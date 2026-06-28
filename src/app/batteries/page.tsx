import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BatteriesCatalog from "./BatteriesCatalog";

export const metadata: Metadata = {
  title: "Акумулятори для Mercedes Sprinter, Vito, VW Crafter | Спринтер Харків",
  description:
    "Каталог акумуляторів для комерційного транспорту Mercedes та Volkswagen. AGM, EFB, WET — Bosch, Varta, Optima, Exide. Доставка по Україні.",
  keywords: "акумулятор Sprinter, акумулятор Vito, акумулятор Crafter, AGM акумулятор, купити акумулятор Харків",
};

export default function BatteriesPage() {
  return (
    <>
      <Header />
      <main>
        <BatteriesCatalog />
      </main>
      <Footer />
    </>
  );
}
