import { useRef, useEffect } from "react";
import { type Contributors } from "@/types";

interface ContributorListProps {
  contributors: Contributors[];
  open?: boolean; // 모달 열림 상태
}

const ContributorList = ({ contributors, open }: ContributorListProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  // 자동 스크롤 애니메이션
  useEffect(() => {
    if (!open || contributors.length === 0) return;

    const container = listRef.current;
    if (!container) return;

    let frameId: number;
    const speed = 0.4; // 스크롤 속도 (낮을수록 느림)
    const maxScroll = container.scrollHeight - container.clientHeight;

    const scrollStep = () => {
      if (container.scrollTop < maxScroll) {
        container.scrollTop += speed;
        frameId = requestAnimationFrame(scrollStep);
      } else {
        cancelAnimationFrame(frameId);
      }
    };

    // 💡 3초 후에 애니메이션 시작
    const timeoutId = window.setTimeout(() => {
      frameId = requestAnimationFrame(scrollStep);
    }, 3000);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
    };
  }, [open, contributors]);

  return (
    <div
      ref={listRef}
      className="max-h-[308px] overflow-y-auto space-y-1 text-sm"
    >
      {contributors.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 p-2">
          {contributors.map((c) => (
            <li
              key={c.nickname}
              className="flex items-center gap-0.5 rounded-xl transition-colors text-sm font-medium truncate"
            >
              <span className="truncate text-foreground">💙 {c.nickname}</span>
              <span className="text-foreground/40 text-xs">({c.count}개)</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 text-sm">로딩중...</p>
      )}
    </div>
  );
};

export default ContributorList;
