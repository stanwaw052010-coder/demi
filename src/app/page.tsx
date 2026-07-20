import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Results } from "@/components/Results";
import { Gallery } from "@/components/Gallery";
import { Courses } from "@/components/Courses";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingMessengers } from "@/components/FloatingMessengers";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: site.name,
  description:
    "Студія корекції фігури: ендосфера, LPG, антицелюлітний та вакуумний масаж, курси навчання.",
  telephone: `+${site.phoneDigits}`,
  url: "https://kropyvnytska-massage.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "вул. Богдана Хмельницького, 4",
    addressLocality: "Буча",
    addressRegion: "Київська область",
    postalCode: "08292",
    addressCountry: "UA",
  },
  sameAs: [site.instagramUrl],
  priceRange: "$$",
  openingHours: "Mo-Sa 09:00-20:00",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Results />
        <Gallery />
        <Courses />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingMessengers />
    </>
  );
}
