import { SectionHeading } from "../ui/SectionHeading";
import { ServiceCard } from "../ui/ServiceCard";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-soft py-24 md:py-32">
      <div className="shell flex flex-col gap-14">
        <SectionHeading
          eyebrow="Що ми робимо"
          lines={["Послуги"]}
          description="Усе необхідне для здоровʼя та естетики вашої усмішки."
        />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <li key={service.slug} className="flex">
              <ServiceCard service={service} index={index} href="#booking" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
