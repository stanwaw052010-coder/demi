import { getTranslations } from "next-intl/server";

export interface Section {
  heading: string;
  body: string;
}

/**
 * The shared shape for every text page: legal, shipping, about. Left aligned in
 * the eight content columns, with the section headings in the margin so the
 * page reads as a document rather than as a blog post.
 */
export async function ProsePage({
  title,
  lede,
  sections,
  namespace,
  updated,
}: {
  title: string;
  lede?: string;
  sections: Section[];
  namespace?: string;
  updated?: string;
}) {
  const legal = await getTranslations("legal");

  return (
    <div className="wy-shell" style={{ paddingBlock: "clamp(3rem, 7vw, 5.5rem)" }}>
      <header className="wy-grid">
        <div className="wy-main">
          <h1>{title}</h1>
          {lede ? <p className="wy-lead mt-5 text-stone">{lede}</p> : null}
        </div>
      </header>

      <div className="mt-16">
        {sections.map((section, index) => (
          <section key={`${namespace ?? ""}${index}`} className="wy-grid wy-rule py-10 gap-y-3">
            <h2 className="wy-margin text-[1.25rem] leading-snug">{section.heading}</h2>
            <p className="wy-main wy-prose">{section.body}</p>
          </section>
        ))}
      </div>

      {updated ? (
        <p className="wy-grid mt-10">
          <span className="wy-main wy-label">{legal("lastUpdated", { date: updated })}</span>
        </p>
      ) : null}
    </div>
  );
}
