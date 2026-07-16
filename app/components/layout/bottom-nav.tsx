"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


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
    <svg
      {...ICON_PROPS}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M8.33337 1.66663V3.33329"
        stroke="#7A6B5D"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.6666 1.66663V3.33329"
        stroke="#7A6B5D"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.3333 6.66663C13.7936 6.66663 14.1667 7.03972 14.1667 7.49996V14.1666C14.1667 16.0076 12.6743 17.5 10.8333 17.5H5.83333C3.99238 17.5 2.5 16.0076 2.5 14.1666V7.49996C2.5 7.03972 2.8731 6.66663 3.33333 6.66663H13.3333V6.66663"
        stroke="#7A6B5D"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.1666 10H15.8333C16.7538 10 17.5 10.7462 17.5 11.6667V12.5C17.5 13.4205 16.7538 14.1667 15.8333 14.1667H14.1666"
        stroke="#7A6B5D"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5 1.66663V3.33329"
        stroke="#7A6B5D"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
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
        style={{
          backgroundColor: "rgba(15, 10, 6, 0.20)",
        }}
        className="flex py-5 items-center justify-around max-w-md my-5 mx-4 py-2.5 rounded-[60px] border-[0.3px] border-solid border-[#ffffff34] px-8.5  shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_12px_2px_rgba(234,163,80,0.10)_inset]  backdrop-blur-[1.5px] "
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
