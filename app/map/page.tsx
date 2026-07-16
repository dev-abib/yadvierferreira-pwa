"use client";

import { useState, useCallback } from "react";
import { Search, Coffee } from "lucide-react";
import VenueDetailDrawer from "../components/map/VenueDetailDrawer";
import VenueDetailSheet from "../components/map/VenueDetailSheet";
import CoffeeChatModal from "../components/map/CoffeeChatModal";
import VenueCard from "../components/map/VenueCard";
import {  pins, venues } from "../components/map/map-data";
type Tab = "explore" | "nearby";

export default function Page() {
  const [tab, setTab] = useState<Tab>("explore");

  const [drawerVenueId, setDrawerVenueId] = useState<string | null>(null);
  const [detailSheetId, setDetailSheetId] = useState<string | null>(null);
  const [coffeeChatVenue, setCoffeeChatVenue] = useState<string | null>(null);

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

  const handleCoffeeChatSubmit = useCallback(
    (data: { time: string; proposeTo: string; agenda: string }) => {
      console.log("Coffee chat proposed:", data);
      setCoffeeChatVenue(null);
    },
    [],
  );

  return (
    <div className="app-glow flex flex-col px-5 pt-6 pb-4">
      <style>{`
        @keyframes pin-drop-in {
          0% { opacity: 0; transform: translate(-50%, -100%) translateY(-40px) scale(0.4); }
          60% { opacity: 1; transform: translate(-50%, -100%) translateY(6px) scale(1.15); }
          100% { opacity: 1; transform: translate(-50%, -100%) scale(1); }
        }
        @keyframes pin-idle-bob {
          0%, 100% { transform: translate(-50%, -100%) translateY(0); }
          50% { transform: translate(-50%, -100%) translateY(-4px); }
        }
        @keyframes pin-ring-pulse {
          0% { transform: rotate(45deg) scale(0.8); opacity: 0.55; }
          70% { transform: rotate(45deg) scale(1.9); opacity: 0; }
          100% { transform: rotate(45deg) scale(1.9); opacity: 0; }
        }
        @keyframes heat-glow-pulse {
          0%, 100% { opacity: 0.55; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.75; transform: translate(-50%, -50%) scale(1.08); }
        }
      `}</style>

      <div className="flex justify-between items-center shrink-0 pb-3">
        <h2 className="text-[26px] font-bold text-white">Nearby</h2>
        <button className="h-10 w-10 rounded-full flex justify-center items-center shadow-lg shadow-black border border-pill-border bg-pill">
          <Search className="text-white/70 cursor-pointer" size={16} />
        </button>
      </div>

      <div className="flex gap-2 my-4 shrink-0">
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

      {/* <div className="flex gap-2 my-6 shrink-0">
        {(Object.keys(filterOptions) as FilterKey[]).map(key => (
          <FilterSelect
            key={key}
            id={key}
            label={filterOptions[key].label}
            options={filterOptions[key].options}
            onChange={handleFilterChange}
          />
        ))}
      </div> */}

      {tab === "explore" ? (
        <div className="relative flex-1 min-h-100 rounded-3xl overflow-hidden border border-pill-border">
          <iframe
            title="Nearby map"
            src="https://www.google.com/maps?q=London&output=embed"
            className="absolute inset-0 w-full h-full grayscale-[40%] contrast-125 brightness-75"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />

          {/* Ambient activity glow behind the pin cluster */}
          {/* <div
            className="absolute rounded-full pointer-events-none"
            style={{
              top: glowCenter.top,
              left: glowCenter.left,
              width: "70%",
              paddingBottom: "70%",
              background: "red",
              filter: "blur(28px)",
              mixBlendMode: "screen",
              animation: "heat-glow-pulse 4.5s ease-in-out infinite",
            }}
          /> */}

          {pins.map((pin, i) => {
            const isSelected = drawerVenueId === pin.id;

            return (
              <button
                key={pin.id}
                type="button"
                onClick={() => openDrawer(pin.id)}
                aria-label={`View details for ${pin.initials ?? "venue"}`}
                className="absolute flex flex-col items-center cursor-pointer group"
                style={{
                  top: pin.top,
                  left: pin.left,
                  zIndex: isSelected ? 20 : 10,
                  animation: `pin-drop-in 0.5s ease-out ${i * 70}ms backwards, pin-idle-bob 2.6s ease-in-out ${
                    0.5 + i * 0.15
                  }s infinite`,
                }}
              >
                <div className="relative">
                  {isSelected && (
                    <span
                      className={`absolute inset-0 -z-10 ${pin.color}`}
                      style={{
                        borderRadius: "50% 50% 50% 0",
                        animation: "pin-ring-pulse 1.4s ease-out infinite",
                      }}
                    />
                  )}

                  {/* Teardrop marker via the classic rotated-square trick */}
                  <div
                    className={`relative h-9 w-9 ${pin.color} shadow-lg transition-transform duration-150 group-hover:scale-110 group-active:scale-90`}
                    style={{
                      borderRadius: "50% 50% 50% 0",
                      transform: `rotate(-45deg) ${isSelected ? "scale(1.15)" : "scale(1)"}`,
                      border: isSelected
                        ? "2px solid white"
                        : "2px solid rgba(0,0,0,0.35)",
                    }}
                  >
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ transform: "rotate(45deg)" }}
                    >
                      {pin.icon ? (
                        <Coffee size={16} className="text-black" />
                      ) : (
                        <span className="text-white text-[10px] font-bold">
                          {pin.initials}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact shadow to seat the pin on the map */}
                <div className="w-3 h-1.5 mt-0.5 rounded-full bg-black/50 blur-[1.5px]" />
              </button>
            );
          })}
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
