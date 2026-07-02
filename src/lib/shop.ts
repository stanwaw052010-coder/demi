export const SHOP_NAME = "FORMA3D";
export const PHONE_DISPLAY = "+380 73 478 15 51";
export const PHONE_HREF = "tel:+380734781551";

export type Product = {
  slug: string;
  title: string;
  description: string;
  image: string;
  tag?: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "wave",
    title: "Ваза «Wave»",
    description:
      "Об'ємна ваза з плавним хвилястим рельєфом. Матова текстура під керамограніт.",
    image: "/products/bouquet-vase.jpg",
    tag: "Хіт продажів",
  },
  {
    slug: "spiral",
    title: "Ваза «Spiral»",
    description:
      "Спіральна ребриста ваза — акуратна геометрія та глибокий матовий колір.",
    image: "/products/spiral-blue-vase.jpg",
  },
  {
    slug: "duna",
    title: "Колекція «Дюна»",
    description:
      "Три ребристі вази різного розміру — можна замовити окремо або комплектом.",
    image: "/products/wave-trio-vase.jpg",
  },
  {
    slug: "lotus",
    title: "Скульптура «Лотос»",
    description:
      "Декоративна квітка лотоса ручного дизайну — прикраса для полиці чи журнального столика.",
    image: "/products/lotus-sculpture.jpg",
  },
  {
    slug: "calla",
    title: "Ваза «Calla»",
    description:
      "Скульптурна ваза у формі квітки калли з тонким рельєфним візерунком.",
    image: "/products/calla-vase.jpg",
    tag: "Новинка",
  },
];
