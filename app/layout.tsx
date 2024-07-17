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
  description:
    "Welcome to King Academy, where young athletes learn, play, and excel in baseball. Join our league for a season of growth, teamwork, and unforgettable moments!",
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
            <main className="min-h-[84vh]">{children}</main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

/*
  TODOS:
  -When user first signs up redirect to complete profile
*/
