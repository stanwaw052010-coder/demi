import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { catalog } from "@/lib/catalog";
import { getCategoryLabel, getVehicleLabel } from "@/lib/search";
import { ArrowLeft, Phone, MessageCircle, Package, Tag, Truck } from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ sku: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { sku } = await params;
  const decoded = decodeURIComponent(sku);
  const row = catalog.find((r) => r[0].toLowerCase() === decoded.toLowerCase());
  if (!row) return {};
  return {
    title: `${row[1]} | Спринтер`,
    description: `${row[1]} (${row[0]}) — ${row[2]}. Ціна: ${row[3].toLocaleString()} ₴. Замовляйте зараз.`,
  };
}

export default async function CatalogItemPage({ params }: Props) {
  const { sku } = await params;
  const decoded = decodeURIComponent(sku);
  const row = catalog.find((r) => r[0].toLowerCase() === decoded.toLowerCase());
  if (!row) notFound();

  const [itemSku, name, brand, price, category, , vehicles] = row;
  const categoryLabel = getCategoryLabel(category);
  const vehicleLabel = getVehicleLabel(vehicles);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> На головну
          </Link>

          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 px-8 py-10">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center text-4xl shrink-0">
                  🔧
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-orange-400 text-sm font-semibold mb-1">{categoryLabel}</p>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white leading-tight mb-2">{name}</h1>
                  <p className="text-gray-400 text-sm">{brand}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-3xl font-extrabold text-white">{price.toLocaleString()} ₴</div>
                  <div className="text-gray-400 text-xs mt-1">Уточнювальна ціна</div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                  <Tag className="w-5 h-5 text-orange-500 shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5">Артикул</div>
                    <div className="text-sm font-bold text-gray-900 font-mono">{itemSku}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                  <Package className="w-5 h-5 text-orange-500 shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5">Виробник</div>
                    <div className="text-sm font-bold text-gray-900">{brand}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                  <Truck className="w-5 h-5 text-orange-500 shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5">Підходить для</div>
                    <div className="text-sm font-bold text-gray-900">{vehicleLabel}</div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 mb-8">
                <p className="text-gray-700 text-sm leading-relaxed">
                  Цей товар доступний для замовлення. Зв&apos;яжіться з нами для уточнення наявності, точної ціни та строків доставки.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+380672546266"
                  className="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-colors text-sm"
                >
                  <Phone className="w-5 h-5" />
                  +38 (067) 254-62-66
                </a>
                <a
                  href="tel:+380991129526"
                  className="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-colors text-sm"
                >
                  <Phone className="w-5 h-5" />
                  +38 (099) 112-95-26
                </a>
                <a
                  href={`https://t.me/sprinter_parts?text=${encodeURIComponent(`Замовлення: ${name} (${itemSku})`)}`}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-500 text-white font-bold rounded-2xl hover:bg-blue-600 transition-colors text-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  Telegram
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/catalog" className="text-sm text-gray-400 hover:text-orange-500 transition-colors">
              ← Повернутись до каталогу
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
