import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Блог | Спринтер",
  description: "Корисні статті та поради щодо обслуговування Mercedes Sprinter, Vito та VW Crafter.",
};

const posts = [
  {
    slug: "zamina-amortyzatoriv-sprinter",
    title: "Коли міняти амортизатори на Mercedes Sprinter?",
    excerpt: "Ознаки зносу амортизаторів, правила заміни та які бренди обрати для Sprinter W906.",
    category: "Підвіска",
    date: "15 червня 2025",
    readTime: "5 хв",
  },
  {
    slug: "galmivni-kolodky-vito",
    title: "Гальмівні колодки для Vito: оригінал чи аналог?",
    excerpt: "Порівняння оригінальних колодок Mercedes та аналогів від Bosch і ATE — ціна, якість, ресурс.",
    category: "Гальма",
    date: "2 червня 2025",
    readTime: "7 хв",
  },
  {
    slug: "motorna-oliva-sprinter-cdi",
    title: "Яку моторну оливу заливати у Sprinter CDI?",
    excerpt: "Допуски, в'язкість та рекомендовані марки масла для дизельних двигунів OM611, OM646, OM651.",
    category: "Двигун",
    date: "20 травня 2025",
    readTime: "6 хв",
  },
  {
    slug: "filtr-salonu-vw-crafter",
    title: "Заміна фільтра салону VW Crafter",
    excerpt: "Покрокова інструкція заміни салонного фільтра VW Crafter — легко, без зняття панелей.",
    category: "Обслуговування",
    date: "5 травня 2025",
    readTime: "4 хв",
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb items={[{ label: "Блог" }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-8 mb-10">Блог</h1>

          <div className="space-y-5">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="bg-white rounded-3xl border border-gray-200 p-7 hover:border-orange-200 hover:shadow-md hover:shadow-orange-50 transition-all duration-200 group cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs px-2.5 py-1 bg-orange-50 text-orange-600 rounded-full font-semibold">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">{post.date}</span>
                    <span className="text-xs text-gray-400">· {post.readTime} читання</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-1 text-orange-500 text-sm font-semibold group-hover:gap-2 transition-all">
                    Читати далі <ArrowRight className="w-4 h-4" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
