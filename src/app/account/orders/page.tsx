import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Мої замовлення | Спринтер",
};

export default function OrdersPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb
            items={[
              { label: "Особистий кабінет", href: "/account" },
              { label: "Мої замовлення" },
            ]}
          />
          <h1 className="text-3xl font-extrabold text-gray-900 mt-8 mb-10">Мої замовлення</h1>

          <div className="text-center py-24 bg-white rounded-3xl border border-gray-200">
            <ShoppingBag className="w-14 h-14 text-gray-200 mx-auto mb-5" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Замовлень ще немає</h3>
            <p className="text-gray-500 mb-8 text-sm">Оформіть перше замовлення з нашого каталогу</p>
            <Link href="/catalog" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors">
              До каталогу <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
