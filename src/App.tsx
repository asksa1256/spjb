import { Toaster } from "sonner";
import CreateQuizModal from "./components/feature/quiz/CreateQuizModal";
import SearchContainer from "./components/feature/search/SearchContainer";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/ui/Header";

export default function App() {
  return (
    <>
      <main className="relative flex min-h-screen flex-col items-center justify-start md:px-6 pt-12 md:pt-14 pb-10 bg-background-secondary">
        <Header />

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

        {/* Vercel Analytics */}
        <Analytics />
      </main>
    </>
  );
}
