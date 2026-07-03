import Header from "@/components/sushi/Header";
import Hero from "@/components/sushi/Hero";
import MenuSection from "@/components/sushi/MenuSection";
import Contact from "@/components/sushi/Contact";
import Footer from "@/components/sushi/Footer";
import CartDrawer from "@/components/sushi/CartDrawer";
import { DRINKS, HOT_MENU, ROLLS, SETS } from "@/lib/menu";

export default function Home() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="flex flex-col">
        <Hero />
        <MenuSection
          id="rolls"
          eyebrow="Меню"
          title="Роли"
          subtitle="Класичні та авторські роли Nata-Sushi"
          items={ROLLS}
        />
        <MenuSection
          id="hot"
          eyebrow="Гот-меню"
          title="Гарячі страви"
          subtitle="Удони з локшиною та соусом на вибір"
          items={HOT_MENU}
          alt
        />
        <MenuSection
          id="sets"
          eyebrow="Сети"
          title="Набори"
          subtitle="Вигідні сети для компанії"
          items={SETS}
        />
        <MenuSection
          id="drinks"
          eyebrow="Холодні напої"
          title="Напої"
          items={DRINKS}
          alt
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
