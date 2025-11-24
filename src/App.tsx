import { Toaster } from "sonner";
import CreateQuizModal from "./components/feature/quiz/CreateQuizModal";
import SearchContainer from "./components/feature/search/SearchContainer";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/ui/Header";
import Footer from "./components/ui/Footer";

export default function App() {
  return (
    <div className="relative flex flex-col items-center justify-start md:px-6 pt-16 pb-10 bg-background-secondary min-h-screen">
      <Header />

      <main>
        <section className="flex flex-col w-full items-center justify-start max-w-[640px]">
          <SearchContainer />

          <Toaster
            position="bottom-center"
            richColors
            toastOptions={{
              className: "font-pretendard",
            }}
          />

          <CreateQuizModal />
        </section>
      </main>

      <Footer />

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}
