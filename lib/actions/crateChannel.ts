"use server";

import { ChannelType, MemberRole } from "@prisma/client";
import getProfile from "../auth/initialProfile";
import db from "../db";

type createChannelProps = {
  name: string;
  type: ChannelType;
  serverId: string;
};
export async function createChannel({
  name,
  type,
  serverId,
}: createChannelProps) {
  const profile = await getProfile();
  if (!profile) return;
  try {
    const createdServer = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: "ADMIN" || "MODERATOR",
          },
        },
      },
      data: {
        channels: {
          create: [
            {
              name: name,
              type: type,
              profileId: profile.id,
            },
          ],
        },
      },
      include: {
        channels: true,
      },
    });
    return createdServer;
  } catch (err) {
    console.log("[create channel Error]", err);
    return null;
  }
}
