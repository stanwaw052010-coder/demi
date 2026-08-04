# Dental Clinic Nataly — сайт стоматології у Тернополі

Односторінковий сайт клініки Наталії Жилан: Next.js 16 (App Router) · React 19 ·
TypeScript · TailwindCSS 4 · Framer Motion · Lucide.

## Запуск

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # продакшн-збірка
npm start       # запуск продакшн-сервера
```

## Структура

```
src/
  app/
    layout.tsx        шрифти, метадані, JSON-LD (schema.org/Dentist)
    page.tsx          композиція секцій
    globals.css       дизайн-токени, утиліти (container-x, glass, eyebrow…)
    icon.png          favicon
  components/
    site/             header, topbar, footer, logo, мобільна CTA-панель
    sections/         hero, stats, services, why-us, before-after, process,
                      doctor, kids, space, testimonials, faq, booking,
                      contacts, map-panel
    ui/               button, accordion, counter, reveal, rotating-badge,
                      scroll-progress, section-heading, icons
  lib/
    site.ts           контакти, адреса, графік, навігація
    content.ts        послуги, переваги, кейси до/після, відгуки, FAQ
    utils.ts          cn()
public/                 logo-dark/light.png, logo-mark-*.png — фірмовий знак
public/images/          фотографії (hero.jpg і doctor.jpg — справжні)
```

Увесь текст і контакти зібрані у `src/lib/site.ts` та `src/lib/content.ts` —
щоб змінити телефон, послугу чи відгук, редагувати треба лише ці два файли.

## Фотографії

Усі фото на сайті — справжні, з матеріалів клініки:

| Файл                     | Розмір      | Де використовується                   |
| ------------------------ | ----------- | ------------------------------------- |
| `hero.jpg`               | 1000 × 1250 | головний екран — фото Наталії         |
| `doctor.jpg`             | 1200 × 1500 | секція «Про лікаря»                   |
| `clinic.jpg`             | 1600 × 900  | фон секції «Чому обирають нас»        |
| `equipment.jpg`          | 1200 × 1200 | плитка «Мікроскоп» у секції «Клініка» |
| `service-1/2/3.jpg`      | ~1300 px    | картки послуг                         |
| `before-after-1/2.jpg`   | 1400 × 875  | кейс 01 — художня реставрація         |
| `before-after-3/4.jpg`   | 1400 × 583  | кейс 02 — відбілювання Beyond         |
| `kids-1…4.jpg`           | 900 × 1125  | карусель «Дитяча стоматологія»        |
| `clinic-video-poster.jpg`| 720 × 1280  | постер відео інтер'єру                |

У парах «до / після» кадри мають бути зняті з однакового ракурсу — повзунок
порівняння накладає їх один на одного. Кожен кейс має власне поле `ratio`
(пропорції рамки), тож широкі кадри усмішки й макрозйомка можуть жити поруч.
Щоб додати кейс, покладіть пару файлів у `public/images/` і додайте запис у
`cases` (`src/lib/content.ts`).

## Відео

`public/video/clinic.mp4` і `clinic.webm` — обхід клініки (640 × 1138, без
звуку, ~1,7 МБ). Відтворюється без звуку в циклі, коли секція «Клініка»
з'являється на екрані; при `prefers-reduced-motion` або режимі економії
трафіку лишається постер із кнопкою відтворення.

Щоб замінити ролик, перекодуйте вихідний файл у обидва формати:

```bash
ffmpeg -i input.mp4 -an -vf "scale=640:-2,fps=25" -c:v libx264 -crf 31 \
  -pix_fmt yuv420p -movflags +faststart public/video/clinic.mp4
ffmpeg -i input.mp4 -an -vf "scale=640:-2,fps=25" -c:v libvpx-vp9 -crf 44 \
  -b:v 0 -row-mt 1 public/video/clinic.webm
ffmpeg -i input.mp4 -ss 1.5 -frames:v 1 public/images/clinic-video-poster.jpg
```

## Форма запису

Секція «Записатися» (`sections/booking.tsx`) працює без бекенду: дані
копіюються у буфер і відкривається Viber. Щоб отримувати заявки на пошту або
в Telegram, достатньо додати змінну оточення:

```bash
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
```

Форма надішле POST з полями `name`, `phone`, `service`, `note`.

## Контакти на сторінці

Телефон і адреса продубльовані у п'яти місцях: чорна смуга над шапкою,
кнопка-телефон у шапці, блок у першому екрані, секція запису, футер.
На телефоні внизу закріплена панель «Подзвонити / Записатися».

## Дизайн-система

- Палітра строго монохромна: `#FFFFFF`, `#F7F7F7` (cream — світла смуга),
  `#F5F5F5` (mist), `#C2C6CA` (sand — декоративні лінії та іконки),
  `#4B5158` (clay — акцентні слова), `#2F343B` (graphite), `#111111` (ink).
- Типографіка: Manrope (variable) для всього тексту + Cormorant Garamond
  italic для акцентних слів і порядкових номерів.
- Дрібні деталі: зернистість (`grain`), крутний бейдж у hero, прогрес-бар
  читання, пунктирні лінії, кутові засічки навколо фото лікаря.
- Радіуси 20–24px, дуже м'які тіні, скляний ефект лише в плаваючих елементах.
- Анімації: fade-up при скролі, парралакс у hero, лічильники, hover-стани.
  Усе поважає `prefers-reduced-motion`.
- Framer Motion відповідає за accordion у FAQ та зміну кейсів «до / після»;
  обидва компоненти підвантажуються динамічно. Все, що видно одразу (hero,
  хедер, scroll reveal), анімується на CSS — сторінка малюється ще до
  гідратації.

## Продуктивність і доступність

Lighthouse (production build): **desktop 100 / 100 / 100 / 100**,
**mobile 96 / 100 / 100 / 100** (performance · accessibility · best practices · SEO).

- Шрифти self-hosted через `next/font`; сторонніх скриптів немає.
- Секції нижче першого екрана використовують `content-visibility: auto`.
- CSS інлайниться в HTML — жодного render-blocking запиту.
- Інтерактивна карта монтується лише за кліком — жодного стороннього iframe
  на першому завантаженні.
- Контрастність тексту відповідає WCAG AA; декоративні нумерації приховані
  від скрінрідерів.
- Розмітка JSON-LD `Dentist` для локального пошуку.
