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
import { Heart } from "lucide-react";
import supabase from "@/lib/supabase";
import { useState, lazy, Suspense } from "react";
import ContributorList from "@/components/feature/contributor-view/ContributorList";
import { useQuery } from "@tanstack/react-query";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type Contributors } from "@/types";
import ReactGA from "react-ga4";

const CreateQuizModal = lazy(() => import("@/components/feature/quiz/CreateQuizModal"));


async function fetchContributors(): Promise<Contributors[]> {
  const { data, error } = await supabase
    .from("contributors_view")
    .select("nickname, count")
    .limit(100);

  if (error) {
    throw error;
  }

  return data;
}

const ContributorsModal = () => {
  const [open, setOpen] = useState(false);

  const {
    data: contributors,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contributors"],
    queryFn: fetchContributors,
    staleTime: Infinity, // 페이지 새로고침 전까지 재요청 안 함
    gcTime: Infinity,
  });

  // GA 이벤트 추적
  const handleContributorsClick = () => {
    ReactGA.event("contributors_modal_open", {
      modal_name: "Contributors",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-auto mx-auto text-foreground"
              onClick={handleContributorsClick}
            >
              <Heart className="size-5!" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>💙 Thanks to... 💙</TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thanks to...</DialogTitle>
          <DialogDescription className="text-xs">
            심플족보에 문제와 답을 등록해주신 분들입니다. 🙏
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <p className="text-center text-gray-500 text-sm py-8">로딩중...</p>
        ) : isError ? (
          <p className="text-center text-sm text-red-500 py-8">
            데이터를 불러오지 못했습니다.
          </p>
        ) : contributors && contributors.length > 0 ? (
          <ContributorList contributors={contributors} open={open} />
        ) : (
          <div className="flex flex-col gap-4 pt-8">
            <p className="text-center text-muted-foreground text-sm">
              👇 심플족보의 첫번째 기여자 되기 👇
            </p>
            <Suspense fallback={null}>
              <CreateQuizModal hasNoRegisteredQuestions={false} />
            </Suspense>
          </div>

        )}

        <DialogFooter>
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

export default ContributorsModal;
