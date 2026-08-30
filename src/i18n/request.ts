import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    formats: {
      number: {
        // Belgian retail convention: € 24,50 in Dutch, €24.50 in English.
        price: { style: "currency", currency: "EUR" },
      },
      dateTime: {
        long: { day: "numeric", month: "long", year: "numeric" },
        short: { day: "2-digit", month: "2-digit", year: "numeric" },
      },
    },
  };
});
