import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import Navbar from "@/components/Navigation/Navbar";
import { Suspense } from "react";
import { SocketProvider } from "@/components/Providers/SocketProvider";

import QueryProvider from "@/components/Providers/queryProvider";

import { redirectToSignIn } from "@clerk/nextjs";
import initialProfile from "@/lib/auth/initialProfile";
import { FaDiscord } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export default async function SeverLayout({
  children,
}: {
  children: React.ReactNode;
  params: {
    serverId: string;
  };
}) {
  const profile = await initialProfile();
  if (!profile) {
    return redirectToSignIn();
  }

  return (
    <div className={inter.className}>
      <SocketProvider userId={profile?.id}>
        <QueryProvider>
          <div className="flex">
            <Suspense
              fallback={
                <div className="h-screen w-screen flex justify-center items-center">
                  <FaDiscord className="h-48 w-48" />
                </div>
              }
            >
              <Navbar />

              <div className="flex-1">{children}</div>
            </Suspense>
          </div>
        </QueryProvider>
      </SocketProvider>

      <Toaster richColors position="bottom-center" />
    </div>
  );
}
