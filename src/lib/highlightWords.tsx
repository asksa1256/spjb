import type { ReactNode } from "react";

export const highlightWords = (
  question: string,
  keyword: string
): ReactNode[] => {
  if (!keyword.trim()) return [question];

  const trimmedKeyword = keyword.trim();
  const keywords = trimmedKeyword.split(/\s+/);

  // 결과 텍스트를 순회하면서 매칭되는 부분 찾기
  const result: ReactNode[] = [];
  let currentIndex = 0;

  while (currentIndex < question.length) {
    let matched = false;

    // 각 키워드에 대해 현재 위치에서 매칭 시도
    for (const kw of keywords) {
      const kwNoSpace = kw.replace(/\s+/g, "");
      let kwIndex = 0;
      let tempIndex = currentIndex;

      // 공백을 건너뛰면서 매칭 확인
      while (kwIndex < kwNoSpace.length && tempIndex < question.length) {
        if (question[tempIndex] === " ") {
          tempIndex++;
          continue;
        }
        if (
          question[tempIndex].toLowerCase() === kwNoSpace[kwIndex].toLowerCase()
        ) {
          kwIndex++;
          tempIndex++;
        } else {
          break;
        }
      }

      // 키워드 전체가 매칭되었으면
      if (kwIndex === kwNoSpace.length) {
        const matchedText = question.substring(currentIndex, tempIndex);
        result.push(
          <span key={currentIndex} className="text-blue-500 font-bold">
            {matchedText}
          </span>
        );
        currentIndex = tempIndex;
        matched = true;
        break;
      }
    }

    // 매칭되지 않았으면 일반 텍스트로 추가
    if (!matched) {
      const nextMatchIndex = findNextMatch(
        question,
        keywords,
        currentIndex + 1
      );
      const endIndex = nextMatchIndex !== -1 ? nextMatchIndex : question.length;
      result.push(question.substring(currentIndex, endIndex));
      currentIndex = endIndex;
    }
  }

  return result;
};

// 다음 매칭 위치 찾기 헬퍼 함수
const findNextMatch = (
  text: string,
  keywords: string[],
  startIndex: number
): number => {
  for (let i = startIndex; i < text.length; i++) {
    for (const kw of keywords) {
      const kwNoSpace = kw.replace(/\s+/g, "");
      let kwIndex = 0;
      let tempIndex = i;

      while (kwIndex < kwNoSpace.length && tempIndex < text.length) {
        if (text[tempIndex] === " ") {
          tempIndex++;
          continue;
        }
        if (
          text[tempIndex].toLowerCase() === kwNoSpace[kwIndex].toLowerCase()
        ) {
          kwIndex++;
          tempIndex++;
        } else {
          break;
        }
      }

      if (kwIndex === kwNoSpace.length) {
        return i;
      }
    }
  }
  return -1;
};
