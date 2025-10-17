import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import PageTransition from "./components/PageTransition";
import LiveBackground from "./components/LiveBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Professional Website",
  description: "A modern website with multiple pages showcasing services, portfolio, and more",
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
      </body>
    </html>
  );
}
