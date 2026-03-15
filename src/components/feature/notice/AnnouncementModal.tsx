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
import { NOTICE_MODAL_HIDDEN_KEY } from "@/constants";

const AnnouncementModal = () => {
  const [hidden, setHidden] = useLocalStorage(NOTICE_MODAL_HIDDEN_KEY, false);
  const [open, setOpen] = useState(!hidden);
  const [hideNext, setHideNext] = useState(false);

  const handleClose = () => {
    if (hideNext) {
      setHidden(true);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>안내사항</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="text-sm text-foreground space-y-2">
          <p>
            * 신규 문제는 심플족보의 <strong>&apos;문제 등록하기&apos;</strong> 버튼을
            통해 직접 등록하실 수 있습니다.
          </p>
          <p>
            * 인게임과 직접 연동된 서비스가 아니므로, <span className="underline underline-offset-3">신규 문제 일괄 업데이트는 어려운 점 양해 부탁드립니다.</span>
          </p>
        </div>

        <DialogFooter className="mt-2 flex-col gap-3 sm:flex-col">
          <label className="flex items-center gap-2 cursor-pointer w-fit self-end">
            <Checkbox
              checked={hideNext}
              onCheckedChange={(checked) => setHideNext(checked === true)}
            />
            <span className="text-sm text-muted-foreground">다시 보지 않기</span>
          </label>

          <Button onClick={handleClose} className="w-full">
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementModal;
