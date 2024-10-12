import type { Metadata } from "next";
import localFont from "next/font/local";
import "keen-slider/keen-slider.min.css";
import "./globals.scss";
import { getServerSession } from "next-auth";
import SessionProvider from "@/providers/SessionProvider";
import LayoutClient from "./layout.client";
import { Silkscreen, Inter } from "next/font/google";

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "a-studio-movie",
  description: "2024",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={`${silkscreen.className} ${inter.className}`}>
        <SessionProvider session={session}>
          <LayoutClient>{children}</LayoutClient>
        </SessionProvider>
      </body>
    </html>
  );
}
