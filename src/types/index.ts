export type Record =
  | {
      id?: number;
      answer: string | null;
      question: string | null;
      nickname?: string | string[] | null;
    }
  | {
      id?: number;
      answer: string | null;
      question: string | null;
      nickname?: string | string[] | null;
    }
  | {
      id?: number;
      answer: string | null;
      question: string | null;
      nickname?: string | string[] | null;
    }
  | {
      id?: number;
      answer: string | null;
      question: string | null;
      nickname?: string | string[] | null;
    };

export type Records = Record[];

export type Category = "quiz_garo" | "quiz_kkong" | "quiz_kkororok" | "quiz_ox";

export interface Contributors {
  nickname: string;
  count: number;
}
