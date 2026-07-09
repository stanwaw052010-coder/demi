export const PHONE_DISPLAY = "+38 (063) 262 70 12";
export const PHONE_E164 = "+380632627012";
export const PHONE_DIGITS = "380632627012";

export const LINKS = {
  instagram: "https://www.instagram.com/rayskaya_beauty_space",
  tiktok: "https://www.tiktok.com/@dr.rayskaya?_r=1&_t=ZS-97rpLI2QDCR",
  appStore:
    "https://apps.apple.com/ua/app/rayskaya-beauty-space/id6760716856?l=ru",
  googlePlay:
    "https://play.google.com/store/apps/details?id=com.binotel.bookon.rayskaya&pcampaignid=web_share",
  maps: "https://www.google.com/maps/place/Rayskaya+Beauty+Space/@49.9839333,36.1822416,705m/data=!3m2!1e3!4b1!4m6!3m5!1s0x4127a16a31f723cb:0xf66f27c238ad16f1!8m2!3d49.9839299!4d36.1848165!16s%2Fg%2F11l29xrg9l",
  mapsEmbed:
    "https://www.google.com/maps?q=Rayskaya+Beauty+Space&ll=49.9839299,36.1848165&z=16&hl=uk&output=embed",
  whatsapp: `https://wa.me/380632627012`,
  telegram: `https://t.me/+380632627012`,
  phone: `tel:+380632627012`,
} as const;

export const NAV = [
  { href: "#about", label: "Про нас" },
  { href: "#advantages", label: "Переваги" },
  { href: "#services", label: "Послуги" },
  { href: "#reviews", label: "Відгуки" },
  { href: "#contacts", label: "Контакти" },
] as const;

/**
 * Єдине фото сайту — фото салону на першому екрані (Hero).
 *
 *  - src      — ваше фото: просто покладіть файл public/images/hero.jpg,
 *               і воно підхопиться автоматично, без змін у коді;
 *  - fallback — стокове фото, яке показується, доки власного файлу немає.
 */
export const IMAGES = {
  hero: {
    src: "/images/hero.jpg",
    fallback:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=80",
  },
} as const;

/**
 * Галерея інтер'єру — гортається горизонтально, як карусель відгуків.
 * Покладіть файли public/images/gallery/gallery-1.jpg … gallery-5.jpg
 * (можна більше — просто додайте ще один об'єкт у цей масив), і вони
 * підхопляться автоматично.
 */
export const GALLERY = [
  { src: "/images/gallery/gallery-1.jpg", alt: "Зона очікування Rayskaya Beauty Space" },
  { src: "/images/gallery/gallery-2.jpg", alt: "Рецепція Rayskaya Beauty Space" },
  { src: "/images/gallery/gallery-3.jpg", alt: "Процедурний кабінет" },
  { src: "/images/gallery/gallery-4.jpg", alt: "Кабінет апаратної косметології" },
  { src: "/images/gallery/gallery-5.jpg", alt: "Кабінет косметологічних процедур" },
] as const;

export const SERVICES = [
  {
    id: "care",
    title: "Доглядові процедури",
    text: "Професійне очищення, глибоке зволоження та відновлення шкіри. Допомагають покращити її стан, вирівняти тон, повернути здорове сяйво та доглянутий вигляд.",
  },
  {
    id: "injection",
    title: "Ін’єкційна косметологія",
    text: "Корекція вікових змін, зморшок і втрати об’єму. Природне омолодження, покращення якості шкіри та гармонійні риси обличчя.",
  },
  {
    id: "hardware",
    title: "Апаратна косметологія",
    text: "Сучасні технології для омолодження, ліфтингу, стимуляції вироблення природного колагену, покращення якості шкіри, корекції пігментації, судинних змін, рубців і постакне.",
  },
  {
    id: "laser",
    title: "Лазерна епіляція",
    text: "Комфортне та ефективне видалення небажаного волосся. Гладенька шкіра без подразнення та врослого волосся.",
  },
  {
    id: "endosphere",
    title: "Масаж Ендосфера",
    text: "Комплексні процедури для моделювання контурів тіла, зменшення целюліту й набряків, покращення тонусу шкіри та відчуття легкості в тілі.",
  },
] as const;

export const REVIEWS = [
  {
    tag: "Догляд за обличчям",
    text: "Довго шукала косметолога, якому можна довірити своє обличчя. Тут знайшла саме те, що хотіла: професіоналізм, уважне ставлення та красивий, природний результат. Дуже затишна студія та привітний персонал. Приємно повертатися знов.",
  },
  {
    tag: "Ін’єкційні процедури",
    text: "Дуже сподобалося, що перед ін’єкційною процедурою мені все детально пояснили. Результат перевершив очікування — обличчя виглядає свіжим і природним. Тепер довіряю лише цій студії.",
  },
  {
    tag: "Лазерна епіляція",
    text: "Після курсу лазерної епіляції майже забула про гоління. Волосся стало значно менше, а шкіра гладенькою. Дуже задоволена і результатом, і сервісом.",
  },
  {
    tag: "Масаж та обгортання",
    text: "Пройшла курс масажу та обгортань, шкіра стала більш пружною, а тіло помітно підтягнулося. Приємна атмосфера, уважний майстер і чудовий результат.",
  },
  {
    tag: "Чистка обличчя",
    text: "Нарешті знайшла свого косметолога! Чистка пройшла без болю, шкіра просто сяє. Обов’язково повернуся на наступну процедуру.",
  },
] as const;

export const HOURS = [
  { days: "Понеділок — Субота", time: "08:00–20:00", closed: false },
  { days: "Неділя", time: "Зачинено", closed: true },
] as const;

export const ADDRESS = "м. Харків, вул. Полтавський Шлях, 1А";
