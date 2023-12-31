"use server";

import { Profile } from "@prisma/client";
import getProfile from "../auth/initialProfile";
import db from "../db";

export async function LeaveServer({ serverId }: { serverId: string }) {
  const profile: Profile = await getProfile();
  if (!profile) return;
  try {
    const Server = await db.server.update({
      where: {
        id: serverId,
        profileId: {
          not: profile.id,
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });
    return Server;
  } catch (error) {
    console.error("[LeaveServer] Error:", error);
    return null;
  }
}
