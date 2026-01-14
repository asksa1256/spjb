import { Toaster } from "sonner";
import CreateQuizModal from "./components/feature/quiz/CreateQuizModal";
import SearchContainer from "./components/feature/search/SearchContainer";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/ui/Header";
import Footer from "./components/ui/Footer";
import ToTopButton from "./components/ui/ToTopButton";
import SnowFall from "react-snowfall";
import SnowConfigButton from "./components/feature/snow/SnowConfigButton";
import { useState } from "react";
import BGMPlayer from "./components/feature/bgm/BGMPlayer";
import BGMPlayerToggleButton from "./components/feature/bgm/BGMPlayerToggleButton";
import useLocalStorage from "./hooks/useLocalStorage";
import ReactGA from "react-ga4";
import UserQuestionsViewModal from "./components/feature/user-questions-view/UserQuestionsViewModal";

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
        <SnowFall
          color="white"
          radius={[0.5, 5.0]}
          snowflakeCount={snowflakeCount}
          opacity={[0.5, 1]}
        />
      )}

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

        {/* 배경음악 */}
        {showPlayer && <BGMPlayer className="mt-12" />}
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
      <UserQuestionsViewModal />

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}
