import TermsModal from "@/components/feature/terms/TermsModal";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="mt-14 flex flex-col items-center">
      <p className="text-xs text-foreground/30">
        © {year} spjb. All Rights Reserved.{" "}
      </p>
      <TermsModal />
    </footer>
  );
};

export default Footer;
