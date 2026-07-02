import { Palette, Recycle, Ruler, Truck } from "lucide-react";

const ITEMS = [
  {
    icon: Palette,
    title: "Будь-який колір",
    text: "Друкуємо в широкій палітрі кольорів пластику під ваш інтер'єр.",
  },
  {
    icon: Ruler,
    title: "Свій розмір",
    text: "Змінюємо масштаб моделі під потрібні вам габарити.",
  },
  {
    icon: Recycle,
    title: "Еко-матеріал",
    text: "Використовуємо біорозкладний пластик, безпечний для дому.",
  },
  {
    icon: Truck,
    title: "Доставка по Україні",
    text: "Відправляємо готові вироби в будь-яке місто зручною для вас службою.",
  },
];

export default function Advantages() {
  return (
    <section id="advantages" className="bg-sand-2 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Переваги
          </p>
          <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
            Чому обирають нас
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl bg-sand p-7 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-serif text-lg text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
