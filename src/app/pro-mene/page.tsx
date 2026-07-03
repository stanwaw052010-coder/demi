import type { Metadata } from "next";
import PageHeader from "@/components/mentor/PageHeader";
import About from "@/components/mentor/About";
import Quote from "@/components/mentor/Quote";
import Why from "@/components/mentor/Why";
import Cta from "@/components/mentor/Cta";

export const metadata: Metadata = {
  title: "Про мене",
  description:
    "Катерина Матюшко — 20+ років у beauty-індустрії, власниця салону краси BEAUTY FORMULA. Історія шляху від майстра до наставниці.",
};

export default function ProMenePage() {
  return (
    <>
      <PageHeader
        eyebrow="Про мене"
        title="Мій шлях у beauty"
        subtitle="Від першої клієнтки до власного салону та наставництва"
      />
      <About />
      <Quote />
      <Why />
      <Cta />
    </>
  );
}
