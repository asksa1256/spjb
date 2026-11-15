import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Category } from "@/types";

interface CategorySelectProps {
  id?: string;
  value?: string;
  className?: string;
  onChange: (v: Category) => void;
}

const CategorySelect = ({
  id,
  value,
  className,
  onChange,
}: CategorySelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} className={`min-w-[120px] ${className}`}>
        <SelectValue placeholder="퀴즈 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup id={id}>
          <SelectItem value="quiz_ox">OX/XO</SelectItem>
          <SelectItem value="quiz_kkororok">꼬로록/올라</SelectItem>
          <SelectItem value="quiz_kkong">꽁꽁</SelectItem>
          <SelectItem value="quiz_garo">가로세로</SelectItem>
          <SelectItem value="quiz_olla2">올라올라2</SelectItem>
          <SelectItem value="quiz_europe">유럽여행</SelectItem>
          <SelectItem value="quiz_kongkong">퀴즈콩콩</SelectItem>
          <SelectItem value="quiz_bingo">빙고빙고</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
