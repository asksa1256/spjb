export const CATEGORY = {
  OX: "ox",
  KKOROROK: "kkororok",
  KKONG: "kkong",
  GARO: "garo",
};

export const INQUIRY_CATEGORIES = [
  "OX/XO",
  "꼬로록/올라",
  "꽁꽁",
  "가로세로",
  "에러",
  "건의",
  "기타",
] as const;

export const NOTICE_VERSION = "2026-11-15-2";
export const NOTICE_STORAGE_KEY = "lastCheckedNoticeVersion";
export const OPEN_OPERATIONS_NOTICE_EVENT = "spjb:open-operations-notice";
export const ANNOUNCEMENT_SEEN_KEY = "lastSeenAnnouncementVersion";
export const ANNOUNCEMENT_VERSION = "service-ending-2026-11";

export const PLAYLIST_STORAGE_KEY = "bgm_playlist";

export const NOTICE_MODAL_HIDDEN_KEY = "hideAnnouncementDate";

export const SIMILAR_CHARS: Record<string, string> = {
  o: "[oO0○]",
  O: "[oO0○]",
  "0": "[oO0○]",
  "○": "[oO0○]",
  "'": "['\"“”‘’]",
  '"': "['\"“”‘’]",
  "‘": "['\"“”‘’]",
  "’": "['\"“”‘’]",
  "“": "['\"“”‘’]",
  "”": "['\"“”‘’]",
};
