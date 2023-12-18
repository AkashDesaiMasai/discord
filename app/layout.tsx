import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import { SocketProvider } from "@/components/Providers/SocketProvider";
import { getUserAuth } from "@/lib/auth/utils";

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
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClerkProvider>
              <SocketProvider userId={session?.user?.id}>
                <div className="flex">
                  <Suspense
                    fallback={
                      <div className="text-5xl text-red-700">Loading...</div>
                    }
                  >
                    <Navbar />
                    <main className="flex-1 mx-2 md:p-0 px-4 mt-4">
                      {children}
                    </main>
                  </Suspense>
                </div>
              </SocketProvider>
            </ClerkProvider>
            <Toaster richColors position="bottom-center" />
          </ThemeProvider>
        </body>
      </html>
    );
  } catch (error) {
    console.error("Error fetching user authentication:", error);
    // Handle the error, redirect, or show an error page as needed
    return null;
  }
}
