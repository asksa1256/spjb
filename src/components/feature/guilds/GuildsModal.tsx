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
import GuildPromotionModal from "./GuildPromotionModal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type Guild } from "./GuildList";
import { ShieldCheck } from "lucide-react";
import ReactGA from "react-ga4";

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

  // GA 이벤트 추적
  const handleGuildsClick = () => {
    ReactGA.event("guilds_modal_open", {
      modal_name: "Guilds",
    });
  };

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
              onClick={handleGuildsClick}
            >
              <ShieldCheck className="size-5!" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>길드</TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>길드</DialogTitle>
          <DialogDescription className="text-xs">
            길드를 홍보하거나 둘러볼 수 있는 공간입니다.
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
              아직 등록된 길드가 없어요!
              <br />
              <span className="mt-2 block text-foreground">
                👇 첫번째로 길드 홍보하기 👇
              </span>
            </p>
            <GuildPromotionModal />
          </div>
        )}

        <DialogFooter className="mt-6">
          {guilds && guilds.length > 0 && <GuildPromotionModal />}

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
