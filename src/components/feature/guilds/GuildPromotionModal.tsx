import { Button } from "@/components/ui/button";
import {
  Dialog,
  // DialogClose,
  DialogContent,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import GuildPromotionForm from "./GuildPromotionForm";

const GuildPromotionModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-auto">길드 홍보하기</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>길드 홍보</DialogTitle>
          <DialogDescription className="text-xs">
            길드를 소개하고 새로운 멤버를 모집해보세요.
          </DialogDescription>
        </DialogHeader>

        <GuildPromotionForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default GuildPromotionModal;
