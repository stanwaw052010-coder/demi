import {
  BadgeCheck,
  ScanFace,
  ShieldCheck,
  HeartHandshake,
  Armchair,
} from "lucide-react";

const ITEMS = [
  {
    icon: BadgeCheck,
    num: "01",
    title: "Досвідчені фахівці",
    text: "Сертифіковані косметологи з медичною освітою, понад 13 років досвіду та постійним підвищенням кваліфікації в Україні й за кордоном.",
    span: "lg:col-span-2",
  },
  {
    icon: ScanFace,
    num: "02",
    title: "Сучасне обладнання",
    text: "Працюємо на обладнанні провідних світових брендів для апаратної косметології та лазерних процедур.",
    span: "lg:col-span-2",
  },
  {
    icon: ShieldCheck,
    num: "03",
    title: "Безпечні процедури",
    text: "Використовуємо лише сертифіковані препарати та сучасні протоколи.",
    span: "lg:col-span-2",
  },
  {
    icon: HeartHandshake,
    num: "04",
    title: "Індивідуальний підхід",
    text: "Для кожного клієнта складаємо персональний план догляду з урахуванням стану шкіри, особливостей організму та бажаного результату.",
    span: "lg:col-span-3",
  },
  {
    icon: Armchair,
    num: "05",
    title: "Комфорт",
    text: "Ми створили простір, у якому приємно піклуватися про себе: затишна атмосфера і уважний сервіс.",
    span: "lg:col-span-3",
  },
];

export default function Advantages() {
  return (
    <section id="advantages" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1360px] px-5 md:px-10">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-7" data-reveal="up">
              Чому обирають нас
            </p>
            <h2
              className="h-display max-w-2xl text-[clamp(2rem,4.4vw,3.6rem)]"
              data-reveal="blur"
            >
              Наші <span className="italic text-brand-deep">переваги</span>
            </h2>
          </div>
          <p
            className="max-w-sm text-base leading-relaxed text-olive"
            data-reveal="up"
            data-reveal-delay="0.15"
          >
            П’ять причин, чому клієнти довіряють нам найцінніше — свою красу та
            здоров’я.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {ITEMS.map((item, i) => (
            <article
              key={item.num}
              data-reveal="up"
              data-reveal-delay={`${(i % 3) * 0.12}`}
              className={`group relative overflow-hidden rounded-[32px] border border-line bg-white/70 p-9 transition-all duration-500 hover:-translate-y-2 hover:border-brand/50 hover:shadow-[0_30px_70px_rgba(141,183,72,0.18)] ${item.span}`}
            >
              <span
                className="pointer-events-none absolute -right-3 -top-6 font-display text-[92px] leading-none text-brand/10 transition-colors duration-500 group-hover:text-brand/20"
                aria-hidden
              >
                {item.num}
              </span>
              <div className="relative">
                <div className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand-deep transition-all duration-500 group-hover:bg-brand group-hover:text-white">
                  <item.icon className="h-6.5 w-6.5" strokeWidth={1.6} />
                </div>
                <h3 className="font-display text-2xl text-ink">{item.title}</h3>
                <p className="mt-3.5 leading-relaxed text-olive">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
