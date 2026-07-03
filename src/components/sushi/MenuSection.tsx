import type { MenuItem } from "@/lib/menu";
import MenuItemCard from "./MenuItemCard";

export default function MenuSection({
  id,
  eyebrow,
  title,
  subtitle,
  items,
  alt,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
  alt?: boolean;
}) {
  return (
    <section id={id} className={`py-20 ${alt ? "bg-charcoal-2" : ""}`}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-red">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl uppercase text-cream sm:text-4xl">
            {title}
          </h2>
          {subtitle && <p className="mt-4 text-cream-soft">{subtitle}</p>}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
