"use server";

import { ServerWithMembersWithProfiles } from "@/types";
import getProfile from "../auth/initialProfile";
import db from "../db";
import { v4 as uuidv4 } from "uuid";

export async function updateInviteCode({ serverId }: { serverId: string }) {
  const profile = await getProfile();

  try {
    if (!profile) {
      throw new Error("Missing profile");
    }
    const server:ServerWithMembersWithProfiles = await db.server.update({
      where: {
        id: serverId,
      },
      data: {
        inviteCode: uuidv4(),
      },
      include:{
        members:{
          include:{
            profile:true
          }
        }
      }
    });

    return server;
  } catch (err) {
    console.log("[createServerError]", err);
    return null;
  }
}
