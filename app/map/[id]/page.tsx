"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Star, Navigation2, Coffee, Clock, Users } from "lucide-react";
import { venues, shopData } from "../../components/map/map-data";

export default function VenueDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const venue = venues.find(v => v.id === id) ?? null;
  const shop = shopData[id] ?? null;

  if (!venue) {
    return (
      <div className="app-glow flex flex-col items-center justify-center px-5 pt-6 pb-4 min-h-screen">
        <p className="text-white/50 text-lg">Venue not found</p>
        <Link
          href="/map"
          className="mt-4 px-6 py-2.5 rounded-full bg-primary-yellow text-black font-semibold text-sm"
        >
          Back to Map
        </Link>
      </div>
    );
  }

  return (
    <div className="app-glow flex flex-col px-5 pt-6 pb-4 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 shrink-0 pb-5">
        <Link
          href="/map"
          className="h-10 w-10 rounded-full flex items-center justify-center border border-pill-border bg-pill cursor-pointer hover:bg-white/5 transition-colors"
        >
          <ChevronLeft size={18} className="text-white/60" />
        </Link>
        <h1 className="text-[22px] font-bold text-white truncate">
          {venue.name}
        </h1>
      </div>

      {/* Hero image */}
      <div className="relative h-48 rounded-3xl overflow-hidden border border-pill-border mb-6">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 z-20">
          <h2 className="text-white text-2xl font-bold">{venue.name}</h2>
          <p className="text-white/70 text-sm mt-1">{venue.distance}</p>
        </div>
      </div>

      {/* Status + Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {venue.status === "open" && (
          <span className="px-4 py-1.5 rounded-full bg-emerald-400/15 text-emerald-400 text-xs font-medium">
            {venue.statusLabel}
          </span>
        )}
        {venue.tags.map(tag => (
          <span
            key={tag}
            className="px-4 py-1.5 rounded-full bg-white/5 text-white/50 text-xs font-normal"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Rich shop info */}
      {shop && (
        <div className="space-y-5 mb-8">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.round(shop.rating)
                      ? "fill-primary-yellow text-primary-yellow"
                      : "fill-white/15 text-white/15"
                  }
                />
              ))}
            </div>
            <span className="text-white/60 text-sm">
              {shop.rating} · {shop.reviewCount} reviews
            </span>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3">
            <Navigation2 size={18} className="text-white/40 shrink-0 mt-0.5" />
            <div>
              <p className="text-white text-sm font-medium">Address</p>
              <p className="text-white/50 text-sm">{shop.address}</p>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-3">
            <Clock size={18} className="text-white/40 shrink-0 mt-0.5" />
            <div>
              <p className="text-white text-sm font-medium">Hours Today</p>
              <p className="text-white/50 text-sm">
                {shop.hoursToday.day}: {shop.hoursToday.hours}
              </p>
            </div>
          </div>

          {/* Attendees */}
          <div className="flex items-start gap-3">
            <Users size={18} className="text-white/40 shrink-0 mt-0.5" />
            <div>
              <p className="text-white text-sm font-medium">Attendees Nearby</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                {shop.attendees.map(a => (
                  <div
                    key={a.id}
                    className={`h-8 w-8 rounded-full ${a.color} border-2 border-primary-bg flex items-center justify-center`}
                  >
                    <span className="text-white text-[9px] font-bold">
                      {a.initials}
                    </span>
                  </div>
                ))}
                {shop.extraAttendeeCount > 0 && (
                  <div className="h-8 w-8 rounded-full bg-white/10 border-2 border-primary-bg flex items-center justify-center">
                    <span className="text-white/70 text-[9px] font-bold">
                      +{shop.extraAttendeeCount}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 mt-auto">
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-pill-border bg-pill text-white text-sm font-semibold cursor-pointer"
        >
          <Navigation2 size={16} />
          Get Directions
        </button>
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-primary-yellow text-black text-sm font-bold cursor-pointer transition-all duration-200 hover:bg-primary-yellow/90 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
        >
          Request Coffee Chat
          <Coffee size={16} />
        </button>
      </div>
    </div>
  );
}
