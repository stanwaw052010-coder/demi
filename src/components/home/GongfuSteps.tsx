import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { guideBySlug } from "@content/guide";
import type { AppLocale } from "@/i18n/routing";

/**
 * Numbered, because these are actually steps in an order. Nowhere else on the
 * site does a list get 01 / 02 / 03.
 */
export async function GongfuSteps({ locale }: { locale: AppLocale }) {
  const t = await getTranslations("home");
  const chapter = guideBySlug.get("gongfu");
  const stepsBlock = chapter?.blocks.find((b) => b.type === "steps");
  const steps = stepsBlock && stepsBlock.type === "steps" ? stepsBlock.items.slice(0, 4) : [];

  return (
    <section aria-labelledby="wy-brew" className="wy-shell wy-section wy-rule">
      <div className="wy-grid">
        <div className="wy-margin">
          <p className="wy-hanzi text-[1.5rem] text-pine">功夫茶</p>
        </div>
        <div className="wy-main">
          <h2 id="wy-brew">{t("brewTitle")}</h2>
          <p className="wy-lead mt-4 text-stone">{t("brewLede")}</p>
        </div>
      </div>

      <ol className="wy-grid mt-14 gap-y-10">
        {steps.map((step, index) => (
          <li
            key={index}
            className="col-span-6 md:col-span-3 wy-rule pt-4"
            style={{ gridColumn: "span 3" }}
          >
            <span className="tnum text-[var(--text-micro)] text-stone">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-[1.25rem] mt-2">{step.title[locale]}</h3>
            <p className="text-[var(--text-micro)] text-stone mt-2" style={{ maxWidth: "34ch" }}>
              {step.text[locale]}
            </p>
          </li>
        ))}
      </ol>

      <div className="wy-grid mt-12">
        <div className="wy-main">
          <Link href="/zetgids" className="wy-btn">
            {t("brewToGuide")}
          </Link>
        </div>
      </div>
    </section>
  );
}
