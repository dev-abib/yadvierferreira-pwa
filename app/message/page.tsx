"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Users } from "lucide-react";
import { conversations } from "@/public/lib/conversation";

export default function Page() {
  const [query, setQuery] = useState("");

  const filtered = conversations.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="app-glow flex h-dvh flex-col overflow-hidden px-5 pt-6 pb-4">
      <div className="flex justify-between items-center shrink-0">
        <h2 className="text-[30px] font-serif font-bold text-white">Message</h2>
        <button
          className="h-10 w-10 rounded-xl flex justify-center items-center shadow-lg shadow-black border border-pill-border bg-pill cursor-pointer"
          aria-label="Contacts"
        >
          <Users className="text-primary-yellow" size={20} />
        </button>
      </div>

      <div className="relative mt-4 shrink-0">
        <Search
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
        />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search with username"
          className="w-full bg-pill border border-pill-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary-yellow"
        />
      </div>

      <div className="flex-1 overflow-y-auto mt-4 -mx-1 px-1">
        <div className="flex flex-col divide-y divide-pill-border">
          {filtered.map(c => (
            <Link
              key={c.id}
              href={`/message/${c.id}`}
              className="flex items-start gap-3 py-4 text-left w-full"
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className={`h-16 w-16 rounded-2xl ${c.avatarColor} flex items-center justify-center`}
                >
                  <span className="text-white text-xl font-bold">
                    {c.initials}
                  </span>
                </div>
                <span
                  className={`absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full ${c.onlineDotColor} border-2 border-black`}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4
                    className={`text-[15px] truncate ${
                      c.unread
                        ? "text-white font-bold"
                        : "text-white font-semibold"
                    }`}
                  >
                    {c.name}
                  </h4>
                  {c.nearby && (
                    <span className="text-emerald-400 text-[11px] font-medium shrink-0">
                      · Nearby
                    </span>
                  )}
                </div>
                <p
                  className={`text-xs mt-1 truncate ${
                    c.unread ? "text-white/70" : "text-white/40"
                  }`}
                >
                  {c.preview}
                </p>
              </div>

              {/* Time */}
              <span className="text-white/30 text-[11px] shrink-0 pt-0.5">
                {c.time}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
