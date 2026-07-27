import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Головна сторінка сайту — статичний лендінг салону краси
 * з public/drahan-alina/index.html.
 *
 * Чому route handler, а не rewrite у next.config.ts: перезапис виконує
 * шар маршрутизації хостингу, і на деяких платформах він не застосовується —
 * тоді "/" віддає 404. Route handler є частиною самого застосунку, тож
 * працює скрізь, де запускається Next.
 *
 * Побічний плюс: сторінка не проходить через root layout, тому глобальні
 * стилі магазину (Tailwind) не втручаються в оформлення лендінгу.
 */

// Файл читається один раз під час збірки, а не на кожен запит.
export const dynamic = "force-static";

const LANDING_DIR = "/drahan-alina";

export async function GET() {
  const file = path.join(process.cwd(), "public", "drahan-alina", "index.html");
  const html = await readFile(file, "utf8");

  // В index.html шляхи відносні, щоб файл відкривався напряму з диска.
  // При віддачі з кореня сайту робимо їх абсолютними.
  const body = html
    .replace('href="styles.css"', `href="${LANDING_DIR}/styles.css"`)
    .replace('src="script.js"', `src="${LANDING_DIR}/script.js"`);

  return new Response(body, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
