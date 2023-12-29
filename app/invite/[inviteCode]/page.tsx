import { getProfile } from "@/lib/auth/getProfile";
import { redirect } from "next/navigation";

import db from "@/lib/db";
const InvitePage = async ({ params }: { params: { inviteCode: string } }) => {
  const profile = await getProfile();

  if (!profile) {
    redirect("/");
  }
  
  const ExistingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  
  if (ExistingServer) {
    redirect(`/server/${ExistingServer.id}`);
    return null;
  }

  const result = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId:profile.id,
          },
        ],
      },
    },
    include: {
      members: true,
    },
  });
    redirect(`/server/${result.id}`);

  return null;
};

export default InvitePage;
