"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { X, Star, Navigation2, Coffee, MessageCircle } from "lucide-react";
import { getDetail, ShopDetail, PersonDetail } from "./map-data";

/* ── Stars component ── */

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={
            i < rounded
              ? "fill-primary-yellow text-primary-yellow"
              : "fill-white/15 text-white/15"
          }
        />
      ))}
    </span>
  );
}

/* ── Shop content (rich) ── */

function ShopContent({ shop }: { shop: ShopDetail }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 rounded-2xl bg-primary-yellow flex items-center justify-center shrink-0">
          <Coffee size={22} className="text-black" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-bold text-xl leading-tight">
            {shop.name}
          </h2>
          <p className="text-white/40 text-xs mt-1">
            {shop.address} · {shop.distance}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Stars rating={shop.rating} />
        <span className="text-white/60 text-xs">
          {shop.rating} · {shop.reviewCount} reviews
        </span>
        {shop.status === "open" && (
          <span className="ml-auto px-3 py-1 rounded-full bg-emerald-400/15 text-emerald-400 text-[10px] font-semibold uppercase tracking-wide">
            {shop.statusLabel}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {shop.tags.map(tag => (
          <span
            key={tag}
            className="px-3 py-1.5 rounded-full bg-white/5 text-white/50 text-[11px] font-normal"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mt-6">
        Attendees nearby
      </p>
      <div className="flex items-center gap-2 mt-2.5">
        {shop.attendees.map(a => (
          <div
            key={a.id}
            className={`h-9 w-9 rounded-full ${a.color} border-2 border-primary-bg flex items-center justify-center -ml-2 first:ml-0`}
          >
            <span className="text-white text-[10px] font-bold">
              {a.initials}
            </span>
          </div>
        ))}
        {shop.extraAttendeeCount > 0 && (
          <div className="h-9 w-9 rounded-full bg-white/10 border-2 border-primary-bg flex items-center justify-center -ml-2">
            <span className="text-white/70 text-[10px] font-bold">
              +{shop.extraAttendeeCount}
            </span>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-pill-border bg-pill px-4 py-3.5 flex items-center justify-between">
        <div>
          <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wide">
            Hours today
          </p>
          <p className="text-white text-sm mt-0.5">{shop.hoursToday.day}</p>
        </div>
        <p className="text-white font-semibold text-sm">
          {shop.hoursToday.hours}
        </p>
      </div>

      <div className="flex justify-between mt-5">
        <button
          type="button"
          className=" flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-pill-border bg-pill text-white text-sm font-semibold cursor-pointer px-4"
        >
          Get Directions
        </button>
        <button
          type="button"
          className=" flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-primary-yellow text-black text-sm font-bold cursor-pointer transition-all duration-200 hover:bg-primary-yellow/90 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] px-5"
        >
          Request Coffee Chat
          <Coffee size={15} />
        </button>
      </div>
    </>
  );
}

/* ── Person content ── */

function PersonContent({ person }: { person: PersonDetail }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <div
          className={`h-14 w-14 rounded-2xl ${person.color} flex items-center justify-center shrink-0`}
        >
          <span className="text-white font-bold text-lg">{person.id}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-bold text-xl leading-tight">
            {person.name}
          </h2>
          <p className="text-white/40 text-xs mt-1">
            {person.role} at {person.company} · {person.distance}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide ${
            person.status === "available"
              ? "bg-emerald-400/15 text-emerald-400"
              : "bg-white/10 text-white/50"
          }`}
        >
          {person.statusLabel}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {person.tags.map(tag => (
          <span
            key={tag}
            className="px-3 py-1.5 rounded-full bg-white/5 text-white/50 text-[11px] font-normal"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mt-6">
        About
      </p>
      <p className="text-white/70 text-sm mt-2 leading-relaxed">{person.bio}</p>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-pill-border bg-pill text-white text-sm font-semibold cursor-pointer"
        >
          <MessageCircle size={15} />
          Message
        </button>
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-primary-yellow text-black text-sm font-bold cursor-pointer transition-all duration-200 hover:bg-primary-yellow/90 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
        >
          Request Coffee Chat
          <Coffee size={15} />
        </button>
      </div>
    </>
  );
}

/* ── Sheet props ── */

interface VenueDetailSheetProps {
  open: boolean;
  id: string | null;
  onClose: () => void;
}

const ANIM_DURATION = 320;
const ANIM_EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
const DRAG_CLOSE_THRESHOLD = 120;

/* ── Component ── */

export default function VenueDetailSheet({
  open,
  id,
  onClose,
}: VenueDetailSheetProps) {
  const startY = useRef(0);
  const dragStartTranslate = useRef(0);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [rendered, setRendered] = useState(open);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const detail = getDetail(id);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, id]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (rendered) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [rendered]);

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

  if (!rendered || !detail) return null;

  const panelTransform = mounted
    ? `translateY(${translateY}px)`
    : "translateY(100%)";

  return (
    <div className="fixed inset-0 z-[9999] flex items-end">
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
          {detail.kind === "shop" ? (
            <ShopContent shop={detail} />
          ) : (
            <PersonContent person={detail} />
          )}
        </div>
      </div>
    </div>
  );
}
