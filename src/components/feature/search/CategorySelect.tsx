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
      <SelectTrigger className={`w-[180px] ${className}`} id={id}>
        <SelectValue placeholder="퀴즈 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup id={id}>
          <SelectItem value="quiz_ox">OX/XO</SelectItem>
          <SelectItem value="quiz_kkororok">꼬로록/올라</SelectItem>
          <SelectItem value="quiz_kkong">꽁꽁</SelectItem>
          <SelectItem value="quiz_garo">가로세로</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
