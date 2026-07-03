import { Award, BadgeCheck, GraduationCap, Users } from "lucide-react";
import { WHY_POINTS } from "@/lib/mentor";

const ICONS = [Award, BadgeCheck, Users, GraduationCap];

export default function Why() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-5 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-green-light">
          Чому саме я
        </p>
        <h2 className="mt-4 font-display text-3xl uppercase text-cream sm:text-4xl">
          Досвід, який працює на вас
        </h2>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {WHY_POINTS.map((point, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <div key={point.title} className="rounded-2xl bg-concrete-2 p-7 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green/15 text-green-light">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-sm uppercase tracking-wide text-cream">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-soft">
                {point.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
