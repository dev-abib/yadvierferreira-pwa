"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePwaInstall } from "../pwa/pwa-install-context";
import {
  Brewie,
  Calender,
  Map,
  Network,
  Profile,
} from "../SvgContainer/SvgContainer";

const navItems = [
  { href: "/", label: "Brewie", icon: Brewie },
  { href: "/search", label: "Calender", icon: Calender },
  { href: "/notifications", label: "Map", icon: Map },
  { href: "/profile", label: "Network", icon: Network },
  { href: "/profile", label: "Profile", icon: Profile },
];

export function BottomNav() {
  const pathname = usePathname();
  const { isStandalone, isIOS, triggerInstall } = usePwaInstall();

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
              <Icon />
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

      </div>
    </nav>
  );
}
