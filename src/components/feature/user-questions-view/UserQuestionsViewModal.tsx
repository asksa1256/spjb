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
import { UserPlus, Loader2 } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ReactGA from "react-ga4";
import type { TableNames } from "@/types";
import { useUserQuestions } from "@/hooks/useUserQuestions";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserQuestionsViewModal = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TableNames>("quiz_ox");

  const { data, isPending, isError } = useUserQuestions(activeTab, open);

  // GA 이벤트 추적
  const handleClick = () => {
    ReactGA.event("modal_open", {
      modal_name: "user_questions",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="fixed left-6 bottom-36 p-6 shadow-sm text-foreground bg-background rounded-full"
              onClick={handleClick}
            >
              <UserPlus className="size-5" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>유저 출제</TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-[425px] h-[80vh]">
        <DialogHeader>
          <DialogTitle>유저 출제 목록</DialogTitle>
          <DialogDescription className="text-xs">
            심플족보에 등록된 유저 출제 신규 문제들입니다.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as TableNames)}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="quiz_ox">OX/XO</TabsTrigger>
            <TabsTrigger value="quiz_kkororok">꼬로록/올라</TabsTrigger>
            <TabsTrigger value="quiz_kkong">꽁꽁</TabsTrigger>
          </TabsList>

          <div className="text-gray-400 text-xs mt-1.5 ml-0.5">
            <span className="bg-background mr-1 py-0.5 p-1 rounded-sm shadow-sm">
              ctrl
            </span>
            +
            <span className="bg-background mr-1 py-0.5 p-1 rounded-sm shadow-sm">
              F
            </span>
            : 검색
          </div>

          <div className="relative flex-1 overflow-y-auto">
            {isPending ? (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <Loader2 className="animate-spin" />
              </div>
            ) : isError ? (
              <div className="text-center py-20 text-red-500">
                에러가 발생했습니다.
              </div>
            ) : (
              <ul>
                {data?.allData.length ? (
                  data.allData.map((item, idx) => (
                    <li
                      key={idx}
                      className="py-3 border-b last:border-0 break-keep"
                    >
                      <p className="text-sm">
                        <div className="flex gap-1">
                          <span className="text-foreground/50">Q.</span>{" "}
                          <p className="text-foreground/80">{item.question}</p>
                        </div>
                      </p>
                      <p className="text-sm">
                        <div className="flex gap-1">
                          <span className="text-foreground/50">A.</span>{" "}
                          <b className="text-blue-600">
                            {item.answer}{" "}
                            {item.nickname && (
                              <span className="ml-1 text-foreground/50 text-xs font-normal">
                                (등록: {item.nickname})
                              </span>
                            )}
                          </b>
                        </div>
                      </p>
                      {item.commentary && (
                        <details className="mt-1 text-xs text-foreground/50">
                          <summary>해설</summary>
                          <p>{item.commentary}</p>
                        </details>
                      )}
                    </li>
                  ))
                ) : (
                  <div className="text-center py-20 text-muted-foreground">
                    데이터가 없습니다.
                  </div>
                )}
              </ul>
            )}
          </div>
        </Tabs>

        <DialogFooter className="p-4 border-t bg-background">
          <DialogClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserQuestionsViewModal;
