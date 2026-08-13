export type Service = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  image?: string;
  /** Base path without extension — a looping clip instead of a still. */
  video?: string;
  /** Poster for `video`; also the still shown to reduced-motion users. */
  poster?: string;
  span?: boolean;
};

/**
 * Перелік послуг на першому екрані — окремим списком, а не суцільним
 * абзацом: клініка просила, щоб кожна послуга читалася окремим рядком.
 * Формулювання — слово в слово від клініки.
 */
export const heroServices = [
  "Дитяча та доросла терапевтична стоматологія",
  "Сучасні методи пломбування кореневих каналів",
  "Художня реставрація зубів",
  "Усі види протезування — знімне та незнімне",
  "Хірургічна стоматологія та імплантація",
  "Ортодонтичне лікування",
  "Відбілювання зубів лампою Beyond",
];

export const services: Service[] = [
  {
    id: "therapy",
    title: "Терапевтична стоматологія",
    summary: "Дитяча та доросла",
    detail:
      "Лікування карієсу та його ускладнень у будь-якому віці — спокійно, з анестезією та у власному темпі пацієнта.",
    image: "/images/service-therapy.jpg",
  },
  {
    id: "endo",
    title: "Пломбування кореневих каналів",
    summary: "Сучасні методи · під мікроскопом",
    detail:
      "Багаторазове збільшення робить видимими приховані канали й тріщини, тож пломбування виходить щільним, а зуб служить довше.",
    /* Мікроскоп — саме до цієї послуги, а не до терапії (правка клініки) */
    image: "/images/service-2.jpg",
  },
  {
    id: "restoration",
    title: "Художня реставрація зубів",
    summary: "Форма, прозорість, відтінок",
    detail:
      "Пошарове відтворення анатомії зуба — так, щоб реставрацію не було видно навіть зблизька.",
    image: "/images/service-restoration.jpg",
  },
  {
    id: "whitening",
    title: "Відбілювання зубів",
    summary: "Сучасна лампа Beyond",
    detail:
      "Кабінетне відбілювання лампою Beyond із попередньою ремінералізацією емалі.",
    image: "/images/service-3.jpg",
  },
  {
    id: "prosthetics",
    title: "Усі види протезування",
    summary: "Знімне та незнімне",
    detail:
      "Металокерамічні та цирконієві коронки, знімні протези, конструкції на імплантах — від одного зуба до цілої щелепи.",
    video: "/video/prosthetics",
    poster: "/images/prosthetics-video-poster.jpg",
  },
  {
    id: "surgery",
    title: "Хірургічна стоматологія та імплантація",
    summary: "Прості й складні видалення",
    detail:
      "Видалення будь-якої складності, зокрема ретинованих вісімок, і встановлення імплантатів системи OSSTEM.",
    video: "/video/implant",
    poster: "/images/implant-video-poster.jpg",
  },
  {
    id: "ortho",
    title: "Ортодонтичне лікування",
    summary: "Виправлення прикусу",
    detail:
      "Консультація ортодонта, план виправлення прикусу та підбір конструкції під вашу ситуацію й вік.",
    /* Робота клініки: брекет-система в роботі */
    image: "/images/service-ortho.jpg",
  },
  {
    id: "kids",
    title: "Дитяча стоматологія",
    summary: "Спокійно й довірливо",
    detail:
      "Перший візит без страху: адаптація, профілактика та лікування у власному темпі дитини.",
    image: "/images/kids-2.jpg",
  },
];

/* ════════════════════════════════════════════════════════════════════
   ПРАЙС — ціни надані клінікою (голосове повідомлення 07.08.2026).

   Ціни підтверджені клінікою голосовими повідомленнями 07–08.08.2026.
   Позиції без узгодженої суми лишаються з `price: null` — рядок покаже
   «уточнюйте» замість числа.
   ════════════════════════════════════════════════════════════════════ */
export type PriceItem = {
  title: string;
  note?: string;
  /** null → «уточнюйте». */
  price: number | null;
  /** Upper bound: renders «1 700 — 2 200». */
  to?: number;
  /** Renders «від» before the figure. */
  from?: boolean;
  /** Hryvnia unless stated otherwise. */
  currency?: "UAH" | "EUR";
  featured?: boolean;
};

/** The three figures patients ask about first — shown large above the table. */
export const priceHighlights: {
  label: string;
  title: string;
  note: string;
  price: number | null;
  to?: number;
  from?: boolean;
  currency?: "UAH" | "EUR";
  dark?: boolean;
}[] = [
  {
    label: "Перший крок",
    title: "Консультація",
    note: "Огляд і відповіді на ваші запитання.",
    price: 350,
  },
  {
    label: "Найчастіше",
    title: "Комплексна гігієна",
    note: "Ультразвук, Air Flow, полірування та фторування емалі.",
    price: 1700,
    to: 2200,
  },
  {
    label: "З планом лікування",
    title: "Консультація та планування",
    note: "Повний огляд, план лікування й кошторис до початку роботи.",
    price: 700,
    dark: true,
  },
];

export const priceGroups: {
  id: string;
  /** Key into the icon map in `sections/prices.tsx`. */
  icon: string;
  label: string;
  items: PriceItem[];
}[] = [
  {
    id: "consult",
    icon: "activity",
    label: "Консультації та гігієна",
    items: [
      { title: "Консультація", price: 350 },
      {
        title: "Консультація та планування лікування",
        note: "з кошторисом",
        price: 700,
      },
      {
        title: "Комплексна гігієна ротової порожнини",
        note: "ультразвук, Air Flow, полірування",
        price: 1700,
        to: 2200,
      },
    ],
  },
  {
    id: "therapy",
    icon: "microscope",
    label: "Терапія",
    items: [
      { title: "Пломбування", price: 1500, from: true },
      {
        title: "Художня реставрація",
        note: "форма, прозорість, відтінок",
        price: 2500,
        to: 3500,
      },
      {
        title: "Ендодонтія — пломбування каналів",
        note: "залежно від кількості каналів",
        price: 1950,
        to: 6000,
      },
    ],
  },
  {
    id: "prosthetics",
    icon: "award",
    label: "Протезування",
    items: [
      {
        title: "Коронка керамічна",
        price: 100,
        from: true,
        currency: "EUR",
      },
      {
        title: "Коронка цирконієва",
        price: 160,
        to: 200,
        currency: "EUR",
      },
      {
        title: "Акриловий протез",
        note: "повне знімне протезування",
        price: 8500,
      },
      {
        title: "Нейлоновий протез",
        note: "повне знімне протезування",
        price: 10500,
      },
    ],
  },
  {
    id: "kids",
    icon: "baby",
    label: "Дитяча стоматологія",
    items: [
      {
        title: "Психологічна адаптація дитини",
        note: "до 30 хвилин",
        price: 500,
      },
      { title: "Професійна гігієна для дитини", price: 1200 },
      { title: "Герметизація фісур", price: 1200 },
      { title: "Постійна пломба на молочний зуб", price: 1400 },
    ],
  },
  {
    id: "aesthetics",
    icon: "gem",
    label: "Естетика",
    items: [
      {
        title: "Відбілювання лампою Beyond",
        note: "один сеанс",
        price: 150,
        currency: "EUR",
        featured: true,
      },
    ],
  },
  {
    id: "surgery",
    icon: "scissors",
    label: "Хірургія та імплантація",
    items: [
      { title: "Видалення зуба", price: 1500, from: true },
      {
        title: "Видалення ретинованих вісімок",
        price: 100,
        to: 150,
        currency: "EUR",
      },
      {
        title: "Імплантація системою OSSTEM",
        note: "один імплант",
        price: 600,
        to: 650,
        currency: "EUR",
      },
    ],
  },
  {
    id: "ortho",
    icon: "route",
    label: "Ортодонтія",
    items: [
      { title: "Ортодонтична консультація", price: 650 },
      { title: "Брекет-система", note: "дві щелепи", price: 60000 },
      {
        title: "Лікування елайнерами",
        note: "прозорі капи · повний курс",
        price: 2000,
        currency: "EUR",
      },
    ],
  },
];


export const extraServices = [
  { title: "Естетична стоматологія", note: "Вініри, корекція форми та кольору" },
  { title: "Консультація", note: "План лікування та прозорий кошторис" },
];

export const advantages = [
  {
    icon: "microscope",
    title: "Лікування під мікроскопом",
    text: "Збільшення до 25× — точність там, де око не бачить.",
  },
  {
    icon: "award",
    title: "20+ років досвіду",
    text: "Тисячі клінічних випадків і безперервне навчання.",
  },
  {
    icon: "feather",
    title: "Безболісне лікування",
    text: "Сучасна анестезія та спокійний темп прийому.",
  },
  {
    icon: "gem",
    title: "Якісні матеріали",
    text: "Сертифіковані матеріали преміальних брендів.",
  },
  {
    icon: "activity",
    title: "Сучасне обладнання",
    text: "Цифрова діагностика та стерильність за протоколом.",
  },
  {
    icon: "route",
    title: "Індивідуальний план",
    text: "Рішення під вашу ситуацію, бюджет і темп.",
  },
] as const;

export const stats = [
  { value: 20, suffix: "+", label: "років досвіду", note: "з 2005 року" },
  { value: 1000, suffix: "+", label: "усмішок", note: "пацієнтів щороку" },
  { value: 100, suffix: "%", label: "індивідуальний підхід", note: "план під вас" },
] as const;

export const process = [
  {
    step: "Консультація",
    time: "30–40 хвилин",
    text: "Оглядаємо, за потреби робимо знімок і показуємо все на екрані. Ви бачите те саме, що й лікар.",
  },
  {
    step: "План лікування",
    time: "того ж дня",
    text: "Два-три варіанти рішення з термінами та прозорим кошторисом. Обираєте ви, а не ми.",
  },
  {
    step: "Лікування",
    time: "у вашому темпі",
    text: "Під мікроскопом, з анестезією та паузами, коли вони потрібні. Без поспіху й несподіванок.",
  },
  {
    step: "Супровід",
    time: "після візиту",
    text: "Контрольний огляд, рекомендації по догляду та зв'язок із лікарем, якщо виникнуть питання.",
  },
] as const;

export const gallery: {
  src: string;
  label: string;
  span?: boolean;
  /** object-position, when the default centre crop loses the subject. */
  position?: string;
}[] = [
  { src: "/images/equipment.jpg", label: "Мікроскоп" },
  { src: "/images/whitening-process.jpg", label: "Відбілювання Beyond" },
  { src: "/images/kids-3.jpg", label: "Дитячий прийом" },
  {
    src: "/images/doctor-logo-wall.jpg",
    label: "Наталія Жилан",
    // keep the etched logo above her in frame
    position: "50% 12%",
  },
  { src: "/images/whitening-session.jpg", label: "Сеанс Beyond" },
  { src: "/images/doctor-office.jpg", label: "Наш кабінет", position: "50% 30%" },
];

/**
 * Full-arch prosthetics on implants — the case in section 07.
 * Each photo keeps its own proportions; the grid is a CSS masonry.
 */
export type CasePhoto = {
  src: string;
  caption: string;
  /** Each frame keeps its own proportions — the shots differ a lot. */
  ratio: string;
  watermark?: boolean;
};

export const implantCase: {
  points: readonly string[];
  photos: readonly CasePhoto[];
} = {
  points: [
    "Чотири імпланти тримають протез на цілу щелепу",
    "Протез виготовляють індивідуально під ваш прикус",
    "Жувальне навантаження повертається, кістка отримує опору",
    "Догляд простий: гігієна вдома та огляд у клініці двічі на рік",
  ],
  photos: [
    {
      src: "/images/implants-1.jpg",
      caption: "Абатменти на імплантах — основа майбутнього протеза",
      ratio: "1100 / 1283",
    },
    {
      src: "/images/implants-2.jpg",
      caption: "Внутрішня поверхня протеза з металевими фіксаторами",
      ratio: "1020 / 700",
    },
    {
      src: "/images/implants-3.jpg",
      caption: "Готовий протез — дві частини на абатментах",
      ratio: "1200 / 848",
    },
    {
      src: "/images/implants-4.jpg",
      caption: "Результат у роті: своя усмішка й повноцінне жування",
      ratio: "1200 / 627",
      watermark: true,
    },
  ],
};

/** Children's appointment — the carousel under «Дитяча стоматологія». */
export const kids = [
  {
    src: "/images/kids-1.jpg",
    caption: "Знайомство з кабінетом — без поспіху й тиску",
  },
  {
    src: "/images/kids-2.jpg",
    caption: "Огляд у чотири руки: показуємо кожен крок",
  },
  {
    src: "/images/kids-3.jpg",
    caption: "Лікування у власному темпі дитини",
  },
  {
    src: "/images/kids-4.jpg",
    caption: "Після прийому — тільки хороші спогади",
  },
] as const;

export type Case = {
  id: string;
  title: string;
  /** Short label for the switcher; falls back to `title`. */
  short?: string;
  detail: string;
  before: string;
  after: string;
  ratio: string;
  /**
   * An optional extra frame: the finished work in everyday life, or a stage
   * of it. `label` overrides the «Результат» eyebrow — a gypsum model is a
   * step in the lab, not a result.
   */
  result?: { src: string; caption: string; ratio: string; label?: string };
};

export const cases: Case[] = [
  {
    id: "case-8",
    title: "Повна реабілітація пацієнта",
    short: "Повна реабілітація",
    detail: "Від зруйнованих зубів — до відновленого прикусу та усмішки",
    before: "/images/case-rehab-before.jpg",
    after: "/images/case-rehab-after.jpg",
    ratio: "1 / 1",
    result: {
      /* Кадр переведено в графітовий монохром: зелений светр вибивався
         з палітри сайту. Клінічні «до» і «після» лишаються в кольорі. */
      src: "/images/case-rehab-life.jpg",
      caption: "Так робота виглядає в житті — за межами кабінету",
      ratio: "1 / 1",
    },
  },
  {
    id: "case-5",
    title: "Протезування на імплантах",
    short: "На імплантах",
    detail: "Незнімна конструкція на чотирьох імплантах верхньої щелепи",
    before: "/images/case-impl-before.jpg",
    after: "/images/case-impl-after.jpg",
    ratio: "1400 / 926",
    result: {
      src: "/images/case-impl-life.jpg",
      caption: "Усмішка після роботи — так це виглядає щодня",
      ratio: "1200 / 716",
    },
  },
  {
    id: "case-6",
    title: "Протезування металокерамічними коронками",
    short: "Коронки",
    detail: "Зруйновані зуби верхньої щелепи — відновлені коронками",
    before: "/images/case-crown-before.jpg",
    after: "/images/case-crown-after.jpg",
    ratio: "1200 / 950",
    result: {
      src: "/images/case-crown-model.jpg",
      caption: "Робота на гіпсовій моделі — етап у зуботехнічній лабораторії",
      ratio: "1 / 1",
      label: "Етап роботи",
    },
  },
  {
    id: "case-3",
    title: "Повне протезування щелеп",
    short: "Протезування",
    detail: "Від повної відсутності зубів — до усмішки й жування",
    before: "/images/case-prosth-before.jpg",
    after: "/images/case-prosth-after.jpg",
    ratio: "16 / 10",
    result: {
      src: "/images/case-prosth-life.jpg",
      caption: "Так робота виглядає в житті — за межами кабінету",
      ratio: "16 / 10",
    },
  },
  {
    id: "case-7",
    title: "Ортодонтичне лікування",
    short: "Ортодонтія",
    detail: "Вирівняний зубний ряд верхньої щелепи",
    before: "/images/case-ortho-before.jpg",
    after: "/images/case-ortho-after.jpg",
    ratio: "546 / 403",
    result: {
      src: "/images/case-ortho-braces.jpg",
      caption: "Брекет-система в роботі — між «до» і «після»",
      ratio: "916 / 468",
      label: "Під час лікування",
    },
  },
  {
    id: "case-9",
    title: "Лікування карієсу бічних зубів",
    short: "Лікування карієсу",
    detail: "Пломбування під кофердамом — анатомія жувальної поверхні відновлена",
    before: "/images/case-caries-before.jpg",
    after: "/images/case-caries-after.jpg",
    ratio: "882 / 414",
  },
  {
    id: "case-4",
    title: "Професійна гігієна",
    short: "Професійна гігієна",
    detail: "Один сеанс · зняття каменю та полірування",
    before: "/images/case-hygiene-before.jpg",
    after: "/images/case-hygiene-after.jpg",
    ratio: "3 / 2",
  },
  {
    id: "case-2",
    title: "Відбілювання системою Beyond",
    short: "Відбілювання Beyond",
    detail: "Один сеанс · результат тримається 1–2 роки",
    before: "/images/case-white-before.jpg",
    after: "/images/case-white-after.jpg",
    ratio: "4 / 3",
  },
  {
    id: "case-1",
    title: "Художня реставрація фронтальних зубів",
    short: "Художня реставрація",
    detail: "Відновлення форми, кольору та прозорості",
    before: "/images/case-restore-before.jpg",
    after: "/images/case-restore-after.jpg",
    ratio: "1400 / 645",
  },
];

export const reviews = [
  {
    name: "Оксана М.",
    role: "пацієнтка з 2019 року",
    text: "Вперше за багато років пішла до стоматолога без страху. Наталія Іванівна все пояснює спокійно, крок за кроком. Лікування пройшло абсолютно безболісно.",
  },
  {
    name: "Андрій К.",
    role: "реставрація переднього зуба",
    text: "Відколов зуб за тиждень до весілля. Відновили так, що на фотографіях я сам не можу знайти, який саме зуб реставрували. Робота ювелірна.",
  },
  {
    name: "Ірина В.",
    role: "сімейний пацієнт",
    text: "Ходимо всією родиною, включно з дітьми. Донька вперше сіла в крісло без сліз — і тепер сама нагадує про візит. Це багато про що говорить.",
  },
  {
    name: "Володимир С.",
    role: "імплантація",
    text: "Детальний план, чесний кошторис без несподіванок і повний супровід після процедури. Все відбулося саме так, як мені пояснили на консультації.",
  },
  {
    name: "Наталія Б.",
    role: "відбілювання та гігієна",
    text: "Результат перевершив очікування, а головне — жодної чутливості після процедури. Кабінет ідеально чистий, обладнання сучасне.",
  },
] as const;

export const faq = [
  {
    q: "Чи боляче лікувати зуби?",
    a: "Ні. Ми працюємо з сучасною анестезією та підбираємо її індивідуально — з урахуванням чутливості й тривалості втручання. Більшість пацієнтів описують прийом як спокійний і комфортний, а лікування під мікроскопом дозволяє працювати делікатніше.",
  },
  {
    q: "Що дає лікування під мікроскопом?",
    a: "Багаторазове збільшення робить видимими тріщини, приховані канали та межі каріозного ураження. Завдяки цьому ми прибираємо лише уражені тканини, зберігаємо максимум здорового зуба, а реставрації служать значно довше.",
  },
  {
    q: "Скільки триває перша консультація?",
    a: "Близько 30–40 хвилин. Ми проводимо огляд, за потреби — цифрову діагностику, обговорюємо ваші очікування й складаємо план лікування з прозорим кошторисом. Ви отримуєте всі варіанти рішення, а не один нав'язаний.",
  },
  {
    q: "Як часто потрібна професійна гігієна?",
    a: "Зазвичай раз на 6 місяців. Якщо ви носите брекети, маєте імплантати або схильність до утворення каменю — інтервал скорочується до 3–4 місяців. Точну періодичність лікар визначає після огляду.",
  },
  {
    q: "З якого віку можна приводити дитину?",
    a: "Перший візит-знайомство доречний уже після появи перших зубів, приблизно з року. Він проходить без лікування: дитина звикає до кабінету, крісла та лікаря — саме це формує спокійне ставлення до стоматології на роки вперед.",
  },
  {
    q: "Що робити, якщо зубів немає зовсім?",
    a: "Сучасне рішення — протез на чотирьох імплантах. Він спирається на імпланти, а не на ясна, тому тримається міцно й повертає повноцінне жування, а не лише естетику. Спершу встановлюємо імпланти, після приживлення — абатменти й сам протез, виготовлений під ваш прикус. Тип фіксації лікар підбирає індивідуально й пояснює на консультації.",
  },
  {
    q: "Скільки тримається результат відбілювання?",
    a: "Результат відбілювання зубів системою Beyond, як правило, «тримається» до 1–2 років. Термін залежить від догляду: професійна гігієна двічі на рік, менше кави, чаю та червоного вина помітно продовжують ефект.",
  },
  {
    q: "Чи безпечне відбілювання для емалі?",
    a: "Так, за умови професійного протоколу. Ми починаємо з гігієни та ремінералізації, підбираємо концентрацію під стан емалі й контролюємо кожен етап. Домашні агресивні методи, навпаки, часто призводять до чутливості.",
  },
] as const;
