import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import ReactGA from "react-ga4";

export default function UserQuestionsModalButton() {
  // GA 이벤트 추적
  const handleClick = () => {
    ReactGA.event("modal_open", {
      modal_name: "user_questions",
    });
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      className="fixed left-6 bottom-8 p-6 shadow-sm text-foreground bg-background rounded-full"
      onClick={handleClick}
    >
      <UserPlus className="size-5" />
    </Button>
  );
}
