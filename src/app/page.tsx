import Header from "@/components/amulets/Header";
import Hero from "@/components/amulets/Hero";
import Story from "@/components/amulets/Story";
import Collection from "@/components/amulets/Collection";
import Craft from "@/components/amulets/Craft";
import Contact from "@/components/amulets/Contact";
import Footer from "@/components/amulets/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col">
        <Hero />
        <Story />
        <Collection />
        <Craft />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
