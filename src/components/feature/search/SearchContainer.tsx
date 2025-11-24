import { useState, useMemo, useRef, type ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CategorySelect from "@/components/feature/search/CategorySelect";
import debounce from "@/lib/debounce";
import SearchResults from "@/components/feature/search/SearchResults";
import type { Database } from "@/types/supabase";
import type { Category } from "@/types";
import { useQuery } from "@tanstack/react-query";
import LoadingDots from "@/components/ui/LoadingDots";
import { copyToClipboard } from "@/lib/copyToClipborad";
import filterResults from "@/lib/filterResults";
import getResults from "@/api/getResults";

type TableNames = keyof Database["public"]["Tables"];

const SearchContainer = () => {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const debouncedSetKeyword = useMemo(
    () => debounce((v: string) => setDebouncedKeyword(v), 500),
    []
  );
  const [category, setCategory] = useState<Category | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, isPending, error } = useQuery({
    queryKey: ["quiz", category],
    queryFn: () => getResults(category as TableNames),
    enabled: !!category,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const loadingPercent = data?.loadingPercent ?? 0;
  const results = useMemo(() => data?.allData ?? [], [data]);

  const filteredResults = useMemo(
    () => filterResults(results, debouncedKeyword),
    [results, debouncedKeyword]
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    debouncedSetKeyword(value);
  };

  const clearSearch = () => {
    setKeyword("");
    setDebouncedKeyword("");
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus(); // 포커스 타이밍 늦춤 (input값 IME 초기화 이슈 해결 목적)
      }, 0);
    }
  };

  const handleChangeCategory = (v: Category) => {
    setCategory(v);
    clearSearch();
  };

  const isSearching = category && debouncedKeyword && isPending;
  const isEmpty =
    category && debouncedKeyword.length >= 2 && filteredResults.length === 0;

  // 검색 결과가 1개이고 '꽁꽁' 퀴즈일 경우, 답 자동 복사
  useEffect(() => {
    if (filteredResults.length === 1 && category === "quiz_kkong") {
      copyToClipboard(filteredResults[0].answer || "");
    }
  }, [filteredResults, category]);

  // esc 입력 시 검색어 지우기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();

        // 마지막 글자 안 지워지는 현상 방지 (다음 매크로태스크에서 입력값 지우기 실행)
        setTimeout(() => {
          setKeyword("");
          debouncedSetKeyword("");

          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 0);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [debouncedSetKeyword]);

  return (
    <section className="relative flex flex-col items-center w-full">
      <div className="flex flex-col sm:w-[400px] sm:px-0 px-4 w-full self-center items-center">
        <div className="rounded-full bg-background py-1.5 px-2 flex shadow-md w-full max-w-[400px]">
          <CategorySelect
            id="category"
            value={category || ""}
            onChange={handleChangeCategory}
          />

          <div className="flex flex-col gap-4 items-center">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={keyword}
                placeholder="🔍 2글자 이상 입력..."
                className="border-none shadow-none w-[90%]"
                onChange={handleSearch}
              />

              {debouncedKeyword.length >= 2 && (
                <Button onClick={clearSearch}>지우기</Button>
              )}
            </div>
          </div>
        </div>

        {debouncedKeyword.length >= 2 && (
          <div className="text-gray-400 text-xs mt-1.5 ml-0.5 text-center">
            <span className="bg-background mr-1 py-0.5 p-1 rounded-sm shadow-sm">
              esc
            </span>
            : 지우기
          </div>
        )}

        {category && loadingPercent < 100 && (
          <p className="text-xs text-gray-400 mt-2">
            문제 불러오는 중{<LoadingDots loadingPercent={loadingPercent} />}
          </p>
        )}

        <div className="mt-3 text-center mb-4 text-sm">
          {!category && <p className="text-blue-500">퀴즈를 선택해주세요.</p>}
          {isSearching && <p className="text-blue-500">검색 중...</p>}
          {isEmpty && <p className="text-gray-500">검색 결과가 없습니다.</p>}
          {error && <p className="text-red-500">검색 오류: {error.message}</p>}
        </div>
      </div>

      {/* 검색 결과 */}
      {debouncedKeyword.length > 0 && filteredResults.length > 0 && (
        <>
          <SearchResults results={filteredResults} keyword={keyword} />
          <p className="my-4 text-center text-xs text-gray-400">
            검색 결과를 모두 불러왔습니다.
          </p>
        </>
      )}
    </section>
  );
};

export default SearchContainer;
