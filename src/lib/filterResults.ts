import { getChosung, isChosung } from "@/lib/getChosung";
import type { Database } from "@/types/supabase";
import createSearchRegex from "./createSearchRegex";

type TableNames = keyof Database["public"]["Tables"];
type Record = Database["public"]["Tables"][TableNames]["Row"];

const filterResults = (results: Record[], keyword: string) => {
  const trimmedKeyword = keyword.trim();
  if (!trimmedKeyword || trimmedKeyword.length < 2) return [];

  // 공백 기준 키워드 분리 (예: "Quiz O" -> ["Quiz", "O"])
  const keywords = trimmedKeyword.split(/\s+/).filter(Boolean);

  return results.filter((item) => {
    const fullText = item.question || "";

    // 모든 분리된 키워드가 조건을 만족해야 함 (AND)
    return keywords.every((kw) => {
      // A. 초성 검색 로직 (한글 초성만 포함된 경우)
      if (isChosung(kw)) {
        const chosungText = getChosung(fullText);
        const keywordNoSpace = kw.replace(/\s+/g, "");
        const chosungNoSpace = chosungText.replace(/\s+/g, "");
        return chosungNoSpace.includes(keywordNoSpace);
      }

      // B. 일반 검색 로직 (유사 문자 대응 정규표현식 적용)
      const regex = new RegExp(createSearchRegex(kw), "i");
      return regex.test(fullText);
    });
  });
};

export default filterResults;
