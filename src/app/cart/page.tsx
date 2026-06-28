import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartView from "./CartView";

export const metadata = {
  title: "Кошик | Спринтер",
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <CartView />
      </main>
      <Footer />
    </>
  );
}
