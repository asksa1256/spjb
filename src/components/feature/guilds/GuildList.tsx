import DefaultGuildIcon from "@/assets/images/guild-mark-default.jpg";
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

const GuildList = ({ guilds }: GuildListProps) => {
  return (
    <div className="max-h-[308px] overflow-y-auto text-sm border-t border-b border-border border-dashed py-3">
      {guilds.length > 0 ? (
        <ol className="w-full border-collapse">
          {guilds.map((guild) => (
            <li key={guild.id} className="cursor-default">
              <div className="flex items-center gap-2 py-2">
                <img
                  src={guild.image ?? DefaultGuildIcon}
                  alt=""
                  className="inline-block size-5"
                />
                <h6 className="shrink-0 font-bold text-foreground text-sm">
                  {guild.name}
                </h6>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate ">
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
