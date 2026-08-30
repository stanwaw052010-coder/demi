import type { AppLocale } from "@/i18n/routing";

/**
 * Prices are stored in euro cents everywhere. Rendering goes through here so
 * that Dutch gets "€ 24,50" and English gets "€24.50" without any component
 * having to know about it.
 */
export function formatPrice(cents: number, locale: AppLocale): string {
  const value = cents / 100;
  if (locale === "nl") {
    // nl-BE puts a non-breaking space after the symbol and uses a comma.
    return new Intl.NumberFormat("nl-BE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(value);
  }
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number, locale: AppLocale): string {
  return new Intl.NumberFormat(locale === "nl" ? "nl-BE" : "en-GB").format(value);
}

export function formatDate(iso: string, locale: AppLocale): string {
  return new Intl.DateTimeFormat(locale === "nl" ? "nl-BE" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatMonthYear(
  year: number,
  month: number | null,
  locale: AppLocale,
): string {
  if (month === null) return String(year);
  return new Intl.DateTimeFormat(locale === "nl" ? "nl-BE" : "en-GB", {
    month: "long",
    year: "numeric",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

/** Altitude and other whole numbers get a thin space as thousands separator. */
export function formatMetres(value: number, locale: AppLocale): string {
  return `${formatNumber(value, locale)} m`;
}
