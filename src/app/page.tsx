import Navigation from '@/components/salon/Navigation';
import HeroSection from '@/components/salon/HeroSection';
import ServicesSection from '@/components/salon/ServicesSection';
import GallerySection from '@/components/salon/GallerySection';
import BookingSection from '@/components/salon/BookingSection';
import WhyUsSection from '@/components/salon/WhyUsSection';
import InstagramSection from '@/components/salon/InstagramSection';
import ContactSection from '@/components/salon/ContactSection';
import Footer from '@/components/salon/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <GallerySection />
        <BookingSection />
        <WhyUsSection />
        <InstagramSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
