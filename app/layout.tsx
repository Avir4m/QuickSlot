import Navbar from "@/components/navbar";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "@/app/globals.css";
import { Suspense } from "react";

export const metadata = {
  title: "QuickSlot",
  description: "Organize your organizations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <Navbar/>
              <div className="flex flex-col gap-20 max-w-5xl p-5">
                <Suspense fallback="loading...">
                  {children}
                </Suspense>
              </div>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
