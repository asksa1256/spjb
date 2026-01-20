import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/ui/Header";
import Footer from "./components/ui/Footer";
import ToTopButton from "./components/ui/ToTopButton";
import SnowConfigButton from "./components/feature/snow/SnowConfigButton";
import { useState, lazy, Suspense } from "react";
import BGMPlayerToggleButton from "./components/feature/bgm/BGMPlayerToggleButton";
import useLocalStorage from "./hooks/useLocalStorage";
import ReactGA from "react-ga4";

// Lazy loaded components
const CreateQuizModal = lazy(() => import("./components/feature/quiz/CreateQuizModal"));
const SearchContainer = lazy(() => import("./components/feature/search/SearchContainer"));
const BGMPlayer = lazy(() => import("./components/feature/bgm/BGMPlayer"));
const UserQuestionsViewModal = lazy(() => import("./components/feature/user-questions-view/UserQuestionsViewModal"));
const SnowFall = lazy(() => import("react-snowfall"));


const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

// 개발 환경에서는 GA 비활성화
if (import.meta.env.PROD && GA_TRACKING_ID) {
  ReactGA.initialize(GA_TRACKING_ID);
} else if (import.meta.env.DEV) {
  console.log("Google Analytics disabled in development");
}

export default function App() {
  const [snowflakeCount, setSnowflakeCount] = useState(150);
  const [showSnow, setShowSnow] = useLocalStorage("showSnow", true);
  const [showPlayer, setShowPlayer] = useLocalStorage("showPlayer", true);

  return (
    <div
      className={`
      relative flex flex-col items-center justify-start md:px-6 pt-18 pb-10 min-h-screen
      bg-background-secondary
      bg-[linear-gradient(135deg,#ffeff5,#f6f0ff,#eef6ff)]
      dark:bg-none
    `}
    >
      {showSnow && (
        <Suspense fallback={null}>
          <SnowFall
            color="white"
            radius={[0.5, 5.0]}
            snowflakeCount={snowflakeCount}
            opacity={[0.5, 1]}
          />
        </Suspense>
      )}


      <Header />

      <main>
        <section className="flex flex-col w-full items-center justify-start max-w-[640px]">
          <Suspense fallback={<div className="h-20 w-full animate-pulse bg-gray-200 rounded-lg" />}>
            <SearchContainer />
          </Suspense>

          <Toaster
            position="bottom-center"
            richColors
            toastOptions={{
              className: "font-pretendard",
            }}
          />

          <Suspense fallback={null}>
            <CreateQuizModal />
          </Suspense>
        </section>

        {/* 배경음악 */}
        {showPlayer && (
          <Suspense fallback={null}>
            <BGMPlayer className="mt-12" />
          </Suspense>
        )}
      </main>


      <Footer />

      <ToTopButton />

      <BGMPlayerToggleButton
        showPlayer={showPlayer}
        onToggle={() => setShowPlayer((prev) => !prev)}
      />

      {/* 겨울 업데이트: 눈 이펙트 */}
      <SnowConfigButton
        showSnow={showSnow}
        snowflakeCount={snowflakeCount}
        onChangeShow={setShowSnow}
        onChangeCount={(v) => setSnowflakeCount(v[0])}
      />

      {/* 유저 출제 문제 */}
      <Suspense fallback={null}>
        <UserQuestionsViewModal />
      </Suspense>


      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}
