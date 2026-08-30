"use client";

import { useCallback, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export interface FacetGroup {
  key: string;
  label: string;
  options: { value: string; label: string; count: number }[];
}

/**
 * Faceted filtering straight into the URL, so ?type=sheng&year=2018 is a real
 * address you can send to someone. The server does the filtering; this only
 * writes the query string.
 */
export function Filters({
  groups,
  inStockLabel,
}: {
  groups: FacetGroup[];
  inStockLabel: string;
}) {
  const t = useTranslations("catalog");
  const actions = useTranslations("actions");
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const toggle = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      const current = next.getAll(key);
      next.delete(key);
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      updated.forEach((v) => next.append(key, v));
      startTransition(() => {
        router.replace(
          { pathname: pathname as never, query: Object.fromEntries(nextEntries(next)) },
          { scroll: false },
        );
      });
    },
    [params, pathname, router],
  );

  const active = groups.some((g) => params.getAll(g.key).length > 0) || params.has("stock");

  return (
    <form
      className="text-[var(--text-micro)]"
      aria-busy={pending}
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="flex items-baseline justify-between gap-4 pb-3 wy-rule-b">
        <h2 className="font-medium text-pine">{t("filters")}</h2>
        {active ? (
          <button
            type="button"
            className="wy-link text-stone"
            onClick={() =>
              startTransition(() =>
                router.replace({ pathname: pathname as never }, { scroll: false }),
              )
            }
          >
            {actions("clearFilters")}
          </button>
        ) : null}
      </div>

      {groups.map((group) => (
        <fieldset key={group.key} className="border-0 p-0 py-4 wy-rule-b">
          <legend className="wy-label mb-2">{group.label}</legend>
          <ul className="space-y-1.5">
            {group.options.map((option) => {
              const checked = params.getAll(group.key).includes(option.value);
              return (
                <li key={option.value}>
                  <label className="flex items-baseline gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(group.key, option.value)}
                      className="translate-y-0.5"
                    />
                    <span className={checked ? "text-ink" : "text-stone"}>{option.label}</span>
                    <span className="tnum text-stone ml-auto">{option.count}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      ))}

      <div className="py-4">
        <label className="flex items-baseline gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={params.get("stock") === "1"}
            onChange={() => toggle("stock", "1")}
            className="translate-y-0.5"
          />
          <span className={params.get("stock") === "1" ? "text-ink" : "text-stone"}>
            {inStockLabel}
          </span>
        </label>
      </div>
    </form>
  );
}

function* nextEntries(params: URLSearchParams) {
  const seen = new Map<string, string[]>();
  for (const [key, value] of params.entries()) {
    seen.set(key, [...(seen.get(key) ?? []), value]);
  }
  for (const [key, values] of seen) {
    yield [key, values.length === 1 ? values[0] : values] as [string, string | string[]];
  }
}
