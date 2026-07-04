"use client";
import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const BottomNav = dynamic(
  () => import("./bottom-nav").then((mod) => mod.BottomNav),
  { ssr: false }
);

export function AppShell({ children }: { children: ReactNode }) {
  const pathName = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      <main className={`flex-1 w-full ${pathName !== "/" ? "pb-20" : ""}`}>
        {children}
      </main>
      {pathName !== "/" && <BottomNav />}
    </div>
  );
}
