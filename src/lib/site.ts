export const PHONE_RAW = "+380632627012";
export const PHONE_DISPLAY = "+380 63 262 7012";

export const WHATSAPP_URL = "https://wa.me/380632627012";
export const TELEGRAM_URL = "https://t.me/+380632627012";
export const INSTAGRAM_URL =
  "https://www.instagram.com/rayskaya_beauty_space?igsh=MWxkbTJ5dG9yZXRxeQ==";
export const TIKTOK_URL = "https://www.tiktok.com/@dr.rayskaya?_r=1&_t=ZS-97rpLI2QDCR";

export const APP_STORE_URL =
  "https://apps.apple.com/ua/app/rayskaya-beauty-space/id6760716856?l=ru";
export const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.binotel.bookon.rayskaya&pcampaignid=web_share";

export const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=Rayskaya+Beauty+Space,49.9839299,36.1848165&z=17&output=embed";
export const MAPS_LINK_URL =
  "https://www.google.com/maps/place/Rayskaya+Beauty+Space/@49.9839333,36.1822416,705m/data=!3m2!1e3!4b1!4m6!3m5!1s0x4127a16a31f723cb:0xf66f27c238ad16f1!8m2!3d49.9839299!4d36.1848165!16s%2Fg%2F11l29xrg9l";

export const ADDRESS = "Харків";

export type WorkHours = { label: string; hours: string; closed?: boolean };

export const WORK_HOURS: WorkHours[] = [
  { label: "Понеділок — П'ятниця", hours: "08:00–20:00" },
  { label: "Субота", hours: "08:00–20:00" },
  { label: "Неділя", hours: "Зачинено", closed: true },
];

export type Service = {
  id: string;
  title: string;
  description: string;
};

export const SERVICES: Service[] = [
  {
    id: "care",
    title: "Доглядові процедури",
    description:
      "Професійне очищення, глибоке зволоження та відновлення шкіри. Допомагають покращити її стан, вирівняти тон, повернути здорове сяйво та доглянутий вигляд.",
  },
  {
    id: "injection",
    title: "Ін'єкційна косметологія",
    description:
      "Корекція вікових змін, зморшок і втрати об'єму. Природне омолодження, покращення якості шкіри та гармонійні риси обличчя.",
  },
  {
    id: "hardware",
    title: "Апаратна косметологія",
    description:
      "Сучасні технології для омолодження, ліфтингу, стимуляції вироблення природного колагену, покращення якості шкіри, корекції пігментації, судинних змін, рубців і постакне.",
  },
  {
    id: "laser",
    title: "Лазерна епіляція",
    description:
      "Комфортне та ефективне видалення небажаного волосся. Гладенька шкіра без подразнення та врослого волосся.",
  },
  {
    id: "endosphere",
    title: "Масаж Ендосфера",
    description:
      "Комплексні процедури для моделювання контурів тіла, зменшення целюліту й набряків, покращення тонусу шкіри та відчуття легкості в тілі.",
  },
];

export type Testimonial = {
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Довго шукала косметолога, якому можна довірити своє обличчя. Тут знайшла саме те, що хотіла: професіоналізм, уважне ставлення та красивий, природний результат. Дуже затишна студія та привітний персонал. Приємно повертатися знов.",
  },
  {
    quote:
      "Дуже сподобалося, що перед ін'єкційною процедурою мені все детально пояснили. Результат перевершив очікування — обличчя виглядає свіжим і природним. Тепер довіряю лише цій студії.",
  },
  {
    quote:
      "Після курсу лазерної епіляції майже забула про гоління. Волосся стало значно менше, а шкіра гладенькою. Дуже задоволена і результатом, і сервісом.",
  },
  {
    quote:
      "Пройшла курс масажу та обгортань, шкіра стала більш пружною, а тіло помітно підтягнулося. Приємна атмосфера, уважний майстер і чудовий результат.",
  },
  {
    quote:
      "Нарешті знайшла свого косметолога! Чистка пройшла без болю, шкіра просто сяє. Обов'язково повернуся на наступну процедуру.",
  },
];

export const NAV_LINKS = [
  { label: "Про нас", href: "#about" },
  { label: "Послуги", href: "#services" },
  { label: "Переваги", href: "#advantages" },
  { label: "Відгуки", href: "#testimonials" },
  { label: "Контакти", href: "#booking" },
];
