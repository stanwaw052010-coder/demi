import PhotoSlot from "./PhotoSlot";
import Reveal from "./Reveal";

const SLOTS = [
  { label: "Робота майстра", span: "sm:row-span-2" },
  { label: "Салон BEAUTY FORMULA" },
  { label: "Результат нарощування" },
  { label: "Навчання учениць" },
  { label: "Катерина за роботою" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-concrete-2 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-green-light">
            Портфоліо
          </p>
          <h2 className="mt-4 font-display text-3xl uppercase text-cream sm:text-4xl">
            Атмосфера та результати
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:grid-rows-2">
          {SLOTS.map((slot, i) => (
            <Reveal key={slot.label} delay={i * 0.08} className={slot.span}>
              <PhotoSlot label={slot.label} className="aspect-square h-full w-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
