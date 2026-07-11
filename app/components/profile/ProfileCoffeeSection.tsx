"use client";

import { useState } from "react";
import ProfileSection from "@/app/components/profile/ProfileSection";
import CoffeePreferencePicker from "@/app/components/profile/CoffeePreferencePicker";

export default function ProfileCoffeeSection() {
  const [coffeePrefs, setCoffeePrefs] = useState<string[]>([
    "Espresso",
    "Cold Brew",
    "Latte",
  ]);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <>
      <ProfileSection
        label="Coffee Preferences"
        onEdit={() => setShowPicker(true)}
      >
        <div className="flex flex-wrap gap-2">
          {coffeePrefs.length > 0 ? (
            coffeePrefs.map(pref => (
              <span
                key={pref}
                className="px-3.5 py-1.5 rounded-full border border-primary-yellow/50 text-primary-yellow text-sm font-medium"
              >
                {pref}
              </span>
            ))
          ) : (
            <p className="text-white/30 text-sm italic">No preferences set</p>
          )}
        </div>
      </ProfileSection>

      <CoffeePreferencePicker
        open={showPicker}
        selected={coffeePrefs}
        onClose={() => setShowPicker(false)}
        onSave={setCoffeePrefs}
      />
    </>
  );
}
