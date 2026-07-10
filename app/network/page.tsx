"use client";

import { useState } from "react";
import {
  MessageSquare,
  Search,
  ScanLine,
  ChevronRight,
  Coffee,
} from "lucide-react";

type Tab = "forYou" | "connections" | "favorites";

interface Person {
  id: string;
  initials: string;
  avatarColor: string;
  onlineDotColor: string;
  name: string;
  badge?: { label: string; color: string };
  title: string;
  company: string;
  tags: string[];
  drink: string;
  action: "connect" | "message";
}

const tabs: { key: Tab; label: string }[] = [
  { key: "forYou", label: "For You" },
  { key: "connections", label: "Connections" },
  { key: "favorites", label: "Favorites" },
];

const people: Person[] = [
  {
    id: "1",
    initials: "DC",
    avatarColor: "bg-[#C2793A]/40",
    onlineDotColor: "bg-emerald-400",
    name: "Daniela Cruz",
    badge: { label: "Nearby", color: "text-emerald-400" },
    title: "Senior Marketing Manager",
    company: "Delo...",
    tags: ["Marketing", "Strategy"],
    drink: "Cappuccino",
    action: "connect",
  },
  {
    id: "2",
    initials: "MR",
    avatarColor: "bg-[#243B2A]",
    onlineDotColor: "bg-orange-500",
    name: "Marcus Reyes",
    title: "Staff Software Engineer",
    company: "Google",
    tags: ["Engineering", "AI/ML"],
    drink: "Black Coffee",
    action: "message",
  },
  {
    id: "3",
    initials: "SL",
    avatarColor: "bg-[#243B2A]",
    onlineDotColor: "bg-emerald-400",
    name: "Sofia Lin",
    badge: { label: "Nearby", color: "text-emerald-400" },
    title: "Investment Analyst",
    company: "JP Morgan",
    tags: ["Finance", "Fintech"],
    drink: "Matcha",
    action: "connect",
  },
  {
    id: "4",
    initials: "KP",
    avatarColor: "bg-[#C2793A]/40",
    onlineDotColor: "bg-orange-500",
    name: "Kevin Park",
    title: "Product Designer",
    company: "Figma",
    tags: ["Design", "Product"],
    drink: "Oat Latte",
    action: "connect",
  },
  {
    id: "5",
    initials: "AJ",
    avatarColor: "bg-[#243B2A]",
    onlineDotColor: "bg-orange-500",
    name: "Aisha Johnson",
    badge: { label: "★", color: "text-primary-yellow" },
    title: "Strategy Consultant",
    company: "McKinsey",
    tags: ["Consulting", "Leadership"],
    drink: "Cold Brew",
    action: "message",
  },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>("forYou");

  return (
    <div className="app-glow flex h-dvh flex-col overflow-hidden px-5 pt-6 pb-4">
      <div className="flex justify-between items-center shrink-0">
        <h2 className="text-[30px] font-normal text-white">Network</h2>
        <button
          className="h-10 w-10 rounded-xl flex justify-center items-center shadow-lg shadow-black border border-pill-border bg-pill"
          aria-label="Messages"
        >
          <MessageSquare className="text-primary-yellow" size={16} />
        </button>
      </div>

      <div className="flex gap-2 mt-4 shrink-0">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
          />
          <input
            type="text"
            placeholder="Search with username"
            className="w-full bg-pill border border-pill-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary-yellow"
          />
        </div>
        <button className="flex items-center gap-1.5 px-4 rounded-xl cursor-pointer border border-primary-yellow/40 text-primary-yellow text-xs font-bold shrink-0">
          <ScanLine size={14} />
          SCAN
        </button>
      </div>

      <div className="flex gap-5 mt-5 border-b border-pill-border shrink-0">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2.5 text-sm font-semibold transition-colors relative cursor-pointer ${
              activeTab === tab.key ? "text-primary-yellow" : "text-white/40"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary-yellow rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto mt-4 -mx-1 px-1">
        <div className="flex flex-col divide-y divide-pill-border">
          {people.map(person => (
            <div key={person.id} className="flex gap-3 py-4">
              <div className="relative shrink-0">
                <div
                  className={`h-16 w-16 rounded-2xl ${person.avatarColor} flex items-center justify-center`}
                >
                  <span className="text-white text-xl font-bold">
                    {person.initials}
                  </span>
                </div>
                <span
                  className={`absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full ${person.onlineDotColor} border-2 border-black`}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-white font-semibold text-lg truncate">
                    {person.name}
                  </h4>
                  {person.badge && (
                    <span
                      className={`text-[11px] font-normal shrink-0 ${person.badge.color}`}
                    >
                      {person.badge.label}
                    </span>
                  )}
                </div>
                <p className="text-white/40 text-sm my-1 truncate">
                  {person.title} · {person.company}
                </p>

                <div className="flex flex-wrap items-center gap-1.5 my-3">
                  {person.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2.5 py-1.5 rounded-full bg-white/5 text-white/50 text-[11px] font-normal"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-2">
                  <div className="flex items-center gap-1.5 w-fit text-xs px-2.5 py-1.5 rounded-full bg-white/5 text-white/50 text-[11px] font-normal">
                    <Coffee size={12} />
                    {person.drink}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between items-end">
                <div className="shrink-0 flex items-start pt-1">
                  {person.action === "connect" ? (
                    <button className="px-4 py-2.5 cursor-pointer rounded-full bg-primary-yellow text-black text-xs font-bold transition-colors hover:bg-primary-yellow/90">
                      Connect
                    </button>
                  ) : (
                    <button
                      className="h-10 w-10 rounded-full flex justify-center items-center shadow-lg shadow-black border border-pill-border bg-pill"
                      aria-label="Messages"
                    >
                      <MessageSquare
                        className="text-primary-yellow"
                        size={16}
                      />
                    </button>
                  )}
                </div>
                <ChevronRight className="text-white/40" size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
