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

const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;

if (process.env.NODE_ENV === "production" && GA_TRACKING_ID) {
  ReactGA.initialize(GA_TRACKING_ID);
} else if (process.env.NODE_ENV === "development") {
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

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}
