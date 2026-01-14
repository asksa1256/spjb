import { getChosung, isChosung } from "@/lib/getChosung";
import type { Database } from "@/types/supabase";
import createSearchRegex from "./createSearchRegex";

type TableNames = keyof Database["public"]["Tables"];
type Record = Database["public"]["Tables"][TableNames]["Row"];

const filterResults = (results: Record[], keyword: string) => {
  const trimmedKeyword = keyword.trim();
  if (!trimmedKeyword || trimmedKeyword.length < 2) return [];

  // 공백 기준 키워드 분리
  const keywords = trimmedKeyword.split(/\s+/).filter(Boolean);

  return results.filter((item) => {
    const fullText = item.question || "";
    const fullTextNoSpace = fullText.replace(/\s+/g, "");

    return keywords.every((kw) => {
      // A. 초성 검색 (한글 초성만 포함된 경우)
      if (isChosung(kw)) {
        const chosungText = getChosung(fullText);
        const keywordNoSpace = kw.replace(/\s+/g, "");
        const chosungNoSpace = chosungText.replace(/\s+/g, "");
        return chosungNoSpace.includes(keywordNoSpace);
      }

      // B. 일반 검색 (띄어쓰기 구분 X)
      const regex = new RegExp(createSearchRegex(kw), "i");
      const kwNoSpace = kw.replace(/\s+/g, "");
      const regexNoSpace = new RegExp(createSearchRegex(kwNoSpace), "i");

      // 공백 포함/제거 버전 중 하나라도 매치되면 true
      return regex.test(fullText) || regexNoSpace.test(fullTextNoSpace);
    });
  });
};

export default filterResults;
