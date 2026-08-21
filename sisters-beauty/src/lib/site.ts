/**
 * Єдине джерело контактних даних студії.
 * Змінили номер — змінюйте тут, він оновиться на всьому сайті.
 */
export const site = {
  name: "SISTER'S Beauty Studio",
  nameSpaced: "S I S T E R ' S   B E A U T Y   S T U D I O",
  tagline: "МАСАЖ | НАРОЩЕННЯ ВІЙ | ВОСКОВА ЕПІЛЯЦІЯ",
  url: "https://sisters-beauty-studio.vercel.app",
  city: "Чернівці",
  address: {
    street: "вул. Головна, 283 Б",
    locality: "Чернівці",
    region: "Чернівецька область",
    postalCode: "58000",
    country: "UA",
    full: "м. Чернівці, вул. Головна, 283 Б",
  },
  instagram: {
    url: "https://www.instagram.com/sisters_beauty_studios/",
    handle: "@sisters_beauty_studios",
    directUrl: "https://ig.me/m/sisters_beauty_studios",
  },
  mapEmbedUrl:
    "https://www.google.com/maps?q=%D0%A7%D0%B5%D1%80%D0%BD%D1%96%D0%B2%D1%86%D1%96%2C%20%D0%B2%D1%83%D0%BB.%20%D0%93%D0%BE%D0%BB%D0%BE%D0%B2%D0%BD%D0%B0%2C%20283%20%D0%91&output=embed",
  mapLinkUrl:
    "https://www.google.com/maps/search/?api=1&query=%D0%A7%D0%B5%D1%80%D0%BD%D1%96%D0%B2%D1%86%D1%96%2C+%D0%B2%D1%83%D0%BB.+%D0%93%D0%BE%D0%BB%D0%BE%D0%B2%D0%BD%D0%B0%2C+283+%D0%91",
  /** TODO: уточнити реальний графік у власниці — зараз стоїть 09:00–20:00, Пн–Сб. */
  hours: {
    label: "Пн – Сб · 09:00 – 20:00",
    sundayLabel: "Нд — вихідний",
    opens: "09:00",
    closes: "20:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
  masters: [
    {
      name: "Ірина",
      /** давальний відмінок — «Подзвонити Ірині» */
      nameDative: "Ірині",
      phone: "+380508416055",
      phoneLabel: "+38 050 841 60 55",
    },
    {
      name: "Анжела",
      nameDative: "Анжелі",
      phone: "+380506484476",
      phoneLabel: "+38 050 648 44 76",
    },
  ],
} as const;

export type Master = (typeof site.masters)[number];

/** Посилання на месенджери за номером майстра. */
export const messengerLinks = (phone: string, message: string) => ({
  viber: `viber://chat?number=${encodeURIComponent(phone)}&text=${encodeURIComponent(message)}`,
  telegram: `https://t.me/${phone}`,
  whatsapp: `https://wa.me/${phone.replace("+", "")}?text=${encodeURIComponent(message)}`,
  sms: `sms:${phone}?body=${encodeURIComponent(message)}`,
});
