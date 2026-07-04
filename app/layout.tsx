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
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Your App Name",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#5C7A5C",
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
