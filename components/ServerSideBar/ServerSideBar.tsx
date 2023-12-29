import { getProfile } from "@/lib/auth/getProfile";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import ServerHeader from "./ServerHeader";

import { ChannelType, MemberRole } from "@prisma/client";
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
         profile:true
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
  const members = server.members.filter((member) => member.profileId !== profile.id);



  const Role = server.members.find((member)=>member.profileId===profile.id)?.role||MemberRole.GUEST

  return (
    <div>
      <ServerHeader server={server} Role={Role} />
    </div>
  );
};

export default ServerSideBar;
