import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Snowflake } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { type Dispatch, type SetStateAction, useRef, useEffect } from "react";
import debounce from "@/lib/debounce";
import ReactGA from "react-ga4";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SnowConfigs {
  showSnow: boolean;
  snowflakeCount: number;
  onChangeShow: Dispatch<SetStateAction<boolean>>;
  onChangeCount: (v: number[]) => void;
  snowType: "snow" | "cherry";
  onChangeSnowType: (type: "snow" | "cherry") => void;
  className?: string;
}

export default function SnowConfigButton({
  className,
  showSnow,
  snowflakeCount,
  onChangeShow,
  onChangeCount,
  snowType,
  onChangeSnowType,
}: SnowConfigs) {
  // 눈송이 갯수 조절 슬라이더 디바운싱
  const debouncedChangeCount = useRef(
    debounce((value: number[]) => {
      onChangeCount(value);
    }, 300)
  ).current;

  useEffect(() => {
    return () => {
      debouncedChangeCount.cancel();
    };
  }, [debouncedChangeCount]);

  // GA 이벤트 추적
  const handleClick = () => {
    ReactGA.event("snow_config_modal_open", {
      modal_name: "눈 내리기 설정",
    });
  };

  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              type="button"
              size="icon"
              onClick={handleClick}
              className={cn(
                "fixed z-1 left-6 bottom-22 transition-colors bg-background rounded-full shadow-sm p-6 hover:bg-blue-100 hover:text-blue-500",
                {
                  "text-blue-500": showSnow,
                  "text-foreground/20": !showSnow,
                },
                className
              )}
            >
              <Snowflake className="size-6" />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>
          눈 내리기
        </TooltipContent>
      </Tooltip>
      <PopoverContent className="w-64 ml-4 mb-2 p-4 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="snow-toggle"
            className="text-sm font-medium text-foreground/70 cursor-pointer hover:text-blue-600 transition-colors"
          >
            눈 내리기
          </label>
          <Switch
            id="snow-toggle"
            checked={showSnow}
            onCheckedChange={onChangeShow}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground/70">
            이펙트 종류
          </label>
          <div className="flex rounded-lg overflow-hidden border border-border">
            <button
              type="button"
              onClick={() => onChangeSnowType("snow")}
              className={cn(
                "flex-1 text-xs py-1.5 transition-colors",
                snowType === "snow"
                  ? "bg-blue-100 text-blue-600 font-bold"
                  : "text-foreground/50 hover:bg-muted"
              )}
            >
              ❄️ 눈
            </button>
            <button
              type="button"
              onClick={() => onChangeSnowType("cherry")}
              className={cn(
                "flex-1 text-xs py-1.5 transition-colors border-l border-border",
                snowType === "cherry"
                  ? "bg-pink-100 text-pink-500 font-bold"
                  : "text-foreground/50 hover:bg-muted"
              )}
            >
              🌸 벚꽃
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-foreground/70">
              {snowType === "cherry" ? "꽃잎" : "눈송이"} 개수
            </label>
            <span className={cn(
              "text-xs font-bold px-2 py-0.5 rounded-full",
              snowType === "cherry"
                ? "text-pink-500 bg-pink-50"
                : "text-blue-500 bg-blue-50"
            )}>
              {snowflakeCount}개
            </span>
          </div>
          <Slider
            defaultValue={[snowflakeCount]}
            max={300}
            step={10}
            onValueChange={debouncedChangeCount}
            className="w-full"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
