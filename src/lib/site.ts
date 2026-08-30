/** One place for the things that are true about the shop itself. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://wellsofyunnan.be";

export const COMPANY = {
  legalName: "Well’s BV",
  tradingName: "Well’s of Yunnan",
  vat: "BE 0785.412.907",
  email: "hallo@wellsofyunnan.be",
  privacyEmail: "privacy@wellsofyunnan.be",
  phone: "+32 9 396 12 40",
  phoneHref: "+3293961240",
  shop: {
    street: "Baudelostraat 24",
    postcode: "9000",
    city: "Gent",
    country: "BE",
  },
  warehouse: {
    street: "Ringlaan 7 bus 3",
    postcode: "8500",
    city: "Kortrijk",
    country: "BE",
  },
} as const;
