"use server";

import getProfile from "../auth/initialProfile";
import db from "../db";
import { v4 as uuidv4 } from "uuid";

export async function updateInviteCode({ serverId }: { serverId: string }) {
  const profile = await getProfile();

  try {
    if (!profile) {
      throw new Error("Missing profile");
    }
    const server = await db.server.update({
      where: {
        id: serverId,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return server;
  } catch (err) {
    console.log("[createServerError]", err);
    return null;
  }
}
