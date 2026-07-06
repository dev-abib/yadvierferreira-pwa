"use client";
import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { PwaInstallProvider } from "../pwa/pwa-install-context";
import AuthBottom from "./AuthBottom";

const BottomNav = dynamic(
  () => import("./bottom-nav").then(mod => mod.BottomNav),
  { ssr: false },
);

const HIDE_NAV_ROUTES = new Set(["/", "/login"]);
const AUTH_ROUTES = new Set(["/login"]);

export function AppShell({ children }: { children: ReactNode }) {
  const pathName = usePathname();
  const hideNav = HIDE_NAV_ROUTES.has(pathName);
  const isAuth = AUTH_ROUTES.has(pathName);

  return (
    <PwaInstallProvider>
      <div className="min-h-screen flex flex-col">
        <main
          className={`flex-1 w-full ${!hideNav ? "pb-20" : ""} ${isAuth ? "pb-[72px]" : ""}`}
        >
          {children}
        </main>
        {!hideNav && <BottomNav />}
        {/* {isAuth && <AuthBottom />} */}
      </div>
    </PwaInstallProvider>
  );
}
