"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MessageSquare,
  Search,
  ScanLine,
} from "lucide-react";
import type { Tab, Person } from "@/app/components/network/types";
import { TABS, PEOPLE } from "@/app/components/network/types";
import PersonCard from "@/app/components/network/PersonCard";
import ProfileDrawer from "@/app/components/network/ProfileDrawer";

export default function Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("forYou");
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  // Lock background scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = selectedPerson ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPerson]);

  return (
    <div className="app-glow flex h-dvh flex-col overflow-hidden px-5 pt-6 pb-4">
      <div className="flex justify-between items-center shrink-0">
        <h2 className="text-[30px] font-normal text-white">Network</h2>
        <button
          onClick={() => router.push("/message")}
          className="h-10 w-10 rounded-xl flex justify-center items-center shadow-lg shadow-black border border-pill-border bg-pill cursor-pointer"
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
        {TABS.map(tab => (
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
          {PEOPLE.map(person => (
            <PersonCard
              key={person.id}
              person={person}
              onClick={() => setSelectedPerson(person)}
            />
          ))}
        </div>
      </div>

      <ProfileDrawer
        person={selectedPerson}
        onClose={() => setSelectedPerson(null)}
      />
    </div>
  );
}
