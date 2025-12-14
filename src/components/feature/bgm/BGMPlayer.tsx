import { useState, useCallback, useRef, useEffect } from "react";
import { Play, Pause, FastForward, Rewind, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import YouTube, { type YouTubePlayer } from "react-youtube";
import { cn } from "@/lib/utils";

const VIDEO_IDS = ["8r3iXanFcNk", "cY9NiA55tII", "J6EvulKEsmQ"];

const PLAYLIST = [
  {
    title: "벌써부터 캐롤이 듣고 싶을 수도 있죠.",
    video_id: "8r3iXanFcNk",
  },
  {
    title: "존박 캐롤 모음",
    video_id: "cY9NiA55tII",
  },
  {
    title:
      "전세계 산타도 인정한 K-캐롤의 끝판왕🎅 국내 케이팝 크리스마스 캐롤 플리🎄",
    video_id: "J6EvulKEsmQ",
  },
];

export default function BGMPlayer() {
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

  const onStateChange = (e: { data: number }) => {
    if (e.data === YT.PlayerState.PLAYING) {
      setIsPlaying(true);
    }

    if (e.data === YT.PlayerState.ENDED) {
      playNext();
    }

    if (e.data === YT.PlayerState.PAUSED) {
      setIsPlaying(false);
    }
  };

  const playVideo = () => {
    if (!playerRef.current) return;
    playerRef.current.playVideo();
  };

  const pauseVideo = () => {
    playerRef.current?.pauseVideo();
  };

  const playNext = () => {
    setCurrentIdx((prev) => (prev + 1) % VIDEO_IDS.length);
  };

  const playPrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? VIDEO_IDS.length - 1 : prev - 1));
  };

  const setPlayerVolume = useCallback((v: number) => {
    playerRef.current?.setVolume(v);
    setVolume(v);
  }, []);

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
    if (!isReady || !playerRef.current) return;

    if (currentIdx === 0) return;

    playerRef.current.loadVideoById(VIDEO_IDS[currentIdx]);
  }, [currentIdx, isReady]);

  // 타이틀 길이, 타이틀 영역 길이 계산
  const titleRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [marqueeStyle, setMarqueeStyle] = useState<React.CSSProperties>({});

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
      "--marquee-duration": `${Math.max(distance / 12, 10)}s`, // 길이에 따라 속도 보정
    } as React.CSSProperties);
  }, [currentIdx]);

  return (
    <>
      <YouTube
        videoId={VIDEO_IDS[0]}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
        className="absolute -left-[9999px]"
      />

      {/* 재생 정보 */}
      <div className="flex flex-col w-[50%] items-center gap-2 mb-2 font-mono tracking-tighter text-xs text-foreground">
        <span>
          Track {currentIdx + 1} / {PLAYLIST.length}
        </span>

        <div ref={wrapperRef} className="relative w-full overflow-hidden">
          <span
            ref={titleRef}
            style={marqueeStyle}
            className={cn(
              "block whitespace-nowrap text-center",
              isOverflow && "animate-marquee"
            )}
          >
            {PLAYLIST[currentIdx]?.title}
          </span>
        </div>
      </div>

      {/* 컨트롤 UI */}
      <div className="flex flex-col w-full gap-6">
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            disabled={!isReady}
            onClick={playPrev}
          >
            <Rewind />
          </Button>

          {isPlaying ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={pauseVideo}
              disabled={!isReady}
            >
              <Pause />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={playVideo}
              disabled={!isReady}
            >
              <Play />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            disabled={!isReady}
            onClick={playNext}
          >
            <FastForward />
          </Button>

          {/* 볼륨 */}
          <div className="flex items-center gap-2 text-foreground/50 ml-4">
            <Volume2 className="size-5" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setPlayerVolume(Number(e.target.value))}
              className="w-20 h-1.5 accent-white cursor-pointer"
            />
            <span className="text-xs font-mono">{volume}%</span>
          </div>
        </div>
      </div>
    </>
  );
}
