export type Service = {
  id: string;
  title: string;
  desc: string;
  price: string;
  duration: string;
  icon: string;
};

export const services: Service[] = [
  {
    id: "haircut",
    title: "Чоловіча стрижка",
    desc: "Індивідуальна форма, підібрана під вашу структуру волосся та стиль життя. Точність у кожній лінії.",
    price: "від 450 ₴",
    duration: "60 хв",
    icon: "scissors",
  },
  {
    id: "fade",
    title: "Fade",
    desc: "Ідеальний градієнт від шкіри до довжини. Чисті переходи, які тримають форму тижнями.",
    price: "від 500 ₴",
    duration: "60 хв",
    icon: "sparkles",
  },
  {
    id: "beard",
    title: "Корекція бороди",
    desc: "Моделювання контуру, оформлення та догляд гарячим рушником і преміум-косметикою.",
    price: "від 350 ₴",
    duration: "45 хв",
    icon: "user",
  },
  {
    id: "royal-shave",
    title: "Королівське гоління",
    desc: "Класичне гоління небезпечною бритвою. Ритуал з гарячим рушником, олією та бальзамом.",
    price: "від 450 ₴",
    duration: "50 хв",
    icon: "flame",
  },
  {
    id: "color",
    title: "Камуфляж / Фарбування",
    desc: "Делікатне тонування сивини або зміна образу. Натуральний, стриманий результат.",
    price: "від 400 ₴",
    duration: "40 хв",
    icon: "palette",
  },
  {
    id: "kids",
    title: "Дитяча стрижка",
    desc: "Стрижка для маленьких джентльменів у спокійній атмосфері та з ігровою зоною.",
    price: "від 350 ₴",
    duration: "40 хв",
    icon: "smile",
  },
  {
    id: "complex",
    title: "Complex — стрижка + борода",
    desc: "Повний догляд: стрижка, борода, стайлінг. Найпопулярніший вибір наших гостей.",
    price: "від 750 ₴",
    duration: "90 хв",
    icon: "crown",
  },
];

export type Barber = {
  id: string;
  name: string;
  role: string;
  exp: string;
  image: string;
  instagram: string;
};

export const barbers: Barber[] = [
  {
    id: "b1",
    name: "Артем Гінзбург",
    role: "Founder / Top Barber",
    exp: "12 років досвіду",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop",
    instagram: "https://www.instagram.com/ginbarbershop_khm/",
  },
  {
    id: "b2",
    name: "Дмитро Ковач",
    role: "Senior Barber",
    exp: "8 років досвіду",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
    instagram: "https://www.instagram.com/ginbarbershop_khm/",
  },
  {
    id: "b3",
    name: "Роман Волошин",
    role: "Barber / Fade Specialist",
    exp: "6 років досвіду",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
    instagram: "https://www.instagram.com/ginbarbershop_khm/",
  },
  {
    id: "b4",
    name: "Олег Мельник",
    role: "Barber / Beard Master",
    exp: "5 років досвіду",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop",
    instagram: "https://www.instagram.com/ginbarbershop_khm/",
  },
];

export const gallery: { src: string; alt: string; span?: boolean }[] = [
  {
    src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200&auto=format&fit=crop",
    alt: "Класична чоловіча стрижка",
    span: true,
  },
  {
    src: "https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=1000&auto=format&fit=crop",
    alt: "Робота майстра над бородою",
  },
  {
    src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1000&auto=format&fit=crop",
    alt: "Інтер'єр барбершопу",
  },
  {
    src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1000&auto=format&fit=crop",
    alt: "Fade стрижка крупним планом",
  },
  {
    src: "https://images.unsplash.com/photo-1512690459411-b9245aed614b?q=80&w=1200&auto=format&fit=crop",
    alt: "Робоче місце барбера",
    span: true,
  },
  {
    src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1000&auto=format&fit=crop",
    alt: "Портрет клієнта після стрижки",
  },
  {
    src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1000&auto=format&fit=crop",
    alt: "Гоління небезпечною бритвою",
  },
  {
    src: "https://images.unsplash.com/photo-1567894340315-735d7c361db0?q=80&w=1000&auto=format&fit=crop",
    alt: "Деталі інструментів барбера",
  },
];

export type Review = {
  name: string;
  text: string;
  rating: number;
  meta: string;
};

export const reviews: Review[] = [
  {
    name: "Владислав П.",
    text: "Найкращий барбершоп у Хмельницькому. Атмосфера, як у преміальному клубі — віскі, кава, увага до деталей. Стрижка тримається бездоганно.",
    rating: 5,
    meta: "Google · Постійний клієнт",
  },
  {
    name: "Ігор С.",
    text: "Ходжу вже понад рік. Хлопці — професіонали найвищого рівня. Завжди виходжу із салону з відчуттям, що я мільйон доларів.",
    rating: 5,
    meta: "Google · 14 візитів",
  },
  {
    name: "Максим Д.",
    text: "Королівське гоління — окремий ритуал. Гарячий рушник, аромати, тиша. Це не просто стрижка, це справжній чоловічий відпочинок.",
    rating: 5,
    meta: "Google · Відгук",
  },
  {
    name: "Андрій К.",
    text: "Записався онлайн за хвилину, приймають вчасно. Fade зробили ідеально — саме так, як я хотів. Однозначно рекомендую.",
    rating: 5,
    meta: "Google · Новий клієнт",
  },
  {
    name: "Олександр В.",
    text: "Преміум від входу до виходу. PlayStation поки чекаєш, кава смачна, майстри слухають. Тепер стрижуся тільки тут.",
    rating: 5,
    meta: "Google · Постійний клієнт",
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "Як записатися на візит?",
    a: "Найшвидше — через онлайн-запис на сайті: обираєте майстра, послугу та зручний час менш ніж за хвилину. Також можна зателефонувати нам напряму.",
  },
  {
    q: "Скільки триває стрижка?",
    a: "Чоловіча стрижка займає близько 60 хвилин, комплекс «стрижка + борода» — до 90 хвилин. Ми ніколи не поспішаємо на шкоду якості.",
  },
  {
    q: "Чи можна прийти без запису?",
    a: "Ми працюємо переважно за попереднім записом, щоб гарантувати вам час без черг. За наявності вільного вікна приймаємо і без запису.",
  },
  {
    q: "Що входить у комплекс?",
    a: "Complex — це чоловіча стрижка, моделювання бороди, стайлінг та фінальний догляд преміум-косметикою. Найкращий вибір для повного оновлення образу.",
  },
  {
    q: "Чи є що робити, поки чекаю?",
    a: "Так. Пригощаємо віскі та кавою, є PlayStation, вільний Wi-Fi, і ми IQOS-friendly. Ваш візит — це відпочинок.",
  },
  {
    q: "Ви робите дитячі стрижки?",
    a: "Звичайно. Для маленьких джентльменів у нас спокійна атмосфера, ігрова зона та терплячі майстри.",
  },
];

export const stats: { value: number; suffix: string; label: string }[] = [
  { value: 12, suffix: "+", label: "років майстерності" },
  { value: 18000, suffix: "+", label: "стрижок зроблено" },
  { value: 4, suffix: "", label: "топ-барбери" },
  { value: 4.9, suffix: "★", label: "рейтинг у Google" },
];

export const perks: { icon: string; label: string }[] = [
  { icon: "scissors", label: "Стрижки" },
  { icon: "user", label: "Борода" },
  { icon: "palette", label: "Фарбування" },
  { icon: "wine", label: "Віскі" },
  { icon: "coffee", label: "Кава" },
  { icon: "gamepad-2", label: "PlayStation" },
  { icon: "wifi", label: "Wi-Fi" },
  { icon: "cigarette", label: "IQOS Friendly" },
];
