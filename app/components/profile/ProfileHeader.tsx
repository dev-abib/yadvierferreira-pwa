"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical, LogOut, Trash2 } from "lucide-react";

export default function ProfileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="relative flex items-center justify-center">
      <h2 className="text-lg font-semibold text-white">CoffeeChat</h2>
      <div ref={menuRef} className="absolute right-0">
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Account menu"
          className="h-9 w-9 rounded-xl flex items-center justify-center border border-pill-border bg-pill cursor-pointer"
        >
          <MoreVertical size={16} className="text-white/70" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-11 w-48 rounded-2xl border border-pill-border bg-[#1c1815] shadow-2xl shadow-black overflow-hidden z-50">
            <button
              onClick={() => {
                setMenuOpen(false);
                // TODO: wire up sign-out
              }}
              className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-white hover:bg-white/5 cursor-pointer"
            >
              <LogOut size={15} className="text-white/60" />
              Log Out
            </button>
            <div className="h-px bg-pill-border" />
            <button
              onClick={() => {
                setMenuOpen(false);
                // TODO: wire up delete-account confirmation flow
              }}
              className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 cursor-pointer"
            >
              <Trash2 size={15} />
              Delete Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
