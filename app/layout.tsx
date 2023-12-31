import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/Providers/modalProvider";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    return (
      <html lang="en">
        <body className={roboto.className}>
          <ClerkProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ModalProvider />
              <div className="flex">
                <main className="flex-1">{children}</main>
              </div>

              <Toaster richColors position="bottom-center" />
            </ThemeProvider>
          </ClerkProvider>
        </body>
      </html>
    );
  } catch (error) {
    console.error("Error fetching user authentication:", error);

    return null;
  }
}
