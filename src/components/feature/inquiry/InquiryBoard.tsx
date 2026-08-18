import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, CircleDashed, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { INQUIRY_CATEGORIES } from "@/constants";
import supabase from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface InquiryItem {
  id: number;
  category: string;
  inquiry: string;
  created_at: string;
  nickname: string | null;
  confirmed: boolean | null;
  total_count: number | string;
}

const PAGE_SIZE = 10;

const InquiryBoard = ({ refreshKey }: { refreshKey: number }) => {
  const [items, setItems] = useState<InquiryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const boardRef = useRef<HTMLDivElement>(null);

  const loadInquiries = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase.rpc("get_public_inquiries", {
      p_limit: PAGE_SIZE,
      p_offset: (page - 1) * PAGE_SIZE,
    });
    if (error) toast.error(`문의내역을 불러오지 못했습니다: ${error.message}`);
    else {
      const inquiries = (data ?? []) as InquiryItem[];
      setItems(inquiries);
      setTotalCount(Number(inquiries[0]?.total_count ?? 0));
    }
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    void loadInquiries();
  }, [loadInquiries, refreshKey]);

  useEffect(() => {
    setPage(1);
  }, [refreshKey]);

  useEffect(() => {
    boardRef.current?.parentElement?.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const startEditing = (item: InquiryItem) => {
    setEditingId(item.id);
    setCategory(item.category);
    setContent(item.inquiry);
    setPassword("");
    setIsPasswordVisible(false);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setPassword("");
    setIsPasswordVisible(false);
  };

  const saveInquiry = async () => {
    if (editingId === null || !content.trim() || password.length !== 8) {
      toast.error("내용과 8자의 비밀번호를 입력해주세요.");
      return;
    }
    setIsSaving(true);
    const { data, error } = await supabase.rpc("update_inquiry_with_password", {
      p_id: editingId,
      p_password: password,
      p_category: category,
      p_inquiry: content.trim(),
    });
    if (error) toast.error(`문의 수정에 실패했습니다: ${error.message}`);
    else if (!data) toast.error("비밀번호가 일치하지 않습니다.");
    else {
      toast.success("문의가 수정되었습니다.");
      cancelEditing();
      await loadInquiries();
    }
    setIsSaving(false);
  };

  const deleteInquiry = async () => {
    if (editingId === null || password.length !== 8) {
      toast.error("삭제에 실패했습니다. 비밀번호를 확인해주세요.");
      return;
    }
    if (!window.confirm("이 문의를 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.")) return;

    setIsDeleting(true);
    const { data, error } = await supabase.rpc("delete_inquiry_with_password", {
      p_id: editingId,
      p_password: password,
    });

    if (error) toast.error(`문의 삭제에 실패했습니다: ${error.message}`);
    else if (!data) toast.error("비밀번호가 일치하지 않습니다.");
    else {
      toast.success("문의가 삭제되었습니다.");
      cancelEditing();
      if (items.length === 1 && page > 1) setPage((value) => value - 1);
      else await loadInquiries();
    }
    setIsDeleting(false);
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div ref={boardRef} className="flex min-h-[70dvh] min-w-0 max-w-full flex-col pr-1">
      <div className="flex-1 space-y-3">
      {isLoading ? (
        <p className="py-12 text-center text-sm text-muted-foreground">불러오는 중...</p>
      ) : items.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">등록된 문의가 없습니다.</p>
      ) : (
        items.map((item) => {
        const isEditing = editingId === item.id;
        return (
          <article key={item.id} className="min-w-0 max-w-full overflow-hidden rounded-lg border bg-card p-3 text-card-foreground sm:p-4">
            {isEditing ? (
              <div className="space-y-3" data-form-type="other">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger aria-label="문의 카테고리"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {INQUIRY_CATEGORIES.map((value) => (
                      <SelectItem key={value} value={value}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea aria-label="문의 내용" value={content} onChange={(e) => setContent(e.target.value)} maxLength={500} />
                <div className="relative">
                  <Input
                    type="text"
                    name="inquiry-edit-code"
                    autoComplete="off"
                    data-1p-ignore
                    data-lpignore="true"
                    data-form-type="other"
                    aria-label="문의 비밀번호"
                    placeholder="비밀번호 입력(8자리)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    maxLength={8}
                    autoCapitalize="none"
                    spellCheck={false}
                    className={isPasswordVisible ? "pr-10 text-sm" : "pr-10 text-sm [-webkit-text-security:disc]"}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                    aria-label={isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
                    aria-pressed={isPasswordVisible}
                    onClick={() => setIsPasswordVisible((visible) => !visible)}
                  >
                    {isPasswordVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <Button type="button" size="sm" variant="destructive" onClick={deleteInquiry} disabled={isSaving || isDeleting}>
                    <Trash2 className="size-4" /> {isDeleting ? "삭제 중..." : "삭제"}
                  </Button>
                  <div className="flex gap-2">
                    <Button type="button" size="sm" variant="outline" onClick={cancelEditing} disabled={isSaving || isDeleting}>취소</Button>
                    <Button type="button" size="sm" onClick={saveInquiry} disabled={isSaving || isDeleting}>{isSaving ? "저장 중..." : "저장"}</Button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-3 flex min-w-0 items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-muted px-2 py-1 font-medium">{item.category}</span>
                    <span className="text-muted-foreground">{item.nickname || "익명"}</span>
                    <span className="text-muted-foreground">{new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium" }).format(new Date(item.created_at))}</span>
                  </div>
                  <Button type="button" size="icon" variant="ghost" className="size-8 shrink-0" aria-label="문의 수정" onClick={() => startEditing(item)}>
                    <Pencil className="size-4" />
                  </Button>
                </div>
                <p className="whitespace-pre-wrap break-words text-sm leading-6">{item.inquiry}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  {item.confirmed ? <><CheckCircle2 className="size-4 text-green-600" /> 해결됨</> : <><CircleDashed className="size-4" /> 확인 중</>}
                </div>
              </>
            )}
          </article>
        );
      })
      )}
      </div>
      {totalPages > 1 && (
        <nav className="flex min-w-0 items-center justify-center gap-2 border-t pt-3" aria-label="문의내역 페이지 이동">
          <Button type="button" size="icon" variant="outline" className="size-8 shrink-0" aria-label="이전 페이지" disabled={isLoading || page === 1} onClick={() => setPage((value) => value - 1)}>
            <ChevronLeft className="size-4" />
          </Button>
          <div className="flex min-w-0 max-w-full gap-1 overflow-x-auto py-1">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <Button
                key={pageNumber}
                type="button"
                size="icon"
                variant={page === pageNumber ? "default" : "outline"}
                className="size-8 shrink-0"
                aria-label={pageNumber + "페이지로 이동"}
                aria-current={page === pageNumber ? "page" : undefined}
                disabled={isLoading}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </Button>
            ))}
          </div>
          <Button type="button" size="icon" variant="outline" className="size-8 shrink-0" aria-label="다음 페이지" disabled={isLoading || page === totalPages} onClick={() => setPage((value) => value + 1)}>
            <ChevronRight className="size-4" />
          </Button>
        </nav>
      )}
    </div>
  );
};

export default InquiryBoard;
