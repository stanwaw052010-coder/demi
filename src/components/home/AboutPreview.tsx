import Link from "next/link";

import { Reveal } from "@/components/shared/Reveal";
import { PhotoSlot } from "@/components/shared/PhotoSlot";
import { Button } from "@/components/ui/button";
import { ABOUT_TEXT } from "@/data/about";

export function AboutPreview() {
  return (
    <section className="section-y section-x bg-white" id="about">
      <div className="container-lux grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 flex flex-col items-start gap-6 lg:order-1">
          <span className="kicker">Про нас</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-medium leading-[1.15] text-navy-950">
            Місце, де можна зупинитися і побачити свою красу по-новому
          </h2>
          <div className="gold-divider" />
          <p className="max-w-xl text-sm sm:text-base leading-relaxed text-muted-foreground">
            {ABOUT_TEXT[0]}
          </p>
          <p className="max-w-xl text-sm sm:text-base leading-relaxed text-muted-foreground">
            {ABOUT_TEXT[1]}
          </p>
          <Button variant="outline" size="lg" asChild className="mt-2">
            <Link href="/about">Дізнатися більше про нас</Link>
          </Button>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <PhotoSlot
            category="cosmetolog"
            index={2}
            alt="Інтер'єр салону Спабель"
            label="Косметолог — фото 2"
            className="aspect-[4/5] w-full"
          />
        </Reveal>
      </div>
    </section>
  );
}
