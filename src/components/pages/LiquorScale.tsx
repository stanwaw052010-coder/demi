import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { TeaCategory } from "@content/types";

/**
 * The six classical families with the real colour of their liquor, in
 * processing order. It teaches the classification and doubles as the visual
 * answer to the hongcha / heicha mix-up, which is the point of the chapter.
 */
const SIX: { key: TeaCategory; hanzi: string; pinyin: string; liquor: string; collection: string }[] = [
  { key: "green", hanzi: "绿茶", pinyin: "lǜchá", liquor: "green", collection: "groene-thee" },
  { key: "yellow", hanzi: "黄茶", pinyin: "huángchá", liquor: "yellow", collection: "gele-thee" },
  { key: "white", hanzi: "白茶", pinyin: "báichá", liquor: "white", collection: "witte-thee" },
  { key: "oolong", hanzi: "青茶", pinyin: "qīngchá", liquor: "oolong", collection: "oolong" },
  { key: "black", hanzi: "红茶", pinyin: "hóngchá", liquor: "red", collection: "zwarte-thee" },
  { key: "heicha", hanzi: "黑茶", pinyin: "hēichá", liquor: "shou", collection: "donkere-thee" },
];

export async function LiquorScale() {
  const category = await getTranslations("category");

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8 not-prose">
      {SIX.map((type) => (
        <li key={type.key}>
          <Link
            href={{ pathname: "/collecties/[slug]", params: { slug: type.collection } }}
            className="group block"
          >
            {/* The cup, seen from above, in the colour it actually pours. */}
            <span
              className="block rounded-full wy-liquor-dot"
              style={{ ["--dot" as string]: `var(--color-liquor-${type.liquor})` }}
              aria-hidden="true"
            />
            <span className="wy-hanzi block text-[1.125rem] text-pine mt-3">{type.hanzi}</span>
            <span className="wy-latin block wy-label" style={{ fontFamily: "var(--font-display)" }}>
              {type.pinyin}
            </span>
            <span
              className="block text-ui mt-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="wy-link">{category(type.key)}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
