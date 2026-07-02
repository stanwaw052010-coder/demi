import { Award, Bath, Droplets, PawPrint, Scissors, Sparkles } from "lucide-react";
import { INSTAGRAM_URL } from "@/lib/salon";

const SERVICES = [
  {
    icon: Bath,
    title: "Гігієнічний грумінг",
    text: "Купання, сушка, чистка вушок і очей, стрижка кігтів та обробка лап.",
  },
  {
    icon: Scissors,
    title: "Комплексний грумінг",
    text: "Повний догляд: миття, сушка та стрижка за стандартом породи або побажанням.",
  },
  {
    icon: Sparkles,
    title: "Модельна стрижка",
    text: "Творчі та акуратні стрижки, які підкреслять красу вашого улюбленця.",
  },
  {
    icon: Droplets,
    title: "SPA-догляд",
    text: "Живильні маски та кондиціонери для шерсті й чутливої шкіри.",
  },
  {
    icon: PawPrint,
    title: "Стрижка кігтів",
    text: "Акуратна обробка кігтів та подушечок лап без стресу для тварини.",
  },
  {
    icon: Award,
    title: "Тримінг",
    text: "Ручне вищипування шерсті для жорстковолосих порід.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-cream-2 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Послуги
          </p>
          <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
            Що ми пропонуємо
          </h2>
          <p className="mt-4 text-ink-soft">
            Точну вартість підбираємо індивідуально — залежно від породи,
            розміру та стану шерсті улюбленця.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-brand-light/50 bg-cream p-7 transition-shadow hover:shadow-lg hover:shadow-brand/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand-dark">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-serif text-xl text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-cream shadow-sm transition-colors hover:bg-brand-dark"
          >
            Дізнатись вартість
          </a>
        </div>
      </div>
    </section>
  );
}
