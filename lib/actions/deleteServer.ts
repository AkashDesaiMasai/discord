"use server";

import { Server } from "@prisma/client";
import getProfile from "../auth/initialProfile";
import db from "../db";

export async function deleteServer({ serverId }: { serverId: string }) {
  const profile = await getProfile();
  if (!profile) return;
  try {
    const result: Server | null = await db.server.delete({
      where: {
        id: serverId,
        profileId: profile.id,
      },
    });
    return result;
  } catch (error) {
    console.error("[LeaveServer] Error:", error);
    return null;
  }
}
