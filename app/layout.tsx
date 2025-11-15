import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navigation from "./components/Navigation";
import PageTransition from "./components/PageTransition";
import LiveBackground from "./components/LiveBackground";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YourSite∞ - Infinite Digital Possibilities",
  description: "YourSite∞ - Where creativity meets infinity. Professional web development, mobile apps, and limitless digital solutions.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white relative`}
      >
        <LiveBackground />
        <Navigation />
        <PageTransition>
          <main className="min-h-screen relative z-10">
            {children}
          </main>
        </PageTransition>
        <SpeedInsights />
        <Analytics />
        <div id="portal-root" />
      </body>
    </html>
  );
}
