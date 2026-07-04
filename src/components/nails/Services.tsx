import { Droplet, Hand, Layers, Footprints } from "lucide-react";

const SERVICES = [
  {
    icon: Hand,
    title: "Гігієнічний манікюр",
    text: "Обробка кутикули, форма нігтя, догляд за руками без покриття",
  },
  {
    icon: Droplet,
    title: "Покриття гель-лаком",
    text: "Стійке кольорове покриття, яке тримається до 3 тижнів",
  },
  {
    icon: Layers,
    title: "Нарощення нігтів",
    text: "Моделювання довжини та форми гелем під будь-який образ",
  },
  {
    icon: Footprints,
    title: "Педикюр",
    text: "Гігієнічний та апаратний педикюр з покриттям гель-лаком",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-pink-50/60 py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-xs font-semibold tracking-widest text-brand-dark">
            ПОСЛУГИ
          </span>
          <h2 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">
            Манікюр та педикюр
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="rounded-3xl bg-white p-7 text-center shadow-sm shadow-pink-100/60 ring-1 ring-pink-100"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100">
                <service.icon className="h-6 w-6 text-brand-dark" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 font-semibold text-foreground">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                {service.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
