import DefaultGuildIcon from "@/assets/images/guild-mark-default.jpg";
import HeartGuildIcon from "@/assets/images/heart-guild-mark.png";
import MoonGuildIcon from "@/assets/images/moon-guild-mark.png";
import RainbowGuildIcon from "@/assets/images/rainbow-guild-mark.png";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface Guild {
  id: number;
  name: string;
  bio: string;
  image: string | null;
  created_at: string;
}

interface GuildListProps {
  guilds: Guild[];
}

const MOCK_GUILDS = [
  {
    id: 1,
    name: "꽁꽁",
    image: MoonGuildIcon,
    bio: '모여서 꽁꽁 하실분 "핑구123" << 쪽지 주세요!',
  },
  {
    id: 2,
    name: "빌려온고양이",
    image: HeartGuildIcon,
    bio: "둠칫냐옹 | 친목 위주로 게임하실분 구해용",
  },
  {
    id: 3,
    name: "티오피",
    image: RainbowGuildIcon,
    bio: "@@@12/1 ~ 12/20 브레인 서바이벌 이벤트: 길드 가입 후 포하트 인증 시 사이버머니 만원 지급중@@@",
  },
  {
    id: 4,
    name: "원카드",
    image: DefaultGuildIcon,
    bio: "인생 한방 원카드ㄱㄱ 가입 문의: [조로]",
  },
  {
    id: 5,
    name: "꽁꽁",
    image: MoonGuildIcon,
    bio: '모여서 꽁꽁 하실분 "핑구123" << 쪽지 주세요!',
  },
  {
    id: 6,
    name: "빌려온고양이",
    image: HeartGuildIcon,
    bio: "둠칫냐옹 | 친목 위주로 게임하실분 구해용",
  },
  {
    id: 7,
    name: "티오피",
    image: RainbowGuildIcon,
    bio: "@@@12/1 ~ 12/20 브레인 서바이벌 이벤트: 길드 가입 후 포하트 인증 시 사이버머니 만원 지급중@@@",
  },
  {
    id: 8,
    name: "원카드",
    image: DefaultGuildIcon,
    bio: "인생 한방 원카드ㄱㄱ 가입 문의: [조로]",
  },
  {
    id: 9,
    name: "꽁꽁",
    image: MoonGuildIcon,
    bio: '모여서 꽁꽁 하실분 "핑구123" << 쪽지 주세요!',
  },
  {
    id: 10,
    name: "빌려온고양이",
    image: HeartGuildIcon,
    bio: "둠칫냐옹 | 친목 위주로 게임하실분 구해용",
  },
  {
    id: 11,
    name: "티오피",
    image: RainbowGuildIcon,
    bio: "@@@12/1 ~ 12/20 브레인 서바이벌 이벤트: 길드 가입 후 포하트 인증 시 사이버머니 만원 지급중@@@",
  },
  {
    id: 12,
    name: "원카드",
    image: DefaultGuildIcon,
    bio: "인생 한방 원카드ㄱㄱ 가입 문의: [조로]",
  },
];

const GuildList = ({ guilds }: GuildListProps) => {
  return (
    <div className="max-h-[308px] overflow-y-auto text-sm border-t border-b border-border border-dashed py-3">
      {guilds.length > 0 ? (
        <ol className="w-full border-collapse">
          {MOCK_GUILDS.map((guild) => (
            <li key={guild.id} className="cursor-default">
              <div className="flex items-center gap-2 py-2">
                <img
                  src={guild.image ?? DefaultGuildIcon}
                  alt=""
                  className="inline-block size-5"
                />
                <h6 className="shrink-0 font-bold text-slate-800 text-sm">
                  {guild.name}
                </h6>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-sm text-slate-500 truncate ">
                      {guild.bio}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent
                    align="center"
                    className="max-w-[200px] break-keep"
                  >
                    {guild.bio}
                  </TooltipContent>
                </Tooltip>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-center text-gray-500 text-sm">로딩중...</p>
      )}
    </div>
  );
};

export default GuildList;
