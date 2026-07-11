"use client";

import { useState } from "react";
import ProfileSection from "@/app/components/profile/ProfileSection";
import EditContainer from "@/app/components/profile/EditContainer";

export default function ProfileIndustrySection() {
  const [industry, setIndustry] = useState(
    "Frontend developer building network-first",
  );
  const [editing, setEditing] = useState(false);
  const [tempIndustry, setTempIndustry] = useState(industry);

  const startEdit = () => {
    setTempIndustry(industry);
    setEditing(true);
  };
  const saveEdit = () => {
    if (tempIndustry.trim()) setIndustry(tempIndustry.trim());
    setEditing(false);
  };
  const cancelEdit = () => {
    setTempIndustry(industry);
    setEditing(false);
  };

  return (
    <ProfileSection label="Industry" onEdit={startEdit}>
      {editing ? (
        <EditContainer onSave={saveEdit} onCancel={cancelEdit}>
          <input
            type="text"
            value={tempIndustry}
            onChange={e => setTempIndustry(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") saveEdit();
              if (e.key === "Escape") cancelEdit();
            }}
            className="w-full bg-[#140D0880]/50 border border-pill-border rounded-2xl px-4 py-3.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary-yellow"
          />
        </EditContainer>
      ) : (
        <div className="rounded-2xl border border-pill-border bg-pill p-3.5">
          <p className="text-white/70 text-sm">{industry}</p>
        </div>
      )}
    </ProfileSection>
  );
}
