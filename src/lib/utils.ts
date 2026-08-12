import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Ukrainian plural form: 1 кейс · 2–4 кейси · 5+ кейсів.
 * Teens are all «кейсів», so they are checked before the last digit.
 */
export function plural(n: number, one: string, few: string, many: string) {
  const abs = Math.abs(n) % 100;
  if (abs >= 11 && abs <= 14) return many;
  const last = abs % 10;
  if (last === 1) return one;
  if (last >= 2 && last <= 4) return few;
  return many;
}
