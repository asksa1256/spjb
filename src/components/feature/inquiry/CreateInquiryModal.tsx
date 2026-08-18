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
import { BadgeQuestionMark, Eye, EyeOff } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InquiryBoard from "./InquiryBoard";

interface InquiryCategoryFormValues {
  category: string;
}

const CreateInquiryModal = () => {
  const [contact, setContact] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("create");
  const [boardRefreshKey, setBoardRefreshKey] = useState(0);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryCategoryFormValues>({
    defaultValues: { category: "" },
  });

  const onSubmit = async ({ category }: InquiryCategoryFormValues) => {
    if (!inquiry.trim()) {
      toast.error("문의사항을 입력해주세요.");
      return;
    }
    if (password.length !== 8) {
      toast.error("비밀번호는 8자로 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.rpc("create_inquiry", {
        p_category: category,
        p_inquiry: inquiry.trim(),
        p_contact: contact.trim() || null,
        p_nickname: null,
        p_password: password,
      });

      if (error) throw error;

      toast.success("문의가 등록되었습니다.");

      setInquiry("");
      setContact("");
      setPassword("");
      setIsPasswordVisible(false);
      reset();
      setBoardRefreshKey((key) => key + 1);
      setActiveTab("history");
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

      <DialogContent className="flex max-h-[90dvh] w-[calc(100%-1rem)] max-w-[calc(100%-1rem)] min-w-0 flex-col overflow-hidden p-4 sm:max-w-[680px] sm:p-6">
        <DialogHeader className="shrink-0 pr-6">
          <DialogTitle>문의하기</DialogTitle>
          <DialogDescription>
            문의를 등록하거나 다른 이용자의 문의 처리 현황을 확인할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="min-h-0 min-w-0 flex-1 overflow-hidden">
          <TabsList className="grid w-full min-w-0 shrink-0 grid-cols-2">
            <TabsTrigger value="create">문의 등록</TabsTrigger>
            <TabsTrigger value="history">문의내역</TabsTrigger>
          </TabsList>
          <TabsContent value="create" className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-1 pb-1 pt-3">
            <form autoComplete="off" data-form-type="other" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-5">
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
                maxLength={500}
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
                name="inquiry-contact"
                autoComplete="off"
                data-1p-ignore
                data-lpignore="true"
                data-form-type="other"
                placeholder="추가적인 답변이 필요한 경우, 입력하신 연락처로 회신됩니다. (예: 이메일, 디스코드 아이디)"
                className="text-sm"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <label htmlFor="inquiry-password" className="text-sm text-foreground font-medium">비밀번호</label>
              <div className="relative">
                <Input
                  id="inquiry-password"
                  name="inquiry-write-code"
                  type={isPasswordVisible ? "text" : "password"}
                  autoComplete="new-password"
                  data-1p-ignore
                  data-lpignore="true"
                  data-form-type="other"
                  placeholder="수정 시 사용할 비밀번호 (8자)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  maxLength={8}
                  required
                  className="pr-10 text-sm"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                  aria-label={isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
                  aria-pressed={isPasswordVisible}
                  onClick={() => setIsPasswordVisible((visible) => !visible)}
                >
                  {isPasswordVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">※ 비밀번호는 문의 수정 시 필요합니다.</p>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">닫기</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "등록 중..." : "등록하기"}
            </Button>
          </DialogFooter>
        </form>
          </TabsContent>
          <TabsContent value="history" className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain pt-3">
            <InquiryBoard refreshKey={boardRefreshKey} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInquiryModal;
