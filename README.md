# KROPYVNYTSKA — студія масажу та корекції фігури

Односторінковий сайт (лендінг) для студії Анжели Кропивницької у Бучі:
ендосфера, LPG, антицелюлітний та вакуумний масаж, курси навчання.

Стек: **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion**.

## Розробка

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # продакшн-збірка
```

## Структура

```
src/
  app/
    layout.tsx        # шрифти (Playfair Display + Manrope), SEO-метадані
    page.tsx          # композиція секцій + schema.org розмітка
    globals.css       # дизайн-система (палітра, утиліти, анімації)
  components/
    Header.tsx        # шапка з мобільним меню
    Hero.tsx          # перший екран + параллакс + лічильники
    About.tsx         # про майстра
    Services.tsx      # послуги (картки)
    Results.tsx       # результати + статистика
    Gallery.tsx       # галерея в стилі Instagram
    Courses.tsx       # курси LPG / Ендосфера
    Testimonials.tsx  # відгуки
    Contact.tsx       # контакти, форма запису, месенджери, карта
    Footer.tsx
    FloatingMessengers.tsx  # плаваюча кнопка WhatsApp/Telegram/Viber/дзвінок
    Decor.tsx         # декоративна графіка + градієнтні панелі-замінники фото
    MessengerButtons.tsx, Counter.tsx, Reveal.tsx
  lib/
    site.ts           # ★ всі контакти та посилання — редагувати тут
    utils.ts
```

## Як оновити контакти

Усі дані студії зібрані в одному місці — **`src/lib/site.ts`**:
телефон, адреса, Instagram та посилання на месенджери (WhatsApp / Telegram /
Viber). Телефон достатньо змінити в константі `PHONE_DIGITS` — решта посилань
збереться автоматично.

> **Telegram:** за замовчуванням посилання формується за номером телефону.
> Якщо у майстра є публічний `@username`, замініть `telegram` у `site.ts` на
> `https://t.me/<username>` — так відкриватиметься надійніше.

## Як додати справжні фото

Зараз замість фотографій використано елегантні градієнтні панелі
(`<PhotoArt />` у `Decor.tsx`) — вони не «ламаються» й виглядають стильно.
Щоб поставити реальні світлини:

1. Покладіть зображення у `public/` (напр. `public/photos/hero.jpg`).
2. У потрібній секції замініть `<PhotoArt ... />` на `next/image`:

   ```tsx
   import Image from "next/image";
   <Image src="/photos/hero.jpg" alt="Масаж" fill className="object-cover" />
   ```

   (обгортайте у контейнер з `relative` та потрібним `aspect-*`).

Місця для фото: `Hero`, `About`, кожна картка в `Services`, діптих «до/після»
в `Results`, плитки в `Gallery`.
