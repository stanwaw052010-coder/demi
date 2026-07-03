import Hero from "@/components/mentor/Hero";
import Quote from "@/components/mentor/Quote";
import Why from "@/components/mentor/Why";
import ProgramTeaser from "@/components/mentor/ProgramTeaser";
import Gallery from "@/components/mentor/Gallery";
import SalonTeaser from "@/components/mentor/SalonTeaser";
import Cta from "@/components/mentor/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Quote />
      <Why />
      <ProgramTeaser />
      <Gallery />
      <SalonTeaser />
      <Cta />
    </>
  );
}
