import { TextReveal } from "@/components/ui/Reveal";

export default function PageHero({
  overline,
  title,
  subtitle,
}: {
  overline: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden pb-10 pt-40 sm:pt-52">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-16 -z-10 h-[40vh] w-[50vw] -translate-x-1/2 rounded-full bg-gold/[0.06] blur-[120px]"
      />
      <div className="container-lux">
        <p className="overline mb-6">{overline}</p>
        <h1 className="h-display max-w-4xl font-display text-fg">
          <TextReveal text={title} trigger="mount" />
        </h1>
        {subtitle && (
          <p className="mt-8 max-w-xl text-lg text-muted-2">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
