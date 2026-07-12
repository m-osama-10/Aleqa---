import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alieqa — حاسبة العليقة الذكية | Smart Feed Calculator",
  description:
    "Alieqa is a production-grade animal-feed ration calculator with Supabase backend, offline support, dynamic ads, admin dashboard, and push notifications. حساب العليقة الذكية للمربي المصري.",
  keywords: [
    "Alieqa",
    "عليقة",
    "feed calculator",
    "animal nutrition",
    "supabase",
    "offline",
    "Egypt farming",
  ],
  authors: [{ name: "Alieqa" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Alieqa — Smart Feed Calculator",
    description: "Production-grade animal-feed ration calculator with Supabase backend.",
    siteName: "Alieqa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alieqa — Smart Feed Calculator",
    description: "Production-grade animal-feed ration calculator.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#16a34a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
