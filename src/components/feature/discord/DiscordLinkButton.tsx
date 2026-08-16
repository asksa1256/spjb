import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ReactGA from "react-ga4";

const DISCORD_INVITE_URL = "https://discord.gg/eZYNnwME6";

export default function DiscordLinkButton() {
  const handleDiscordClick = () => {
    ReactGA.event("discord_link_click", {
      link_name: "Discord",
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="relative bg-transparent text-foreground transition-colors duration-300"
        >
          <a
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="디스코드"
            onClick={handleDiscordClick}
          >
            <img
              src="/discord-icon.png"
              alt=""
              aria-hidden="true"
              className="size-5 object-contain"
            />
            <span className="sr-only">디스코드</span>
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent>디스코드</TooltipContent>
    </Tooltip>
  );
}
