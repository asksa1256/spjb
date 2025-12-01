import * as z from "zod";

export const guildSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "길드명을 입력해주세요.")
    .max(12, "길드명은 최대 12자까지 가능합니다."),
  image: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, "이미지를 등록해주세요.")
    .refine(
      (files) => files?.[0]?.size <= 400000,
      "이미지 크기는 40KB 이하여야 합니다."
    )
    .refine(
      (files) =>
        ["image/jpeg", "image/png", "image/webp"].includes(files?.[0]?.type),
      "이미지 형식은 JPG, PNG, WEBP 파일만 가능합니다."
    ),
  bio: z
    .string()
    .min(1, "메시지를 입력해주세요.")
    .max(500, "최대 80자까지 가능합니다."),
});

export type GuildFormData = z.infer<typeof guildSchema>;
