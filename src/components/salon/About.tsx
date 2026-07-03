import Image from "next/image";
import { Gem, Heart, Ruler } from "lucide-react";

const POINTS = [
  {
    icon: Heart,
    title: "Індивідуальний підхід",
    text: "Допомагаємо підібрати сукню під фігуру, подію та настрій.",
  },
  {
    icon: Ruler,
    title: "Ідеальна посадка",
    text: "Примірка та підгонка сукні для бездоганного вигляду.",
  },
  {
    icon: Gem,
    title: "Якісні тканини",
    text: "Атлас, шовк та фатин — матеріали, що красиво тримають форму.",
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
          <Image
            src="/dresses/bordeaux-satin.jpg"
            alt="Вечірня сукня VELLA бордового кольору"
            fill
            sizes="(min-width: 768px) 480px, 100vw"
            className="object-cover object-top"
          />
        </div>

        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-wine">
            Про салон
          </p>
          <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            Салон VELLA — образ для головної події
          </h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Ми допомагаємо нареченим та гостям знайти сукню, в якій хочеться
            залишатися довше. У нашому салоні ви можете приміряти вечірні та
            весільні сукні різних силуетів, отримати консультацію щодо образу
            та підібрати ідеальну посадку.
          </p>

          <div className="mt-8 space-y-5">
            {POINTS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush text-wine">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-ink">{title}</p>
                  <p className="text-sm text-ink-soft">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
