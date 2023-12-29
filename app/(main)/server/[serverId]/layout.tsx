import { redirectToSignIn } from "@clerk/nextjs";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import ServerSideBar from "@/components/ServerSideBar/ServerSideBar";
import { getProfile } from "@/lib/auth/getProfile";

export default async function ServerIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    serverId: string;
  };
}) {
  const profile = await getProfile();
  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findFirst({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    console.log("No server again",profile.id)
    return redirect("/");
  } 
  return (
    <div className="flex h-full">
      <div className="hidden md:flex min-w-72 bg-muted mr-3">
        <ServerSideBar serverId={server.id} />
      </div>
      {children}
    </div>
  );
}
