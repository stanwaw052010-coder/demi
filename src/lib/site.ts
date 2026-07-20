// Central configuration for the studio. Update contact details here.

// Phone in international digits-only form (no "+", spaces or brackets) — used for links.
const PHONE_DIGITS = "380971246030";

export const site = {
  name: "Анжела Кропивницька",
  brand: "KROPYVNYTSKA",
  tagline: "Студія корекції фігури та антицелюлітного масажу",
  city: "Буча",
  region: "Київська область",
  address: "вул. Богдана Хмельницького, 4, Буча, Київська обл., 08292",
  addressShort: "вул. Богдана Хмельницького, 4, Буча",

  phoneDigits: PHONE_DIGITS,
  phonePretty: "+380 (97) 124 60 30",

  instagramHandle: "kropyvnytska_massage",
  instagramUrl: "https://www.instagram.com/kropyvnytska_massage/",

  // Messenger deep-links. All three open the person's app if installed.
  links: {
    tel: `tel:+${PHONE_DIGITS}`,
    whatsapp: `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(
      "Вітаю! Хочу записатися на масаж 💆‍♀️",
    )}`,
    // Telegram by phone (works if you don't have a @username set).
    // If a public @username exists, replace with https://t.me/<username>.
    telegram: `https://t.me/+${PHONE_DIGITS}`,
    viber: `viber://chat?number=%2B${PHONE_DIGITS}`,
  },

  // Google Maps embed for the studio address.
  mapEmbed:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("Bohdana Khmelnytskoho 4, Bucha, Kyiv Oblast 08292") +
    "&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Bohdana Khmelnytskoho 4, Bucha, Kyiv Oblast 08292"),
} as const;

export type MessengerKey = "whatsapp" | "telegram" | "viber" | "tel";
