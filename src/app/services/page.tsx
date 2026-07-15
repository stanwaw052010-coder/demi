import type { Metadata } from "next";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";
import { PageHero } from "@/components/ui/PageHero";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Всі послуги та прайс",
  description:
    "Повний прайс-лист SPA-салону Спабель: лазерна епіляція, косметологія, перукарські послуги, манікюр і педикюр, масаж та SPA-програми. Пошук і фільтр за категоріями.",
  openGraph: {
    title: `Всі послуги та прайс | ${siteConfig.name}`,
    description:
      "Повний прайс-лист SPA-салону Спабель за категоріями з пошуком по назві послуги.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Прайс-лист"
        title="Всі послуги"
        description="Оберіть категорію або скористайтесь пошуком, щоб швидко знайти потрібну процедуру та її вартість."
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="container-spa">
          <ServicesExplorer />
        </div>
      </section>
    </>
  );
}
