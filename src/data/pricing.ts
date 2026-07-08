export interface PriceItem {
  name: string;
  price: string;
}

export interface PriceGroup {
  title?: string;
  items: PriceItem[];
}

export interface PriceCategory {
  id: string;
  title: string;
  serviceSlug?: string;
  note?: string;
  groups: PriceGroup[];
}

export const PRICE_CATEGORIES: PriceCategory[] = [
  {
    id: "laser-women",
    title: "Лазерна епіляція (жінки)",
    serviceSlug: "laserna-epilyatsiya",
    groups: [
      {
        title: "Ноги",
        items: [
          { name: "Ноги повністю", price: "1 315 ₴" },
          { name: "Гомілки", price: "700 ₴" },
          { name: "Стегна", price: "700 ₴" },
          { name: "Коліна", price: "300 ₴" },
          { name: "Пальці ніг", price: "200 ₴" },
          { name: "Стопи", price: "260 ₴" },
        ],
      },
      {
        title: "Зона бікіні",
        items: [
          { name: "Бікіні глибоке", price: "700 ₴" },
          { name: "Бікіні неглибоке", price: "545 ₴" },
          { name: "Зона лобку", price: "400 ₴" },
          { name: "Міжсіднична складка", price: "400 ₴" },
          { name: "Статеві губи", price: "315 ₴" },
        ],
      },
      {
        title: "Верхня частина тіла",
        items: [
          { name: "Пахви", price: "315 ₴" },
          { name: "Руки до ліктів", price: "400 ₴" },
          { name: "Руки повністю", price: "700 ₴" },
          { name: "Кисті рук", price: "260 ₴" },
          { name: "Плечі", price: "400 ₴" },
          { name: "Пальці", price: "200 ₴" },
        ],
      },
      {
        title: "Тулуб",
        items: [
          { name: "Біла лінія", price: "200 ₴" },
          { name: "Груди", price: "560 ₴" },
          { name: "Живіт", price: "430 ₴" },
          { name: "Ареоли", price: "200 ₴" },
          { name: "Поперек", price: "430 ₴" },
        ],
      },
      {
        title: "Обличчя та шия",
        items: [
          { name: "Шия", price: "315 ₴" },
          { name: "Обличчя (1 зона)", price: "200 ₴" },
          { name: "Обличчя (4 зони)", price: "570 ₴" },
        ],
      },
      {
        title: "Додатково",
        items: [{ name: "Знеболення (1 зона)", price: "100 ₴" }],
      },
    ],
  },
  {
    id: "laser-men",
    title: "Лазерна епіляція (чоловіки)",
    serviceSlug: "laserna-epilyatsiya",
    groups: [
      {
        title: "Ноги",
        items: [
          { name: "Ноги повністю", price: "1 570 ₴" },
          { name: "Гомілки", price: "800 ₴" },
          { name: "Стегна", price: "800 ₴" },
          { name: "Коліна", price: "245 ₴" },
          { name: "Пальці ніг", price: "285 ₴" },
          { name: "Стопи", price: "245 ₴" },
        ],
      },
      {
        title: "Зона бікіні",
        items: [
          { name: "Бікіні глибоке", price: "825 ₴" },
          { name: "Бікіні неглибоке", price: "645 ₴" },
          { name: "Зона лобку", price: "460 ₴" },
          { name: "Міжсіднична складка", price: "460 ₴" },
        ],
      },
      {
        title: "Верхня частина тіла",
        items: [
          { name: "Пахви", price: "350 ₴" },
          { name: "Руки до ліктів", price: "485 ₴" },
          { name: "Руки повністю", price: "800 ₴" },
          { name: "Кисті рук", price: "285 ₴" },
          { name: "Плечі", price: "655 ₴" },
          { name: "Пальці", price: "285 ₴" },
        ],
      },
      {
        title: "Тулуб",
        items: [
          { name: "Біла лінія", price: "245 ₴" },
          { name: "Груди", price: "600 ₴" },
          { name: "Живіт", price: "690 ₴" },
          { name: "Ареоли", price: "245 ₴" },
          { name: "Поперек", price: "800 ₴" },
          { name: "Спина", price: "1 280 ₴" },
        ],
      },
      {
        title: "Обличчя та шия",
        items: [
          { name: "Шия", price: "350 ₴" },
          { name: "Обличчя (1 зона)", price: "245 ₴" },
          { name: "Обличчя (4 зони)", price: "685 ₴" },
        ],
      },
      {
        title: "Додатково",
        items: [{ name: "Знеболення (1 зона)", price: "100 ₴" }],
      },
    ],
  },
  {
    id: "ipl-rejuvenation",
    title: "IPL Shiny (фотоомолодження, лікування)",
    serviceSlug: "ipl-shiny",
    groups: [
      {
        title: "Лікування акне/постакне",
        items: [
          { name: "Обличчя", price: "2 000 ₴" },
          { name: "Шия", price: "950 ₴" },
          { name: "Декольте", price: "1 900 ₴" },
          { name: "Обличчя + Шия", price: "2 600 ₴" },
          { name: "Обличчя + Шия + Декольте", price: "3 300 ₴" },
          { name: "Спина", price: "3 300 ₴" },
        ],
      },
      {
        title: "Фотоомолодження",
        items: [
          { name: "Обличчя", price: "3 500 ₴" },
          { name: "Шия", price: "1 800 ₴" },
          { name: "Декольте", price: "3 300 ₴" },
          { name: "Обличчя + Шия + Декольте", price: "6 500 ₴" },
          { name: "Кисті рук", price: "1 800 ₴" },
          { name: "Руки до ліктя", price: "3 500 ₴" },
          { name: "Руки повністю", price: "5 000 ₴" },
          { name: "Коліна", price: "1 500 ₴" },
        ],
      },
    ],
  },
  {
    id: "ipl-pigmentation",
    title: "IPL Shiny (видалення пігментації)",
    serviceSlug: "ipl-shiny",
    groups: [
      {
        title: "За зонами",
        items: [
          { name: "Кисті рук", price: "1 000 ₴" },
          { name: "Руки до ліктів", price: "2 000 ₴" },
          { name: "Руки передпліччя", price: "2 200 ₴" },
          { name: "Руки повністю", price: "3 000 ₴" },
          { name: "Коліна", price: "700 ₴" },
          { name: "Гомілки", price: "2 500 ₴" },
          { name: "Верхня частина спини", price: "4 000 ₴" },
        ],
      },
      {
        title: "За розміром плями",
        items: [
          { name: "Пляма 1,5 см", price: "500 ₴" },
          { name: "Пляма 3 см", price: "800 ₴" },
          { name: "Пляма 6 см", price: "1 100 ₴" },
          { name: "Обличчя", price: "2 000 ₴" },
          { name: "Ніс", price: "600 ₴" },
          { name: "Щоки", price: "1 000 ₴" },
          { name: "Лоб", price: "600 ₴" },
          { name: "Декольте", price: "1 800 ₴" },
        ],
      },
    ],
  },
  {
    id: "ipl-vessels",
    title: "IPL Shiny (видалення судин)",
    serviceSlug: "ipl-shiny",
    groups: [
      {
        items: [
          { name: "Обличчя", price: "2 500 ₴" },
          { name: "Крила носа", price: "500 ₴" },
          { name: "Ніс", price: "600 ₴" },
          { name: "Ніс та щоки", price: "1 500 ₴" },
          { name: "Щоки", price: "1 000 ₴" },
          { name: "Підборіддя", price: "700 ₴" },
        ],
      },
    ],
  },
  {
    id: "massage",
    title: "Масаж",
    serviceSlug: "spa-ta-masazh",
    groups: [
      {
        items: [
          { name: "Авторська методика (1 год / 1.5 год)", price: "за запитом" },
          { name: "Масаж обличчя (20 хв)", price: "300 ₴" },
          { name: "Масаж обличчя + альгінатна маска (1 год)", price: "700 ₴" },
          { name: "Медовий масаж (1.5 год)", price: "700 ₴" },
          { name: "Стоун масаж (1.5 год)", price: "900 ₴" },
          { name: "Пресотерапія (30 хв)", price: "400 ₴" },
          { name: "Загальний (1.5 год / 2 год)", price: "900 ₴ / 1 100 ₴" },
          { name: "Масаж спини (1 год)", price: "600 ₴" },
          { name: "Масаж ШКЗ (30 хв)", price: "400 ₴" },
          { name: "Масаж ніг (30 хв)", price: "400 ₴" },
          { name: "Масаж стоп (20 хв)", price: "250 ₴" },
          { name: "Лімфодренажний (1 год)", price: "600 ₴" },
          { name: "Антицелюлітний (1 год)", price: "600 ₴" },
          { name: "Кавітація (1 зона)", price: "400 ₴" },
        ],
      },
    ],
  },
  {
    id: "aesthetic-cosmetology",
    title: "Естетична косметологія",
    serviceSlug: "kosmetologiya",
    groups: [
      {
        title: "Чистка",
        items: [
          { name: "Обличчя", price: "1 000 ₴" },
          { name: "Спина", price: "1 000 ₴" },
          { name: "Декольте", price: "1 000 ₴" },
        ],
      },
      {
        title: "Пілінг",
        items: [
          { name: "Поверхневий", price: "1 500 ₴" },
          { name: "Срединний", price: "2 500 ₴" },
          { name: "Карбоксітерапія", price: "1 500 ₴" },
        ],
      },
      {
        title: "Інше",
        items: [
          { name: "Прокол вух", price: "300 ₴" },
          { name: "SKEYNDOR CORRECTIVE (від глибоких зморшок)", price: "2 000 ₴" },
          { name: "SKEYNDOR GLOBAL LIFT", price: "2 200 ₴" },
          { name: "Рідка плазма", price: "1 500 ₴" },
          { name: "RENEISSANCE (з гіпсовою маскою)", price: "1 500 ₴" },
          { name: "Ферментна маска DANNE", price: "від 1 500 ₴" },
          { name: "Мікротоки з доглядовими масками", price: "1 200 ₴" },
        ],
      },
    ],
  },
  {
    id: "injection-cosmetology",
    title: "Ін'єкційна косметологія",
    serviceSlug: "kosmetologiya",
    groups: [
      {
        title: "PRP-терапія",
        items: [
          { name: "Шкіра голови", price: "1 000 ₴" },
          { name: "Обличчя", price: "1 500 ₴" },
          { name: "Обличчя + шия", price: "1 800 ₴" },
          { name: "Обличчя + шия + декольте", price: "2 200 ₴" },
        ],
      },
      {
        title: "Мезотерапія",
        items: [
          { name: "Шкіра голови", price: "від 800 ₴" },
          { name: "Очі", price: "від 800 ₴" },
        ],
      },
      {
        title: "Контурна пластика",
        items: [
          { name: "Збільшення губ", price: "від 6 000 ₴" },
          { name: "Скулова зона", price: "від 6 000 ₴" },
          { name: "Носогубні складки", price: "від 6 000 ₴" },
          { name: "Підборіддя", price: "від 6 000 ₴" },
          { name: "Кільця Венери", price: "від 5 500 ₴" },
        ],
      },
      {
        title: "Ботулінотерапія",
        items: [
          { name: "Міжбрів'я", price: "від 720 ₴" },
          { name: "Очі", price: "від 1 400 ₴" },
          { name: "Чоло", price: "від 3 000 ₴" },
          { name: "Лікування гіпергідрозу пахв", price: "від 6 000 ₴" },
          { name: "Біоревіталізація", price: "від 3 000 ₴" },
          { name: "Полімолочна кислота", price: "від 15 000 ₴" },
        ],
      },
    ],
    note: "Ціна може бути іншою в залежності від вибраного препарату та його кількості.",
  },
  {
    id: "spa-programs",
    title: "СПА-програми",
    serviceSlug: "spa-ta-masazh",
    groups: [
      {
        items: [
          { name: "AQUA - SHUTTLE", price: "1 600 ₴" },
          { name: "DETOX - LIFTING", price: "2 300 ₴" },
          { name: "SPA - RELAX", price: "900 ₴" },
          { name: "Гідромасаж", price: "700 ₴" },
          { name: "Релакс масаж (1 год / 1.5 год)", price: "600 ₴ / 900 ₴" },
          { name: "Арома масаж (1 год / 1.5 год)", price: "600 ₴ / 900 ₴" },
        ],
      },
    ],
  },
  {
    id: "hairdressing",
    title: "Перукарські послуги",
    serviceSlug: "perukarski-poslugy",
    groups: [
      {
        title: "Стрижки",
        items: [
          { name: "Стрижка жіноча", price: "500 ₴" },
          { name: "Стрижка чубчика", price: "200 ₴" },
          { name: "Підліткова стрижка", price: "400 ₴" },
          { name: "Стрижка дитяча до 6 років", price: "250 ₴" },
          { name: "Стрижка дитяча до 10 років", price: "300 ₴" },
          { name: "Чоловіча стрижка", price: "500 ₴" },
        ],
      },
      {
        title: 'Фарбування "Тон в тон"',
        items: [
          { name: "Коротке (120 хв, захист plex 700 ₴)", price: "1 500 ₴" },
          { name: "Середнє (120 хв, захист plex 900 ₴)", price: "2 100 ₴" },
          { name: "Довге (180 хв, захист plex 1 100 ₴)", price: "2 800 ₴" },
        ],
      },
      {
        title: "Однотонний блонд",
        items: [
          { name: "Коротке (170 хв, захист plex 800 ₴)", price: "2 300 ₴" },
          { name: "Середнє (200 хв, захист plex 1 000 ₴)", price: "2 900 ₴" },
          { name: "Довге (240 хв, захист plex 1 200 ₴)", price: "3 400 ₴" },
        ],
      },
      {
        title: "Складне фарбування (Shatush, Air Touch, Balayage тощо)",
        items: [
          { name: "Коротке (360 хв, захист plex 800 ₴)", price: "3 100 ₴" },
          { name: "Середнє (360 хв, захист plex 1 000 ₴)", price: "4 500 ₴" },
          { name: "Довге (120 хв, захист plex 1 200 ₴)", price: "5 700 ₴" },
        ],
      },
      {
        title: "Освітлення зони корони",
        items: [
          { name: "Коротке (240 хв, захист plex 800 ₴)", price: "2 600 ₴" },
          { name: "Середнє (300 хв, захист plex 1 000 ₴)", price: "3 500 ₴" },
          { name: "Довге (420 хв, захист plex 1 200 ₴)", price: "5 200 ₴" },
        ],
      },
      {
        title: "Вихід з чорного",
        items: [
          { name: "Коротке", price: "5 200 ₴" },
          { name: "Середнє", price: "7 000 ₴" },
          { name: "Довге", price: "10 100 ₴" },
        ],
      },
      {
        title: "Вихід з техніки у тотал блонд",
        items: [
          { name: "Коротке (420 хв, захист plex 800 ₴)", price: "4 800 ₴" },
          { name: "Середнє (480 хв, захист plex 1 000 ₴)", price: "5 500 ₴" },
          { name: "Довге (600 хв, захист plex 1 200 ₴)", price: "6 300 ₴" },
        ],
      },
      {
        title: "Завивка та лікування",
        items: [
          { name: "Біо завивка", price: "від 2 400 ₴" },
          { name: "Хімічна завивка", price: "від 2 200 ₴" },
          { name: "Кератин", price: "від 2 200 ₴" },
          { name: "Лікування Sweet mix", price: "від 900 ₴" },
          { name: "Лікування LEBEL", price: "від 1 500 ₴" },
        ],
      },
    ],
    note: "Додатково: +1 000 ₴, якщо густота волосся більша за середню (для складного фарбування).",
  },
  {
    id: "nails",
    title: "Нігтьовий сервіс",
    serviceSlug: "nigtovyy-servis",
    groups: [
      {
        title: "Манікюр",
        items: [
          { name: "Манікюр + гель-лак", price: "700 ₴" },
          { name: "Апаратний манікюр", price: "300 ₴" },
          { name: "Покриття гель-лак + френч", price: "500 ₴" },
          { name: "Корекція (1-2 довжина)", price: "400 ₴" },
          { name: "Корекція (3-4 довжина)", price: "500 ₴" },
          { name: "Зняття роботи чужого майстра", price: "200 ₴" },
          { name: "Дизайн 1 нігтя", price: "50 ₴" },
          { name: "Парафінотерапія рук", price: "150 ₴" },
        ],
      },
      {
        title: "Педікюр",
        items: [
          { name: "Педікюр комбі", price: "600 ₴" },
          { name: "Покриття гель-лак", price: "200 ₴" },
          { name: "Покриття гель-лак + френч", price: "250 ₴" },
          { name: "Дизайн 1 нігтя", price: "50 ₴" },
          { name: "Зняття роботи чужого майстра", price: "200 ₴" },
          { name: "Парафінотерапія ніг", price: "200 ₴" },
          { name: "Педікюр комбі (чоловічий)", price: "700 ₴" },
          { name: "Манікюр (чоловічий)", price: "300 ₴" },
        ],
      },
    ],
  },
];
