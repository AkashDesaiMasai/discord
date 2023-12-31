"use client";

import { cn } from "@/lib/utils";
import { ToolTip } from "../ToolTip/toooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Server } from "@prisma/client";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { Slack } from "lucide-react";
import {FaDiscord} from"react-icons/fa"
type NavigationItemProps = {
  servers: Server[];
};
const NavigationItem = ({ servers }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();
  const onClick = (id: string) => {
    router.push(`/server/${id}`);
  };

  if (!servers) {
    return null;
  }
  return (
    <ScrollArea className="flex-1 ">
      <div className="flex mt-3 flex-col gap-3 items-center">
        <ToolTip content={"Direct Messages"}>
          <div className="h-16 w-16 rounded-full hover:rounded-3xl text-white bg-[#5865f2] flex justify-center items-center font-semibold hover:opacity-75  transition-hover cursor-pointer">
            <Link href="/me">
            <FaDiscord className="h-8 w-8" />
            </Link>
          </div>
        </ToolTip>
        <Separator className="border border-accent w-10 h-[2px] rounded-2xl " />
      </div>

      <div className="flex-flex-col gap-3">
        {servers &&
          servers.map((server) => (
            <div
              key={server.id}
              className="flex my-3 flex-col gap-3 items-center"
            >
              <ToolTip content={server.name}>
                <button
                  className="relative flex items-center group"
                  onClick={() => onClick(server.id)}
                >
                  <div
                    className={cn(
                      "absolute rounded-r-full left-0 h-4 w-[6px] transition-all bg-secondary-foreground ",
                      params.serverId === server.id ? "h-14" : "group-hover:h-8"
                    )}
                  />

                  <Avatar
                    className={cn(
                      "mx-4 h-16 w-16",
                      params.serverId === server.id
                        ? "rounded-3xl"
                        : "hover:rounded-3xl"
                    )}
                  >
                    <AvatarImage src={server.imageUrl} alt="ServerImage" />
                    <AvatarFallback>{server.name.split("")[0]}</AvatarFallback>
                  </Avatar>
                </button>
              </ToolTip>
              <Separator className="border border-accent h-[2px] w-10 rounded-2xl " />
            </div>
          ))}
      </div>
    </ScrollArea>
  );
};

export default NavigationItem;
