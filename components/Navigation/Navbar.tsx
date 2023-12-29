import Link from "next/link";
import { UserButton, redirectToSignIn } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/ThemeToggle";
import { Plus, Slack } from "lucide-react";

import { Separator } from "../ui/separator";
import { ToolTip } from "../ToolTip/toooltip";

import db from "@/lib/db";
import { redirect } from "next/navigation";

import CreateServerButton from "./CreateServerButton";

import NavigationItem from "./NavigationItem";
import { ScrollArea } from "../ui/scroll-area";
import { getProfile } from "@/lib/auth/getProfile";
export default async function Navbar() {
  const profile = await getProfile();

  if (!profile) {
    redirect("/");
  }
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });

  return (
    <nav className="pb-4 w-24 bg-popover h-[100vh]  flex flex-col justify-center gap-4 items-center">
     
      <NavigationItem servers={servers} />
      <CreateServerButton />

      <div className="  flex flex-col gap-6 items-center justify-center">
        <ToolTip content={"Change Theme"}>
          <div>
            <ModeToggle />
          </div>
        </ToolTip>

        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </nav>
  );
}
