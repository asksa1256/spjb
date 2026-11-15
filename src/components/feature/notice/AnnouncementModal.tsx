import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  ANNOUNCEMENT_SEEN_KEY,
  ANNOUNCEMENT_VERSION,
  NOTICE_MODAL_HIDDEN_KEY,
  OPEN_OPERATIONS_NOTICE_EVENT,
} from "@/constants";

const getToday = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const AnnouncementModal = () => {
  const [hiddenDate, setHiddenDate] = useLocalStorage<string | null>(
    NOTICE_MODAL_HIDDEN_KEY,
    null,
  );
  const [seenVersion, setSeenVersion] = useLocalStorage<string | null>(
    ANNOUNCEMENT_SEEN_KEY,
    null,
  );
  const isFirstView = seenVersion !== ANNOUNCEMENT_VERSION;
  const [open, setOpen] = useState(
    isFirstView || hiddenDate !== getToday(),
  );
  const [hideNext, setHideNext] = useState(false);

  const handleClose = () => {
    setSeenVersion(ANNOUNCEMENT_VERSION);
    if (hideNext) {
      setHiddenDate(getToday());
    }
    setOpen(false);
  };

  const handleOpenNotice = () => {
    handleClose();
    window.setTimeout(() => {
      window.dispatchEvent(new Event(OPEN_OPERATIONS_NOTICE_EVENT));
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>서비스 운영 종료 안내</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="text-sm text-foreground space-y-2">
          <p>
            서버 운영 비용 증가로 인해 심플족보는 2026년 11월 30일까지 운영되며,
            2026년 12월 1일부터 서비스를 종료합니다. 그동안 이용해주셔서
            감사합니다.
          </p>
        </div>

        <DialogFooter className="mt-2 flex-col gap-3 sm:flex-col">
          <label className="flex items-center gap-2 cursor-pointer w-fit self-end">
            <Checkbox
              checked={hideNext}
              onCheckedChange={(checked) => setHideNext(checked === true)}
            />
            <span className="text-sm text-muted-foreground">
              오늘 하루 보지 않기
            </span>
          </label>

          <Button variant="outline" onClick={handleOpenNotice} className="w-full">
            공지글 확인하기
          </Button>
          <Button onClick={handleClose} className="w-full">
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementModal;
