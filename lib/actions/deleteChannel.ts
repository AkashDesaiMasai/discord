"use server";

import { MemberRole } from "@prisma/client";
import getProfile from "../auth/initialProfile";
import db from "../db";

type deleteChannelProps = {
  serverId: string;
  channelId: string;
};
export async function deleteChannel({ serverId, channelId }: deleteChannelProps) {
  const profile = await getProfile();
  if (!profile) return;

  try {
    const Server = await db.server.update({
        where: {
          id: serverId,
          members: {
            some: {
              profileId: profile.id,
              role: { in: [MemberRole.MODERATOR,MemberRole.ADMIN] },
            },
          },
        },
        data: {
          channels: {
            delete: {
              id: channelId,
            },
          },
        },
      });
   
    return Server;
  } catch (error) {
    console.error("[deleteChannel] Error:", error);
    return undefined;
  }
}
