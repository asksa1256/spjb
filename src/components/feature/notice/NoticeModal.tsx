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
import GuildBtnImg from "@/assets/images/guild-btn.png";
import GuildFormImg from "@/assets/images/guild-form.png";
import GuildModalImg from "@/assets/images/guilds-modal.png";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

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
        <TooltipContent>공지사항</TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>공지사항</DialogTitle>
          <DialogDescription className="text-xs"></DialogDescription>
        </DialogHeader>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base font-medium">
              새로운 기능 업데이트 (2025.12.01.)
            </AccordionTrigger>
            <AccordionContent className="text-base text-foreground bg-secondary p-4 rounded-md">
              <p className="mb-4">
                <b>"길드 홍보"</b> 기능이 추가되었습니다.
                <br />
                길드를 둘러보고, 홍보해서 함께 즐겨보세요!
              </p>

              <h4 className="font-bold">*사용 방법*</h4>
              <section className="mb-6">
                <p>1) 길드 버튼 클릭</p>
                <figure>
                  <img src={GuildBtnImg} alt="길드 버튼" />
                </figure>
              </section>

              <section className="mb-6">
                <p>2) 길드 홍보 목록 조회</p>
                <figure>
                  <img src={GuildModalImg} alt="길드 모달" />
                </figure>
                <p className="text-sm">
                  여기서 하단의 '길드 홍보하기'를 통해 길드를 홍보할 수
                  있습니다.
                </p>
              </section>

              <section className="mb-6">
                <p>3) 길드 홍보 등록하기</p>
                <figure>
                  <img src={GuildFormImg} alt="길드 홍보 폼" />
                </figure>
                <p className="text-sm">
                  길드를 홍보하고 싶으신 분은 해당 폼을 제출해주세요!
                  <br />
                  <span className="text-red-500">
                    * 길드는 중복 홍보하실 수 없습니다.
                  </span>
                </p>
              </section>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

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
