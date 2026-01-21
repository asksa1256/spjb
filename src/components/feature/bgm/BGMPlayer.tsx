import {
  useState,
  useCallback,
  useRef,
  useEffect,
  lazy,
  Suspense,
} from "react";
import {
  Play,
  Pause,
  FastForward,
  Rewind,
  Volume2,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { PLAYLIST_STORAGE_KEY } from "@/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import YouTube, { type YouTubePlayer } from "react-youtube";
import { type PlaylistItem } from "./PlayerConfigDialog";
const PlayerConfigDialog = lazy(() => import("./PlayerConfigDialog"));
import ReactGA from "react-ga4";
import { formatTime } from "@/lib/formatters";

export default function BGMPlayer({ className }: { className?: string }) {
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const playerRef = useRef<YouTubePlayer | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentIdx, setCurrentIdx] = useState(0);

  const lastLoadedIdRef = useRef<string>(""); // 마지막으로 로드된 비디오 ID를 ref로 관리

  // 타임라인 관련 상태
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const timeUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 현재 재생 시간 업데이트
  useEffect(() => {
    if (isPlaying && playerRef.current && !isSeeking) {
      timeUpdateIntervalRef.current = setInterval(() => {
        const time = playerRef.current?.getCurrentTime();
        if (typeof time === "number") {
          setCurrentTime(time);
        }
      }, 100);
    } else {
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current);
        timeUpdateIntervalRef.current = null;
      }
    }

    return () => {
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current);
      }
    };
  }, [isPlaying, isSeeking]);

  // 타임라인 시크
  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (playerRef.current) {
      playerRef.current.seekTo(newTime, true);
    }
  };

  // 마운트 시 로컬스토리지 플레이리스트 불러오기
  useEffect(() => {
    try {
      const saved = localStorage.getItem(PLAYLIST_STORAGE_KEY);
      if (!saved) return;

      const parsed: PlaylistItem[] = JSON.parse(saved);
      if (parsed.length > 0) {
        setPlaylist(parsed);
        setCurrentIdx(0);
      }
    } catch (e) {
      console.error("플레이리스트 로드 실패:", e);
    }
  }, []);

  const onReady = async (e: { target: YouTubePlayer }) => {
    playerRef.current = e.target;
    e.target.setVolume(volume);
    setIsReady(true);

    // 비디오 길이(타임라인) 가져오기
    const dur = await e.target.getDuration();
    setDuration(dur);
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
    async (e: { data: number }) => {
      if (e.data === 1) {
        setIsPlaying(true);
        // 재생 시작 시 duration 업데이트
        const dur = await playerRef.current?.getDuration();
        if (dur) setDuration(dur);
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
    [playNext, playlist.length],
  );

  const handleSavePlaylist = (newPlaylist: PlaylistItem[]) => {
    if (newPlaylist.length === 0) return;

    const currentVideoId = playlist[currentIdx]?.video_id;

    // 새 리스트에서 기존 곡 인덱스
    const newIdx = newPlaylist.findIndex(
      (item) => item.video_id === currentVideoId,
    );

    if (newIdx !== -1) {
      // 시나리오 A: 재생 중인 곡이 새 리스트에도 있는 경우 -> 인덱스만 새 위치로 업데이트
      setCurrentIdx(newIdx);
    } else {
      // 시나리오 B: 재생 중인 곡이 삭제된 경우 -> 현재 인덱스 유지 (자동으로 다음 곡 재생)
      // 마지막 곡을 삭제해서 인덱스가 범위를 벗어날 경우, 마지막 곡을 현재 곡으로 설정
      const nextIdx = Math.min(currentIdx, newPlaylist.length - 1);
      setCurrentIdx(nextIdx);
    }

    setPlaylist(newPlaylist);

    try {
      localStorage.setItem(PLAYLIST_STORAGE_KEY, JSON.stringify(newPlaylist));
    } catch (e) {
      console.error("플레이리스트 로컬스토리지 저장 실패:", e);
    }
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

  // 플레이리스트 편집 시 첫 곡부터 다시 시작되는 현상 방지
  useEffect(() => {
    const videoId = playlist[currentIdx]?.video_id; // 현재 재생 중인 곡 인덱스
    if (!isReady || !playerRef.current || !videoId) return;

    // 현재 재생 중인 곡이 마지막으로 로드된 곡과 같다면 아무것도 하지 않음 (플레이리스트 편집 시 첫 번째 곡부터 재시작 방지)
    if (videoId === lastLoadedIdRef.current) return;

    try {
      playerRef.current.loadVideoById(videoId);
      lastLoadedIdRef.current = videoId; // 로드 완료 -> 마지막 로드 곡을 현재 재생 중인 곡으로 업데이트
      setIsPlaying(true);

      // 새 비디오 로드 시 현재 타임라인 시간 초기화, duration 업데이트
      setCurrentTime(0);
      setTimeout(() => {
        const dur = playerRef.current?.getDuration() as unknown as number; // YouTubePlayer 타입과 달리 실제 런타임에서는 getDuration()이 숫자를 즉시 반환(Promise 아님)하므로 타입 강제 단언.
        if (typeof dur === "number" && dur > 0) {
          setDuration(dur);
        }
      }, 500);
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

  // GA 이벤트 추적
  const handleBGMConfigClick = () => {
    setIsDialogOpen(true);

    ReactGA.event("bgm_config_modal_open", {
      modal_name: "BGM 설정",
    });
  };

  return (
    <section
      className={cn(
        "p-4 bg-gradient-to-br from-purple-300/20 to-blue-300/20 rounded-lg text-foreground",
        className,
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
            Track {playlist.length > 0 ? currentIdx + 1 : 0} / {playlist.length}
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
                isOverflow && "animate-marquee",
              )}
            >
              {playlist.length > 0
                ? playlist[currentIdx]?.title || "Untitled"
                : "플레이리스트를 추가해주세요."}
            </span>
          </div>
        </div>

        {/* 타임라인 */}
        <div className="w-full px-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-foreground min-w-[35px]">
              {formatTime(currentTime)}
            </span>
            <Slider
              min={0}
              max={duration || 100}
              step={0.1}
              value={[currentTime]}
              onValueChange={handleSeek}
              onPointerDown={() => setIsSeeking(true)}
              onPointerUp={() => setIsSeeking(false)}
              className="flex-1"
              disabled={!isReady || duration === 0}
            />
            <span className="text-xs font-mono text-foreground min-w-[35px]">
              {formatTime(duration)}
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

          {/* 플레이리스트 편집 */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-background/10 ml-2"
                onClick={handleBGMConfigClick}
              >
                <Settings className="size-4 text-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>플레이리스트 편집</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <Suspense fallback={null}>
        <PlayerConfigDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          playlist={playlist}
          onSave={handleSavePlaylist}
        />
      </Suspense>
    </section>
  );
}
