"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Globe2, Save, X } from "lucide-react";
import ProfileSection from "@/app/components/profile/ProfileSection";

export default function ProfilePortfolioSection() {
  const [portfolioImage, setPortfolioImage] = useState(
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
  );
  const [portfolioCaption, setPortfolioCaption] = useState(
    "This is my resume and you can see it.",
  );
  const [portfolioDate, setPortfolioDate] = useState("21/02/2026");
  const [portfolioVisibility, setPortfolioVisibility] = useState<
    "Public" | "Private"
  >("Public");

  const [editing, setEditing] = useState(false);
  const [tempImage, setTempImage] = useState(portfolioImage);
  const [tempCaption, setTempCaption] = useState(portfolioCaption);
  const [tempDate, setTempDate] = useState(portfolioDate);
  const [tempVisibility, setTempVisibility] = useState<
    "Public" | "Private"
  >(portfolioVisibility);

  const startEdit = () => {
    setTempImage(portfolioImage);
    setTempCaption(portfolioCaption);
    setTempDate(portfolioDate);
    setTempVisibility(portfolioVisibility);
    setEditing(true);
  };

  const saveEdit = () => {
    if (tempImage.trim()) setPortfolioImage(tempImage.trim());
    if (tempCaption.trim()) setPortfolioCaption(tempCaption.trim());
    if (tempDate.trim()) setPortfolioDate(tempDate.trim());
    setPortfolioVisibility(tempVisibility);
    setEditing(false);
  };

  const cancelEdit = () => {
    setTempImage(portfolioImage);
    setTempCaption(portfolioCaption);
    setTempDate(portfolioDate);
    setTempVisibility(portfolioVisibility);
    setEditing(false);
  };

  return (
    <ProfileSection label="Portfolio" onEdit={startEdit}>
      {editing ? (
        <div className="flex flex-col gap-3 rounded-2xl bg-pill border border-pill-border p-3.5">
          {/* Image upload with preview */}
          <label className="flex flex-col gap-2 cursor-pointer">
            <span className="text-white/30 text-[10px] font-semibold uppercase tracking-wider">
              Image
            </span>
            {tempImage ? (
              <div className="relative w-full h-32 rounded-xl overflow-hidden border border-pill-border bg-[#140D0880]/50">
                <Image
                  src={tempImage}
                  alt="Portfolio preview"
                  fill
                  className="object-contain"
                  sizes="400px"
                />
                <div className="absolute inset-0 flex items-end justify-center pb-2">
                  <span className="px-3 py-1 rounded-full bg-black/60 text-white/70 text-[10px] font-medium">
                    Tap to change image
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-full h-32 rounded-xl border border-dashed border-pill-border bg-[#140D0880]/30 flex flex-col items-center justify-center gap-2 hover:bg-[#140D0880]/50 transition-colors">
                <span className="text-white/30 text-xs">
                  Tap to upload image
                </span>
                <span className="text-white/20 text-[10px]">
                  JPG, PNG, WebP
                </span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setTempImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                  e.target.value = "";
                }
              }}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-white/30 text-[10px] font-semibold uppercase tracking-wider">
              Caption
            </span>
            <input
              type="text"
              value={tempCaption}
              onChange={e => setTempCaption(e.target.value)}
              className="w-full bg-[#140D0880]/50 border border-pill-border rounded-xl px-3.5 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary-yellow"
            />
          </label>

          <div className="flex gap-3">
            <label className="flex flex-col gap-1.5 flex-1">
              <span className="text-white/30 text-[10px] font-semibold uppercase tracking-wider">
                Date
              </span>
              <input
                type="text"
                value={tempDate}
                onChange={e => setTempDate(e.target.value)}
                className="w-full bg-[#140D0880]/50 border border-pill-border rounded-xl px-3.5 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary-yellow"
              />
            </label>
            <label className="flex flex-col gap-1.5 flex-1">
              <span className="text-white/30 text-[10px] font-semibold uppercase tracking-wider">
                Visibility
              </span>
              <select
                value={tempVisibility}
                onChange={e =>
                  setTempVisibility(e.target.value as "Public" | "Private")
                }
                className="w-full bg-[#140D0880]/50 border border-pill-border rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-primary-yellow appearance-none cursor-pointer"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </label>
          </div>

          <div className="flex gap-2 mt-1">
            <button
              onClick={saveEdit}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary-yellow text-black text-xs font-bold cursor-pointer hover:bg-primary-yellow/90 transition-colors"
            >
              <Save size={13} />
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-pill-border text-white/60 text-xs font-semibold cursor-pointer hover:bg-white/5 transition-colors"
            >
              <X size={13} />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-3 rounded-2xl bg-pill border border-pill-border p-3">
          <div className="relative h-25 w-25 shrink-0 rounded-xl overflow-hidden">
            <Image
              src={portfolioImage}
              alt="Portfolio preview"
              fill
              className="object-cover"
              sizes="100px"
            />
          </div>
          <div className="min-w-0 flex flex-col justify-center">
            <p className="text-white/80 text-sm leading-snug">
              {portfolioCaption}
            </p>
            <div className="flex items-center gap-3 mt-2 text-white/35 text-[11px]">
              <span className="flex items-center gap-1">
                <Calendar size={11} />
                {portfolioDate}
              </span>
              <span className="flex items-center gap-1">
                <Globe2 size={11} />
                {portfolioVisibility}
              </span>
            </div>
          </div>
        </div>
      )}
    </ProfileSection>
  );
}
