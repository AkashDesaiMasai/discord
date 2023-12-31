import { getProfile } from "@/lib/auth/getProfile";
import { redirect } from "next/navigation";

import db from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";

const InvitePage = async ({ params }: { params: { inviteCode: string } }) => {
  const profile = await getProfile();

  if (!profile) {
    redirectToSignIn({returnBackUrl:`/invite/${params.inviteCode}`})
    return null;
  }

  
    const existingServer = await db.server.findFirst({
      where: {
        inviteCode: params.inviteCode,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    });

    if (existingServer) {
      redirect(`/server/${existingServer.id}`);
      return null;
    }
    const serverToUpdate = await db.server.findFirst({
      where: {
        inviteCode: params.inviteCode,
      },
    });

    if (!serverToUpdate) {
      redirect("/");
    }
    const result = await db.server.update({
      where: {
        id: serverToUpdate.id,
      },
      data: {
        members: {
          create: [
            {
              profileId: profile.id,
            },
          ],
        },
      },
      include: {
        members: true,
      },
    });
   
    if (result) {
      redirect(`/server/${result.id}`);
    } else {
      console.error("Server not found or not updated");
      redirect("/");
    }

    return null;
 
};

export default InvitePage;
