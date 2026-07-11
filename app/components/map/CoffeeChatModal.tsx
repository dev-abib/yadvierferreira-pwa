"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import ProposeCoffeeChatModal from "./ProposeCoffeeChatModal";

interface CoffeeChatModalProps {
  open: boolean;
  venueName: string;
  onClose: () => void;
  onSubmit?: (data: {
    time: string;
    proposeTo: string;
    agenda: string;
  }) => void;
}

const ANIM_DURATION = 320;
const ANIM_EASE = "cubic-bezier(0.32, 0.72, 0, 1)";

export default function CoffeeChatModal({
  open,
  venueName,
  onClose,
  onSubmit,
}: CoffeeChatModalProps) {
  const [mounted, setMounted] = useState(false);
  const [rendered, setRendered] = useState(open);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) {
      setRendered(true);
      setMounted(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(() => setMounted(true));
      });
    } else if (rendered) {
      setMounted(false);
      timerRef.current = setTimeout(() => {
        setRendered(false);
      }, ANIM_DURATION);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [open]);

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

  if (!rendered) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 cursor-pointer backdrop-blur-sm"
        style={{
          backgroundColor: mounted ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0)",
          transition: `background-color ${ANIM_DURATION}ms ${ANIM_EASE}`,
        }}
        onClick={onClose}
      />

      {/* Modal panel */}
      <div
        style={{
          transform: mounted ? "translateY(0)" : "translateY(100%)",
          opacity: mounted ? 1 : 0,
          transition: `transform ${ANIM_DURATION}ms ${ANIM_EASE}, opacity ${ANIM_DURATION}ms ${ANIM_EASE}`,
          // maxHeight: "calc(100dvh - 24px)",
        }}
        className="relative w-full h-full max-h-full sm:max-w-md mx-0 sm:mx-4 rounded-t-3xl sm:rounded-3xl border-t sm:border border-pill-border bg-primary-bg shadow-2xl flex flex-col"
      >
        {/* Header with close */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1 shrink-0">
          <div className="flex-1" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X size={14} className="text-white/60" />
          </button>
        </div>

        {/* Scrollable content */}
        <div
          className="px-5 overflow-y-auto overscroll-contain flex-1 min-h-0"
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        >
          <ProposeCoffeeChatModal
            open={open}
            venueName={venueName}
            onClose={onClose}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}
