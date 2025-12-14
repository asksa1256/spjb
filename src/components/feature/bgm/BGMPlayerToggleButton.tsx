import { Button } from "@/components/ui/button";
import { Music4Icon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  showPlayer: boolean;
  onToggle: () => void;
}

export default function BGMPlayerToggleButton({ showPlayer, onToggle }: Props) {
  return (
    <Button
      variant="secondary"
      size="icon"
      className="fixed left-6 bottom-8 p-6 shadow-sm text-foreground bg-background rounded-full"
      onClick={onToggle}
    >
      <Music4Icon
        className={cn("size-5", {
          "text-blue-600": showPlayer,
          "text-foreground/30": !showPlayer,
        })}
      />
    </Button>
  );
}
