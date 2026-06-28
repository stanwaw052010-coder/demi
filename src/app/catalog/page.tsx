import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { vehicles } from "@/lib/vehicles";
import { categories } from "@/lib/categories";

export const metadata = {
  title: "Каталог запчастин | Спринтер",
  description: "Каталог запчастин для Mercedes Sprinter, Vito, VW Crafter та LT. Понад 8 000 позицій.",
};

export default function CatalogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Каталог" }]} />

          <div className="mt-8 mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              Каталог запчастин
            </h1>
            <p className="text-lg text-gray-500">
              Оберіть модель автомобіля або категорію запчастини
            </p>
          </div>

          {/* Vehicles */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-gray-900 mb-6">За моделлю авто</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {vehicles.map((v) => (
                <Link
                  key={v.slug}
                  href={`/catalog/${v.slug}`}
                  className="group bg-white rounded-2xl border border-gray-200 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-50 transition-all duration-200 p-6 flex flex-col"
                >
                  <div className="text-xs text-gray-400 font-medium mb-1">{v.brand}</div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-1">
                    {v.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{v.years}</p>
                  <div className="mt-auto flex items-center gap-1 text-orange-500 text-sm font-semibold group-hover:gap-2 transition-all">
                    Переглянути <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">За категорією</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/catalog/mercedes-sprinter/${cat.slug}`}
                  className="group flex flex-col items-center p-5 bg-white rounded-2xl border border-gray-200 hover:border-orange-200 hover:shadow-md hover:shadow-orange-50 transition-all duration-200 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-3 text-2xl group-hover:bg-orange-100 group-hover:scale-110 transition-all duration-200">
                    {cat.icon}
                  </div>
                  <h3 className="text-xs font-semibold text-gray-800 group-hover:text-orange-600 transition-colors leading-tight mb-1">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-gray-400">{cat.count?.toLocaleString()}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
