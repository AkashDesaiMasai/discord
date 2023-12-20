import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import { SocketProvider } from "@/components/Providers/SocketProvider";
import { getUserAuth } from "@/lib/auth/utils";
import QueryProvider from "@/components/Providers/queryProvider";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const { session } = await getUserAuth();

    if (!session) {
      // Handle the case when there is no session
      return null;
    }

    return (
      <div className={inter.className}>
        <SocketProvider userId={session?.user?.id}>
          <QueryProvider>
            <div className="flex">
              <Suspense
                fallback={
                  <div className="text-5xl text-red-700">Loading...</div>
                }
              >
                <Navbar />
                <div className="hidden md:flex min-w-72 bg-muted mr-3"> hello</div>
                <main className="flex-1 mx-2 md:p-0 px-4 mt-4">{children}</main>
              </Suspense>
            </div>
          </QueryProvider>
        </SocketProvider>

        <Toaster richColors position="bottom-center" />
      </div>
    );
  } catch (error) {
    console.error("Error fetching user authentication:", error);
    // Handle the error, redirect, or show an error page as needed
    return null;
  }
}
