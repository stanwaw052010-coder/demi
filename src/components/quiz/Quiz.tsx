"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { quizQuestions } from "@content/quiz";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";

export interface QuizCandidate {
  slug: string;
  name: string;
  hanzi?: string;
  liquor: string;
  category: string;
  categoryLabel: string;
  tagline: string;
  region: string | null;
  year: number | null;
  price: number;
  sku: string;
  grams: number;
  vat: 6 | 21;
  caffeine: "none" | "low" | "medium" | "high";
}

/**
 * Five questions, then three teas from three different families. The reasons
 * are shown so the visitor can disagree with the machine, which is the point:
 * this is a conversation opener, not an oracle.
 */
export function Quiz({ candidates }: { candidates: QuizCandidate[] }) {
  const t = useTranslations("quiz");
  const actions = useTranslations("actions");
  const locale = useLocale() as AppLocale;
  const add = useCart((s) => s.add);
  const open = useCart((s) => s.open);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const total = quizQuestions.length;
  const done = step >= total;

  const results = useMemo(() => {
    if (!done) return [];
    const score = new Map<string, number>();
    const why = new Map<string, string[]>();
    let maxCaffeine: string | null = null;
    let preferForm: string | null = null;

    for (const question of quizQuestions) {
      const chosen = answers[question.id];
      const option = question.options.find((o) => o.id === chosen);
      if (!option) continue;
      for (const [category, weight] of Object.entries(option.weights)) {
        score.set(category, (score.get(category) ?? 0) + (weight ?? 0));
        why.set(category, [...(why.get(category) ?? []), option.label[locale]]);
      }
      if (option.maxCaffeine) maxCaffeine = option.maxCaffeine;
      if (option.preferForm) preferForm = option.preferForm;
    }

    const rank = ["none", "low", "medium", "high"];
    const picked: { tea: QuizCandidate; reasons: string[] }[] = [];

    for (const [category] of [...score.entries()].sort((a, b) => b[1] - a[1])) {
      if (picked.length >= 3) break;
      const pool = candidates
        .filter((c) => c.category === category)
        .filter((c) =>
          maxCaffeine ? rank.indexOf(c.caffeine) <= rank.indexOf(maxCaffeine) : true,
        )
        .sort((a, b) => a.price - b.price);
      const pick = pool[0];
      if (pick && !picked.some((p) => p.tea.slug === pick.slug)) {
        picked.push({ tea: pick, reasons: why.get(category) ?? [] });
      }
    }

    // Preferring the requested form only after the families are settled keeps
    // the three results from collapsing into one shape.
    if (preferForm) {
      picked.sort((a, b) => Number(b.tea.grams >= 100) - Number(a.tea.grams >= 100));
    }

    return picked.slice(0, 3);
  }, [answers, candidates, done, locale]);

  if (done) {
    return (
      <div>
        <div className="wy-grid">
          <div className="wy-main">
            <h2 className="text-[2rem]">{t("resultsTitle")}</h2>
            <p className="wy-lead mt-4 text-stone">{t("resultsLede")}</p>
          </div>
        </div>

        <ul className="mt-12">
          {results.map(({ tea, reasons }) => (
            <li key={tea.slug} className="wy-grid wy-rule py-9 gap-y-4">
              <div className="wy-margin flex items-baseline gap-3">
                <span
                  className="wy-drop"
                  data-full="true"
                  style={{
                    ["--drop" as string]: `var(--color-liquor-${tea.liquor})`,
                    width: "1.1rem",
                    height: "1.1rem",
                  }}
                  aria-hidden="true"
                />
                <span className="wy-label">{tea.categoryLabel}</span>
              </div>
              <div className="wy-main">
                <h3 className="text-[1.75rem] leading-tight">
                  <Link
                    href={{ pathname: "/thee/[slug]", params: { slug: tea.slug } }}
                    className="wy-link"
                  >
                    {tea.name}
                  </Link>
                </h3>
                <p className="wy-prose mt-2 text-[1rem]">{tea.tagline}</p>

                <p className="wy-meta mt-4">
                  {tea.region ? <span>{tea.region}</span> : null}
                  {tea.year ? <span className="tnum">{tea.year}</span> : null}
                  <span className="price">{formatPrice(tea.price, locale)}</span>
                  <span className="tnum">{tea.grams} g</span>
                </p>

                {reasons.length > 0 ? (
                  <p className="wy-label mt-4">
                    {t("why")}: {[...new Set(reasons)].join(", ").toLowerCase()}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>

        <div className="wy-grid mt-12 gap-y-4">
          <div className="wy-main">
            <h3 className="text-[1.5rem]">{t("buildSet")}</h3>
            <p className="wy-prose mt-2 text-[1rem]">{t("buildSetBody")}</p>
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                type="button"
                className="wy-btn wy-btn-solid"
                onClick={() => {
                  for (const { tea } of results) {
                    add({
                      slug: tea.slug,
                      sku: tea.sku,
                      name: tea.name,
                      grams: tea.grams,
                      price: tea.price,
                      vat: tea.vat,
                      liquor: tea.liquor,
                    });
                  }
                  open();
                }}
              >
                {t("addAllThree")}
              </button>
              <button
                type="button"
                className="wy-btn"
                onClick={() => {
                  setAnswers({});
                  setStep(0);
                }}
              >
                {t("restart")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = quizQuestions[step];

  return (
    <div>
      <div
        className="relative h-px bg-[var(--rule)] mb-12"
        role="progressbar"
        aria-label={t("progress")}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={step}
      >
        <span
          className="absolute inset-y-0 left-0 bg-pine w-full"
          style={{
            transformOrigin: "left",
            transform: `scaleX(${(step / total).toFixed(3)})`,
            transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>

      <div className="wy-grid gap-y-6">
        <div className="wy-margin">
          <p className="wy-label tnum">
            {t("questionOf", { current: step + 1, total })}
          </p>
        </div>

        <fieldset className="wy-main border-0 p-0">
          <legend className="text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}>
            {question.question[locale]}
          </legend>

          <ul className="mt-8">
            {question.options.map((option) => (
              <li key={option.id} className="wy-rule">
                <button
                  type="button"
                  className="w-full text-left py-6 group"
                  onClick={() => {
                    setAnswers((prev) => ({ ...prev, [question.id]: option.id }));
                    setStep((s) => s + 1);
                  }}
                >
                  <span className="text-[1.375rem] wy-link"
                        style={{ fontFamily: "var(--font-display)" }}>
                    {option.label[locale]}
                  </span>
                  <span className="block wy-label mt-1">{option.hint[locale]}</span>
                </button>
              </li>
            ))}
          </ul>

          {step > 0 ? (
            <button
              type="button"
              className="wy-link text-[var(--text-micro)] text-stone mt-8"
              onClick={() => setStep((s) => s - 1)}
            >
              {actions("previous")}
            </button>
          ) : null}
        </fieldset>
      </div>
    </div>
  );
}
