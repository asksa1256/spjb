import { useState, useCallback, useRef, useEffect } from "react";
import { Play, Pause, FastForward, Rewind, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import YouTube, { type YouTubePlayer } from "react-youtube";

const VIDEO_IDS = ["8r3iXanFcNk", "cY9NiA55tII", "JF_KFRMwFsA"];

export default function YouTubeBGMPlayer() {
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
    if (e.data === YT.PlayerState.ENDED) {
      playNext();
    }

    setIsPlaying(e.data === YT.PlayerState.PLAYING);
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

  return (
    <>
      {/* 실제 플레이어 (숨김) */}
      <YouTube
        videoId={VIDEO_IDS[0]}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
        className="absolute -left-[9999px]"
      />

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
