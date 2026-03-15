import { Button } from "@/components/ui/button";
import { Music4Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactGA from "react-ga4";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  showPlayer: boolean;
  onToggle: () => void;
}

export default function BGMPlayerToggleButton({ showPlayer, onToggle }: Props) {
  // GA 이벤트 추적
  const handleClick = () => {
    onToggle();

    ReactGA.event("bgm_on_off_click", {
      element: "bgm_toggle_button",
      action: "BGM on/off",
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="fixed left-6 bottom-8 p-6 shadow-sm text-foreground bg-background rounded-full"
          onClick={handleClick}
        >
          <Music4Icon
            className={cn("size-5", {
              "text-blue-600": showPlayer,
              "text-foreground/30": !showPlayer,
            })}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {showPlayer ? "플레이리스트 OFF" : "플레이리스트 ON"}
      </TooltipContent>
    </Tooltip>
  );
}
