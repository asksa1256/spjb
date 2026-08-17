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
import { useState } from "react";
import { toast } from "sonner";
import supabase from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { BadgeQuestionMark } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { INQUIRY_CATEGORIES } from "@/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InquiryCategoryFormValues {
  category: string;
}

const CreateInquiryModal = () => {
  const [contact, setContact] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryCategoryFormValues>({
    defaultValues: { category: "" },
  });

  const onSubmit = async ({ category }: InquiryCategoryFormValues) => {
    setIsSubmitting(true);

    try {
      if (inquiry === "") {
        toast.error("문의사항을 입력해주세요.");
        return;
      }

      const createdAt = new Date().toISOString();

      const { error } = await supabase.from("inquiry").insert([
        {
          category,
          inquiry,
          contact,
          created_at: createdAt,
        },
      ]);

      if (error) throw error;

      toast.success("문의가 등록되었습니다.");

      setInquiry("");
      setContact("");
      reset();
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
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-auto mx-auto text-foreground"
            >
              <BadgeQuestionMark className="size-5!" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">문의하기</TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-4">
          <DialogTitle>문의하기</DialogTitle>
          <DialogDescription>
            중복 문제, 틀린 답 제보, 기타 문의/건의 사항을 남겨주세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-8">
            <div className="grid gap-2">
              <label
                htmlFor="category"
                className="text-sm text-foreground font-medium"
              >
                문의 카테고리
              </label>
              <Controller
                name="category"
                control={control}
                rules={{ required: "카테고리를 선택해주세요." }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="category"
                      className={errors.category ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {INQUIRY_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-xs text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="grid gap-3">
              <label
                htmlFor="nickname"
                className="text-sm text-foreground font-medium"
              >
                내용
              </label>
              <Textarea
                id="inquiry"
                name="inquiry"
                placeholder="내용 입력"
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
                className="text-sm"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
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
