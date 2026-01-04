import supabase from "@/lib/supabase";
import type { Database } from "@/types/supabase";

type TableNames = keyof Database["public"]["Tables"];

const getResults = async (ctg: TableNames) => {
  const { count } = await supabase
    .from(ctg)
    .select("*", { count: "exact", head: true });

  const totalCount = count || 0;

  const { data, error } = await supabase
    .from(ctg)
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching data:", error);
    throw error;
  }

  const allData = data ?? [];

  const loadingPercent = Math.floor((allData.length / totalCount) * 100);

  return { allData, totalCount, loadingPercent };
};

export default getResults;
