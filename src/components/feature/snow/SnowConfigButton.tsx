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

interface SnowConfigs {
  showSnow: boolean;
  snowflakeCount: number;
  onChangeShow: Dispatch<SetStateAction<boolean>>;
  onChangeCount: (v: number[]) => void;
  className?: string;
}

export default function SnowConfigButton({
  className,
  showSnow,
  snowflakeCount,
  onChangeShow,
  onChangeCount,
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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          size="icon"
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

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-foreground/70">
              눈송이 개수
            </label>
            <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">
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
