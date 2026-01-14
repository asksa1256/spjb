import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useDarkMode";
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

export default function DarkModeToggleButton({ className }: Props) {
  const { theme, toggleTheme } = useTheme();

  // GA 이벤트 추적
  const handleClick = () => {
    toggleTheme();

    ReactGA.event({
      category: "Modal",
      action: "Open",
      label: "Contributors",
    });
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
          {/* 라이트 모드 */}
          <Sun
            className={`
          size-5 transition-all duration-300
          ${
            theme === "dark"
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }
        `}
          />

          {/* 다크 모드 */}
          <Moon
            className={`
          absolute size-5 transition-all duration-300
          ${
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }
        `}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {theme === "dark" ? "라이트" : "다크"} 모드
      </TooltipContent>
    </Tooltip>
  );
}
