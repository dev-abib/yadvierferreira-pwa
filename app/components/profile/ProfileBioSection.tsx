"use client";

import { useState } from "react";
import ProfileSection from "@/app/components/profile/ProfileSection";
import EditContainer from "@/app/components/profile/EditContainer";

export default function ProfileBioSection() {
  const [bio, setBio] = useState(
    "Frontend developer building network-first products. Happy to talk web dev, AI tooling, or freelancing.",
  );
  const [editing, setEditing] = useState(false);
  const [tempBio, setTempBio] = useState(bio);

  const startEdit = () => {
    setTempBio(bio);
    setEditing(true);
  };
  const saveEdit = () => {
    if (tempBio.trim()) setBio(tempBio.trim());
    setEditing(false);
  };
  const cancelEdit = () => {
    setTempBio(bio);
    setEditing(false);
  };

  return (
    <ProfileSection label="Professional Bio" onEdit={startEdit}>
      {editing ? (
        <EditContainer onSave={saveEdit} onCancel={cancelEdit}>
          <textarea
            value={tempBio}
            onChange={e => setTempBio(e.target.value)}
            rows={4}
            className="w-full bg-[#140D0880]/50 border border-pill-border rounded-2xl px-4 py-3.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary-yellow resize-none"
          />
        </EditContainer>
      ) : (
        <div className="rounded-2xl border border-pill-border bg-pill p-3.5">
          <p className="text-white/70 text-sm leading-relaxed">{bio}</p>
        </div>
      )}
    </ProfileSection>
  );
}
