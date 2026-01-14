import type { Records } from "@/types";
import { highlightWords } from "@/lib/highlightWords";
import { copyToClipboard } from "@/lib/copyToClipborad";
import { BookOpenText } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

interface SearchResultsProps {
  results: Records;
  keyword: string;
}

const SearchResults = ({ results, keyword }: SearchResultsProps) => {
  return (
    <ul className="w-full flex flex-col gap-2">
      {results.map((quiz, i) => (
        <li
          key={`${quiz.answer}-${i}`}
          role="button"
          tabIndex={0}
          onClick={() => copyToClipboard(quiz.answer || "")}
          onKeyDown={(e) => {
            if (e.key === "Enter") copyToClipboard(quiz.answer || "");
          }}
          className="flex flex-col sm:rounded-xl border border-border bg-background p-5 md:shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
        >
          <h6 className="flex gap-2">
            <span className="text-md font-medium text-gray-500 mt-1.5">Q.</span>
            <p className="mt-1 text-lg text-foreground">
              {highlightWords(quiz.question || "", keyword)}
            </p>
          </h6>

          <div className="relative mt-2 flex items-center justify-between gap-2">
            <h6 className="flex flex-nowrap w-[75%] shrink-0 grow-1">
              <span className="mt-1.5 text-md font-medium text-gray-500 mr-2">
                A.
              </span>
              <b className="rounded text-lg text-orange-500 px-2 py-1 bg-answer-background">
                {quiz.answer}
              </b>
              {quiz.commentary && (
                <>
                  <Popover>
                    <PopoverTrigger>
                      <BookOpenText className="size-4 ml-1.5 text-foreground/50 xl:hidden" />
                    </PopoverTrigger>
                    <PopoverContent side="bottom">
                      {quiz.commentary}
                    </PopoverContent>
                  </Popover>
                  <Tooltip>
                    <TooltipTrigger>
                      <BookOpenText className="size-4 ml-1.5 text-foreground/50 hidden xl:block" />
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      해설: {quiz.commentary}
                    </TooltipContent>
                  </Tooltip>
                </>
              )}
            </h6>

            {quiz.nickname && (
              <span className="absolute inline-flex gap-0.5 right-0 bottom-2 items-center text-gray-300 text-xs">
                ✨
                <b className="w-[80%] inline-flex overflow-ellipsis overflow-hidden whitespace-nowrap text-gray-400 text-sm">
                  {quiz.nickname}
                </b>
                ✨
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
