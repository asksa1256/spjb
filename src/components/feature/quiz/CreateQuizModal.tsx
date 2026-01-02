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
import { Input } from "@/components/ui/input";
import { Textarea } from "../../ui/textarea";
import CategorySelect from "../search/CategorySelect";
import { useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import supabase from "@/lib/supabase";
import { sanitize } from "@/lib/sanitize";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CreateQuizModal = () => {
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (category === "" || question === "" || answer === "") {
        toast.error("카테고리, 문제, 답을 필수로 입력해주세요.");
        return;
      }

      const tableName = `${category}`;

      const createdAt = new Date().toISOString();

      const { error } = await supabase.from(tableName).insert([
        {
          question: question.trim(),
          answer: answer.trim(),
          created_at: createdAt,
          nickname: nickname ? sanitize(nickname.trim()) : null,
        },
      ]);

      if (error) throw error;

      toast.success("문제가 성공적으로 추가되었습니다!");

      queryClient.invalidateQueries({ queryKey: ["quiz", category] });

      setQuestion("");
      setAnswer("");
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
              variant="outline"
              size="lg"
              className="w-auto mx-auto hover:bg-blue-50 hover:border-blue-300 hover:text-blue-500 dark:hover:bg-secondary dark:hover:border-gray-600"
            >
              <Plus className="-mr-1" />
              문제 추가하기
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">찾는 문제가 없으셨나요?</TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-4">
          <DialogTitle>문제 추가하기</DialogTitle>
          <DialogDescription>
            카테고리를 선택한 후, 문제와 답을 입력해주세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8">
            <div className="grid gap-2">
              <label
                htmlFor="category"
                className="text-sm text-foreground font-medium"
              >
                카테고리
              </label>
              <CategorySelect
                id="category"
                value={category}
                onChange={(v) => setCategory(v)}
              />
            </div>
            <div className="grid gap-3">
              <label
                htmlFor="question"
                className="text-sm text-foreground font-medium"
              >
                문제
              </label>
              <Textarea
                id="question"
                name="question"
                placeholder="문제 입력"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <label
                htmlFor="answer"
                className="text-sm text-foreground font-medium"
              >
                답
              </label>
              <Textarea
                id="answer"
                name="answer"
                placeholder="답 입력"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
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
                placeholder="등록하신 문제에 Thanks to로 표시됩니다."
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
              {isSubmitting ? "추가 중..." : "추가하기"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuizModal;
