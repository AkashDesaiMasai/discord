import { InitialModal } from "@/components/Modals/InitialModal";

import initialProfile from "@/lib/auth/initialProfile";

import db from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
export default async function App() {
  const profile = await initialProfile();
  if (!profile) {
    redirectToSignIn();
  }

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });

  if (server) {
    redirect(`server/${server.id}`);
  }
  return (
    <main className="space-y-6 ">
      <div>
        <InitialModal />
      </div>
    </main>
  );
}
