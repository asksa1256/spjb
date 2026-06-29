import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import supabase from "@/lib/supabase";
import { buildCsvString } from "@/lib/exportToCsv";
import { toast } from "sonner";
import type { Category } from "@/types";
import { zipSync, strToU8 } from "fflate";

const CATEGORIES: Category[] = [
  "quiz_ox",
  "quiz_kkong",
  "quiz_kkororok",
  "quiz_garo",
];

interface Props {
  className?: string;
}

export default function DownloadCsvButton({ className }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDownload = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const files: Record<string, Uint8Array> = {};

      await Promise.all(
        CATEGORIES.map(async (category) => {
          const { data, error } = await supabase
            .from(category)
            .select("question, answer, nickname, commentary")
            .order("updated_at", { ascending: false });

          if (error) throw error;

          files[`${category}.csv`] = strToU8(buildCsvString(data ?? []));
        }),
      );

      const zipped = zipSync(files);
      const blob = new Blob([zipped], { type: "application/zip" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "spjb_quiz.zip";
      link.click();

      URL.revokeObjectURL(url);

      toast.success("족보 다운로드가 완료됐습니다.");
    } catch (e) {
      console.error(e);
      toast.error("다운로드 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    void handleDownload();
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsConfirmOpen(true)}
            disabled={isLoading}
            className={cn(
              "fixed left-6 bottom-36 p-6 shadow-sm rounded-full bg-background text-foreground transition-colors duration-300",
              className,
            )}
          >
            {isLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <Download className="size-5" />
            )}
            <span className="sr-only">족보 다운로드</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>족보 다운로드</TooltipContent>
      </Tooltip>

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>족보 다운로드</DialogTitle>
            <DialogDescription>
              족보 파일을 다운로드 하시겠습니까?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                취소
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleConfirm}>
              예
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
