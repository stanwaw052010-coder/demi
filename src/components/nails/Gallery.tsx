import PhotoPlaceholder from "./PhotoPlaceholder";

const WORKS = [
  { label: "Робота: ніжний френч", filename: "work-1.jpg" },
  { label: "Робота: чорний стилет", filename: "work-2.jpg" },
  { label: "Робота: чорний стилет", filename: "work-3.jpg" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-yellow-50/50 py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-xs font-semibold tracking-widest text-brand-dark">
            НАШІ РОБОТИ
          </span>
          <h2 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">
            Приклади манікюру
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {WORKS.map((work) => (
            <PhotoPlaceholder
              key={work.filename}
              label={work.label}
              filename={work.filename}
              className="aspect-[4/5] w-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
