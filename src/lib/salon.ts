export const SALON_NAME = "VELLA";
export const PHONE_DISPLAY = "+380 98 098 77 88";
export const PHONE_HREF = "tel:+380980987788";
export const ADDRESS =
  "вул. Академіка Брюкнера, 6, Тернопіль, Тернопільська область, 46000";
export const MAP_QUERY = "вул. Академіка Брюкнера 6 Тернопіль";
export const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  MAP_QUERY
)}&output=embed`;

export type Dress = {
  slug: string;
  title: string;
  description: string;
  image: string;
  tag?: string;
};

export const DRESSES: Dress[] = [
  {
    slug: "cacao",
    title: "Сукня «Cacao»",
    description:
      "Атласна вечірня сукня кольору шоколаду з драпіруванням та розрізом.",
    image: "/dresses/cacao-satin.jpg",
    tag: "Хіт продажів",
  },
  {
    slug: "nocturne",
    title: "Сукня «Nocturne»",
    description:
      "Чорна сукня з фатину на бретелях, з корсетним ліфом та розрізом на нозі.",
    image: "/dresses/nocturne-tulle.jpg",
  },
  {
    slug: "bordeaux",
    title: "Сукня «Bordeaux»",
    description: "Атласна сукня насиченого бордового відтінку з драпіруванням.",
    image: "/dresses/bordeaux-satin.jpg",
  },
  {
    slug: "velvet-rose",
    title: "Сукня «Velvet Rose»",
    description:
      "Пишна сукня з відкритими плечима та об'ємним декором з фатину.",
    image: "/dresses/velvet-rose.jpg",
    tag: "Новинка",
  },
  {
    slug: "mint-duo",
    title: "Сукні «Mint Duo»",
    description:
      "Дві атласні сукні м'ятного відтінку — для подружок нареченої чи парного образу.",
    image: "/dresses/mint-duo.jpg",
  },
];
