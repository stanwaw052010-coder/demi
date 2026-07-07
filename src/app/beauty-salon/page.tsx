import BeautyHeader from "@/components/beauty/BeautyHeader";
import BeautyHero from "@/components/beauty/BeautyHero";
import BeautyServices from "@/components/beauty/BeautyServices";
import BeautyGallery from "@/components/beauty/BeautyGallery";
import BeautyAbout from "@/components/beauty/BeautyAbout";
import BeautyTestimonials from "@/components/beauty/BeautyTestimonials";
import BeautyContact from "@/components/beauty/BeautyContact";
import BeautyFooter from "@/components/beauty/BeautyFooter";

export default function BeautySalonPage() {
  return (
    <>
      <BeautyHeader />
      <main className="flex flex-col">
        <BeautyHero />
        <BeautyServices />
        <BeautyGallery />
        <BeautyAbout />
        <BeautyTestimonials />
        <BeautyContact />
      </main>
      <BeautyFooter />
    </>
  );
}
