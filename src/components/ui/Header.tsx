import CreateInquiryModal from "@/components/feature/inquiry/CreateInquiryModal";
import ContributorsModal from "@/components/feature/contributor-view/ContributorsModal";
import DarkModeToggleButton from "@/components/feature/darkmode/DarkModeToggleButton";

const Header = () => {
  return (
    <header className="bg-background fixed left-0 top-0 w-full shadow-sm z-10 py-0.5">
      <div className="lg:max-w-4xl w-full lg:px-0 lg:mx-auto md:px-5 px-4 flex justify-between items-center">
        <h1 className="font-bold text-xl tracking-tight text-foreground">
          심플족보
          <span className="inline-block rounded-full w-1 h-1 ml-0.5 align-[-1px] bg-blue-500"></span>
        </h1>
        <div className="flex">
          <CreateInquiryModal />
          <ContributorsModal />
          <DarkModeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
