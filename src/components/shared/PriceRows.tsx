import type { PriceItem } from "@/data/pricing";

export function PriceRows({ items }: { items: PriceItem[] }) {
  return (
    <ul className="flex flex-col">
      {items.map((item, index) => (
        <li
          key={`${item.name}-${index}`}
          className="flex items-baseline gap-3 py-2.5 text-sm sm:text-[15px]"
        >
          <span className="text-navy-800">{item.name}</span>
          <span className="mb-1 flex-1 border-b border-dotted border-border" />
          <span className="shrink-0 font-medium text-navy-950">{item.price}</span>
        </li>
      ))}
    </ul>
  );
}
