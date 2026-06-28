import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { vehicles } from "@/lib/vehicles";
import { categories } from "@/lib/categories";

interface Props {
  params: Promise<{ vehicle: string }>;
}

export async function generateStaticParams() {
  return vehicles.map((v) => ({ vehicle: v.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { vehicle: slug } = await params;
  const v = vehicles.find((x) => x.slug === slug);
  if (!v) return {};
  return {
    title: `Запчастини для ${v.name} | Спринтер`,
    description: `Каталог запчастин для ${v.name} ${v.years}. Понад ${v.engines.length} конфігурацій двигунів. Доставка по Україні.`,
  };
}

export default async function VehicleCatalogPage({ params }: Props) {
  const { vehicle: slug } = await params;
  const v = vehicles.find((x) => x.slug === slug);
  if (!v) notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb
            items={[
              { label: "Каталог", href: "/catalog" },
              { label: v.name },
            ]}
          />

          {/* Vehicle header */}
          <div className="mt-8 mb-10 bg-white rounded-3xl border border-gray-200 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-orange-50 flex items-center justify-center text-4xl shrink-0">
              🚐
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-400 font-medium mb-1">{v.brand}</div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-1">{v.name}</h1>
              <p className="text-gray-500 mb-3">{v.years}</p>
              <div className="flex flex-wrap gap-1.5">
                {v.engines.map((e) => (
                  <span key={e} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg font-medium">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Categories */}
          <h2 className="text-xl font-bold text-gray-900 mb-6">Оберіть категорію</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalog/${v.slug}/${cat.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50 transition-all duration-200 p-5 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-3 text-2xl group-hover:bg-orange-100 group-hover:scale-110 transition-all duration-200">
                  {cat.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-1 leading-tight">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-400 mb-3">{cat.count?.toLocaleString()} позицій</p>
                <div className="mt-auto flex items-center gap-1 text-orange-500 text-xs font-semibold group-hover:gap-2 transition-all">
                  Переглянути <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>

          {/* Other vehicles */}
          <div className="mt-14">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Інші моделі</h2>
            <div className="flex flex-wrap gap-3">
              {vehicles
                .filter((x) => x.slug !== v.slug)
                .map((other) => (
                  <Link
                    key={other.slug}
                    href={`/catalog/${other.slug}`}
                    className="px-4 py-2.5 bg-white border border-gray-200 hover:border-orange-300 hover:text-orange-600 text-sm font-semibold text-gray-700 rounded-xl transition-all"
                  >
                    {other.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
