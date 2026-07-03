import { CalendarClock, Ruler, ShoppingBag, Sparkles } from "lucide-react";
import { PHONE_HREF } from "@/lib/salon";

const SERVICES = [
  {
    icon: ShoppingBag,
    title: "Оренда суконь",
    text: "Весільні та вечірні сукні напрокат на потрібну вам подію.",
  },
  {
    icon: Sparkles,
    title: "Підбір образу",
    text: "Консультація зі стилістом — від силуету до аксесуарів.",
  },
  {
    icon: Ruler,
    title: "Примірка та підгонка",
    text: "Індивідуальна підгонка сукні за фігурою.",
  },
  {
    icon: CalendarClock,
    title: "Запис заздалегідь",
    text: "Приймаємо за попереднім записом — забронюйте зручний час.",
  },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-wider text-wine">
          Послуги
        </p>
        <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
          Чим ми можемо допомогти
        </h2>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl bg-ivory-2 p-7 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-wine/10 text-wine">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-lg text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href={PHONE_HREF}
          className="inline-block rounded-full bg-wine px-8 py-3.5 text-sm font-semibold text-ivory shadow-sm transition-colors hover:bg-wine-light"
        >
          Записатись на примірку
        </a>
      </div>
    </section>
  );
}
