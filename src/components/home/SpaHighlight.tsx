import Link from "next/link";
import { Sparkles } from "lucide-react";

import { Reveal } from "@/components/shared/Reveal";
import { PhotoSlot } from "@/components/shared/PhotoSlot";
import { Button } from "@/components/ui/button";

export function SpaHighlight() {
  return (
    <section className="section-y section-x bg-navy-950" id="spa">
      <div className="container-lux grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <PhotoSlot
            category="spa"
            index={2}
            alt="SPA-капсула Neoqi Medic"
            label="Спа-капсула — фото 2"
            className="aspect-[4/5] w-full"
          />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col items-start gap-6">
          <span className="flex items-center gap-2 text-xs sm:text-sm tracking-[0.35em] uppercase text-gold-400">
            <Sparkles className="h-4 w-4" />
            SPA-капсула Neoqi Medic
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-medium leading-[1.15] text-white">
            Комплексний ритуал відновлення тіла й душі
          </h2>
          <div className="gold-divider" />
          <p className="max-w-xl text-sm sm:text-base leading-relaxed text-white/70">
            Спабель пишається тим, що є єдиним в Запоріжжі салоном, де представлена
            SPA-капсула Neoqi Medic. Це поєднання сучасних технологій, глибокого
            розслаблення та турботи про фізичне й емоційне самопочуття.
          </p>
          <ul className="flex flex-col gap-2 text-sm text-white/70">
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 bg-gold-500" /> Глибоке розслаблення тіла
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 bg-gold-500" /> Сучасні технології відновлення
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 bg-gold-500" /> Турбота про емоційний стан
            </li>
          </ul>
          <Button variant="gold" size="lg" asChild className="mt-2">
            <Link href="/services/spa-ta-masazh">SPA-програми та масаж</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
