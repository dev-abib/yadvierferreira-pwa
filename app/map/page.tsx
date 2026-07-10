"use client";

import { useState } from "react";
import { Search, ChevronDown, ChevronRight, Coffee } from "lucide-react";

type FilterKey = "coffeePref" | "profession" | "availability";

interface FilterConfig {
  label: string;
  options: string[];
}

const filterOptions: Record<FilterKey, FilterConfig> = {
  coffeePref: {
    label: "Coffee Pref",
    options: ["Espresso", "Latte", "Filter", "Cold Brew"],
  },
  profession: {
    label: "Profession",
    options: ["Founder", "Designer", "Engineer", "Marketer"],
  },
  availability: {
    label: "Availability",
    options: ["Now", "Today", "This Week"],
  },
};

interface Pin {
  id: string;
  top: string;
  left: string;
  color: string;
  initials?: string;
  icon?: boolean;
}

const pins: Pin[] = [
  { id: "DC", top: "20%", left: "22%", color: "bg-rose-800", initials: "DC" },
  {
    id: "MR",
    top: "34%",
    left: "60%",
    color: "bg-emerald-700",
    initials: "MR",
  },
  { id: "SL", top: "48%", left: "82%", color: "bg-blue-700", initials: "SL" },
  { id: "KP", top: "62%", left: "38%", color: "bg-purple-700", initials: "KP" },
  {
    id: "venue",
    top: "42%",
    left: "24%",
    color: "bg-primary-yellow",
    icon: true,
  },
];

interface FilterSelectProps {
  id: FilterKey;
  label: string;
  options: string[];
  onChange?: (id: FilterKey, value: string) => void;
}

function FilterSelect({ id, label, options, onChange }: FilterSelectProps) {
  return (
    <div className="relative flex-1 min-w-0">
      <select
        id={id}
        defaultValue=""
        onChange={e => onChange?.(id, e.target.value)}
        className="w-full appearance-none bg-pill border border-pill-border text-white/60 text-xs font-normal rounded-full pl-3 pr-7 py-1.5 truncate focus:outline-none focus:border-primary-yellow"
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map(opt => (
          <option key={opt} value={opt} className="text-black bg-white">
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        size={12}
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40"
      />
    </div>
  );
}

type Tab = "explore" | "nearby";

interface Venue {
  name: string;
  distance: string;
  attendeeCount: number;
  status: "open" | "closed";
  tags: string[];
}

const venue: Venue = {
  name: "Two Birds Coffee House",
  distance: "5 min walk",
  attendeeCount: 3,
  status: "open",
  tags: ["Quiet", "Good WiFi"],
};

export default function Page() {
  const [tab, setTab] = useState<Tab>("explore");
  const [selectedFilters, setSelectedFilters] = useState<
    Partial<Record<FilterKey, string>>
  >({});

  const handleFilterChange = (id: FilterKey, value: string) => {
    setSelectedFilters(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="app-glow flex  flex-col px-5 pt-6 pb-4">
      <div className="flex justify-between items-center shrink-0 pb-3">
        <h2 className="text-[26px] font-bold text-white">Nearby</h2>
        <button className="h-10 w-10 rounded-full flex justify-center items-center shadow-lg shadow-black border border-pill-border bg-pill">
          <Search className="text-white/70 cursor-pointer" size={16} />
        </button>
      </div>

      <div className="flex gap-2 mt-4 shrink-0">
        <button
          onClick={() => setTab("explore")}
          className={`px-5 py-2 rounded-full text-sm font-normal transition-colors w-full cursor-pointer ${
            tab === "explore"
              ? "bg-primary-yellow text-black"
              : "bg-pill border border-pill-border text-white/50"
          }`}
        >
          Explore
        </button>
        <button
          onClick={() => setTab("nearby")}
          className={`px-5 py-2 rounded-full text-sm font-normal transition-colors w-full cursor-pointer ${
            tab === "nearby"
              ? "bg-primary-yellow text-black"
              : "bg-pill border border-pill-border text-white/50"
          }`}
        >
          Nearby
        </button>
      </div>

      <div className="flex gap-2 my-6 shrink-0">
        {(Object.keys(filterOptions) as FilterKey[]).map(key => (
          <FilterSelect
            key={key}
            id={key}
            label={filterOptions[key].label}
            options={filterOptions[key].options}
            onChange={handleFilterChange}
          />
        ))}
      </div>

      <div className="relative flex-1 min-h-95 rounded-3xl overflow-hidden border border-pill-border">
        <iframe
          title="Nearby map"
          src="https://www.google.com/maps?q=London&output=embed"
          className="absolute inset-0 w-full h-full grayscale-[40%] contrast-125 brightness-75"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        {pins.map(pin => (
          <div
            key={pin.id}
            className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center pointer-events-none"
            style={{ top: pin.top, left: pin.left }}
          >
            <div
              className={`h-9 w-9 rounded-full ${pin.color} flex items-center justify-center border-2 border-black/40 shadow-lg`}
            >
              {pin.icon ? (
                <Coffee size={16} className="text-black" />
              ) : (
                <span className="text-white text-[10px] font-bold">
                  {pin.initials}
                </span>
              )}
            </div>
            <div
              className={`w-2 h-2 -mt-1 rotate-45 ${pin.color}`}
              style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
            />
          </div>
        ))}
      </div>

      <div className="shrink-0 mt-4 rounded-3xl border border-pill-border bg-pill p-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-primary-yellow flex items-center justify-center shrink-0">
            <Coffee size={20} className="text-black" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-white font-semibold text-[15px] leading-tight">
              {venue.name}
            </h4>
            <p className="text-white/40 text-xs mt-1">
              {venue.distance} · {venue.attendeeCount} attendees nearby
            </p>
          </div>
          <button
            className="h-8 w-8 rounded-full bg-black/30 flex items-center justify-center shrink-0 cursor-pointer"
            aria-label="View venue details"
          >
            <ChevronRight size={16} className="text-white/60" />
          </button>
        </div>

        <div className="flex gap-2 my-5">
          {venue.status === "open" && (
            <span className="px-3 py-1.5 rounded-full bg-emerald-400/15 text-emerald-400 text-[11px] font-normal">
              Open now
            </span>
          )}
          {venue.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1.5 cursor-pointer rounded-full bg-white/5 text-white/50 text-[11px] font-normal"
            >
              {tag}
            </span>
          ))}
        </div>

        <button className="w-full py-3.5 rounded-2xl bg-primary-yellow text-black font-bold text-base cursor-pointer transition-all duration-200 hover:bg-primary-yellow/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-yellow/20 active:translate-y-0 active:scale-[0.98]">
          Request Coffee Chat
        </button>
      </div>
    </div>
  );
}
