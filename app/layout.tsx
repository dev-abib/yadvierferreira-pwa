import type { Metadata, Viewport } from "next";
import { DM_Sans, Satisfy } from "next/font/google";
import "./globals.css";
import { RegisterSW } from "./register-sw";
import { AppShell } from "./components/layout/app-shell";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const satisfy = Satisfy({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-satisfy",
});


export const metadata: Metadata = {
  title: "CoffeeChat",
  description: "Find the best coffer around you.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192.png", sizes: "180x180", type: "image/png" },
      { url: "/icon-192.png", sizes: "152x152", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
    title: "CoffeeChat",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0D0906",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${satisfy.variable}`} suppressHydrationWarning>
      <body>
        <AppShell>{children}</AppShell>
        <RegisterSW />
      </body>
    </html>
  );
}
