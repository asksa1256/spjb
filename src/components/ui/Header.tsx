import { useState, useEffect } from "react";
import CreateInquiryModal from "@/components/feature/inquiry/CreateInquiryModal";
import ContributorsModal from "@/components/feature/contributor-view/ContributorsModal";
import DarkModeToggleButton from "@/components/feature/darkmode/DarkModeToggleButton";
import GuildsModal from "@/components/feature/guilds/GuildsModal";
import NoticeModal from "@/components/feature/notice/NoticeModal";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 맨 위에 있을 때는 항상 표시
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`bg-background fixed left-0 top-0 w-full shadow-sm z-10 py-2 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="lg:max-w-4xl w-full lg:px-0 lg:mx-auto md:px-5 px-4 flex justify-between items-center">
        <h1 className="font-bold text-xl tracking-tight text-foreground">
          심플족보
          <span className="inline-block rounded-full w-1 h-1 ml-0.5 align-[-1px] bg-blue-500"></span>
        </h1>
        <div className="flex">
          <CreateInquiryModal />
          <ContributorsModal />
          <GuildsModal />
          <NoticeModal />
          <DarkModeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
