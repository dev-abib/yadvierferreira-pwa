"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Colors sampled directly from the design:
// page background: #0F0A06
// pill background: #171009 (slightly lighter than the page, floats above it)
// pill border: rgba(255, 255, 255, 0.06)
// active (icon/label): #EAA350
// inactive (icon/label): #7A6B5D

const ICON_PROPS = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function BrewieIcon() {
  return (
    <svg {...ICON_PROPS}>
      {/* to-go coffee cup */}
      <path d="M6.5 9h9.5l-.9 8.2a2 2 0 0 1-2 1.8h-3.7a2 2 0 0 1-2-1.8L6.5 9Z" />
      <path d="M16 10.5h1.2a1.8 1.8 0 0 1 0 3.6H16" />
      <path d="M5.5 9h11" />
      {/* steam */}
      <path d="M9.3 3c-.55.6-.55 1.2 0 1.8s.55 1.2 0 1.8" />
      <path d="M12.3 3c-.55.6-.55 1.2 0 1.8s.55 1.2 0 1.8" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="4" y="5.5" width="16" height="15" rx="2.5" />
      <path d="M4 9.5h16" />
      <path d="M8 3.5v3M16 3.5v3" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 21s6.5-5.7 6.5-11A6.5 6.5 0 0 0 5.5 10c0 5.3 6.5 11 6.5 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="8.5" cy="8.5" r="2.7" />
      <circle cx="16" cy="9.5" r="2.2" />
      <path d="M3.8 19c.5-2.9 2.4-4.6 4.7-4.6s4.2 1.7 4.7 4.6" />
      <path d="M14.2 15.3c1.9.1 3.4 1.6 3.9 3.9" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="8" r="3.3" />
      <path d="M5.5 19c.7-3.3 3.2-5.2 6.5-5.2s5.8 1.9 6.5 5.2" />
    </svg>
  );
}

const navItems = [
  { href: "/brewie", label: "Brewie", icon: BrewieIcon },
  { href: "/schedule", label: "Calendar", icon: CalendarIcon },
  { href: "/map", label: "Map", icon: MapIcon },
  { href: "/network", label: "Network", icon: NetworkIcon },
  { href: "/profile", label: "Profile", icon: ProfileIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)]"
      // style={{ backgroundColor: "#0F0A06" }}
    >
      <div
        className="flex items-center justify-around max-w-md my-5 mx-4 py-2.5 rounded-full"
        style={{
          backgroundColor: "#171009",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          const color = isActive ? "#EAA350" : "#7A6B5D";

          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center flex-1 gap-1 py-1"
              style={{ color }}
            >
              <Icon />
              <span className="text-[10px] leading-none font-medium tracking-tight">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
