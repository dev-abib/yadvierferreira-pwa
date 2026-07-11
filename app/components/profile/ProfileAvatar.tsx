"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pencil, QrCode, Check, X } from "lucide-react";
import QRCodeModal from "@/app/components/profile/QRCodeModal";

export default function ProfileAvatar() {
  const [name, setName] = useState("Mahamudul Hasan");
  const [title, setTitle] = useState("Frontend Developer");
  const [avatarPhoto, setAvatarPhoto] = useState<string | null>(null);

  // Editing states
  const [editingName, setEditingName] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempTitle, setTempTitle] = useState(title);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingName) nameInputRef.current?.focus();
  }, [editingName]);
  useEffect(() => {
    if (editingTitle) titleInputRef.current?.focus();
  }, [editingTitle]);

  const startEditName = () => {
    setTempName(name);
    setEditingName(true);
  };
  const saveEditName = () => {
    if (tempName.trim()) setName(tempName.trim());
    setEditingName(false);
  };
  const cancelEditName = () => {
    setTempName(name);
    setEditingName(false);
  };

  const startEditTitle = () => {
    setTempTitle(title);
    setEditingTitle(true);
  };
  const saveEditTitle = () => {
    if (tempTitle.trim()) setTitle(tempTitle.trim());
    setEditingTitle(false);
  };
  const cancelEditTitle = () => {
    setTempTitle(title);
    setEditingTitle(false);
  };

  const [showQR, setShowQR] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center mt-6">
      {/* Avatar with photo upload */}
      <div className="relative">
        <div className="h-24 w-24 rounded-2xl bg-[#8A5A3B] flex items-center justify-center overflow-hidden">
          {avatarPhoto ? (
            <Image
              src={avatarPhoto}
              alt="Profile"
              fill
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <span className="text-white text-2xl font-bold">MH</span>
          )}
        </div>
        <label className="absolute -bottom-1.5 -right-1.5 h-8 w-8 rounded-full bg-primary-yellow flex items-center justify-center border-4 border-black cursor-pointer hover:bg-primary-yellow/90 transition-colors">
          <Pencil size={12} className="text-black" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setAvatarPhoto(reader.result as string);
                };
                reader.readAsDataURL(file);
                e.target.value = "";
              }
            }}
          />
        </label>
      </div>

      {/* Name - inline editable */}
      <div className="flex items-center gap-1.5 mt-4">
        {editingName ? (
          <div className="flex items-center gap-1.5">
            <input
              ref={nameInputRef}
              type="text"
              value={tempName}
              onChange={e => setTempName(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") saveEditName();
                if (e.key === "Escape") cancelEditName();
              }}
              className="bg-[#1B130C] border border-primary-yellow/50 rounded-lg px-2.5 py-1 text-white text-xl font-semibold outline-none w-56"
            />
            <button
              onClick={saveEditName}
              className="h-7 w-7 rounded-full bg-primary-yellow flex items-center justify-center cursor-pointer hover:bg-primary-yellow/90 transition-colors"
            >
              <Check size={12} className="text-black" />
            </button>
            <button
              onClick={cancelEditName}
              className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
            >
              <X size={12} className="text-white/60" />
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-white text-xl font-semibold">{name}</h3>
            <button onClick={startEditName} aria-label="Edit name">
              <Pencil
                size={13}
                className="text-primary-yellow shrink-0 cursor-pointer hover:text-primary-yellow/80 transition-colors"
              />
            </button>
          </>
        )}
      </div>

      {/* Title - inline editable */}
      <div className="flex items-center gap-1.5 mt-0.5">
        {editingTitle ? (
          <div className="flex items-center gap-1.5">
            <input
              ref={titleInputRef}
              type="text"
              value={tempTitle}
              onChange={e => setTempTitle(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") saveEditTitle();
                if (e.key === "Escape") cancelEditTitle();
              }}
              className="bg-[#1B130C] border border-primary-yellow/50 rounded-lg px-2.5 py-1 text-white/70 text-sm outline-none w-52"
            />
            <button
              onClick={saveEditTitle}
              className="h-6 w-6 rounded-full bg-primary-yellow flex items-center justify-center cursor-pointer hover:bg-primary-yellow/90 transition-colors"
            >
              <Check size={10} className="text-black" />
            </button>
            <button
              onClick={cancelEditTitle}
              className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
            >
              <X size={10} className="text-white/60" />
            </button>
          </div>
        ) : (
          <>
            <p className="text-white/40 text-sm">{title}</p>
            <button onClick={startEditTitle} aria-label="Edit title">
              <Pencil
                size={11}
                className="text-primary-yellow shrink-0 cursor-pointer hover:text-primary-yellow/80 transition-colors"
              />
            </button>
          </>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center gap-1.5 mt-2">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <span className="text-emerald-400 text-xs font-medium">
          Open to Coffee Chats
        </span>
      </div>

      {/* QR Code button */}
      <button
        onClick={() => setShowQR(true)}
        className="flex items-center justify-center gap-2 mt-5 w-full py-3 rounded-xl border border-pill-border bg-pill text-white text-sm font-semibold cursor-pointer hover:bg-white/5 transition-colors"
      >
        <QrCode size={15} className="text-primary-yellow" />
        Show My QR Code
      </button>
    </div>

    <QRCodeModal
      open={showQR}
      onClose={() => setShowQR(false)}
      name={name}
      title={title}
    />
    </>
  );
}
