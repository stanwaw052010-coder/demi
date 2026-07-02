import Image from "next/image";
import { Feather, Leaf, Sparkles } from "lucide-react";

const POINTS = [
  {
    icon: Leaf,
    title: "Природні матеріали",
    text: "Дерево, епоксидна смола та мідна поталь — кожен виріб унікальний за текстурою.",
  },
  {
    icon: Feather,
    title: "Ручна робота",
    text: "Кожен амулет вирізьблюється та заливається вручну, без двох однакових копій.",
  },
  {
    icon: Sparkles,
    title: "Особлива атмосфера",
    text: "Обереги, що несуть настрій лісу, вогню та стародавніх символів.",
  },
];

export default function Story() {
  return (
    <section id="story" className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
          <Image
            src="/amulets/forest-log.jpg"
            alt="Рунічний амулет AMELI на лісовій колоді"
            fill
            sizes="(min-width: 768px) 480px, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-copper-light">
            Про AMELI
          </p>
          <h2 className="mt-4 font-display text-3xl leading-snug text-parchment sm:text-4xl">
            Обереги, народжені з дерева та вогню
          </h2>
          <p className="mt-5 leading-relaxed text-parchment-soft">
            Створено в Україні. Кожен амулет AMELI — це поєднання натурального
            дерева, епоксидної смоли та мідної поталі, вручну оброблене та
            випалене рунічним символом. Ми віримо, що прикраса має нести не
            лише красу, а й особливу атмосферу та смисл.
          </p>

          <div className="mt-8 space-y-5">
            {POINTS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-copper/40 text-copper-light">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-parchment">{title}</p>
                  <p className="text-sm text-parchment-soft">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
