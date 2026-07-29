import { Phone } from "lucide-react";
import { Instagram } from "@/components/ui/icons";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faq, site } from "@/lib/site";

export function Faq() {
  return (
    <section id="faq" className="relative isolate overflow-hidden bg-graphite-50 py-24 md:py-32">
      <div className="container-x relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Питання та відповіді"
              title="Коротко про"
              accent="головне"
              text="Зібрали те, що запитують найчастіше перед першим візитом."
            />

            <Reveal direction="up" delay={0.2}>
              <div className="mt-10 rounded-5xl border border-graphite-200/70 bg-white p-8 shadow-soft">
                <h3 className="text-[1.15rem] leading-tight font-extrabold tracking-[-0.025em] text-ink">
                  Не знайшли відповідь?
                </h3>
                <p className="mt-2.5 text-[0.92rem] leading-relaxed text-graphite-600 text-pretty">
                  Напишіть або зателефонуйте — відповімо без шаблонів і чесно скажемо, чи можемо допомогти.
                </p>
                <div className="mt-7 flex flex-col gap-3">
                  <Button href={site.phone.href} size="md" className="w-full">
                    <Phone className="size-[1.05rem]" strokeWidth={2.4} />
                    {site.phone.display}
                  </Button>
                  <Button href={site.instagram.url} variant="outline" size="md" className="w-full">
                    <Instagram className="size-[1.05rem]" strokeWidth={2.2} />
                    Написати в Instagram
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          <Accordion items={faq} />
        </div>
      </div>
    </section>
  );
}
