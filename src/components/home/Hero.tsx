import { getTranslations } from "next-intl/server";
import { LogoMark } from "@/components/brand/Logo";
import { InfusionStain } from "./InfusionStain";
import { LeafDrift } from "@/components/visuals/LeafDrift";
import { getTeas, harvestRange } from "@/lib/catalog";

/**
 * The heroscreen and the order confirmation are the only centred pages on the
 * site. Everything else is left aligned against the twelve column grid.
 */
export async function Hero() {
  const t = await getTranslations("home");
  const range = harvestRange();
  const batches = getTeas().length;

  return (
    <section
      id="wy-hero"
      className="relative isolate overflow-hidden"
      style={{ minHeight: "min(86svh, 46rem)" }}
    >
      <InfusionStain />
      <LeafDrift />

      <div className="wy-shell relative z-10 flex flex-col items-center justify-center text-center"
           style={{ minHeight: "min(86svh, 46rem)", paddingBlock: "clamp(4rem, 10vh, 8rem)" }}>
        <LogoMark size={62} />

        <h1
          className="wy-hero-rise mt-7"
          style={{
            fontSize: "clamp(2.75rem, 1.6rem + 5.6vw, 8.25rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.022em",
            fontOpticalSizing: "auto",
          }}
        >
          Well’s of Yunnan
        </h1>

        <p className="wy-hero-rise-late wy-lead mt-6 text-ink">{t("heroLine")}</p>

        <p
          className="wy-hero-rise-late mt-4 text-micro text-stone"
          style={{ maxWidth: "46ch" }}
        >
          {t("heroIntro")}
        </p>

        {/* The first thing the visitor reads is a fact, not a promise. */}
        <div className="wy-hero-rise-late wy-meta mt-10 justify-center">
          <span>{t("heroFactPlace")}</span>
          <span className="tnum">{t("heroFactBatches", { count: batches })}</span>
          <span className="tnum">{t("heroFactYears", { from: range.from, to: range.to })}</span>
        </div>
      </div>
    </section>
  );
}
