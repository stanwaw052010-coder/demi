import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { ContactForm } from "../ui/ContactForm";
import { site } from "@/lib/site";

export function Booking() {
  return (
    <section id="booking" className="scroll-mt-24 bg-white py-24 md:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          eyebrow="Форма запису"
          lines={["Запис на", "консультацію"]}
          description="Залиште контакти — ми зателефонуємо, щоб узгодити зручний час."
        >
          <Reveal delay={0.1}>
            <div className="hairline mt-4 flex flex-col gap-1 pt-6 text-sm text-muted">
              <span>{site.address.street}</span>
              <span>
                {site.address.district}, {site.address.postal}
              </span>
            </div>
          </Reveal>
        </SectionHeading>

        <Reveal y={30}>
          <div className="rounded-lg border border-line bg-soft p-6 md:p-10">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
