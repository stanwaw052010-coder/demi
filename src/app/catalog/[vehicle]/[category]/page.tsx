import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import CategoryCatalog from "./CategoryCatalog";
import { vehicles } from "@/lib/vehicles";
import { categories } from "@/lib/categories";
import { getAllProducts } from "@/lib/products";

interface Props {
  params: Promise<{ vehicle: string; category: string }>;
}

export async function generateStaticParams() {
  const pairs = [];
  for (const v of vehicles) {
    for (const c of categories) {
      pairs.push({ vehicle: v.slug, category: c.slug });
    }
  }
  return pairs;
}

export async function generateMetadata({ params }: Props) {
  const { vehicle: vSlug, category: cSlug } = await params;
  const v = vehicles.find((x) => x.slug === vSlug);
  const cat = categories.find((x) => x.slug === cSlug);
  if (!v || !cat) return {};
  return {
    title: `${cat.name} для ${v.name} | Спринтер`,
    description: `Купити ${cat.name.toLowerCase()} для ${v.name}. Оригінальні та аналогові запчастини. Доставка по Україні.`,
  };
}

export default async function CategoryProductsPage({ params }: Props) {
  const { vehicle: vSlug, category: cSlug } = await params;
  const v = vehicles.find((x) => x.slug === vSlug);
  const cat = categories.find((x) => x.slug === cSlug);
  if (!v || !cat) notFound();

  const allProducts = getAllProducts();
  const products = allProducts.filter(
    (p) => p.category === cSlug && (p.vehicles.includes(vSlug) || p.vehicles.includes("all"))
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb
            items={[
              { label: "Каталог", href: "/catalog" },
              { label: v.name, href: `/catalog/${v.slug}` },
              { label: cat.name },
            ]}
          />

          <div className="mt-8 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{cat.icon}</span>
              <h1 className="text-3xl font-extrabold text-gray-900">{cat.name}</h1>
            </div>
            <p className="text-gray-500">
              {cat.name} для {v.name} · {products.length} позицій
            </p>
          </div>

          <CategoryCatalog
            products={products}
            subcategories={cat.subcategories ?? []}
            categoryName={cat.name}
            vehicleName={v.name}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
