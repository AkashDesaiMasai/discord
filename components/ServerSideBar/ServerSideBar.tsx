import { getProfile } from "@/lib/auth/getProfile";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import ServerHeader from "./ServerHeader";

import { ChannelType, MemberRole } from "@prisma/client";
import { ScrollArea } from "../ui/scroll-area";
import ServerSection from "./ServerSection";

const ServerSideBar = async ({ serverId }: { serverId: string }) => {
  const profile = await getProfile();
  if (!profile) {
    redirect("/");
  }

  const server = await db.server.findFirst({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const TextChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const AudioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const VideoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const members = server.members.filter(
    (member) => member.profileId !== profile.id
  );

  const Role =
    server.members.find((member) => member.profileId === profile.id)?.role ||
    MemberRole.GUEST;

  return (
    <div className="max-w-72">
      <ServerHeader server={server} Role={Role} />
      <div className="my-2" />
      <ScrollArea className="h-[92vh] py-1">
        {!!TextChannels.length && (
          <ServerSection
            label="Text Channels"
            sectionType="channel"
            channeltype="TEXT"
            Role={Role}
            data={TextChannels}
          />
        )}

        {!!AudioChannels.length && (
          <ServerSection
            sectionType="channel"
            label="Audio Channels"
            channeltype="AUDIO"
            Role={Role}
            data={AudioChannels}
          />
        )}
        {!!VideoChannels.length && (
          <ServerSection
            sectionType="channel"
            label="Video Channels"
            channeltype="VIDEO"
            Role={Role}
            data={VideoChannels}
          />
        )}
        <ServerSection
          sectionType="Member"
          label="Members"
          Role={Role}
          data={members}
        />
      </ScrollArea>
    </div>
  );
};

export default ServerSideBar;
