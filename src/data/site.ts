export const SITE = {
  name: "Спабель",
  legalName: "СПАБЕЛЬ",
  tagline: "Салон краси та SPA у Запоріжжі",
  description:
    "Спабель — салон краси повного циклу в Запоріжжі: лазерна епіляція, косметологія, перукарські послуги, SPA-капсула Neoqi Medic, манікюр та педикюр. Преміальний сервіс, індивідуальний підхід, сучасні технології.",
  url: "https://spabel.com.ua",
  phone: "+38 (067) 000 00 00",
  phoneHref: "+380670000000",
  email: "info@spabel.com.ua",
  address: "м. Запоріжжя",
  addressFull: "Запоріжжя, Україна",
  workingHours: [
    { days: "Пн — Пт", hours: "09:00 — 21:00" },
    { days: "Сб — Нд", hours: "10:00 — 20:00" },
  ],
  social: {
    instagram: "https://instagram.com/spabel",
    facebook: "https://facebook.com/spabel",
    telegram: "https://t.me/spabel",
  },
  mapsEmbedSrc:
    "https://www.google.com/maps?q=%D0%A1%D0%9F%D0%90%D0%91%D0%95%D0%9B%D0%AC%20%D0%A1%D0%B0%D0%BB%D0%BE%D0%BD%20%D0%9A%D1%80%D0%B0%D1%81%D0%BE%D1%82%D0%B8%20%D0%B2%20%D0%97%D0%B0%D0%BF%D0%BE%D1%80%D0%BE%D0%B6%D1%8C%D1%97&output=embed",
  mapsUrl:
    "https://www.google.com/maps/place/%D0%A1%D0%9F%D0%90%D0%91%D0%95%D0%9B%D0%AC+%D0%A1%D0%B0%D0%BB%D0%BE%D0%BD+%D0%9A%D1%80%D0%B0%D1%81%D0%BE%D1%82%D1%8B+%D0%B2+%D0%97%D0%B0%D0%BF%D0%BE%D1%80%D0%BE%D0%B6%D1%8C%D0%B5/",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Головна" },
  { href: "/services", label: "Всі послуги" },
  { href: "/about", label: "Про нас" },
  { href: "/contacts", label: "Контакти" },
] as const;
