"use client";

import { useEffect, useRef, useState } from "react";
import { X, Download } from "lucide-react";

interface QRCodeModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  title: string;
}

const ANIM_DURATION = 300;

export default function QRCodeModal({
  open,
  onClose,
  name,
  title,
}: QRCodeModalProps) {
  const [mounted, setMounted] = useState(false);
  const [rendered, setRendered] = useState(open);
  const qrImgRef = useRef<HTMLImageElement>(null);

  const profileUrl = "https://coffeechat.app/profile/mahamudul-hasan";

  useEffect(() => {
    if (open) {
      setRendered(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setMounted(true));
      });
    } else {
      setMounted(false);
      setTimeout(() => setRendered(false), ANIM_DURATION);
    }
  }, [open]);

  useEffect(() => {
    if (!rendered) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [rendered, onClose]);

  useEffect(() => {
    if (rendered) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [rendered]);

  if (!rendered) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 cursor-pointer backdrop-blur-sm"
        style={{
          backgroundColor: mounted ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0)",
          transition: `background-color ${ANIM_DURATION}ms ease-out`,
        }}
        onClick={onClose}
      />

      {/* Modal panel */}
      <div
        className="relative w-full sm:max-w-sm mx-0 sm:mx-4 rounded-t-3xl sm:rounded-3xl border-t sm:border border-pill-border bg-[#151210] shadow-2xl shadow-black flex flex-col"
        style={{
          transform: mounted ? "translateY(0)" : "translateY(100%)",
          opacity: mounted ? 1 : 0,
          transition: `transform ${ANIM_DURATION}ms ease-out, opacity ${ANIM_DURATION}ms ease-out`,
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 shrink-0">
          <span className="h-1 w-10 rounded-full bg-white/15" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-2 pb-3 shrink-0">
          <h3 className="text-white text-lg font-semibold">My QR Code</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
          >
            <X size={14} className="text-white/60" />
          </button>
        </div>

        {/* QR Code area */}
        <div className="flex flex-col items-center px-8 pb-6">
          {/* QR Code image */}
          <div className="relative w-56 h-56 rounded-2xl bg-white p-4 shadow-lg">
            <img
              ref={qrImgRef}
              src={`https://api.qrserver.com/v1/create-qr-code/?size=${256}x${256}&data=${encodeURIComponent(profileUrl)}`}
              alt={`QR Code for ${name}`}
              className="w-full h-full object-contain"
              crossOrigin="anonymous"
            />
          </div>

          {/* User info below QR */}
          <div className="flex items-center gap-3 mt-5">
            <div className="h-10 w-10 rounded-xl bg-[#8A5A3B] flex items-center justify-center shrink-0">
              <span className="text-white text-sm font-bold">
                {name
                  .split(" ")
                  .map(n => n[0])
                  .join("")}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">
                {name}
              </p>
              <p className="text-white/40 text-xs truncate">{title}</p>
            </div>
          </div>

          {/* Scan text */}
          <p className="text-white/30 text-xs mt-4 text-center leading-relaxed">
            Scan this code to connect with{" "}
            <span className="text-white/50">{name}</span> on CoffeeChat
          </p>

          {/* Download button */}
          <button
            onClick={async () => {
              const img = qrImgRef.current;
              if (!img?.src) return;
              try {
                const resp = await fetch(img.src);
                const blob = await resp.blob();
                const blobUrl = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.download = `${name.replace(/\s+/g, "-")}-qrcode.png`;
                link.href = blobUrl;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
              } catch {
                // Fallback: try direct download
                const link = document.createElement("a");
                link.download = `${name.replace(/\s+/g, "-")}-qrcode.png`;
                link.href = img.src;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-yellow text-black text-sm font-bold mt-5 cursor-pointer hover:bg-primary-yellow/90 transition-colors"
          >
            <Download size={14} />
            Save QR Code
          </button>
        </div>
      </div>
    </div>
  );
}
