interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy-950 pb-16 pt-36 sm:pb-20 sm:pt-40">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, var(--gold-500) 0px, var(--gold-500) 1px, transparent 1px, transparent 32px)",
        }}
      />
      <div className="container-spa relative">
        <span className="text-xs font-medium uppercase tracking-[0.35em] text-gold-400">
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-2xl font-serif text-4xl text-white sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">{description}</p>
        )}
      </div>
    </section>
  );
}
