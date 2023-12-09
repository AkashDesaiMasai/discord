import { getUserAuth } from "@/lib/auth/utils";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/ThemeToggle";
import { Slack } from "lucide-react";

export default async function Navbar() {
  const { session } = await getUserAuth();

  if (session?.user) {
    return (
      <div className="bg-popover h-[100vh]">
        <nav className="py-2 h-[100vh] w-24 flex flex-col justify-center items-center">
          <div className="h-12 w-12 rounded-2xl text-white bg-[#5865f2] flex justify-center items-center font-semibold hover:opacity-75 transition-hover cursor-pointer">
            <Link href="/channels/@me">
              <Slack />
            </Link>
          </div>
          <div className="flex-1" />
          <div className="space-x-2 mb-4 flex flex-col gap-6 items-center">
            <ModeToggle />
            <UserButton afterSignOutUrl="/" />
          </div>
        </nav>
      </div>
    );
  } else return null;
}
