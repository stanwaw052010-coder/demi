import Image from "next/image";
import { Flame, Gem, Hand } from "lucide-react";

const STEPS = [
  {
    icon: Hand,
    title: "Різьблення",
    text: "Обираємо натуральне дерево та вручну вирізьблюємо форму майбутнього оберега.",
  },
  {
    icon: Flame,
    title: "Випалювання руни",
    text: "Символ наносимо технікою випалювання — кожна лінія унікальна.",
  },
  {
    icon: Gem,
    title: "Заливка смолою",
    text: "Фіксуємо форму епоксидною смолою з мідною поталлю для глибокого візерунка.",
  },
];

export default function Craft() {
  return (
    <section id="craft" className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-copper-light">
            Матеріали та процес
          </p>
          <h2 className="mt-4 font-display text-3xl leading-snug text-parchment sm:text-4xl">
            Як народжується амулет
          </h2>
          <p className="mt-5 leading-relaxed text-parchment-soft">
            Кожен виріб проходить три ручні етапи — від вибору дерева до
            фінальної заливки смолою з мідною поталлю.
          </p>

          <div className="mt-8 space-y-5">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-copper/10 text-copper-light">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-parchment">
                    {i + 1}. {title}
                  </p>
                  <p className="text-sm text-parchment-soft">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
          <Image
            src="/amulets/macro-rune.jpg"
            alt="Макрозйомка рунічного амулета з мідною поталлю"
            fill
            sizes="(min-width: 768px) 480px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
