import FialkaNavbar from "@/components/fialka/Navbar";
import FialkaHero from "@/components/fialka/Hero";
import FialkaServices from "@/components/fialka/Services";
import FialkaReviews from "@/components/fialka/Reviews";
import FialkaInstagram from "@/components/fialka/Instagram";
import FialkaWhyUs from "@/components/fialka/WhyUs";
import FialkaContacts from "@/components/fialka/Contacts";
import FialkaFinalCTA from "@/components/fialka/FinalCTA";
import FialkaFooter from "@/components/fialka/Footer";

export default function Home() {
  return (
    <>
      <FialkaNavbar />
      <main>
        <FialkaHero />
        <FialkaServices />
        <FialkaReviews />
        <FialkaInstagram />
        <FialkaWhyUs />
        <FialkaContacts />
        <FialkaFinalCTA />
      </main>
      <FialkaFooter />
    </>
  );
}
