import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { DialogDescription } from "@radix-ui/react-dialog";
import supabase from "@/lib/supabase";

export interface PlaylistItem {
  title: string;
  video_id: string;
  video_url: string; // 사용자 편의를 위한 전체 URL 값 유지
}

interface PlaylistConfigProps {
  isOpen: boolean;
  onClose: () => void;
  playlist: PlaylistItem[];
  onSave: (playlist: PlaylistItem[]) => void;
}

const extractVideoId = (input: string) => {
  try {
    // 비디오 ID만 입력한 경우
    if (!input.includes("youtube.com") && !input.includes("youtu.be")) {
      return input.trim();
    }

    // youtu.be/xxxx
    if (input.includes("youtu.be")) {
      return input.split("youtu.be/")[1].split("?")[0];
    }

    // youtube.com/watch?v=xxxx
    const url = new URL(input);
    return url.searchParams.get("v") || "";
  } catch {
    return "";
  }
};

export default function PlayerConfigDialog({
  isOpen,
  onClose,
  playlist,
  onSave,
}: PlaylistConfigProps) {
  const [tempPlaylist, setTempPlaylist] = useState<PlaylistItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      setTempPlaylist([...playlist]);
    }
  }, [isOpen, playlist]);

  const handleAddItem = () => {
    setTempPlaylist([
      ...tempPlaylist,
      { title: "", video_id: "", video_url: "" },
    ]);
  };

  const handleRemoveItem = (targetIdx: number) => {
    setTempPlaylist(tempPlaylist.filter((_, i) => i !== targetIdx));
  };

  const handleUpdateItem = (
    i: number,
    field: keyof PlaylistItem,
    value: string
  ) => {
    setTempPlaylist((prev) =>
      prev.map((item, index) =>
        index === i ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = async () => {
    const normalizedPlaylist = tempPlaylist
      .map((item) => ({
        ...item,
        video_id: extractVideoId(item.video_url), // prop으로는 video_id만 전달
        video_url: item.video_url, // 폼 필드에는 전체 url 유지
      }))
      .filter((item) => item.video_id !== "");

    if (normalizedPlaylist.length === 0) {
      toast.error("최소 1개 이상의 비디오 링크를 입력해주세요.");
      return;
    }

    onSave(normalizedPlaylist);

    // db에 bgm 저장
    await supabase.from("bgm").insert(
      normalizedPlaylist.map((item) => ({
        title: item.title,
        url: item.video_url,
      }))
    );

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>플레이리스트 편집</DialogTitle>
          <DialogDescription className="text-sm text-foreground/50 text-left">
            유튜브 동영상 링크 추가/삭제로 플레이리스트를 편집할 수 있습니다.
            <br />
            <span className="flex gap-1 items-center">
              <TriangleAlert className="size-3" /> 데이터 환경에서는 사용량이
              급증할 수 있으니 주의해주세요.
            </span>
          </DialogDescription>
        </DialogHeader>

        <ul className="flex flex-col gap-4 max-h-[400px] overflow-y-auto text-foreground">
          {tempPlaylist.map((item, i) => (
            <li
              key={i}
              className="flex gap-2 items-start p-4 border-2 rounded-lg"
            >
              <div className="flex-1 space-y-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor={`video-${i}`} className="text-sm">
                    비디오 링크<sup className="text-red-500">*</sup>
                  </label>
                  <Input
                    id={`video-${i}`}
                    value={item.video_url}
                    onChange={(e) =>
                      handleUpdateItem(i, "video_url", e.target.value)
                    }
                    placeholder="유튜브 동영상 링크 또는 동영상 ID"
                    required
                    className="text-xs"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor={`title-${i}`} className="text-sm">
                    제목
                  </label>
                  <Input
                    id={`title-${i}`}
                    value={item.title}
                    onChange={(e) =>
                      handleUpdateItem(i, "title", e.target.value)
                    }
                    placeholder="곡/플레이리스트 제목 (선택사항)"
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveItem(i)}
                className="mt-6 hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </Button>
            </li>
          ))}
        </ul>

        <Button onClick={handleAddItem} variant="outline" className="w-full">
          <Plus className="size-4" />
          비디오 추가
        </Button>

        <div className="flex gap-2 pt-4">
          <Button onClick={handleSave} className="flex-1">
            저장
          </Button>
          <Button onClick={onClose} variant="outline" className="flex-1">
            취소
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
