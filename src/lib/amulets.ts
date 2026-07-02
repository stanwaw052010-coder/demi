export const SHOP_NAME = "AMELI";
export const INSTAGRAM_HANDLE = "@ameli.amulets";
export const INSTAGRAM_URL = "https://www.instagram.com/ameli.amulets/";

export type Product = {
  slug: string;
  title: string;
  description: string;
  image: string;
  tag?: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "fehu-pendant",
    title: "Кулон з руною Fehu",
    description:
      "Натуральне дерево в епоксидній смолі з мідною поталлю — символ достатку та нового початку.",
    image: "/amulets/macro-rune.jpg",
    tag: "Хіт продажів",
  },
  {
    slug: "ingwaz-pendant",
    title: "Кулон з руною Inguz",
    description:
      "Овальна форма з деревʼяною вставкою — оберіг родючості та внутрішньої сили.",
    image: "/amulets/forest-log.jpg",
  },
  {
    slug: "rune-set",
    title: "Набір рунічних оберегів",
    description:
      "Колекція кулонів різних форм і розмірів — для власної колекції чи в подарунок.",
    image: "/amulets/collection-grid.jpg",
    tag: "Набір",
  },
];
