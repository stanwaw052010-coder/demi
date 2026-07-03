export const SHOP_NAME = "Nata-Sushi";
export const PHONE_DISPLAY = "+380 (66) 575 49 30";
export const PHONE_HREF = "tel:+380665754930";
export const ADDRESS = "М-н. Орільський, Перещепине, Дніпропетровська область, 51220";
export const INSTAGRAM_URL =
  "https://www.instagram.com/__nata__sushi__pereshchepino__?igsh=MXIybjR0bDE2eGVqag==";
export const INSTAGRAM_HANDLE = "@__nata__sushi__pereshchepino__";
export const MAP_QUERY = "М-н. Орільський Перещепине Дніпропетровська область";
export const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  MAP_QUERY
)}&output=embed`;

export const WORKING_HOURS_LABEL = "Щодня 11:00–21:00";

export type MenuItem = {
  id: string;
  title: string;
  description: string;
  weight?: string;
  price: number;
  image: string;
  tag?: string;
};

export const ROLLS: MenuItem[] = [
  {
    id: "black-dragon",
    title: "Чорний дракон",
    description: "Норі, чорний рис, ікра масаго, сир філадельфія, вугор, кунжут, огірок, соус унагі",
    weight: "390 г",
    price: 320,
    image: "/menu/roll-black-dragon.png",
  },
  {
    id: "black-shrimp",
    title: "Чорна креветка",
    description: "Норі, рис, огірок, ікра масаго, сир філадельфія, креветка темпура",
    weight: "470 г",
    price: 330,
    image: "/menu/roll-black-shrimp.png",
  },
  {
    id: "phoenix",
    title: "Фенікс",
    description: "Рис, норі, сир філадельфія, огірок, червона риба",
    weight: "320 г",
    price: 270,
    image: "/menu/roll-phoenix.png",
  },
  {
    id: "sunrise",
    title: "Санрайз",
    description: "Норі, рис, сніжний краб, ікра масаго, огірок, сир філадельфія",
    weight: "360 г",
    price: 290,
    image: "/menu/roll-sunrise.png",
  },
  {
    id: "black-samurai",
    title: "Black Samurai",
    description:
      "Норі, рис, огірок, кранч цибуля, сир, соус спайсі, філадельфія, чедер, червона риба, соус унагі",
    weight: "450 г",
    price: 330,
    image: "/menu/roll-black-samurai.png",
  },
  {
    id: "red-dragon",
    title: "Червоний дракон",
    description: "Норі, рис, тунець, червона риба, сир філадельфія, огірок, унагі соус",
    weight: "380 г",
    price: 310,
    image: "/menu/roll-red-dragon.png",
  },
  {
    id: "deluxe",
    title: "Deluxe Roll",
    description: "Рис, норі, авокадо, червона риба, тунець, креветка темпура",
    weight: "370 г",
    price: 350,
    image: "/menu/roll-deluxe.png",
    tag: "Хіт",
  },
  {
    id: "chizzu",
    title: "Чіззу",
    description: "Норі, рис, огірок, червона риба, сир філадельфія, сир чеддер",
    weight: "360 г",
    price: 270,
    image: "/menu/roll-chizzu.png",
  },
  {
    id: "major",
    title: "Мажор",
    description: "Норі, рис, огірок, червона риба, сир філадельфія, креветка темпура",
    weight: "380 г",
    price: 330,
    image: "/menu/roll-major.png",
  },
  {
    id: "hype",
    title: "Хайп",
    description: "Норі, рис, огірок, ікра масаго, сир філадельфія, креветка темпура",
    weight: "360 г",
    price: 330,
    image: "/menu/roll-hype.png",
  },
  {
    id: "kioto",
    title: "Кіото",
    description: "Норі, рис, огірок, червона риба, сир філадельфія, соус унагі, рисові кульки",
    weight: "380 г",
    price: 340,
    image: "/menu/roll-kioto.png",
  },
  {
    id: "red-dragon-roll",
    title: "Red Dragon Roll",
    description: "Норі, рис, сніжний краб, ікра масаго, сир філадельфія, риба спайсі, огірок",
    weight: "400 г",
    price: 320,
    image: "/menu/roll-red-dragon-roll.png",
  },
];

export const HOT_MENU: MenuItem[] = [
  {
    id: "udon-chicken",
    title: "Удон з куркою",
    description: "Локшина, курка, броколі, спаржа, болгарський перець, гриби, соус, кунжут",
    price: 230,
    image: "/menu/udon-chicken.png",
  },
  {
    id: "udon-fish",
    title: "Удон з червоною рибою",
    description: "Локшина, червона риба, броколі, спаржа, болгарський перець, гриби, соус, кунжут",
    price: 300,
    image: "/menu/udon-fish.png",
  },
  {
    id: "udon-seafood",
    title: "Удон з морепродуктами",
    description: "Локшина, морепродукти, броколі, спаржа, болгарський перець, гриби, соус, кунжут",
    price: 300,
    image: "/menu/udon-seafood.png",
  },
];

export const SETS: MenuItem[] = [
  {
    id: "mini-vip-set",
    title: "Mini VIP Set",
    description: "Філадельфія, Каліфорнія, Золотий дракон",
    weight: "24 шт.",
    price: 840,
    image: "/menu/set-miniviset.png",
    tag: "Набір",
  },
];

export const DRINKS: MenuItem[] = [
  {
    id: "ice-latte",
    title: "Айс лате",
    description: "На вибір: молоко та сироп",
    price: 80,
    image: "/menu/drink-icelatte.png",
  },
  {
    id: "fantazer",
    title: "Фантазер",
    description: "Фанта, лід, еспресо, сироп",
    price: 80,
    image: "/menu/drink-fantazer.png",
  },
  {
    id: "milkshake",
    title: "Молочний коктейль",
    description: "Молоко, морозиво, лід. На вибір: сироп",
    price: 100,
    image: "/menu/drink-milkshake.png",
  },
];

export const ALL_ITEMS: MenuItem[] = [...ROLLS, ...HOT_MENU, ...SETS, ...DRINKS];
