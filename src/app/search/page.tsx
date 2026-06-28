import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchResults from "./SearchResults";

export const metadata = {
  title: "Пошук запчастин | Спринтер",
};

export default function SearchPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-400">Завантаження...</div>}>
          <SearchResults />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
