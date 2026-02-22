import { Button } from "@/components/ui/button";
import { AppWindow } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ReactGA from "react-ga4";

interface Props {
  className?: string;
}

export default function PopupModeButton({ className }: Props) {
  const handleClick = () => {
    ReactGA.event("popup_mode_click", {
      element: "popup_mode_button",
      action: "팝업창 모드 실행",
    });

    const width = 414;
    const height = 896;

    // 중앙 배치 계산
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      window.location.href,
      "PopupMode",
      `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes`
    );
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          size="icon"
          onClick={handleClick}
          className={cn(
            "relative transition-colors duration-300 bg-transparent text-foreground",
            className
          )}
        >
          <AppWindow className="size-5" />
          <span className="sr-only">팝업창 모드</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>팝업창 모드</TooltipContent>
    </Tooltip>
  );
}
