import { GraduationCap, Cpu, ShieldCheck, Fingerprint, Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SplitReveal from "@/components/ui/SplitReveal";

const CARDS = [
  {
    icon: GraduationCap,
    title: "Досвідчені фахівці",
    description:
      "Сертифіковані косметологи з медичною освітою, понад 13 років досвіду та постійним підвищенням кваліфікації в Україні й за кордоном.",
  },
  {
    icon: Cpu,
    title: "Сучасне обладнання",
    description:
      "Працюємо на обладнанні провідних світових брендів для апаратної косметології та лазерних процедур.",
  },
  {
    icon: ShieldCheck,
    title: "Безпечні процедури",
    description: "Використовуємо лише сертифіковані препарати та сучасні протоколи.",
  },
  {
    icon: Fingerprint,
    title: "Індивідуальний підхід",
    description:
      "Для кожного клієнта складаємо персональний план догляду з урахуванням стану шкіри, особливостей організму та бажаного результату.",
  },
  {
    icon: Sparkles,
    title: "Комфорт",
    description:
      "Ми створили простір, у якому приємно піклуватися про себе: затишна атмосфера і уважний сервіс.",
  },
];

export default function WhyUs() {
  return (
    <section id="advantages" className="relative bg-warm-deep py-28 md:py-40">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal variant="fade">
            <span className="mb-6 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-olive">
              <span className="h-px w-8 bg-green" />
              Наші переваги
            </span>
          </Reveal>
          <SplitReveal
            as="h2"
            text="Чому обирають нас"
            className="font-display text-4xl leading-[1.15] text-ink md:text-[2.75rem]"
          />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal
              key={card.title}
              variant="up"
              delay={(i % 3) * 0.08}
              className={i === 3 ? "sm:col-span-2 lg:col-span-2" : ""}
            >
              <div className="group relative flex h-full flex-col rounded-lg border border-line bg-warm p-9 transition-colors duration-500 hover:border-green/50">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-green/30 text-green-dark transition-colors duration-500 group-hover:bg-green group-hover:text-warm">
                  <card.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl text-ink">{card.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-body">
                  {card.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
