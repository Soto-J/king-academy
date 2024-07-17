import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";

import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "King Academy",
  description: "King Academy League",
  icons: [{ url: "/logo.jpg", href: "/logo.jpg" }],
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            {/* <Footer /> */}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
