"use client";

import { useEffect, useRef, useState } from "react";
import { X, Check } from "lucide-react";

const ALL_COFFEE_OPTIONS = [
  "Espresso",
  "Americano",
  "Cold Brew",
  "Nitro Cold Brew",
  "Iced Coffee",
  "Latte",
  "Cappuccino",
  "Flat White",
  "Mocha",
  "Macchiato",
  "Cortado",
  "Affogato",
  "Pour Over",
  "French Press",
  "Chemex",
  "Siphon",
  "Matcha Latte",
  "Chai Latte",
  "Hot Chocolate",
  "Turkish Coffee",
];

interface CoffeePreferencePickerProps {
  open: boolean;
  selected: string[];
  onClose: () => void;
  onSave: (preferences: string[]) => void;
}

const ANIM_DURATION = 300;

export default function CoffeePreferencePicker({
  open,
  selected,
  onClose,
  onSave,
}: CoffeePreferencePickerProps) {
  const [mounted, setMounted] = useState(false);
  const [rendered, setRendered] = useState(open);
  const [tempSelected, setTempSelected] = useState<string[]>(selected);

  useEffect(() => {
    if (open) {
      setRendered(true);
      setTempSelected(selected);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setMounted(true));
      });
    } else {
      setMounted(false);
      setTimeout(() => setRendered(false), ANIM_DURATION);
    }
  }, [open, selected]);

  useEffect(() => {
    if (!rendered) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [rendered, onClose]);

  if (!rendered) return null;

  const toggle = (option: string) => {
    setTempSelected(prev =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option],
    );
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 cursor-pointer"
        style={{
          backgroundColor: mounted ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0)",
          transition: `background-color ${ANIM_DURATION}ms ease-out`,
        }}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className="relative w-full sm:max-w-sm mx-0 sm:mx-4 rounded-t-3xl sm:rounded-3xl border-t sm:border border-pill-border bg-[#151210] shadow-2xl shadow-black flex flex-col"
        style={{
          maxHeight: "70dvh",
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
          <h3 className="text-white text-lg font-semibold">
            Coffee Preferences
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
          >
            <X size={14} className="text-white/60" />
          </button>
        </div>

        {/* Options list */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 pb-4">
          <p className="text-white/40 text-xs mb-3">
            Select your go-to coffee drinks
          </p>
          <div className="flex flex-col gap-2">
            {ALL_COFFEE_OPTIONS.map(option => {
              const isSelected = tempSelected.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggle(option)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-2xl text-base uppercase text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-primary-yellow/15 border border-primary-yellow/50"
                      : "bg-pill border border-pill-border hover:border-white/20"
                  }`}
                >
                  <span
                    className={
                      isSelected ? "text-primary-yellow font-medium" : "text-white/70"
                    }
                  >
                    {option}
                  </span>
                  <div
                    className={`h-5 w-5 rounded-md flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-primary-yellow"
                        : "bg-white/10 border border-white/20"
                    }`}
                  >
                    {isSelected && <Check size={12} className="text-black" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Save button */}
        <div className="shrink-0 px-5 pb-5 pt-3 border-t border-pill-border">
          <button
            type="button"
            onClick={() => {
              onSave(tempSelected);
              onClose();
            }}
            className="w-full py-3.5 rounded-2xl bg-primary-yellow text-black font-bold text-sm cursor-pointer hover:bg-primary-yellow/90 transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
