import { getTranslations } from "next-intl/server";
import type { Badge } from "@content/types";

/**
 * Small, rounded, hairline-bordered. Nieuw and Beperkte oogst are authored;
 * Proefverpakking follows from the price ladder, because every loose tea has a
 * 10 g format whether or not anyone remembered to tag it.
 */
export async function Badges({ badges }: { badges: Badge[] }) {
  const t = await getTranslations("badge");
  if (badges.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-1.5">
      {badges.map((badge) => (
        <li key={badge} className={`wy-badge wy-badge-${badge}`}>
          {t(badge)}
        </li>
      ))}
    </ul>
  );
}
