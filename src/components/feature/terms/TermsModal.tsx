import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const TermsModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-foreground/40">
          이용약관
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>이용약관</DialogTitle>
        </DialogHeader>

        <p className="break-keep text-center">
          심플족보는
          <br />
          <span className="text-blue-500">
            메이플스토리 월드 - 큐플레이 아카이브
          </span>
          의<br />
          지적 자산을 이용하여 제작되었습니다.
        </p>

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

export default TermsModal;
