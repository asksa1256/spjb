import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type GuildFormData, guildSchema } from "@/types/schema";
import { Button } from "@/components/ui/button";
import { sanitize } from "@/lib/sanitize";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function GuildPromotionForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<GuildFormData>({
    resolver: zodResolver(guildSchema),
  });

  // 이미지 미리보기
  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(imageFile[0]);
    }
  }, [imageFile]);

  // 길드 등록 뮤테이션
  const guildMutation = useMutation({
    mutationFn: async (data: GuildFormData) => {
      // 이미지 업로드
      const file = data.image[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()
        .toString(36)
        .substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("guild_image")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // supabase storage에 이미지 URL 로드
      const { data: urlData } = supabase.storage
        .from("guild_image")
        .getPublicUrl(filePath);

      // 길드 저장
      const { data: insertedData, error } = await supabase
        .from("guilds")
        .insert({
          name: sanitize(data.name),
          image: sanitize(urlData.publicUrl),
          bio: sanitize(data.bio),
        })
        .select();

      if (error) throw error;

      return insertedData;
    },
    onSuccess: () => {
      // 성공 시 guilds 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["guilds"] });

      toast.success("길드 홍보글이 등록되었습니다!");
      reset();
      setPreviewImage(null);
      onClose(); // 등록 성공 후 폼 닫기
    },
    onError: (error) => {
      console.error("Error:", error);
      toast.error("에러가 발생했습니다. 다시 시도해주세요.");
    },
  });

  const onSubmit = async (data: GuildFormData) => {
    guildMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* 길드명 */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            길드명 <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            {...register("name")}
            placeholder="길드명 입력"
            className="px-4 py-3 h-auto"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* 길드 아이콘 */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            길드 아이콘 <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="file"
                id="image"
                accept="image/jpeg,image/png,image/webp"
                {...register("image")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 file:font-semibold hover:file:bg-blue-100 file:transition-colors text-foreground"
              />
              <p className="mt-2 text-xs text-gray-500">
                * 확장자: JPG, PNG, WEBP (최대 40KB, 24*24 사이즈)
              </p>
            </div>
            {previewImage && (
              <div className="size-16 rounded-sm overflow-hidden shrink-0">
                <img
                  src={previewImage}
                  alt="미리보기"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          {errors.image && (
            <p className="mt-2 text-sm text-red-600">
              {errors.image.message as string}
            </p>
          )}
        </div>

        {/* 홍보 메시지 */}
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            홍보 메시지 <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="bio"
            {...register("bio")}
            placeholder="메시지를 입력해주세요."
            className="px-4 py-3 !text-base h-auto resize-none min-h-[100px] max-h-[200px]"
          />
          {errors.bio && (
            <p className="mt-2 text-sm text-red-600">{errors.bio.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button disabled={guildMutation.isPending}>
            {guildMutation.isPending ? "등록 중..." : "등록하기"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="!w-auto"
            onClick={onClose}
          >
            닫기
          </Button>
        </div>
      </div>
    </form>
  );
}
