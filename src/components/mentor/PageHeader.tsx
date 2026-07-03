import Reveal from "./Reveal";

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 py-20">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-green/15 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <Reveal>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-green-light">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-display text-4xl uppercase leading-tight text-cream sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-5 max-w-xl text-lg text-cream-soft">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
