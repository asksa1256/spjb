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
import useLocalStorage from "@/hooks/useLocalStorage";
import { NOTICE_STORAGE_KEY, NOTICE_VERSION } from "@/constants";
import ReactGA from "react-ga4";

const NoticeModal = () => {
  const [open, setOpen] = useState(false);

  // GA 이벤트 추적
  const handleNoticeClick = () => {
    ReactGA.event({
      category: "Modal",
      action: "Open",
      label: "Notice",
    });
  };

  const [lastCheckedVersion, setLastCheckedVersion] = useLocalStorage<
    string | null
  >(NOTICE_STORAGE_KEY, null);

  // 파생 상태
  const hasUnread = lastCheckedVersion !== NOTICE_VERSION;

  const handleOpenChange = (v: boolean) => {
    setOpen(v);

    if (v) {
      setLastCheckedVersion(NOTICE_VERSION);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative w-auto mx-auto text-foreground"
              onClick={handleNoticeClick}
            >
              <Megaphone className="size-5!" />
              {hasUnread && (
                <span className="absolute top-2 right-1.5 size-1.5 rounded-full bg-red-500 outline-2 outline-background" />
              )}
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
