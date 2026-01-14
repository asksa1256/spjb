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
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import supabase from "@/lib/supabase";
import { Plus } from "lucide-react";
import { quizFormSchema, type QuizFormValues } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

const CreateQuizModal = () => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      category: "",
      question: "",
      answer: "",
      nickname: "",
    },
  });

  const onSubmit = async (data: QuizFormValues) => {
    try {
      const { error } = await supabase.from(data.category).insert([
        {
          question: data.question,
          answer: data.answer,
          created_at: new Date().toISOString(),
          nickname: data.nickname || null,
        },
      ]);

      if (error) throw error;

      toast.success("문제가 성공적으로 추가되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["quiz", data.category] });

      // 성공 시 문제, 답 입력창 초기화 (카테고리, 닉네임은 유지)
      reset({ ...data, question: "", answer: "", commentary: "" });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "알 수 없는 오류 발생";
      toast.error(`문제 추가 실패: ${message}`);
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="w-auto mx-auto hover:bg-blue-50 hover:border-blue-300 hover:text-blue-500 dark:hover:bg-secondary dark:hover:border-gray-600"
        >
          <Plus className="-mr-1" />
          문제 등록하기
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-4">
          <DialogTitle>문제 추가하기</DialogTitle>
          <DialogDescription>
            카테고리를 선택한 후, 문제와 답을 입력해주세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-8">
            {/* 카테고리 */}
            <div className="grid gap-2">
              <label
                htmlFor="category"
                className="text-sm text-foreground font-medium"
              >
                카테고리
              </label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <CategorySelect
                    id="category"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.category && (
                <p className="text-xs text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* 문제 */}
            <div className="grid gap-3">
              <label
                htmlFor="question"
                className="text-sm text-foreground font-medium"
              >
                문제
              </label>
              <Controller
                name="question"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="question"
                    placeholder="문제를 입력해주세요."
                    className={errors.question ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.question && (
                <p className="text-xs text-red-500">
                  {errors.question.message}
                </p>
              )}
            </div>

            {/* 답 */}
            <div className="grid gap-3">
              <label
                htmlFor="answer"
                className="text-sm text-foreground font-medium"
              >
                답
              </label>
              <Controller
                name="answer"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="answer"
                    placeholder="답을 입력해주세요."
                    className={errors.answer ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.answer && (
                <p className="text-xs text-red-500">{errors.answer.message}</p>
              )}
            </div>

            {/* 닉네임 */}
            <div className="grid gap-3">
              <label
                htmlFor="nickname"
                className="text-sm text-foreground font-medium"
              >
                닉네임 <span className="text-gray-400">(선택)</span>
              </label>
              <Controller
                name="nickname"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="nickname"
                    placeholder="Thanks to에 표시될 닉네임"
                    className="text-sm"
                  />
                )}
              />
            </div>

            {/* 해설 */}
            <div className="grid gap-3">
              <label
                htmlFor="answer"
                className="text-sm text-foreground font-medium"
              >
                해설
              </label>
              <Controller
                name="commentary"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="answer"
                    placeholder="해설을 입력해주세요. (선택)"
                    className={errors.answer ? "border-red-500" : ""}
                  />
                )}
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
