# ProfiTime — подологія, манікюр і педикюр у Вишгороді

Односторінковий преміальний сайт студії **ProfiTime** ([@profitime_ka](https://www.instagram.com/profitime_ka)),
пл. Шевченка, 3, м. Вишгород.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react.

---

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # продакшн-збірка
npm run start    # запуск продакшн-збірки
npm run lint
```

## Структура

```
src/
├── app/
│   ├── layout.tsx            # шрифти, SEO-метадані, JSON-LD (BeautySalon)
│   ├── page.tsx              # композиція секцій
│   ├── globals.css           # дизайн-токени Tailwind v4 (кольори, тіні, анімації)
│   ├── opengraph-image.tsx   # OG-картинка 1200×630, генерується на білді
│   ├── og-fonts.ts           # підмножина Manrope у base64 для OG
│   ├── icon.svg              # фавікон
│   ├── robots.ts, sitemap.ts
│   └── api/lead/route.ts     # прийом заявок із форми
├── components/
│   ├── layout/               # Header, Footer, MobileActionBar
│   ├── sections/             # Hero, About, Services, Advantages, Pricing,
│   │                         # Gallery, Testimonials, Faq, CtaBanner, Contacts
│   ├── ui/                   # Button, Accordion, Reveal, SectionHeading,
│   │                         # BrandMark, ArtTile, Aurora, MotionItem, icons
│   └── ContactForm.tsx
└── lib/
    ├── site.ts               # ⭐ увесь контент: контакти, послуги, прайс, FAQ, відгуки
    ├── motion.ts             # спільні криві та варіанти анімацій
    └── utils.ts
```

**Майже весь контент редагується в одному файлі — `src/lib/site.ts`.**

---

## Що потрібно від студії перед запуском

| Що | Де змінити |
|---|---|
| Реальні фото робіт і кабінету | покласти у `public/gallery/`, додати `src` у масив `gallery` (`src/lib/site.ts`) |
| Справжні відгуки клієнтів | масив `testimonials` — зараз там приклади-заглушки |
| Повний прайс | масив `priceTiers` — зараз лише підтверджені позиції |
| Години роботи | поле `hours` (зараз «Уточнюйте телефоном») |
| Домен | змінна `NEXT_PUBLIC_SITE_URL` |

### Фотографії в галереї

Плитка галереї автоматично стає фотографією, щойно в елементі з'явиться `src`:

```ts
{ title: "Кабінет подології", caption: "…", art: "arc", span: "wide",
  src: "/gallery/cabinet.jpg" }
```

Доки фото немає — показується векторна композиція у фірмовій гамі
(жодних зовнішніх запитів, нульовий CLS).

---

## Ціни на сайті

Свідомо не вигадані. Показані лише позиції, підтверджені студією в Instagram:

- **Комплексний манікюр — 950 грн**
- **Консультація подолога — безкоштовно** для нових клієнтів
- **−20% на першу процедуру** (акція до кінця літа)

Решта — «Ціна уточнюється». Щоб додати реальні ціни, відредагуйте `priceTiers`.

---

## Форма заявки

`POST /api/lead` приймає заявку, валідує ім'я й телефон, відсіює ботів (honeypot).
Доставка вмикається змінними середовища (див. `.env.example`):

```bash
# Варіант 1 — Telegram
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...

# Варіант 2 — будь-який вебхук (CRM, Zapier, Make)
LEAD_WEBHOOK_URL=...
```

Якщо жодна змінна не задана, форма працює, але заявка нікуди не йде — інтерфейс
чесно повідомляє про це й пропонує подзвонити або написати в Instagram.

Основний канал запису — кнопка **«Онлайн запис»**, що веде на
[bookon.ua/profitime_ka](https://bookon.ua/profitime_ka).

---

## Карта та маршрут

Google Maps вбудований через `iframe` без API-ключа, координати `50.58276, 30.48422`.
Кнопка **«Прокласти маршрут»** відкриває Google Maps із побудованою навігацією
до студії (`/maps/dir/?api=1&destination=…`).

---

## Дизайн-система

- **Кольори** — глибокий синій `brand-50…950`, світло-блакитні акценти `aqua-*`,
  графітові нейтралі. Усі токени — у `@theme` в `globals.css`.
- **Типографіка** — Manrope (заголовки й текст) + Playfair Display Italic
  (акцентні слова в заголовках). Обидва з кириличною підмножиною, підключені
  через `next/font` (self-hosted, без запитів до Google).
- **Анімації** — Framer Motion: fade up/left/right, scale, stagger, паралакс
  у hero, slider відгуків, accordion FAQ; CSS — floating, marquee, aurora.
  Усе поважає `prefers-reduced-motion`.
- **Зображення** — жодних зовнішніх хостів: логотип, іконки та арт галереї
  векторні й вбудовані.
