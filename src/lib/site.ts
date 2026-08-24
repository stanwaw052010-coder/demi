/**
 * Єдине джерело правди про клініку.
 * Усі контакти, посилання й адреса беруться тільки звідси —
 * щоб змінити телефон, достатньо відредагувати один рядок.
 */
export const site = {
  name: "Clinic Stomatology",
  nameLines: ["Clinic", "Stomatology"] as const,
  tagline: "Центр здоров’я та естетики",
  city: "Львів",
  claim: "Дбаємо про вашу усмішку та тіло",
  url: "https://clinic-stomatology.com",

  phone: {
    /** Формат для tel: — без пробілів, з кодом країни. */
    href: "tel:+380996453293",
    /** Формат для показу людині. */
    label: "+380 99 645 32 93",
  },

  address: {
    street: "вулиця Героїв Майдану, 5",
    district: "Сокільники",
    region: "Львівська область",
    postal: "81130",
    country: "UA",
    full: "вулиця Героїв Майдану, 5, Сокільники, Львівська область, 81130",
    maps:
      "https://www.google.com/maps?q=" +
      encodeURIComponent(
        "вулиця Героїв Майдану, 5, Сокільники, Львівська область, 81130",
      ),
    /** Координати Сокільників — для мапи та schema.org. */
    geo: { lat: 49.7724, lng: 23.9868 },
  },

  instagram: {
    clinic: "https://www.instagram.com/clinic_stomatology/?hl=ru",
    clinicHandle: "@clinic_stomatology",
    massage: "https://www.instagram.com/fitflex.massage/?hl=ru",
    massageHandle: "@fitflex.massage",
  },
} as const;

export const embedMapSrc =
  "https://www.google.com/maps?q=" +
  encodeURIComponent(site.address.full) +
  "&output=embed&hl=uk";
