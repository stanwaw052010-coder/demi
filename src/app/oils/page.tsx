import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OilsCatalog from "./OilsCatalog";

export const metadata: Metadata = {
  title: "Моторна олива — Каталог | Спринтер Харків",
  description:
    "Каталог моторних олив у Харкові. Aral, Castrol, Mobil 1, Shell, MOTUL та інші бренди. Підбір за в'язкістю, допуском OEM та типом двигуна. Понад 493 позиції.",
  keywords: "моторна олива, масло двигун, 5w40, 5w30, 0w40, синтетика, Харків, купити оливу",
};

export default function OilsPage() {
  return (
    <>
      <Header />
      <main>
        <OilsCatalog />
      </main>
      <Footer />
    </>
  );
}
