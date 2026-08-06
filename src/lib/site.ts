export const site = {
  name: "Dental Clinic Nataly",
  shortName: "Nataly",
  doctor: "Наталія Жилан",
  city: "Тернопіль",
  address: "вул. Коновальця 3, Тернопіль",
  addressLatin: "Konovaltsia 3, Ternopil",
  phone: "+380 97 900 12 15",
  phoneHref: "tel:+380979001215",
  viber: "viber://chat?number=%2B380979001215",
  instagram:
    "https://www.instagram.com/dental_natali_?igsh=dng3ZzBzejFsNjY=",
  instagramHandle: "@dental_natali_",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Konovaltsia+3%2C+Ternopil",
  geo: { lat: 49.5546, lng: 25.5921 },
  hours: [
    { days: "Понеділок — П'ятниця", time: "09:00 — 19:00" },
    { days: "Субота", time: "За записом" },
    { days: "Неділя", time: "Не працюємо" },
  ],
} as const;

/**
 * `secondary` items only appear in the desktop bar from 2xl up — seven links
 * plus the phone pill and the booking button do not fit below 1536px. All of
 * them are in the mobile menu and the footer regardless.
 */
export const nav = [
  { label: "Послуги", href: "#services" },
  { label: "Ціни", href: "#prices" },
  { label: "Переваги", href: "#why", secondary: true },
  { label: "Результати", href: "#results" },
  { label: "Про лікаря", href: "#doctor", secondary: true },
  { label: "Відгуки", href: "#reviews" },
  { label: "Контакти", href: "#contacts" },
] as const;
