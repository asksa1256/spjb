import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Megaphone } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NoticeContents from "./NoticeContents";

const NoticeModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-auto mx-auto text-foreground"
            >
              <Megaphone className="size-5!" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>공지</TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>공지사항</DialogTitle>
          <DialogDescription className="text-xs"></DialogDescription>
        </DialogHeader>

        <NoticeContents />

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline" className="!w-auto">
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NoticeModal;
