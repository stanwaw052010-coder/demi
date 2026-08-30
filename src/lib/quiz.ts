import { quizQuestions } from "@content/quiz";
import type { Category, Product } from "@content/types";
import { getAllProducts, inStock, priceFrom } from "./catalog";

export interface QuizAnswers {
  [questionId: string]: string;
}

export interface QuizResult {
  product: Product;
  /** Which of the picked options put this tea forward. */
  reasons: { questionId: string; optionId: string }[];
}

const caffeineRank = { none: 0, low: 1, medium: 2, high: 3 } as const;

/**
 * Additive scoring per category, then one product per category so the three
 * results never turn out to be three versions of the same tea.
 */
export function scoreQuiz(answers: QuizAnswers): QuizResult[] {
  const categoryScore = new Map<Category, number>();
  const categoryReasons = new Map<Category, { questionId: string; optionId: string }[]>();
  let maxCaffeine: keyof typeof caffeineRank | null = null;
  let preferForm: "loose" | "cake" | null = null;

  for (const question of quizQuestions) {
    const chosen = answers[question.id];
    if (!chosen) continue;
    const option = question.options.find((o) => o.id === chosen);
    if (!option) continue;

    for (const [category, weight] of Object.entries(option.weights)) {
      const key = category as Category;
      categoryScore.set(key, (categoryScore.get(key) ?? 0) + (weight ?? 0));
      const list = categoryReasons.get(key) ?? [];
      list.push({ questionId: question.id, optionId: option.id });
      categoryReasons.set(key, list);
    }
    if (option.maxCaffeine) {
      maxCaffeine =
        maxCaffeine === null ||
        caffeineRank[option.maxCaffeine] < caffeineRank[maxCaffeine]
          ? option.maxCaffeine
          : maxCaffeine;
    }
    if (option.preferForm) preferForm = option.preferForm;
  }

  const ranked = [...categoryScore.entries()].sort((a, b) => b[1] - a[1]);
  const results: QuizResult[] = [];

  for (const [category] of ranked) {
    if (results.length >= 3) break;
    const candidates = getAllProducts()
      .filter((p) => p.category === category && inStock(p))
      .filter((p) =>
        maxCaffeine ? caffeineRank[p.caffeine] <= caffeineRank[maxCaffeine] : true,
      )
      .sort((a, b) => {
        // Prefer the requested form, then the more affordable entry point.
        const aForm = preferForm && a.form === preferForm ? 0 : 1;
        const bForm = preferForm && b.form === preferForm ? 0 : 1;
        if (aForm !== bForm) return aForm - bForm;
        return priceFrom(a) - priceFrom(b);
      });

    const pick = candidates[0];
    if (pick && !results.some((r) => r.product.slug === pick.slug)) {
      results.push({ product: pick, reasons: categoryReasons.get(category) ?? [] });
    }
  }

  // If the answers were narrow, top up from the strongest remaining category.
  if (results.length < 3) {
    for (const product of getAllProducts()) {
      if (results.length >= 3) break;
      if (!inStock(product)) continue;
      if (product.category === "teaware") continue;
      if (results.some((r) => r.product.slug === product.slug)) continue;
      results.push({ product, reasons: [] });
    }
  }

  return results.slice(0, 3);
}

export const quizLength = quizQuestions.length;
