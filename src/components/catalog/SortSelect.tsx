"use client";

import { useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function SortSelect() {
  const t = useTranslations("catalog");
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const options = [
    ["relevance", t("sortRelevance")],
    ["price-asc", t("sortPriceAsc")],
    ["price-desc", t("sortPriceDesc")],
    ["year-desc", t("sortYearDesc")],
    ["year-asc", t("sortYearAsc")],
    ["name", t("sortName")],
  ] as const;

  return (
    <div className="flex items-baseline gap-3">
      <label htmlFor="wy-sort" className="wy-label whitespace-nowrap">
        {t("sortBy")}
      </label>
      <select
        id="wy-sort"
        defaultValue={params.get("sort") ?? "relevance"}
        className="text-[var(--text-micro)]"
        onChange={(event) => {
          const next = new URLSearchParams(params.toString());
          if (event.target.value === "relevance") next.delete("sort");
          else next.set("sort", event.target.value);
          startTransition(() =>
            router.replace(
              { pathname: pathname as never, query: Object.fromEntries(next) },
              { scroll: false },
            ),
          );
        }}
      >
        {options.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
