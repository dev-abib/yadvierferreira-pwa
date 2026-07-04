"use client";
import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const BottomNav = dynamic(
  () => import("./bottom-nav").then((mod) => mod.BottomNav),
  { ssr: false }
);

// Routes that should not show the bottom navigation bar
const HIDE_NAV_ROUTES = new Set(["/", "/login"]);

export function AppShell({ children }: { children: ReactNode }) {
  const pathName = usePathname();
  const hideNav = HIDE_NAV_ROUTES.has(pathName);

  return (
    <div className="min-h-screen flex flex-col">
      <main className={`flex-1 w-full ${!hideNav ? "pb-20" : ""}`}>
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
