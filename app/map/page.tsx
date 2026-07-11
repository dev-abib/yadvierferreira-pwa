"use client";

import { useState, useCallback } from "react";
import { Search, Coffee } from "lucide-react";
import VenueDetailDrawer from "../components/map/VenueDetailDrawer";
import VenueDetailSheet from "../components/map/VenueDetailSheet";
import CoffeeChatModal from "../components/map/CoffeeChatModal";
import FilterSelect from "../components/map/FilterSelect";
import VenueCard from "../components/map/VenueCard";
import { filterOptions, pins, venues } from "../components/map/map-data";
import type { FilterKey } from "../components/map/map-data";

type Tab = "explore" | "nearby";

export default function Page() {
  const [tab, setTab] = useState<Tab>("explore");
  const [selectedFilters, setSelectedFilters] = useState<
    Partial<Record<FilterKey, string>>
  >({});
  const [drawerVenueId, setDrawerVenueId] = useState<string | null>(null);
  const [detailSheetId, setDetailSheetId] = useState<string | null>(null);
  const [coffeeChatVenue, setCoffeeChatVenue] = useState<string | null>(null);

  const handleFilterChange = (id: FilterKey, value: string) => {
    setSelectedFilters(prev => ({ ...prev, [id]: value }));
  };

  const openDrawer = (id: string) => {
    setDrawerVenueId(id);
  };

  const closeDrawer = () => {
    setDrawerVenueId(null);
  };

  const openDetailSheet = (id: string) => {
    setDrawerVenueId(null); 
    setDetailSheetId(id);
  };

  const closeDetailSheet = () => {
    setDetailSheetId(null);
  };

  const openCoffeeChat = useCallback((venueName: string) => {
    setCoffeeChatVenue(venueName);
  }, []);

  const closeCoffeeChat = useCallback(() => {
    setCoffeeChatVenue(null);
  }, []);

  const handleCoffeeChatSubmit = useCallback((data: {
    time: string;
    proposeTo: string;
    agenda: string;
  }) => {
    console.log("Coffee chat proposed:", data);
    setCoffeeChatVenue(null);
  }, []);

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
            <VenueCard key={v.id} venue={v} onClick={openDetailSheet} />
          ))}
        </div>
      )}

      {/* Simple pin drawer */}
      <VenueDetailDrawer
        open={drawerVenueId !== null}
        venueId={drawerVenueId}
        onClose={closeDrawer}
        onViewDetails={openDetailSheet}
        onCoffeeChat={openCoffeeChat}
      />

      {/* Rich venue detail sheet */}
      <VenueDetailSheet
        open={detailSheetId !== null}
        id={detailSheetId}
        onClose={closeDetailSheet}
        onCoffeeChat={openCoffeeChat}
      />

      {/* Coffee Chat Modal */}
      <CoffeeChatModal
        open={coffeeChatVenue !== null}
        venueName={coffeeChatVenue ?? ""}
        onClose={closeCoffeeChat}
        onSubmit={handleCoffeeChatSubmit}
      />
    </div>
  );
}
