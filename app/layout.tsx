import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    return (
      <html lang="en">
        <body className={inter.className}>
          <ClerkProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
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
    // Handle the error, redirect, or show an error page as needed
    return null;
  }
}
