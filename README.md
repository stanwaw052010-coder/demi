# Clinic Stomatology — сайт стоматологічної клініки у Львові

Односторінковий сайт клініки **Clinic Stomatology** (Центр здоровʼя та естетики,
вул. Героїв Майдану, 5, Сокільники, Львівська область).

Стек: **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide**.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # продакшн-збірка
npm run lint
```

## Структура

```
src/
  app/            layout, сторінка, robots, sitemap, OG-картинка, favicon
  components/
    ui/           примітиви: Button, MagneticButton, Reveal, AnimatedText,
                  SectionHeading, ServiceCard, Lightbox, ReviewCard,
                  ContactForm, Logo, Cursor
    sections/     Hero, About, Services, Massage, Benefits, GallerySection,
                  Trust, Reviews, Location, ContactCta, Booking
    Navbar / Footer / MobileCta / Schema
  data/           services.ts, content.ts — увесь текстовий контент
  lib/            site.ts (контакти), nav.ts, booking.ts, utils.ts
scripts/          generate-art.mjs — генератор тимчасових візуалів
public/images/    зображення сайту
```

Дизайн-система (кольори, радіуси, тіні, типографіка) описана токенами
в `src/app/globals.css`. У компонентах використовуються лише семантичні
класи (`bg-soft`, `text-ink`, `border-line`), тож зміна палітри — це
редагування одного файлу.

## Контакти й тексти

Телефон, адреса, Instagram і посилання на Google Maps живуть в одному місці —
`src/lib/site.ts`. Тексти секцій — у `src/data/content.ts`, перелік послуг —
у `src/data/services.ts`.

## Зображення

Реальної фотозйомки клініки поки немає, тому зображення — це стримані
графічні композиції у фірмовій палітрі, згенеровані скриптом:

```bash
node scripts/generate-art.mjs
```

**Щоб поставити справжні фото**, покладіть їх у `public/images` під тими самими
іменами (`hero`, `about`, `massage`, `trust`, `gallery-1…6`, `service-*`) —
код підхопить їх без змін. Рекомендовано WebP/AVIF, довша сторона ≤ 2000 px.
Тексти `alt` для галереї задаються в `src/data/content.ts`.

## Форма запису

Бекенду в проєкті немає, і форма **не імітує** відправку: без налаштованого
endpoint вона чесно повідомляє, що онлайн-запис ще не підключено, і пропонує
дзвінок або Instagram Direct.

Щоб увімкнути реальні заявки (Telegram-бот, e-mail, CRM):

1. Підніміть endpoint, який приймає `POST` з JSON у форматі `BookingRequest`
   (`src/lib/booking.ts`): `{ name, phone, service, date, comment, source }`.
2. Додайте у `.env.local`:

```
NEXT_PUBLIC_BOOKING_ENDPOINT=https://example.com/api/booking
```

Інші зміни в коді не потрібні.

## Що свідомо НЕ вигадано

Клініка не надавала імен лікарів, цін, сертифікатів, обладнання, конкретних
технологій, відгуків і фотографій «до/після» — тож нічого з цього на сайті
немає. Секція відгуків має структуру з плейсхолдером: коли зʼявляться реальні
відгуки, їх додають у масив `reviews` (`src/data/content.ts`), і секція
відрендерить картки замість заглушки. Так само передбачено місце під майбутню
інтеграцію з Google Reviews.

## SEO та доступність

- semantic HTML, один `h1`, ієрархія `h2`/`h3`;
- метадані, Open Graph, `robots.txt`, `sitemap.xml`, favicon;
- JSON-LD `Dentist` (`src/components/Schema.tsx`) — тільки з перевірених даних;
- клавіатурна навігація (галерея: `←`, `→`, `Esc`), видимий фокус,
  `aria-label` на іконкових кнопках, посилання-стрибок «Перейти до вмісту»;
- повага до `prefers-reduced-motion`: анімації вимикаються системним
  налаштуванням.
