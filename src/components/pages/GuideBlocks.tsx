import type { GuideBlock } from "@content/guide";
import type { AppLocale } from "@/i18n/routing";

/** Renders the guide's block model. Steps get numbers because they are steps. */
export function GuideBlocks({
  blocks,
  locale,
}: {
  blocks: GuideBlock[];
  locale: AppLocale;
}) {
  return (
    <div className="space-y-10">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h":
            return (
              <h2 key={index} className="text-[1.625rem] pt-4">
                {block.text[locale]}
              </h2>
            );
          case "p":
            return (
              <p key={index} className="wy-prose">
                {block.text[locale]}
              </p>
            );
          case "note":
            return (
              <p
                key={index}
                className="wy-prose pl-5 text-[1rem]"
                style={{ borderLeft: "2px solid var(--color-sage)" }}
              >
                {block.text[locale]}
              </p>
            );
          case "steps":
            return (
              <ol key={index} className="wy-rule">
                {block.items.map((item, i) => (
                  <li key={i} className="py-6 wy-rule-b grid sm:grid-cols-[3rem_minmax(0,1fr)] gap-x-6 gap-y-2">
                    <span className="tnum wy-label pt-1">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-[1.25rem]">{item.title[locale]}</h3>
                      <p className="wy-prose mt-2 text-[1rem]">{item.text[locale]}</p>
                    </div>
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div key={index} className="overflow-x-auto">
                <table className="text-micro min-w-[34rem]">
                  <thead>
                    <tr>
                      {block.head.map((cell, i) => (
                        <th
                          key={i}
                          scope="col"
                          className="text-left font-medium text-pine pb-2 pr-6 wy-rule-b"
                        >
                          {cell[locale]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className={`py-2.5 pr-6 wy-rule-b align-baseline ${c === 0 ? "text-ink" : "text-stone"}`}
                          >
                            {cell[locale]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
