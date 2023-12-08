import { getUserAuth } from "@/lib/auth/utils";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/ThemeToggle";

export default async function Navbar() {
  const { session } = await getUserAuth();

  if (session?.user) {
    return (
      <div className="bg-popover h-[100vh]">
        <nav className="py-2 h-[100vh] w-24 flex flex-col items-center">
          <h1 className="font-semibold hover:opacity-75 transition-hover cursor-pointer">
            <Link href="/">Logo</Link>
          </h1>
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
