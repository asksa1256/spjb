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
import supabase from "@/lib/supabase";
import { useState } from "react";
import GuildList from "./GuildList";
import { useQuery } from "@tanstack/react-query";
import CreateQuizModal from "@/components/feature/quiz/CreateQuizModal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type Guild } from "./GuildList";
import { ShieldCheck } from "lucide-react";

async function fetchGuilds(): Promise<Guild[]> {
  const { data, error } = await supabase
    .from("guilds")
    .select("*")
    .order("created_at", { ascending: false }); // 최신순

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

const GuildsModal = () => {
  const [open, setOpen] = useState(false);

  const {
    data: guilds,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["guilds"],
    queryFn: fetchGuilds,
    staleTime: Infinity,
    gcTime: Infinity,
  });

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
              <ShieldCheck className="size-5!" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>길드 홍보</TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>길드 </DialogTitle>
          <DialogDescription className="text-xs">
            길드 홍보 공간입니다. 길드를 통해 더 재밌게 즐겨봐요!
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <p className="text-center text-gray-500 text-sm py-8">로딩중...</p>
        )}

        {isError && (
          <p className="text-center text-sm text-gray-500 py-8">
            데이터를 불러오지 못했습니다.
          </p>
        )}

        {guilds && guilds.length > 0 ? (
          <GuildList guilds={guilds} />
        ) : (
          <div className="flex flex-col gap-4 pt-8">
            <p className="text-center text-muted-foreground text-sm">
              👇 길드 홍보하기 👇
            </p>
            <CreateQuizModal />
          </div>
        )}

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

export default GuildsModal;
