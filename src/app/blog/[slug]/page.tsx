import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { notFound } from "next/navigation";

const posts: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  intro: string;
  sections: { heading: string; body: string }[];
  tips?: string[];
}> = {
  "zamina-amortyzatoriv-sprinter": {
    title: "Коли міняти амортизатори на Mercedes Sprinter?",
    category: "Підвіска",
    date: "15 червня 2025",
    readTime: "5 хв",
    intro: "Амортизатори — один із найважливіших елементів підвіски. Від їхнього стану залежить керованість автомобіля, комфорт їзди та безпека пасажирів. Mercedes Sprinter — важкий комерційний мікроавтобус, який часто використовується у важких умовах, тому амортизатори зношуються швидше, ніж на легкових автомобілях.",
    sections: [
      {
        heading: "Ознаки зносу амортизаторів",
        body: "Перші симптоми зношених амортизаторів зазвичай починаються з погіршення керованості. Автомобіль починає «пливти» на поворотах, кузов розгойдується після проїзду ям. При гальмуванні Sprinter клює носом більше, ніж зазвичай. Характерні стукіт і скрип при проїзді нерівностей — також вірні ознаки проблеми.\n\nЗовні пошкоджений амортизатор видно по патьокам масла на корпусі (так звані «слізки»). Якщо амортизатор «пливе» олією — він підлягає негайній заміні без компромісів.",
      },
      {
        heading: "Ресурс та строки заміни",
        body: "Виробники рекомендують перевіряти амортизатори кожні 20 000 км і замінювати при необхідності. На практиці для Sprinter W906 і W907 у міських умовах ресурс амортизатора складає 80 000–120 000 км. При їзді по поганих дорогах (що в Україні норма) — 50 000–80 000 км.\n\nВажливо: якщо несправний один амортизатор на осі, міняти потрібно обидва парно — лівий і правий одночасно. В іншому випадку автомобіль буде тягнути у бік нового амортизатора.",
      },
      {
        heading: "Які бренди обрати для Sprinter",
        body: "Для Mercedes Sprinter найкращими варіантами є:\n\n• **SACHS** (ZF Group) — оригінальний постачальник Mercedes. Відмінна якість, тривалий ресурс. Ціна середня.\n• **Monroe** — американський виробник преміум-класу. Серія Reflex ідеально підходить для Sprinter. Хороший вибір між ціною і якістю.\n• **Bilstein** — спортивний і преміальний варіант. Тримають до 200 000 км при правильній експлуатації.\n• **KYB** — японська якість за розумну ціну. Добре зарекомендували себе на українських дорогах.\n\nАналоги від невідомих виробників ми не рекомендуємо — економія на амортизаторах обертається проблемами з безпекою.",
      },
      {
        heading: "Вартість заміни",
        body: "Амортизатори для Mercedes Sprinter коштують від 1 200 до 4 500 ₴ за штуку залежно від виробника. Передні амортизатори, як правило, дорожчі за задні.\n\nРоботи зі встановлення: 300–600 ₴ на штуку в спеціалізованому сервісі. Після заміни обов'язково робіть розвал-сходження — зміна геометрії підвіски неминуча.",
      },
    ],
    tips: [
      "Міняйте амортизатори парно на одній осі",
      "Після заміни обов'язкове регулювання розвал-сходження",
      "Разом з амортизаторами перевірте опорні підшипники та відбійники",
      "Вибирайте перевірені бренди: SACHS, Monroe, Bilstein, KYB",
    ],
  },

  "galmivni-kolodky-vito": {
    title: "Гальмівні колодки для Vito: оригінал чи аналог?",
    category: "Гальма",
    date: "2 червня 2025",
    readTime: "7 хв",
    intro: "Питання «оригінал чи аналог?» — одне з найпоширеніших серед власників Mercedes Vito. Ринок запчастин сповнений пропозицій різної якості і ціни. Розберемося, що варто обирати для гальмівної системи — адже це питання безпеки.",
    sections: [
      {
        heading: "Оригінальні колодки Mercedes",
        body: "Оригінальні колодки, що маркуються логотипом Mercedes-Benz, виробляються здебільшого на заводах Continental (ATE) або Bosch за замовленням концерну. По суті, ви платите за бренд і гарантію відповідності допускам.\n\nПереваги: ідеальна геометрія, відповідність гальмівним дискам, гарантія виробника, відмінний ресурс (40 000–60 000 км на Vito).\n\nНедолік: висока ціна — 2 800–4 500 ₴ за комплект на передню вісь.",
      },
      {
        heading: "Аналоги від Bosch",
        body: "Bosch — один із найбільших постачальників Mercedes Benz. Bosch QuietCast і Bosch BP (Budget) — лінійки для Vito.\n\nQuietCast — практично оригінальна якість за ціною на 30–40% нижчою. Містять шумопоглинальний прошарок, відмінно дисипують тепло, рідко скриплять.\n\nBP — бюджетна лінійка. Годиться для міської їзди, але ресурс на 20–30% нижчий. Не рекомендуємо для мікроавтобусів з великим пробігом і частим завантаженням.",
      },
      {
        heading: "ATE (Continental) — найкраща альтернатива",
        body: "ATE — безпосередній постачальник Mercedes, тобто ці колодки фактично є оригіналом без логотипу зірки. Ціна нижча на 20–25%, якість ідентична OEM.\n\nДля Mercedes Vito W639 і W447 рекомендуємо ATE Premium One або ATE Ceramic. Ceramic варіант дає менше пилу і тихіший, але дорожчий.",
      },
      {
        heading: "Що категорично не рекомендуємо",
        body: "Дешеві колодки без бренду з Китаю — небезпечний вибір. Часто не відповідають CoC (Certificate of Conformity), мають занижений коефіцієнт тертя, можуть розшаровуватись при перегріві.\n\nTextar і Ferodo — хороші бренди, але деякі лінійки для Vito підходять гірше, ніж ATE чи Bosch. Перевіряйте артикул відповідності перед покупкою.",
      },
    ],
    tips: [
      "Для Mercedes Vito найкращий вибір — ATE або Bosch QuietCast",
      "Міняйте колодки на одній осі комплектом",
      "При товщині колодки менше 3 мм — негайна заміна",
      "Разом з колодками перевіряйте стан гальмівних дисків",
    ],
  },

  "motorna-oliva-sprinter-cdi": {
    title: "Яку моторну оливу заливати у Sprinter CDI?",
    category: "Двигун",
    date: "20 травня 2025",
    readTime: "6 хв",
    intro: "Вибір моторної оливи для дизельного Mercedes Sprinter — відповідальне рішення. Використання неправильної оливи може призвести до дострокового зносу двигуна, проблем із сажовим фільтром DPF та порушення гарантії. Розберемо, що заливати у кожне покоління Sprinter CDI.",
    sections: [
      {
        heading: "Допуски Mercedes-Benz — що це таке",
        body: "Mercedes-Benz видає власні специфікації (допуски) на моторні оливи: MB 228.5, MB 229.3, MB 229.51, MB 229.52. Ці допуски жорсткіші за стандартні ACEA та API і гарантують, що олива підходить для конкретного мотора.\n\nВажливо: можна лити оливу від будь-якого бренду, якщо вона має потрібний допуск MB. Не обов'язково купувати «оригінальну» Мерседесовська олива.",
      },
      {
        heading: "Двигуни OM611, OM612, OM613 (Sprinter 901–905, 2000–2006)",
        body: "Старе покоління CDI. Рекомендація: SAE 5W-40, допуск MB 229.3 або MB 228.5.\n\nПідходять: Castrol Edge 5W-40, Mobil 1 ESP 5W-30, Shell Helix Ultra 5W-40.\n\nІнтервал заміни: 10 000–15 000 км або 1 раз на рік. Ці мотори не мають сажового фільтра (або він опційний), тому допуск MB 229.51 тут не обов'язковий.",
      },
      {
        heading: "Двигун OM646, OM647, OM648 (Sprinter W906, 2006–2018)",
        body: "Найпоширеніша версія. Двигун має сажовий фільтр DPF. Категорично потрібна Low-SAPS олива (низький вміст золи, сірки, фосфору).\n\nОбов'язковий допуск: MB 229.51 або MB 229.52.\n\nРекомендовані оливи: Castrol EDGE 5W-30 LL (229.51), Mobil Delvac 1 ESP 5W-30, Aral BlueTronic 5W-30.\n\nЗастереження: НЕ МОЖНА заливати стандартні 5W-40 з допуском 229.3 — вони засмічать DPF золою за 50 000–80 000 км.",
      },
      {
        heading: "Двигун OM651 (Sprinter W906 NCV3 після 2011, W907 після 2018)",
        body: "Найсучасніший CDI від Mercedes. Вимоги такі ж, як OM646 — Low-SAPS.\n\nДопуск: MB 229.51 / MB 229.52.\n\nОлива: 5W-30 або 0W-30. Castrol Edge Professional LL III 5W-30, Mobil 1 ESP 5W-30.\n\nЗверніть увагу: на W907 з системою BlueTEC (AdBlue) обов'язково підтримувати рівень реагенту AdBlue окремо від оливи.",
      },
    ],
    tips: [
      "Завжди перевіряйте допуск MB на каністрі оливи",
      "Для OM646 і OM651 з DPF — тільки Low-SAPS (MB 229.51/229.52)",
      "Не мішайте різні типи олив",
      "Заміна оливи кожні 10 000–15 000 км або раз на рік",
    ],
  },

  "filtr-salonu-vw-crafter": {
    title: "Заміна фільтра салону VW Crafter",
    category: "Обслуговування",
    date: "5 травня 2025",
    readTime: "4 хв",
    intro: "Салонний фільтр очищає повітря, що потрапляє в кабіну VW Crafter. Забруднений фільтр знижує ефективність клімат-контролю, призводить до запотівання скел і погіршує якість повітря для водія і пасажирів. Замінити його самостійно легко і займе не більше 15 хвилин.",
    sections: [
      {
        heading: "Де знаходиться салонний фільтр на VW Crafter",
        body: "На VW Crafter I (2006–2016) салонний фільтр розташований у моторному відсіку, з правого боку (з боку пасажира) під пластиковим дефлектором біля лобового скла.\n\nНа Crafter II (2017+) фільтр переміщено під кришку в ніші за бардачком. Доступ значно зручніший, ніж на першому поколінні.",
      },
      {
        heading: "Покрокова заміна (Crafter I)",
        body: "1. Відкрийте капот.\n2. Знайдіть чорну пластикову кришку праворуч під лобовим склом (зона відповідальності двірників).\n3. Від'єднайте пластикові затискачі — кришка знімається без інструментів.\n4. Витягніть старий фільтр. Зверніть увагу на напрямок установки (стрілка на корпусі фільтра).\n5. Вставте новий фільтр у тому ж напрямку.\n6. Встановіть кришку назад до клацання.",
      },
      {
        heading: "Покрокова заміна (Crafter II)",
        body: "1. Відкрийте бардачок і від'єднайте стопор, що дозволяє йому опуститися нижче звичного.\n2. За бардачком знайдіть кришку фільтра — вона утримується 1-2 защіпками.\n3. Зніміть кришку, витягніть старий фільтр.\n4. Встановіть новий фільтр (стрілка вниз) і закрийте кришку.\n5. Поверніть бардачок у нормальне положення.",
      },
      {
        heading: "Який фільтр обрати",
        body: "Для VW Crafter підходять фільтри MANN-FILTER (оригінальний постачальник VW), Bosch, Mahle. Є два типи:\n\n• Стандартний (пилозахисний) — MANN CU 25 001. Ціна: 250–400 ₴.\n• Вугільний (з активованим вугіллям) — MANN CUK 25 001. Затримує запахи і шкідливі гази. Ціна: 400–600 ₴. Рекомендований для міської їзди.",
      },
    ],
    tips: [
      "Замінюйте салонний фільтр кожні 15 000 км або раз на рік",
      "Для міста — вибирайте вугільний фільтр",
      "Якщо відчуваєте неприємний запах з дефлекторів — фільтр пора міняти",
      "Рекомендований бренд: MANN-FILTER (оригінальний постачальник VW)",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return {
    title: `${post.title} | Блог Спринтер`,
    description: post.intro.slice(0, 160),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb
            items={[
              { label: "Блог", href: "/blog" },
              { label: post.title },
            ]}
          />

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors mt-6 mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Всі статті
          </Link>

          <article>
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 bg-orange-50 text-orange-600 rounded-full font-semibold">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {post.readTime} читання
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-5">
                {post.title}
              </h1>
              <p className="text-base text-gray-600 leading-relaxed border-l-4 border-orange-500 pl-5 italic">
                {post.intro}
              </p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-10 space-y-8">
              {post.sections.map((s) => (
                <section key={s.heading}>
                  <h2 className="text-lg font-bold text-gray-900 mb-3">{s.heading}</h2>
                  <div className="text-sm text-gray-600 leading-relaxed space-y-2">
                    {s.body.split("\n").map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </section>
              ))}

              {post.tips && (
                <section className="bg-orange-50 rounded-2xl p-6">
                  <h3 className="font-bold text-orange-700 mb-3 text-sm uppercase tracking-wide">Коротко: головне</h3>
                  <ul className="space-y-2">
                    {post.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2 text-sm text-orange-800">
                        <span className="text-orange-500 font-bold mt-0.5">✓</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* CTA */}
            <div className="mt-8 bg-[#0a0a0a] rounded-3xl p-8 text-center">
              <p className="text-white font-bold text-lg mb-2">Потрібні запчастини для вашого авто?</p>
              <p className="text-gray-400 text-sm mb-6">Великий вибір, оригінальні бренди, доставка по Україні</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/catalog"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors"
                >
                  До каталогу
                </Link>
                <a
                  href="tel:+380672546266"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-colors"
                >
                  Зателефонувати
                </a>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
