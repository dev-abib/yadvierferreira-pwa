"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Bell, User, Download } from "lucide-react";
import { usePwaInstall } from "../pwa/pwa-install-context";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/notifications", label: "Alerts", icon: Bell },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const { isStandalone, isIOS, triggerInstall } = usePwaInstall();

  // On iOS, there's no native install API, and instruction modals are removed.
  // Hide the install button on iOS since it would be non-functional.
  const canShowInstall = !isStandalone && !isIOS;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-auto pb-[env(safe-area-inset-bottom)] bg-primary-coffee border-t border-gray-200">
      <div className="h-16 flex items-center justify-around max-w-md mx-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center gap-1 flex-1 h-full"
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.8}
                className={isActive ? "text-[#5C7A5C]" : "text-gray-400"}
              />
              <span
                className={`text-[10px] ${
                  isActive ? "text-[#5C7A5C] font-medium" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}

        {/* ── Install Button (hidden on iOS — no native install support) ── */}
        {canShowInstall && (
          <button
            onClick={triggerInstall}
            className="flex flex-col items-center justify-center gap-1 flex-1 h-full"
            aria-label="Install CoffeeChat"
          >
            <Download
              size={22}
              strokeWidth={1.8}
              className="text-gray-400 transition-colors hover:text-[#EAA350]"
            />
            <span className="text-[10px] text-gray-400">
              Install
            </span>
          </button>
        )}
      </div>
    </nav>
  );
}
