import { useQuery } from "@tanstack/react-query";
import getUserQuestionsResults from "@/api/getUserQuestionsResults";
import type { TableNames } from "@/types";

export const useUserQuestions = (ctg: TableNames, enabled: boolean) => {
  return useQuery({
    queryKey: ["userQuestions", ctg],
    queryFn: () => getUserQuestionsResults(ctg),
    // 모달 열려 있을 때만 쿼리 활성화
    enabled: enabled && !!ctg,
    // (선택) 데이터가 자주 바뀌지 않는다면 캐시 유지 시간을 늘릴 수 있습니다.
    staleTime: 1000 * 60 * 5, // 5분
  });
};
