"use server";

import { MemberRole } from "@prisma/client";
import getProfile from "../auth/initialProfile";
import db from "../db";
import { v4 as uuidv4 } from "uuid";

type createServerProps = {
  name: string;
  imageUrl: string;
};
export async function createServer({ name, imageUrl }: createServerProps) {
  const profile = await getProfile();
  if (!profile) return;
  try {
    const createdServer = await db.server.create({
      data: {
        name,
        imageUrl,
        inviteCode: uuidv4(),
        profileId: profile.id,
        channels: {
          create: [
            {
              name: "general",
              profileId: profile.id,
            },
          ],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
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
    console.log("[createServerError]", err);
    return null;
  }
}
