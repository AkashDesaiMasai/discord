import { Button } from "@/components/ui/button";
import { getUserAuth } from "@/lib/auth/utils";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const userAuth = await auth();
  return (
    <main className="space-y-6">
     
    </main>
  );
}
