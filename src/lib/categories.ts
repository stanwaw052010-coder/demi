import type { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "engine",
    name: "Двигун",
    icon: "⚙️",
    count: 1240,
    subcategories: [
      { slug: "engine-parts", name: "Деталі двигуна", count: 420 },
      { slug: "cooling", name: "Система охолодження", count: 310 },
      { slug: "intake", name: "Система впуску", count: 180 },
      { slug: "exhaust", name: "Вихлопна система", count: 220 },
      { slug: "gaskets", name: "Прокладки та ущільнення", count: 110 },
    ],
  },
  {
    slug: "transmission",
    name: "Трансмісія",
    icon: "🔄",
    count: 680,
    subcategories: [
      { slug: "gearbox", name: "Коробка передач", count: 180 },
      { slug: "clutch", name: "Зчеплення", count: 240 },
      { slug: "shafts", name: "Приводні вали", count: 160 },
      { slug: "differential", name: "Диференціал", count: 100 },
    ],
  },
  {
    slug: "suspension",
    name: "Підвіска",
    icon: "🔩",
    count: 920,
    subcategories: [
      { slug: "shocks", name: "Амортизатори", count: 320 },
      { slug: "springs", name: "Ресори та пружини", count: 180 },
      { slug: "arms", name: "Важелі та тяги", count: 260 },
      { slug: "bearings", name: "Підшипники ступиці", count: 160 },
    ],
  },
  {
    slug: "brakes",
    name: "Гальмівна система",
    icon: "🛑",
    count: 760,
    subcategories: [
      { slug: "discs", name: "Гальмівні диски", count: 240 },
      { slug: "pads", name: "Колодки", count: 280 },
      { slug: "calipers", name: "Супорти", count: 120 },
      { slug: "hoses", name: "Шланги та трубки", count: 120 },
    ],
  },
  {
    slug: "body",
    name: "Кузов",
    icon: "🚐",
    count: 1100,
    subcategories: [
      { slug: "mirrors", name: "Дзеркала", count: 220 },
      { slug: "doors", name: "Двері та панелі", count: 180 },
      { slug: "bumpers", name: "Бампери", count: 160 },
      { slug: "glass", name: "Скло", count: 200 },
      { slug: "hood", name: "Капот та кришка", count: 140 },
      { slug: "fenders", name: "Крила", count: 200 },
    ],
  },
  {
    slug: "electrical",
    name: "Електрика",
    icon: "⚡",
    count: 840,
    subcategories: [
      { slug: "sensors", name: "Датчики", count: 380 },
      { slug: "wiring", name: "Проводка та роз'єми", count: 160 },
      { slug: "alternators", name: "Генератори та стартери", count: 120 },
      { slug: "switches", name: "Вимикачі та реле", count: 180 },
    ],
  },
  {
    slug: "lighting",
    name: "Освітлення",
    icon: "💡",
    count: 540,
    subcategories: [
      { slug: "headlights", name: "Фари", count: 180 },
      { slug: "taillights", name: "Задні ліхтарі", count: 160 },
      { slug: "bulbs", name: "Лампи", count: 200 },
    ],
  },
  {
    slug: "interior",
    name: "Салон",
    icon: "🪑",
    count: 460,
    subcategories: [
      { slug: "seats", name: "Сидіння та оббивка", count: 120 },
      { slug: "dashboard", name: "Приладова панель", count: 160 },
      { slug: "climate", name: "Клімат-контроль", count: 180 },
    ],
  },
  {
    slug: "heating",
    name: "Опалення та кондиціонер",
    icon: "🌡️",
    count: 380,
    subcategories: [
      { slug: "ac", name: "Кондиціонер", count: 180 },
      { slug: "heater", name: "Піч та вентилятор", count: 200 },
    ],
  },
  {
    slug: "fuel",
    name: "Паливна система",
    icon: "⛽",
    count: 520,
    subcategories: [
      { slug: "injectors", name: "Форсунки", count: 180 },
      { slug: "fuel-pump", name: "Паливний насос", count: 160 },
      { slug: "filters", name: "Паливні фільтри", count: 180 },
    ],
  },
  {
    slug: "oils-fluids",
    name: "Оливи та рідини",
    icon: "🛢️",
    count: 340,
    subcategories: [
      { slug: "motor-oil", name: "Моторна олива", count: 140 },
      { slug: "transmission-oil", name: "Трансмісійна олива", count: 100 },
      { slug: "coolant", name: "Антифриз", count: 100 },
    ],
  },
  {
    slug: "accessories",
    name: "Аксесуари",
    icon: "🔧",
    count: 280,
    subcategories: [
      { slug: "tools", name: "Інструменти", count: 120 },
      { slug: "care", name: "Автохімія", count: 160 },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllSubcategories() {
  return categories.flatMap((c) =>
    (c.subcategories ?? []).map((s) => ({
      ...s,
      categorySlug: c.slug,
      categoryName: c.name,
    }))
  );
}
