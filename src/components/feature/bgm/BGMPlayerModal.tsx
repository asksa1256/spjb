import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Music4Icon } from "lucide-react";
import { useState } from "react";
import BGMPlayer from "./BGMPlayer";

export default function BGMPlayerModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="w-auto mx-auto text-foreground bg-background rounded-full"
        >
          <Music4Icon className="size-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>BGM 재생</DialogTitle>
          <DialogDescription className="text-xs">
            배경음악을 재생해보세요.
          </DialogDescription>
        </DialogHeader>

        <BGMPlayer />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="!w-auto">
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
