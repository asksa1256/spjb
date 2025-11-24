import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import supabase from "@/lib/supabase";
import { sanitize } from "@/lib/sanitize";
import { Input } from "@/components/ui/input";
import { BadgeQuestionMark } from "lucide-react";

const CreateInquiryModal = () => {
  const [contact, setContact] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (inquiry === "") {
        toast.error("문의사항을 입력해주세요.");
        return;
      }

      const createdAt = new Date().toISOString();

      const { error } = await supabase.from("inquiry").insert([
        {
          inquiry: sanitize(inquiry),
          contact: sanitize(contact),
          nickname: sanitize(nickname),
          created_at: createdAt,
        },
      ]);

      if (error) throw error;

      toast.success("문의가 등록되었습니다.");

      setInquiry("");
      setContact("");
      setNickname("");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`문제 추가 실패: ${error.message}`);
      } else {
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-auto mx-auto text-foreground"
        >
          <BadgeQuestionMark className="size-5!" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-4">
          <DialogTitle>문의하기</DialogTitle>
          <DialogDescription>
            중복 문제, 틀린 답 제보, 기타 문의사항을 남겨주세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8">
            <div className="grid gap-3">
              <Textarea
                id="inquiry"
                name="inquiry"
                placeholder="문의사항 입력"
                value={inquiry}
                onChange={(e) => setInquiry(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <label
                htmlFor="contact"
                className="text-sm text-foreground font-medium"
              >
                연락처 <span className="text-gray-400">(선택)</span>
              </label>
              <Input
                id="contact"
                name="contact"
                placeholder="답변을 연락처로 보내드립니다. (예: 이메일, 디스코드 아이디)"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <label
                htmlFor="nickname"
                className="text-sm text-foreground font-medium"
              >
                닉네임 <span className="text-gray-400">(선택)</span>
              </label>
              <Input
                id="nickname"
                name="nickname"
                placeholder="관련 문제에 Thanks to로 표시됩니다."
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">닫기</Button>
            </DialogClose>
            <Button type="submit">
              {isSubmitting ? "등록 중..." : "등록하기"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInquiryModal;
