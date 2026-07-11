"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import type { Venue } from "./map-data";

interface VenueCardProps {
  venue: Venue;
  onClick: (id: string) => void;
}

export default function VenueCard({ venue, onClick }: VenueCardProps) {
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
        <div className="h-8 w-8 rounded-full bg-black/30 flex items-center justify-center shrink-0">
            <ChevronRight size={16} className="text-white/60" />
          </div>
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
