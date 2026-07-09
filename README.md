# Rayskaya Beauty Space

Преміальний односторінковий сайт косметологічної студії **Rayskaya Beauty Space** (м. Харків).

Стиль: Luxury Minimal — фірмовий світло-зелений `#8DB748` (з логотипа), теплий білий фон `#FAFAF8`, шрифти Playfair Display + Manrope.

## Технології

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS 4**
- **GSAP + ScrollTrigger** — reveal-анімації, parallax, split-text у hero, магнітні кнопки
- **Lenis** — плавний скрол
- **Lucide** — іконки

## Секції

Hero → Про нас → Наш простір (галерея) → Наші переваги → Наші послуги → Відгуки → Мобільний застосунок → Онлайн-запис (форма + WhatsApp/Telegram/телефон + графік роботи) → Як нас знайти (Google Maps) → CTA → Footer.

## Запуск

```bash
npm install
npm run dev      # локальна розробка
npm run build    # продакшн-збірка
```

## Де що змінювати

- **Телефон, посилання (Instagram, TikTok, App Store, Google Play, Maps), графік роботи, послуги, відгуки** — усе в одному файлі: `src/lib/site.ts`
- **Фото салону на Hero** — покладіть файл `public/images/hero.jpg`, він підхопиться автоматично; доки його немає, показується стокове фото (налаштування — обʼєкт `IMAGES` у `src/lib/site.ts`)
- **Галерея «Наш простір»** — гортається горизонтально, як карусель відгуків. Покладіть файли `public/images/gallery/gallery-1.jpg` … `gallery-5.jpg` (масив `GALLERY` у `src/lib/site.ts`)
- **Логотипи** — `public/logo/` (витягнуті у векторі з фірмового PDF)

Форма онлайн-запису працює без бекенда: після натискання «Надіслати заявку» відкривається WhatsApp із заповненим повідомленням (ім’я, телефон, послуга).
