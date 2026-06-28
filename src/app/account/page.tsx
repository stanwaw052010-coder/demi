import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import Link from "next/link";
import { ShoppingBag, Heart, User, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Особистий кабінет | Спринтер",
};

export default function AccountPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb items={[{ label: "Особистий кабінет" }]} />

          <div className="mt-8 bg-white rounded-3xl border border-gray-200 p-8 mb-6 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center">
              <User className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">Особистий кабінет</h1>
              <p className="text-gray-500 text-sm mt-1">Керуйте замовленнями та списком бажань</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Link href="/account/orders" className="bg-white rounded-2xl border border-gray-200 hover:border-orange-200 hover:shadow-md hover:shadow-orange-50 transition-all p-7 group flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-orange-500" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">Мої замовлення</div>
                <div className="text-sm text-gray-400">Історія та статус замовлень</div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-orange-500 transition-colors" />
            </Link>
            <Link href="/account/wishlist" className="bg-white rounded-2xl border border-gray-200 hover:border-orange-200 hover:shadow-md hover:shadow-orange-50 transition-all p-7 group flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-400" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">Список бажань</div>
                <div className="text-sm text-gray-400">Збережені товари</div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-orange-500 transition-colors" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
