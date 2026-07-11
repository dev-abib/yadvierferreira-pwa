"use client";

import { useState } from "react";
import ProfileSection from "@/app/components/profile/ProfileSection";
import EditContainer from "@/app/components/profile/EditContainer";

export default function ProfileCampusSection() {
  const [campus, setCampus] = useState("University of North Carolina Charlotte");
  const [editing, setEditing] = useState(false);
  const [tempCampus, setTempCampus] = useState(campus);

  const startEdit = () => {
    setTempCampus(campus);
    setEditing(true);
  };
  const saveEdit = () => {
    if (tempCampus.trim()) setCampus(tempCampus.trim());
    setEditing(false);
  };
  const cancelEdit = () => {
    setTempCampus(campus);
    setEditing(false);
  };

  return (
    <ProfileSection label="Campus / Alma Mater" onEdit={startEdit}>
      {editing ? (
        <EditContainer onSave={saveEdit} onCancel={cancelEdit}>
          <input
            type="text"
            value={tempCampus}
            onChange={e => setTempCampus(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") saveEdit();
              if (e.key === "Escape") cancelEdit();
            }}
            className="w-full bg-[#140D0880]/50 border border-pill-border rounded-2xl px-4 py-3.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary-yellow"
          />
        </EditContainer>
      ) : (
        <div className="rounded-2xl border border-pill-border bg-pill p-3.5">
          <p className="text-white/70 text-sm">{campus}</p>
        </div>
      )}
    </ProfileSection>
  );
}
