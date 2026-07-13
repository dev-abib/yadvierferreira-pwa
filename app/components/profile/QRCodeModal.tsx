// "use client";

// import { useEffect, useRef, useState } from "react";
// import { X, Download } from "lucide-react";

// interface QRCodeModalProps {
//   open: boolean;
//   onClose: () => void;
//   name: string;
//   title: string;
// }

// const ANIM_DURATION = 300;

// export default function QRCodeModal({
//   open,
//   onClose,
//   name,
//   title,
// }: QRCodeModalProps) {
//   const [mounted, setMounted] = useState(false);
//   const [rendered, setRendered] = useState(open);
//   const qrImgRef = useRef<HTMLImageElement>(null);

//   const profileUrl = "https://coffeechat.app/profile/mahamudul-hasan";

//   useEffect(() => {
//     if (open) {
//       setRendered(true);
//       requestAnimationFrame(() => {
//         requestAnimationFrame(() => setMounted(true));
//       });
//     } else {
//       setMounted(false);
//       setTimeout(() => setRendered(false), ANIM_DURATION);
//     }
//   }, [open]);

//   useEffect(() => {
//     if (!rendered) return;
//     const handler = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [rendered, onClose]);

//   useEffect(() => {
//     if (rendered) {
//       const prev = document.body.style.overflow;
//       document.body.style.overflow = "hidden";
//       return () => {
//         document.body.style.overflow = prev;
//       };
//     }
//   }, [rendered]);

//   if (!rendered) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center">
//       {/* Backdrop */}
//       <button
//         type="button"
//         aria-label="Close"
//         className="absolute inset-0 cursor-pointer backdrop-blur-sm"
//         style={{
//           backgroundColor: mounted ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0)",
//           transition: `background-color ${ANIM_DURATION}ms ease-out`,
//         }}
//         onClick={onClose}
//       />

//       {/* Modal panel */}
//       <div
//         className="relative w-full sm:max-w-sm mx-0 sm:mx-4 rounded-t-3xl sm:rounded-3xl border-t sm:border border-pill-border bg-[#151210] shadow-2xl shadow-black flex flex-col"
//         style={{
//           transform: mounted ? "translateY(0)" : "translateY(100%)",
//           opacity: mounted ? 1 : 0,
//           transition: `transform ${ANIM_DURATION}ms ease-out, opacity ${ANIM_DURATION}ms ease-out`,
//         }}
//       >
//         {/* Drag handle */}
//         <div className="flex justify-center pt-3 shrink-0">
//           <span className="h-1 w-10 rounded-full bg-white/15" />
//         </div>

//         {/* Header */}
//         <div className="flex items-center justify-between px-5 pt-2 pb-3 shrink-0">
//           <h3 className="text-white text-lg font-semibold">My QR Code</h3>
//           <button
//             type="button"
//             onClick={onClose}
//             aria-label="Close"
//             className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
//           >
//             <X size={14} className="text-white/60" />
//           </button>
//         </div>

//         {/* QR Code area */}
//         <div className="flex flex-col items-center px-8 pb-6">
//           {/* QR Code image */}
//           <div className="relative w-56 h-56 rounded-2xl bg-white p-4 shadow-lg">
//             <img
//               ref={qrImgRef}
//               src={`https://api.qrserver.com/v1/create-qr-code/?size=${256}x${256}&data=${encodeURIComponent(profileUrl)}`}
//               alt={`QR Code for ${name}`}
//               className="w-full h-full object-contain"
//               crossOrigin="anonymous"
//             />
//           </div>

//           {/* User info below QR */}
//           <div className="flex items-center gap-3 mt-5">
//             <div className="h-10 w-10 rounded-xl bg-[#8A5A3B] flex items-center justify-center shrink-0">
//               <span className="text-white text-sm font-bold">
//                 {name
//                   .split(" ")
//                   .map(n => n[0])
//                   .join("")}
//               </span>
//             </div>
//             <div className="min-w-0">
//               <p className="text-white text-sm font-semibold truncate">
//                 {name}
//               </p>
//               <p className="text-white/40 text-xs truncate">{title}</p>
//             </div>
//           </div>

//           {/* Scan text */}
//           <p className="text-white/30 text-xs mt-4 text-center leading-relaxed">
//             Scan this code to connect with{" "}
//             <span className="text-white/50">{name}</span> on CoffeeChat
//           </p>

//           {/* Download button */}
//           <button
//             onClick={async () => {
//               const img = qrImgRef.current;
//               if (!img?.src) return;
//               try {
//                 const resp = await fetch(img.src);
//                 const blob = await resp.blob();
//                 const blobUrl = URL.createObjectURL(blob);
//                 const link = document.createElement("a");
//                 link.download = `${name.replace(/\s+/g, "-")}-qrcode.png`;
//                 link.href = blobUrl;
//                 document.body.appendChild(link);
//                 link.click();
//                 document.body.removeChild(link);
//                 setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
//               } catch {
//                 // Fallback: try direct download
//                 const link = document.createElement("a");
//                 link.download = `${name.replace(/\s+/g, "-")}-qrcode.png`;
//                 link.href = img.src;
//                 document.body.appendChild(link);
//                 link.click();
//                 document.body.removeChild(link);
//               }
//             }}
//             className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-yellow text-black text-sm font-bold mt-5 cursor-pointer hover:bg-primary-yellow/90 transition-colors"
//           >
//             <Download size={14} />
//             Save QR Code
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Share, Download, X } from "lucide-react";
import Image from "next/image";

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
            <Image
              src={qrImageUrl}
              alt="QR code"
              width={208}
              height={208}
              className="h-52 w-52 object-contain"
            />
          </div>
        </div>

        {/* Identity */}
        <div className="flex flex-col items-center mt-6 gap-1">
          {/* <p className="text-primary-yellow font-bold text-lg">{username}</p> */}
          <p className="text-primary-yellow text-lg font-bold">{name}</p>
          <p className="text-white/40 text-sm">{title}</p>
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
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border border-pill-border bg-pill text-white text-base font-semibold cursor-pointer"
          >
            <Share size={15} />
            Share
          </button>
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary-yellow text-black text-base font-bold cursor-pointer"
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
