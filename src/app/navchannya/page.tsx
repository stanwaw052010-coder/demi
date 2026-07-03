import type { Metadata } from "next";
import PageHeader from "@/components/mentor/PageHeader";
import WhoFor from "@/components/mentor/WhoFor";
import Program from "@/components/mentor/Program";
import Faq from "@/components/mentor/Faq";
import Cta from "@/components/mentor/Cta";

export const metadata: Metadata = {
  title: "Навчання нарощуванню волосся",
  description:
    "Повна програма навчання нарощуванню волосся з нуля: основи, практика на моделях, сервіс, просування та вихід на стабільний дохід у beauty.",
};

export default function NavchannyaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Навчання"
        title="Програма навчання нарощуванню волосся"
        subtitle="Від перших знань до впевненої практики та стабільного доходу"
      />
      <WhoFor />
      <Program />
      <Faq />
      <Cta />
    </>
  );
}
