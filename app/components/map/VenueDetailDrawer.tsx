"use client";

import { ChevronRight, Coffee, X } from "lucide-react";
import { useEffect, useCallback, useRef, useState } from "react";


interface VenueDetail {
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

const venueDetails: VenueDetail[] = [
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

/* ── Props ── */

interface VenueDetailDrawerProps {
  open: boolean;
  venueId: string | null;
  onClose: () => void;
  onViewDetails?: (id: string) => void;
  onCoffeeChat?: (venueName: string) => void;
}

const ANIM_DURATION = 320;
const ANIM_EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
const DRAG_CLOSE_THRESHOLD = 120;

/* ── Component ── */

export default function VenueDetailDrawer({
  open,
  venueId,
  onClose,
  onViewDetails,
  onCoffeeChat,
}: VenueDetailDrawerProps) {
  const startY = useRef(0);
  const dragStartTranslate = useRef(0);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [rendered, setRendered] = useState(open); 
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const venue = venueId
    ? (venueDetails.find(v => v.id === venueId) ?? venueDetails[0])
    : null;

  useEffect(() => {
    if (open) {
      setRendered(true);
      setTranslateY(0);
      setMounted(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(() => setMounted(true));
      });
    } else if (rendered) {
      setTranslateY(0);
      setMounted(false);
      timerRef.current = setTimeout(() => {
        setRendered(false);
      }, ANIM_DURATION);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [open, venueId]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* Lock body scroll when open */
  useEffect(() => {
    if (rendered) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [rendered]);

  /* Escape key to close */
  useEffect(() => {
    if (!rendered) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [rendered, onClose]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      const y = "touches" in e ? e.touches[0].clientY : e.clientY;
      startY.current = y;
      dragStartTranslate.current = translateY;
      setIsDragging(true);
    },
    [translateY],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (!isDragging) return;
      const y = "touches" in e ? e.touches[0].clientY : e.clientY;
      const delta = y - startY.current + dragStartTranslate.current;
      if (delta > 0) setTranslateY(delta);
    },
    [isDragging],
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    if (translateY > DRAG_CLOSE_THRESHOLD) {
      onClose();
    } else {
      setTranslateY(0);
    }
  }, [translateY, onClose]);

  if (!rendered || !venue) return null;

  const panelTransform = mounted
    ? `translateY(${translateY}px)`
    : "translateY(100%)";

  return (
    <div className="fixed inset-0 z-9999 flex items-end">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close drawer"
        className="absolute inset-0 cursor-pointer backdrop-blur-sm"
        style={{
          backgroundColor: mounted ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0)",
          transition: `background-color ${ANIM_DURATION}ms ${ANIM_EASE}`,
        }}
        onClick={onClose}
      />

      <div
        style={{
          transform: panelTransform,
          transition: isDragging
            ? "none"
            : `transform ${ANIM_DURATION}ms ${ANIM_EASE}`,
          maxHeight: "calc(100dvh - 24px)",
        }}
        className="relative w-full flex flex-col rounded-t-3xl border-t border-pill-border bg-primary-bg shadow-2xl"
      >
        {/* Drag handle + close (fixed, not part of scroll area) */}
        <div
          className="flex items-center justify-between px-5 pt-3 pb-1 shrink-0 cursor-grab active:cursor-grabbing touch-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onMouseLeave={() => {
            if (isDragging) handleTouchEnd();
          }}
        >
          <div className="flex-1" />
          <div className="w-10 h-1 rounded-full bg-white/20" />
          <div className="flex-1 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X size={14} className="text-white/60" />
            </button>
          </div>
        </div>

        <div
          className="px-5 overflow-y-auto overscroll-contain"
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        >
          {/* Venue header */}
          <div className="flex items-center gap-4 mb-5">
            <div className="relative h-20 w-20 rounded-2xl overflow-hidden shrink-0">
              <button
                className="h-16 w-16 rounded-xl flex justify-center items-center bg-primary-yellow cursor-pointer"
                aria-label="Contacts"
              >
                <Coffee className="text-black" size={20} />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-white font-bold text-2xl leading-tight">
                {venue.name}
              </h2>
              <p className="text-white/40 text-sm mt-1.5">
                {venue.distance} · {venue.attendeeCount} attendees nearby
              </p>
            </div>
            <button
              type="button"
              onClick={() => onViewDetails?.(venue.id)}
              className="h-10 w-10 rounded-2xl flex justify-center items-center shadow-lg shadow-black border border-pill-border bg-pill cursor-pointer"
            >
              <ChevronRight size={16} className="text-white/60" />
            </button>
          </div>

          {/* Status + tags */}
          <div className="flex flex-wrap gap-2 mb-5">
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

          {/* Request button */}
          <button
            type="button"
            onClick={() => onCoffeeChat?.(venue.name)}
            className="w-full py-4 rounded-2xl bg-primary-yellow text-black font-bold text-base cursor-pointer transition-all duration-200 hover:bg-primary-yellow/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-yellow/20 active:translate-y-0 active:scale-[0.98]"
          >
            Request Coffee Chat
          </button>
        </div>
      </div>
    </div>
  );
}
