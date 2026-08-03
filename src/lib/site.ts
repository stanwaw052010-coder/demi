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
    { days: "Субота", time: "10:00 — 15:00" },
    { days: "Неділя", time: "Вихідний" },
  ],
} as const;

export const nav = [
  { label: "Послуги", href: "#services" },
  { label: "Переваги", href: "#why" },
  { label: "Результати", href: "#results" },
  { label: "Про лікаря", href: "#doctor" },
  { label: "Відгуки", href: "#reviews" },
  { label: "Контакти", href: "#contacts" },
] as const;
