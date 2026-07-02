import type { Metadata } from "next";
import "./globals.css";
import { RegisterSW } from "./register-sw";


export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your app description",
  manifest: "/manifest.webmanifest",
  themeColor: "#5C7A5C",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Your App Name",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <RegisterSW />
      </body>
    </html>
  );
}
