import { getProfile } from "@/lib/auth/getProfile";
import { redirectToSignIn } from "@clerk/nextjs";
import db from "@/lib/db";
import { redirect } from "next/navigation";

const Channel = async ({ params }: { params: { serverId: string } }) => {
  const profile = await getProfile();

  if (!profile) {
    redirectToSignIn({ returnBackUrl: `/server/${params.serverId}` });
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  const channelId = server?.channels[0].id;
  if (server) {
    return redirect(`/server/${server.id}/channels/${channelId}`);
  }
  return null;
};

export default Channel;
