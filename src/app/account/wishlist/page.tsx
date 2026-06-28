import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WishlistView from "./WishlistView";

export const metadata = {
  title: "Список бажань | Спринтер",
};

export default function WishlistPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <WishlistView />
      </main>
      <Footer />
    </>
  );
}
