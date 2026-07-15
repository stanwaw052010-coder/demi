export const siteConfig = {
  name: "СПАБЕЛЬ",
  fullName: "SPA-салон краси «Спабель»",
  tagline: "SPA для тіла. Belle для душі.",
  description:
    "Спабель — SPA-салон краси повного циклу в Запоріжжі: лазерна епіляція, косметологія, перукарські послуги, манікюр і педикюр, SPA-капсула Neoqi Medic.",
  url: "https://spabelle.ua",
  phone: "+38 (061) 000-00-00",
  phoneHref: "tel:+380610000000",
  whatsapp: "https://wa.me/380610000000",
  instagram: "https://instagram.com/spabelle",
  telegram: "https://t.me/spabelle",
  email: "hello@spabelle.ua",
  address: "м. Запоріжжя, Україна",
  addressQuery: "СПАБЕЛЬ Салон Красоты в Запорожье",
  mapsPlaceUrl:
    "https://www.google.com/maps/place/%D0%A1%D0%9F%D0%90%D0%91%D0%95%D0%9B%D0%AC+%D0%A1%D0%B0%D0%BB%D0%BE%D0%BD+%D0%9A%D1%80%D0%B0%D1%81%D0%BE%D1%82%D1%8B+%D0%B2+%D0%97%D0%B0%D0%BF%D0%BE%D1%80%D0%BE%D0%B6%D1%8C%D0%B5/",
  hours: [
    { days: "Понеділок — Субота", time: "09:00 — 20:00" },
    { days: "Неділя", time: "10:00 — 18:00" },
  ],
};

export const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  siteConfig.addressQuery
)}&output=embed`;

export const navLinks = [
  { href: "/", label: "Головна" },
  { href: "/services", label: "Всі послуги" },
  { href: "/about", label: "Про нас" },
  { href: "/contacts", label: "Контакти" },
];
