export const salon = {
  name: "Makhovska Beauty House",
  city: "Мукачево",
  phone: "+380 (63) 806-41-02",
  phoneHref: "tel:+380638064102",
  instagramHandle: "makhovska_beauty_house",
  instagramUrl: "https://www.instagram.com/makhovska_beauty_house",
  hours: "Пн–Сб: 9:00–19:00",
  hoursOff: "Нд: вихідний",
};

export const services = [
  {
    icon: "hand",
    name: "Класичний манікюр",
    description: "Обробка кутикули, форма нігтя, доглядовий комплекс",
    price: "від 400 ₴",
    duration: "60 хв",
  },
  {
    icon: "sparkles",
    name: "Покриття гель-лак",
    description: "Стійке покриття до 3 тижнів, понад 200 відтінків",
    price: "від 550 ₴",
    duration: "90 хв",
  },
  {
    icon: "gem",
    name: "Нарощування нігтів",
    description: "Гель або акгель, будь-яка форма та довжина",
    price: "від 900 ₴",
    duration: "150 хв",
  },
  {
    icon: "droplet",
    name: "Педикюр",
    description: "Апаратна обробка стоп, покриття на вибір",
    price: "від 650 ₴",
    duration: "90 хв",
  },
  {
    icon: "scissors",
    name: "Дизайн та нейл-арт",
    description: "Втирка, френч, слайдери, ручний розпис",
    price: "від 50 ₴",
    duration: "за запитом",
  },
  {
    icon: "leaf",
    name: "SPA-догляд",
    description: "Парафінотерапія, масаж рук, живильні маски",
    price: "від 350 ₴",
    duration: "45 хв",
  },
] as const;

export const gallery = [
  {
    swatch: "linear-gradient(135deg, #1a1a1a, #050505)",
    title: "Чорний глянець",
    caption: "Насичений чорний з дзеркальним фінішем — беззаперечна класика",
  },
  {
    swatch: "linear-gradient(135deg, #5a0f18, #2a0509)",
    title: "Глибокий бордо",
    caption: "Оксамитовий бордовий відтінок для вечірнього образу",
  },
  {
    swatch: "linear-gradient(135deg, #eef0b0, #d8dd7e)",
    title: "Ніжний лимонний",
    caption: "Світлий пастельний тон для літнього настрою",
  },
  {
    swatch: "linear-gradient(135deg, #c9a962, #8a6d31)",
    title: "Золота втирка",
    caption: "Акцентний дизайн з ефектом дзеркального золота",
  },
] as const;

export const testimonials = [
  {
    name: "Оксана",
    text: "Найкращий манікюр у Мукачеві! Форма ідеальна, покриття тримається по 3 тижні без сколів.",
  },
  {
    name: "Марія",
    text: "Дуже уважне ставлення до клієнта, стерильні інструменти та затишна атмосфера. Записуюсь тільки сюди.",
  },
  {
    name: "Ірина",
    text: "Робили складний дизайн з ручним розписом — результат перевершив очікування. Дякую майстру!",
  },
] as const;

export const values = [
  {
    title: "Стерильність",
    description: "Одноразові витратні матеріали та професійна стерилізація інструментів",
  },
  {
    title: "Преміальні бренди",
    description: "Працюємо тільки з перевіреними європейськими гель-лаками та матеріалами",
  },
  {
    title: "Індивідуальний підхід",
    description: "Підбираємо форму, довжину та колір під ваш стиль і побажання",
  },
] as const;
