"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Share, Download, X } from "lucide-react";

interface QrCodeModalProps {
  open: boolean;
  onClose: () => void;
  qrValue: string; 
  username: string; 
  name: string; 
  title: string;
}

export default function QrCodeModal({
  open,
  onClose,
  qrValue,
  username,
  name,
  title,
}: QrCodeModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted) return null;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=480x480&margin=0&data=${encodeURIComponent(
    qrValue,
  )}`;

  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${name}'s CoffeeChat QR Code`,
          text: `Connect with ${name} on CoffeeChat`,
          url: qrValue,
        });
      } else {
        await navigator.clipboard.writeText(qrValue);
      }
    } catch {
      // user cancelled share — ignore
    }
  }

  async function handleSave() {
    try {
      const res = await fetch(qrImageUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${username.replace("@", "")}-qr-code.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      // fall back to opening the image directly
      window.open(qrImageUrl, "_blank");
    }
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center px-6 ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/80 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Card */}
      <div
        className={`relative w-full max-w-[380px] rounded-3xl border border-pill-border bg-[#151210] p-6 shadow-2xl shadow-black transition-all duration-300 ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 h-8 w-8 rounded-full flex items-center justify-center border border-pill-border bg-pill cursor-pointer"
        >
          <X size={14} className="text-white/60" />
        </button>

        {/* QR code */}
        <div className="flex justify-center pt-2">
          <div className="bg-[#EDE0CA] rounded-3xl p-5">
            <img
              src={qrImageUrl}
              alt="QR code"
              className="h-52 w-52 object-contain"
            />
          </div>
        </div>

        {/* Identity */}
        <div className="flex flex-col items-center mt-6 gap-1">
          <p className="text-primary-yellow font-bold text-lg">{username}</p>
          <p className="text-white/40 text-sm">
            {name} · {title}
          </p>
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center mt-6 gap-1 text-center">
          <h3 className="text-white text-xl font-bold">My QR Code</h3>
          <p className="text-white/40 text-sm">
            Let others scan to connect instantly
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full border border-pill-border bg-pill text-white text-sm font-semibold cursor-pointer"
          >
            <Share size={15} />
            Share
          </button>
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-primary-yellow text-black text-sm font-bold cursor-pointer"
          >
            <Download size={15} />
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
