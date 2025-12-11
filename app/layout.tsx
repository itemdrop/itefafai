import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navigation from "./components/Navigation";
import PageTransition from "./components/PageTransition";
import LiveBackground from "./components/LiveBackground";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "./contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "YourSite - Infinite Digital Possibilities",
  description: "YourSite - Where creativity meets infinity. Professional web development, mobile apps, and limitless digital solutions.",
  other: {
    // Preload critical resources to prevent flickering
    'preload': 'true',
    'dns-prefetch': 'https://fonts.googleapis.com',
    'preconnect': 'https://fonts.gstatic.com'
  }
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
      <head>
        {/* Resource hints to prevent loading flickering */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href={`${geistSans.variable}`} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={`${geistMono.variable}`} as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* Optimize rendering */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white relative`}
        style={{ 
          willChange: 'auto',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        } as React.CSSProperties}
      >
        <AuthProvider>
          <LiveBackground />
          <Navigation />
          <PageTransition>
            <main className="min-h-screen relative z-10">
              {children}
            </main>
          </PageTransition>
          <SpeedInsights />
          <Analytics />
        </AuthProvider>
        <div id="portal-root" />
      </body>
    </html>
  );
}
