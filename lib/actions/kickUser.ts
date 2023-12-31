"use server";

import { Member, MemberRole } from "@prisma/client";
import getProfile from "../auth/initialProfile";
import db from "../db";
import { ServerWithMembersWithProfiles } from "@/types";

type KickUserProps = {
  Member: Member;
  serverId: string;
};
export async function KickUser({ Member, serverId }: KickUserProps) {
  const profile = await getProfile();
  if (!profile) return;

  try {
    const Server: ServerWithMembersWithProfiles = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          delete: {
            id: Member.id,
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
        },
      },
    });
    return Server;
  } catch (error) {
    console.error("[Kick User] Error:", error);
    return undefined;
  }
}
