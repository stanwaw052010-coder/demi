import { cn } from "@/lib/utils";

type Art = "arc" | "bloom" | "wave" | "orbit" | "grid" | "drop";

/**
 * Абстрактні візуали студії у фірмовій синій гамі.
 * Використовуються, доки на плитку не додано реальне фото (див. GalleryItem.src).
 *
 * Файли лежать у /public/art: кожен ~1 КБ, кешується окремо й вантажиться
 * лише коли плитка наближається до екрана. Раніше ця сама графіка їхала
 * інлайном у HTML — близько 66 КБ розмітки плюс стільки ж у payload гідратації.
 */
export function ArtTile({ art, className }: { art: Art; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- статичний SVG ~1 КБ, оптимізація next/image тут зайва
    <img
      src={`/art/${art}.svg`}
      alt=""
      aria-hidden
      loading="lazy"
      decoding="async"
      width={400}
      height={400}
      className={cn("size-full object-cover", className)}
    />
  );
}
