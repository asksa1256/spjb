import { useState, useCallback, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  FastForward,
  Rewind,
  Volume2,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import YouTube, { type YouTubePlayer } from "react-youtube";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import PlayerConfigDialog from "./PlayerConfigDialog";
import { type PlaylistItem } from "./PlayerConfigDialog";

const DEFAULT_PLAYLIST = [
  {
    title: "연말·연초, 기분 업 플레이리스트☺️🎧",
    video_id: "XEr1TPlrLfs",
  },
  {
    title: "퍼펙트 크리스마스 캐롤 플레이리스트🎄🎅🎁",
    video_id: "q-ZFpbrokMg",
  },
  {
    title:
      "𝑷𝒍𝒂𝒚𝒍𝒊𝒔𝒕 | 전세계 산타도 인정한 K-캐롤의 끝판왕🎅 국내 케이팝 크리스마스 캐롤 플리🎄",
    video_id: "J6EvulKEsmQ",
  },
];

export default function BGMPlayer({ className }: { className?: string }) {
  const [playlist, setPlaylist] = useState(DEFAULT_PLAYLIST);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const playerRef = useRef<YouTubePlayer | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentIdx, setCurrentIdx] = useState(0);

  const onReady = (e: { target: YouTubePlayer }) => {
    playerRef.current = e.target;
    e.target.setVolume(volume);
    setIsReady(true);
  };

  const playVideo = () => {
    if (!playerRef.current) return;
    playerRef.current.playVideo();
  };

  const pauseVideo = () => {
    playerRef.current?.pauseVideo();
  };

  const playNext = useCallback(() => {
    if (playlist.length === 0) return;
    setCurrentIdx((prev) => (prev + 1) % playlist.length);
  }, [playlist.length]);

  const playPrev = useCallback(() => {
    if (playlist.length === 0) return;
    setCurrentIdx((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
  }, [playlist.length]);

  const setPlayerVolume = useCallback((v: number) => {
    playerRef.current?.setVolume(v);
    setVolume(v);
  }, []);

  const onStateChange = useCallback(
    (e: { data: number }) => {
      if (e.data === 1) {
        setIsPlaying(true);
      }
      if (e.data === 0) {
        if (playlist.length > 1) {
          playNext();
        }
      }
      if (e.data === 2) {
        setIsPlaying(false);
      }
    },
    [playNext, playlist.length]
  );

  const handleSavePlaylist = (newPlaylist: PlaylistItem[]) => {
    if (newPlaylist.length === 0) return;
    setPlaylist(newPlaylist);
    setCurrentIdx(0);
  };

  const opts = {
    width: "1",
    height: "1",
    playerVars: {
      loop: 1 as const,
      autoplay: 0 as const,
      rel: 0 as const,
    },
  };

  useEffect(() => {
    const videoId = playlist[currentIdx]?.video_id;
    if (!isReady || !playerRef.current || !videoId) return;

    try {
      playerRef.current.loadVideoById(videoId);
    } catch (e) {
      console.error("비디오 로드 실패: ", e);
    }
  }, [currentIdx, isReady, playlist]);

  const titleRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [marqueeStyle, setMarqueeStyle] = useState<React.CSSProperties>({});

  // marquee config
  useEffect(() => {
    const title = titleRef.current;
    const wrapper = wrapperRef.current;
    if (!title || !wrapper) return;

    const overflow = title.scrollWidth > wrapper.clientWidth;
    setIsOverflow(overflow);

    if (!overflow) {
      setMarqueeStyle({});
      return;
    }

    const distance = title.scrollWidth - wrapper.clientWidth;
    setMarqueeStyle({
      "--marquee-distance": `-${distance}px`,
      "--marquee-duration": `${Math.max(distance / 12, 10)}s`,
    } as React.CSSProperties);
  }, [currentIdx, playlist]);

  return (
    <section
      className={cn(
        "p-4 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg text-foreground",
        className
      )}
    >
      <YouTube
        videoId={playlist[0]?.video_id}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
        className="absolute -left-[9999px]"
      />

      <div className="flex flex-col gap-2">
        <div className="flex flex-col w-[90%] mx-auto justify-center items-center gap-2 font-mono tracking-tighter text-xs">
          <span>
            Track {currentIdx + 1} / {playlist.length}
          </span>

          <div
            ref={wrapperRef}
            className="relative max-w-[260px] overflow-hidden"
          >
            <span
              ref={titleRef}
              style={marqueeStyle}
              className={cn(
                "block whitespace-nowrap text-center",
                isOverflow && "animate-marquee"
              )}
            >
              {playlist[currentIdx]?.title || "Untitled"}
            </span>
          </div>
        </div>

        {/* 컨트롤러 */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Button
            variant="ghost"
            size="icon"
            disabled={!isReady}
            onClick={playPrev}
            className="text-foreground hover:bg-background/10"
          >
            <Rewind />
          </Button>

          {isPlaying ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={pauseVideo}
              disabled={!isReady}
              className="text-foreground hover:bg-background/10"
            >
              <Pause />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={playVideo}
              disabled={!isReady}
              className="text-foreground hover:bg-background/10"
            >
              <Play />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            disabled={!isReady}
            onClick={playNext}
            className="text-foreground hover:bg-background/10"
          >
            <FastForward />
          </Button>

          <div className="flex items-center gap-2 ml-4">
            <Volume2 className="size-4 text-foreground" />
            <Slider
              min={0}
              max={100}
              step={1}
              value={[volume]}
              onValueChange={([v]) => setPlayerVolume(v)}
              className="w-20"
            />
            <span className="text-xs font-mono text-foreground w-[30px]">
              {volume}%
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDialogOpen(true)}
            className="hover:bg-background/10 ml-2"
          >
            <Settings className="size-4 text-foreground" />
          </Button>
        </div>
      </div>

      <PlayerConfigDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        playlist={playlist}
        onSave={handleSavePlaylist}
      />
    </section>
  );
}
