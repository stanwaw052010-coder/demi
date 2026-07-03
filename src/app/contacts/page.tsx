import type { Metadata } from "next";
import PageHeader from "@/components/mentor/PageHeader";
import ContactCards from "@/components/mentor/ContactCards";

export const metadata: Metadata = {
  title: "Контакти",
  description:
    "Зв'яжіться з Катериною Матюшко щодо навчання нарощуванню волосся або з салоном краси BEAUTY FORMULA щодо послуг.",
};

export default function ContactsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Контакти"
        title="Напишіть мені"
        subtitle="Оберіть напрямок — навчання чи послуги салону"
      />
      <ContactCards />
    </>
  );
}
