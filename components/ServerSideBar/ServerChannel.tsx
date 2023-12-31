"use client";
import { Channel, ChannelType } from "@prisma/client";
import React from "react";
import { Edit, Hash, Lock, Trash, Video, Volume2 } from "lucide-react";
import { ToolTip } from "../ToolTip/toooltip";
import { UseModal } from "@/hooks/useModalStore";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const IconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Volume2,
  [ChannelType.VIDEO]: Video,
};

type ServerChannelProps = { channel: Channel };
const ServerChannels = ({ channel }: ServerChannelProps) => {
  const Icon = IconMap[channel.type];
  const params = useParams()
  const { onOpen } = UseModal();
  const router = useRouter();
  return (
    <div
      key={channel.id}
      className={cn("flex items-center justify-between  group  rounded-md p-3",
      params.channelId===channel.id?"bg-muted-foreground/10 text-primary":"hover:bg-muted-foreground/10 hover:text-primary"
      )}
    >
      <button
        onClick={() => {
          router.push(`/server/${params.serverId}/channels/${channel.id}`);
        }}
        className="flex w-full gap-2 items-center"
      >
        <Icon className="h-4 w-4" />
        {channel.name}
      </button>

      {channel.name !== "general" ? (
        <div className="hidden group-hover:flex gap-3">
          <ToolTip content={"Edit"} className={"text-sm"} side="top">
            <Edit className="h-4 w-4" />
          </ToolTip>
          <ToolTip content={"Delete channel"} className={"text-sm"} side="top">
            <Trash
              onClick={() => onOpen("deleteChannel", { channel })}
              className="h-4 w-4  hover:text-red-500"
            />
          </ToolTip>
        </div>
      ) : (
        <Lock className="hidden group-hover:flex h-4 w-4" />
      )}
    </div>
  );
};

export default ServerChannels;
