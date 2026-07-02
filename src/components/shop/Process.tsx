import { ClipboardList, MessageCircle, PackageCheck, Palette } from "lucide-react";
import { PHONE_HREF } from "@/lib/shop";

const STEPS = [
  {
    icon: ClipboardList,
    title: "Оберіть модель",
    text: "Виберіть виріб з каталогу або опишіть свою ідею.",
  },
  {
    icon: Palette,
    title: "Узгодьте деталі",
    text: "Підбираємо колір, розмір і терміни виготовлення.",
  },
  {
    icon: MessageCircle,
    title: "Підтвердіть замовлення",
    text: "Зв'язуємось телефоном і фіксуємо всі побажання.",
  },
  {
    icon: PackageCheck,
    title: "Отримайте виріб",
    text: "Друкуємо та надсилаємо готовий виріб зручним способом.",
  },
];

export default function Process() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-5 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
          Як замовити
        </p>
        <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
          Чотири прості кроки
        </h2>
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ icon: Icon, title, text }, i) => (
          <div key={title} className="relative">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-sand">
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-serif text-2xl text-ink-soft/40">
                0{i + 1}
              </span>
            </div>
            <h3 className="mt-4 font-serif text-lg text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href={PHONE_HREF}
          className="inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-sand shadow-sm transition-colors hover:bg-accent-dark"
        >
          Замовити зараз
        </a>
      </div>
    </section>
  );
}
