import { SIMILAR_CHARS } from "@/constants";

const createSearchRegex = (keyword: string) => {
  const pattern = keyword
    .split("")
    .map(
      (char) =>
        SIMILAR_CHARS[char] || char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    ) // 특수문자 이스케이프 처리
    .join("");

  return new RegExp(pattern, "i"); // 'i' 옵션: 대소문자 구분 해제
};

export default createSearchRegex;
