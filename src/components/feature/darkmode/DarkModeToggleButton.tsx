import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { type Theme, useTheme } from "@/hooks/useDarkMode";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ReactGA from "react-ga4";

interface Props {
  className?: string;
}

const themeOptions: Array<{
  value: Theme;
  label: string;
  description: string;
  Icon: typeof Sun;
}> = [
  {
    value: "light",
    label: "라이트 모드",
    description: "파스텔톤 무지개 배경",
    Icon: Sun,
  },
  {
    value: "default",
    label: "기본 모드",
    description: "흰색 배경",
    Icon: Monitor,
  },
  {
    value: "dark",
    label: "다크 모드",
    description: "어두운 배경",
    Icon: Moon,
  },
];

export default function DarkModeToggleButton({ className }: Props) {
  const [open, setOpen] = useState(false);
  const { theme, changeTheme } = useTheme();
  const CurrentIcon = themeOptions.find((option) => option.value === theme)!.Icon;

  const handleThemeChange = (nextTheme: Theme) => {
    changeTheme(nextTheme);
    setOpen(false);

    ReactGA.event("theme_select_click", {
      element: "theme_selection_modal",
      theme: nextTheme,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              type="button"
              size="icon"
              aria-label="테마 선택"
              className={cn(
                "relative transition-colors duration-300 bg-transparent text-foreground",
                className,
              )}
            >
              <CurrentIcon className="size-5" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>테마 선택</TooltipContent>
      </Tooltip>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>테마 선택</DialogTitle>
          <DialogDescription>
            원하는 화면 테마를 선택해 주세요.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          {themeOptions.map(({ value, label, description, Icon }) => {
            const isSelected = theme === value;

            return (
              <Button
                key={value}
                type="button"
                variant="outline"
                onClick={() => handleThemeChange(value)}
                className={cn(
                  "h-auto justify-start gap-3 rounded-lg px-4 py-3 text-left",
                  isSelected && "border-primary bg-primary-background",
                )}
              >
                <Icon className="size-5 shrink-0" />
                <span className="flex flex-1 flex-col gap-0.5">
                  <span>{label}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {description}
                  </span>
                </span>
                {isSelected && <Check className="size-5 shrink-0" />}
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}