"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import type { MenuItem } from "@/lib/menu";
import { useCart } from "@/lib/cart";

export default function MenuItemCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-charcoal-2 transition-shadow hover:shadow-xl hover:shadow-red/10">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-red px-3 py-1 text-xs font-semibold text-cream">
            {item.tag}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg uppercase text-cream">{item.title}</h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-cream-soft">
          {item.description}
        </p>
        {item.weight && (
          <p className="mt-2 text-xs text-cream-soft/70">Вага: {item.weight}</p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-xl text-cream">{item.price} грн</span>
          <button
            onClick={() => addItem(item)}
            className="flex items-center gap-1.5 rounded-full bg-red px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-red-dark"
          >
            <Plus className="h-4 w-4" />
            Додати
          </button>
        </div>
      </div>
    </div>
  );
}
