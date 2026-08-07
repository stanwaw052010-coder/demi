export const site = {
  name: "Dental Clinic Nataly",
  shortName: "Nataly",
  doctor: "Наталія Жилан",
  city: "Тернопіль",
  address: "вул. Коновальця 3, Тернопіль",
  addressLatin: "Konovaltsia 3, Ternopil",
  phone: "+380 97 900 12 15",
  phoneHref: "tel:+380979001215",
  /** Second working line. */
  phone2: "+380 68 68 33 999",
  phone2Href: "tel:+380686833999",
  viber: "viber://chat?number=%2B380979001215",
  instagram: "https://www.instagram.com/dental_natali_/",
  instagramHandle: "@dental_natali_",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Konovaltsia+3%2C+Ternopil",
  geo: { lat: 49.5546, lng: 25.5921 },
  /**
   * Spelled out day by day — a patient checking «чи працюють у четвер»
   * should not have to decode a range.
   */
  hours: [
    { days: "Понеділок", time: "09:00 — 19:00" },
    { days: "Вівторок", time: "09:00 — 19:00" },
    { days: "Середа", time: "09:00 — 19:00" },
    { days: "Четвер", time: "09:00 — 19:00" },
    { days: "П'ятниця", time: "09:00 — 19:00" },
    { days: "Субота", time: "За попереднім записом" },
    { days: "Неділя", time: "Вихідний" },
  ],
  /** The same schedule in one line, for tight places. */
  hoursShort: "Пн–Пт 09:00 — 19:00 · Сб за записом",
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
