"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, ChevronDown, ChevronRight, Coffee } from "lucide-react";
import VenueDetailDrawer from "../components/map/VenueDetailDrawer";
import Link from "next/link";

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
  id: string;
  name: string;
  image: string;
  distance: string;
  attendeeCount: number;
  status: "open" | "closed";
  statusLabel: string;
  tags: string[];
  hot?: boolean;
}

const venues: Venue[] = [
  {
    id: "two-birds-coffee-house",
    name: "Two Birds Coffee House",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=200&fit=crop",
    distance: "5 min walk",
    attendeeCount: 3,
    status: "open",
    statusLabel: "Open now",
    tags: ["Quiet", "Good WiFi"],
    hot: true,
  },
  {
    id: "sunny-side-bakery",
    name: "Sunny Side Bakery",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop",
    distance: "10 min walk",
    attendeeCount: 5,
    status: "open",
    statusLabel: "Open until 8 PM",
    tags: ["Cozy atmosphere", "Free pastries with coffee"],
  },
  {
    id: "the-urban-lounge",
    name: "The Urban Lounge",
    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=200&h=200&fit=crop",
    distance: "7 min walk",
    attendeeCount: 4,
    status: "open",
    statusLabel: "Open 24 hours",
    tags: ["Lively", "Great for meetings"],
  },
];

interface VenueCardProps {
  venue: Venue;
  onClick: (id: string) => void;
}

function VenueCard({ venue, onClick }: VenueCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(venue.id)}
      className="w-full text-left rounded-3xl border border-pill-border bg-pill p-4 cursor-pointer transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.99]"
    >
      <div className="flex items-center gap-3">
        <div className="relative h-25 w-20 rounded-2xl overflow-hidden shrink-0">
          <Image
            src={venue.image}
            alt={venue.name}
            fill
            sizes="64px"
            className="object-cover"
          />
          {venue.hot && (
            <span className="absolute bottom-1 right-1 text-sm leading-none">
              🔥
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold text-lg leading-tight">
            {venue.name}
          </h4>
          <p className="text-white/40 text-xs mt-1">
            {venue.distance} · {venue.attendeeCount} attendees nearby
          </p>
        </div>
        <Link href={`/map/${venue.id}`} className="shrink-0">
          <div className="h-8 w-8 rounded-full bg-black/30 flex items-center justify-center shrink-0">
            <ChevronRight size={16} className="text-white/60" />
          </div>
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {venue.status === "open" && (
          <span className="px-3 py-1.5 rounded-full bg-emerald-400/15 text-emerald-400 text-[11px] font-normal">
            {venue.statusLabel}
          </span>
        )}
        {venue.tags.map(tag => (
          <span
            key={tag}
            className="px-3 py-1.5 rounded-full bg-white/5 text-white/50 text-[11px] font-normal"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}

export default function Page() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("explore");
  const [selectedFilters, setSelectedFilters] = useState<
    Partial<Record<FilterKey, string>>
  >({});
  const [drawerVenueId, setDrawerVenueId] = useState<string | null>(null);

  const handleFilterChange = (id: FilterKey, value: string) => {
    setSelectedFilters(prev => ({ ...prev, [id]: value }));
  };

  const openDrawer = (id: string) => {
    setDrawerVenueId(id);
  };

  const closeDrawer = () => {
    setDrawerVenueId(null);
  };

  const navigateToVenue = (id: string) => {
    router.push(`/map/${id}`);
  };

  return (
    <div className="app-glow flex flex-col px-5 pt-6 pb-4">
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

      {tab === "explore" ? (
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
            <button
              key={pin.id}
              type="button"
              onClick={() => openDrawer(pin.id)}
              aria-label={`View details for ${pin.initials ?? "venue"}`}
              className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center cursor-pointer group"
              style={{ top: pin.top, left: pin.left }}
            >
              <div
                className={`h-9 w-9 rounded-full ${pin.color} flex items-center justify-center border-2 border-black/40 shadow-lg transition-transform duration-150 group-hover:scale-110 group-active:scale-95`}
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
            </button>
          ))}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-2">
          {venues.map(v => (
            <VenueCard key={v.id} venue={v} onClick={navigateToVenue} />
          ))}
        </div>
      )}

      {/* Bottom drawer for venue details */}
      <VenueDetailDrawer
        open={drawerVenueId !== null}
        venueId={drawerVenueId}
        onClose={closeDrawer}
      />
    </div>
  );
}
