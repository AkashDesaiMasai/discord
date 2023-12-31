"use server";

import { Member, MemberRole } from "@prisma/client";
import getProfile from "../auth/initialProfile";
import db from "../db";
import { ServerWithMembersWithProfiles } from "@/types";

type changeRoleProps = {
  Role: MemberRole;
  Member: Member;
  serverId: string;
};
export async function changeRole({ Role, Member, serverId }: changeRoleProps) {
  const profile = await getProfile();
  if (!profile) return;

  try {
    const Server:ServerWithMembersWithProfiles = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: Member.id,
            },
            data: {
              role: Role,
            },
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
    console.error("[LeaveServer] Error:", error);
    return undefined;
  }
}
