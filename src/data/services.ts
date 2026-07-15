import { slugify, uniqueSlugger } from "@/lib/slug";

export interface RawServiceItem {
  name: string;
  price: string; // display label, already formatted e.g. "1 315 ₴" or "від 1500 ₴"
  priceValue: number; // lowest numeric value, for sorting
  duration?: string;
  note?: string;
}

export interface RawSubcategory {
  title: string;
  items: RawServiceItem[];
}

export interface RawCategory {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  subcategories: RawSubcategory[];
}

function money(value: number): string {
  return new Intl.NumberFormat("uk-UA").format(value) + " ₴";
}

function item(name: string, price: number, opts?: Partial<RawServiceItem>): RawServiceItem {
  return { name, price: money(price), priceValue: price, ...opts };
}

function itemFrom(name: string, price: number, opts?: Partial<RawServiceItem>): RawServiceItem {
  return { name, price: `від ${money(price)}`, priceValue: price, ...opts };
}

function itemDual(name: string, a: number, b: number, opts?: Partial<RawServiceItem>): RawServiceItem {
  return { name, price: `${money(a)} / ${money(b)}`, priceValue: a, ...opts };
}

export const rawCategories: RawCategory[] = [
  {
    slug: "laser-women",
    title: "Лазерна епіляція (жінки)",
    shortTitle: "Лазерна епіляція · жінки",
    description:
      "Діодна лазерна епіляція для жінок — швидко, малочутливо та безпечно для будь-якого типу шкіри. Кількість процедур підбирається індивідуально на консультації.",
    subcategories: [
      {
        title: "Ноги",
        items: [
          item("Ноги повністю", 1315),
          item("Гомілки", 700),
          item("Стегна", 700),
          item("Коліна", 300),
          item("Пальці ніг", 200),
          item("Стопи", 260),
        ],
      },
      {
        title: "Зона бікіні",
        items: [
          item("Бікіні глибоке", 700),
          item("Бікіні неглибоке", 545),
          item("Зона лобку", 400),
          item("Міжсіднична складка", 400),
          item("Статеві губи", 315),
        ],
      },
      {
        title: "Верхня частина тіла",
        items: [
          item("Пахви", 315),
          item("Руки до ліктів", 400),
          item("Руки повністю", 700),
          item("Кисті рук", 260),
          item("Плечі", 400),
          item("Пальці", 200),
        ],
      },
      {
        title: "Тулуб",
        items: [
          item("Біла лінія", 200),
          item("Груди", 560),
          item("Живіт", 430),
          item("Ареоли", 200),
          item("Поперек", 430),
        ],
      },
      {
        title: "Обличчя та шия",
        items: [
          item("Шия", 315),
          item("Обличчя (1 зона)", 200),
          item("Обличчя (4 зони)", 570),
        ],
      },
      {
        title: "Додатково",
        items: [item("Знеболення (1 зона)", 100)],
      },
    ],
  },
  {
    slug: "laser-men",
    title: "Лазерна епіляція (чоловіки)",
    shortTitle: "Лазерна епіляція · чоловіки",
    description:
      "Чоловіча лазерна епіляція на сучасному діодному лазері: щетина, спина, груди та інші зони без подразнення й вростання волосся.",
    subcategories: [
      {
        title: "Ноги",
        items: [
          item("Ноги повністю", 1570),
          item("Гомілки", 800),
          item("Стегна", 800),
          item("Коліна", 245),
          item("Пальці ніг", 285),
          item("Стопи", 245),
        ],
      },
      {
        title: "Зона бікіні",
        items: [
          item("Бікіні глибоке", 825),
          item("Бікіні неглибоке", 645),
          item("Зона лобку", 460),
          item("Міжсіднична складка", 460),
        ],
      },
      {
        title: "Верхня частина тіла",
        items: [
          item("Пахви", 350),
          item("Руки до ліктів", 485),
          item("Руки повністю", 800),
          item("Кисті рук", 285),
          item("Плечі", 655),
          item("Пальці", 285),
        ],
      },
      {
        title: "Тулуб",
        items: [
          item("Біла лінія", 245),
          item("Груди", 600),
          item("Живіт", 690),
          item("Ареоли", 245),
          item("Поперек", 800),
          item("Спина", 1280),
        ],
      },
      {
        title: "Обличчя та шия",
        items: [
          item("Шия", 350),
          item("Обличчя (1 зона)", 245),
          item("Обличчя (4 зони)", 685),
        ],
      },
      {
        title: "Додатково",
        items: [item("Знеболення (1 зона)", 100)],
      },
    ],
  },
  {
    slug: "ipl-treatment",
    title: "IPL Shiny (фотоомолодження, лікування)",
    shortTitle: "IPL Shiny · омолодження",
    description:
      "Фототерапія IPL Shiny працює з акне, постакне та ознаками старіння шкіри, стимулюючи оновлення й вирівнюючи тон без реабілітаційного періоду.",
    subcategories: [
      {
        title: "Лікування акне/постакне",
        items: [
          item("Обличчя", 2000),
          item("Шия", 950),
          item("Декольте", 1900),
          item("Обличчя + Шия", 2600),
          item("Обличчя + Шия + Декольте", 3300),
          item("Спина", 3300),
        ],
      },
      {
        title: "Фотоомолодження",
        items: [
          item("Обличчя", 3500),
          item("Шия", 1800),
          item("Декольте", 3300),
          item("Обличчя + Шия + Декольте", 6500),
          item("Кисті рук", 1800),
          item("Руки до ліктя", 3500),
          item("Руки повністю", 5000),
          item("Коліна", 1500),
        ],
      },
    ],
  },
  {
    slug: "ipl-pigmentation",
    title: "IPL Shiny (видалення пігментації)",
    shortTitle: "IPL Shiny · пігментація",
    description:
      "Прицільне видалення пігментних плям та вікових пігментацій технологією IPL Shiny — точково та за зонами.",
    subcategories: [
      {
        title: "За зонами",
        items: [
          item("Кисті рук", 1000),
          item("Руки до ліктів", 2000),
          item("Руки передпліччя", 2200),
          item("Руки повністю", 3000),
          item("Коліна", 700),
          item("Гомілки", 2500),
          item("Верхня частина спини", 4000),
        ],
      },
      {
        title: "За розміром плями",
        items: [
          item("Пляма 1,5 см", 500),
          item("Пляма 3 см", 800),
          item("Пляма 6 см", 1100),
          item("Обличчя", 2000),
          item("Ніс", 600),
          item("Щоки", 1000),
          item("Лоб", 600),
          item("Декольте", 1800),
        ],
      },
    ],
  },
  {
    slug: "ipl-vessels",
    title: "IPL Shiny (видалення судин)",
    shortTitle: "IPL Shiny · судини",
    description:
      "Видалення судинної сітки та куперозу на обличчі технологією IPL Shiny — безпечно та без пошкодження навколишніх тканин.",
    subcategories: [
      {
        title: "Зони",
        items: [
          item("Обличчя", 2500),
          item("Крила носа", 500),
          item("Ніс", 600),
          item("Ніс та щоки", 1500),
          item("Щоки", 1000),
          item("Підборіддя", 700),
        ],
      },
    ],
  },
  {
    slug: "massage",
    title: "Масаж",
    shortTitle: "Масаж",
    description:
      "Спектр масажних технік — від глибокого розслаблення до антицілюлітних та лімфодренажних програм для тіла й обличчя.",
    subcategories: [
      {
        title: "Масаж",
        items: [
          {
            name: "Авторська методика (1 год / 1.5 год)",
            price: "За консультацією",
            priceValue: 0,
          },
          item("Масаж обличчя", 300, { duration: "20 хв" }),
          item("Масаж обличчя + альгінатна маска", 700, { duration: "1 год" }),
          item("Медовий масаж", 700, { duration: "1.5 год" }),
          item("Стоун масаж", 900, { duration: "1.5 год" }),
          item("Пресотерапія", 400, { duration: "30 хв" }),
          itemDual("Загальний масаж", 900, 1100, { duration: "1.5 год / 2 год" }),
          item("Масаж спини", 600, { duration: "1 год" }),
          item("Масаж ШКЗ", 400, { duration: "30 хв" }),
          item("Масаж ніг", 400, { duration: "30 хв" }),
          item("Масаж стоп", 250, { duration: "20 хв" }),
          item("Лімфодренажний масаж", 600, { duration: "1 год" }),
          item("Антицелюлітний масаж", 600, { duration: "1 год" }),
          item("Кавітація", 400, { note: "1 зона" }),
        ],
      },
    ],
  },
  {
    slug: "aesthetic-cosmetology",
    title: "Естетична косметологія",
    shortTitle: "Естетична косметологія",
    description:
      "Догляд за шкірою обличчя, спини та декольте: чистки, піл інги, карбокситерапія та авторські доглядові протоколи SKEYNDOR і DANNE.",
    subcategories: [
      {
        title: "Чистка",
        items: [item("Обличчя", 1000), item("Спина", 1000), item("Декольте", 1000)],
      },
      {
        title: "Пілінг",
        items: [item("Поверхневий пілінг", 1500), item("Серединний пілінг", 2500)],
      },
      {
        title: "Інше",
        items: [
          item("Карбокситерапія", 1500),
          item("Прокол вух", 300),
          item("SKEYNDOR CORRECTIVE (від глибоких зморшок)", 2000),
          item("SKEYNDOR GLOBAL LIFT", 2200),
          item("Рідка плазма", 1500),
          item("RENEISSANCE (з гіпсовою маскою)", 1500),
          itemFrom("Ферментна маска DANNE", 1500),
          item("Мікротоки з доглядовими масками", 1200),
        ],
      },
    ],
  },
  {
    slug: "injection-cosmetology",
    title: "Ін'єкційна косметологія",
    shortTitle: "Ін'єкційна косметологія",
    description:
      "Апаратна регенерація та живлення шкіри й волосся ін'єкційними методиками: PRP-терапія та мезотерапія.",
    subcategories: [
      {
        title: "PRP-терапія",
        items: [
          item("Шкіра голови", 1000),
          item("Обличчя", 1500),
          item("Обличчя + шия", 1800),
          item("Обличчя + шия + декольте", 2200),
        ],
      },
      {
        title: "Мезотерапія",
        items: [itemFrom("Шкіра голови", 800), itemFrom("Очі", 800)],
      },
    ],
  },
  {
    slug: "spa-programs",
    title: "SPA-програми",
    shortTitle: "SPA-програми",
    description:
      "Ритуали повного занурення у відновлення — включно з SPA-капсулою Neoqi Medic, гідромасажем та ароматерапією.",
    subcategories: [
      {
        title: "Програми",
        items: [
          item("AQUA-SHUTTLE", 1600),
          item("DETOX-LIFTING", 2300),
          item("SPA-RELAX", 900),
          item("Гідромасаж", 700),
          itemDual("Релакс масаж", 600, 900, { duration: "1 год / 1.5 год" }),
          itemDual("Арома масаж", 600, 900, { duration: "1 год / 1.5 год" }),
        ],
      },
    ],
  },
  {
    slug: "hair-services",
    title: "Перукарські послуги",
    shortTitle: "Перукарські послуги",
    description:
      "Авторські стрижки, складні техніки фарбування, відновлення та лікування волосся від досвідчених стилістів Спабель.",
    subcategories: [
      {
        title: "Стрижки",
        items: [
          item("Стрижка жіноча", 500),
          item("Стрижка чубчика", 200),
          item("Підліткова стрижка", 400),
          item("Стрижка дитяча до 6 років", 250),
          item("Стрижка дитяча до 10 років", 300),
          item("Чоловіча стрижка", 500),
        ],
      },
      {
        title: 'Фарбування "Тон в тон"',
        items: [
          item("Коротке волосся", 1500, { duration: "120 хв", note: "захист plex — 700 ₴" }),
          item("Середнє волосся", 2100, { duration: "120 хв", note: "захист plex — 900 ₴" }),
          item("Довге волосся", 2800, { duration: "180 хв", note: "захист plex — 1100 ₴" }),
        ],
      },
      {
        title: "Однотонний блонд",
        items: [
          item("Коротке волосся", 2300, { duration: "170 хв", note: "захист plex — 800 ₴" }),
          item("Середнє волосся", 2900, { duration: "200 хв", note: "захист plex — 1000 ₴" }),
          item("Довге волосся", 3400, { duration: "240 хв", note: "захист plex — 1200 ₴" }),
        ],
      },
      {
        title: "Складне фарбування (Shatush, Air Touch, Balayage тощо)",
        items: [
          item("Коротке волосся", 3100, { duration: "360 хв", note: "захист plex — 800 ₴" }),
          item("Середнє волосся", 4500, { duration: "360 хв", note: "захист plex — 1000 ₴" }),
          item("Довге волосся", 5700, { duration: "120 хв", note: "захист plex — 1200 ₴" }),
          {
            name: "Доплата за густоту волосся більшу за середню",
            price: "+ 1 000 ₴",
            priceValue: 1000,
          },
        ],
      },
      {
        title: "Освітлення зони корони",
        items: [
          item("Коротке волосся", 2600, { duration: "240 хв", note: "захист plex — 800 ₴" }),
          item("Середнє волосся", 3500, { duration: "300 хв", note: "захист plex — 1000 ₴" }),
          item("Довге волосся", 5200, { duration: "420 хв", note: "захист plex — 1200 ₴" }),
        ],
      },
      {
        title: "Вихід з чорного",
        items: [
          item("Коротке волосся", 5200),
          item("Середнє волосся", 7000),
          item("Довге волосся", 10100),
        ],
      },
      {
        title: "Вихід з техніки у тотал блонд",
        items: [
          item("Коротке волосся", 4800, { duration: "420 хв", note: "захист plex — 800 ₴" }),
          item("Середнє волосся", 5500, { duration: "480 хв", note: "захист plex — 1000 ₴" }),
          item("Довге волосся", 6300, { duration: "600 хв", note: "захист plex — 1200 ₴" }),
        ],
      },
      {
        title: "Завивка та лікування",
        items: [
          itemFrom("Біо завивка", 2400),
          itemFrom("Хімічна завивка", 2200),
          itemFrom("Кератинове випрямлення", 2200),
          itemFrom("Лікування Sweet mix", 900),
          itemFrom("Лікування LEBEL", 1500),
        ],
      },
    ],
  },
  {
    slug: "nail-service",
    title: "Нігтьовий сервіс",
    shortTitle: "Нігтьовий сервіс",
    description:
      "Манікюр і педікюр будь-якої складності: апаратні техніки, покриття гель-лаком, дизайн та доглядові SPA-ритуали для рук і ніг.",
    subcategories: [
      {
        title: "Манікюр",
        items: [
          item("Манікюр + гель-лак", 700),
          item("Апаратний манікюр", 300),
          item("Покриття гель-лак + френч", 500),
          item("Корекція (1–2 довжина)", 400),
          item("Корекція (3–4 довжина)", 500),
          item("Зняття роботи чужого майстра", 200),
          item("Дизайн 1 нігтя", 50),
          item("Парафінотерапія рук", 150),
        ],
      },
      {
        title: "Педікюр",
        items: [
          item("Педікюр комбі", 600),
          item("Покриття гель-лак", 200),
          item("Покриття гель-лак + френч", 250),
          item("Дизайн 1 нігтя", 50),
          item("Зняття роботи чужого майстра", 200),
          item("Парафінотерапія ніг", 200),
          item("Педікюр комбі (чоловічий)", 700),
          item("Манікюр (чоловічий)", 300),
        ],
      },
    ],
  },
];

export interface Service {
  slug: string;
  name: string;
  price: string;
  priceValue: number;
  duration?: string;
  note?: string;
  categorySlug: string;
  categoryTitle: string;
  categoryDescription: string;
  subcategoryTitle: string;
}

export interface ServiceCategoryMeta {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  count: number;
}

const nextSlug = uniqueSlugger();

export const allServices: Service[] = rawCategories.flatMap((cat) =>
  cat.subcategories.flatMap((sub) =>
    sub.items.map((it) => {
      const base = `${cat.slug}-${slugify(sub.title)}-${slugify(it.name)}`;
      return {
        slug: nextSlug(base),
        name: it.name,
        price: it.price,
        priceValue: it.priceValue,
        duration: it.duration,
        note: it.note,
        categorySlug: cat.slug,
        categoryTitle: cat.title,
        categoryDescription: cat.description,
        subcategoryTitle: sub.title,
      };
    })
  )
);

export const serviceCategories: ServiceCategoryMeta[] = rawCategories.map((cat) => ({
  slug: cat.slug,
  title: cat.title,
  shortTitle: cat.shortTitle,
  description: cat.description,
  count: cat.subcategories.reduce((sum, s) => sum + s.items.length, 0),
}));

export function getServiceBySlug(slug: string): Service | undefined {
  return allServices.find((s) => s.slug === slug);
}

export function getRelatedServices(service: Service, take = 6): Service[] {
  return allServices
    .filter((s) => s.categorySlug === service.categorySlug && s.slug !== service.slug)
    .slice(0, take);
}

function find(categorySlug: string, nameIncludes: string): Service | undefined {
  return allServices.find(
    (s) => s.categorySlug === categorySlug && s.name.includes(nameIncludes)
  );
}

export const highlightServices: Service[] = [
  find("laser-women", "Ноги повністю"),
  find("aesthetic-cosmetology", "SKEYNDOR GLOBAL LIFT"),
  find("hair-services", "Стрижка жіноча"),
  find("nail-service", "Манікюр + гель-лак"),
  find("spa-programs", "DETOX-LIFTING"),
  find("massage", "Стоун масаж"),
].filter((s): s is Service => Boolean(s));
