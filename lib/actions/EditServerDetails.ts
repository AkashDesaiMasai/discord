"use server";

import { MemberRole } from "@prisma/client";
import getProfile from "../auth/initialProfile";
import db from "../db";
import { v4 as uuidv4 } from "uuid";

type createServerProps = {
  name: string;
  imageUrl: string;
  serverId: string;
};
export async function editServer({
  name,
  imageUrl,
  serverId,
}: createServerProps) {
  const profile = await getProfile();
  if (!profile) return;
  try {
    const EditedServer =await db.server.update({
        where:{
            id:serverId
        },
        data:{
         name,
         imageUrl
        }
    })
    return EditedServer;
  } catch (err) {
    console.log("[createServerError]", err);
    return null;
  }
}
