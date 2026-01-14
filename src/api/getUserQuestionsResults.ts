import supabase from "@/lib/supabase";
import type { TableNames } from "@/types";

const startDate = "2025-12-24T00:00:00Z"; // 2025-12-24 이후 유저 출제 문제 불러오기

const getUserQuestionsResults = async (ctg: TableNames) => {
  const { data, error, count } = await supabase
    .from(ctg)
    .select("question, answer, nickname, commentary", { count: "exact" })
    .gte("created_at", startDate)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error(`${ctg} 테이블 유저 문제 불러오기 실패:`, error);
    throw error;
  }

  const allData = data ?? [];
  const totalCount = count || 0;

  const loadingPercent =
    totalCount > 0 ? Math.floor((allData.length / totalCount) * 100) : 0;

  return { allData, totalCount, loadingPercent };
};

export default getUserQuestionsResults;
