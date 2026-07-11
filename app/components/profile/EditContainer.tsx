"use client";

import { Check, X } from "lucide-react";

export default function EditContainer({
  onSave,
  onCancel,
  children,
}: {
  onSave: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      {children}
      <div className="flex gap-2 self-end">
        <button
          onClick={onCancel}
          className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
        >
          <X size={12} className="text-white/60" />
        </button>
        <button
          onClick={onSave}
          className="h-8 w-8 rounded-full bg-primary-yellow flex items-center justify-center cursor-pointer hover:bg-primary-yellow/90 transition-colors"
        >
          <Check size={12} className="text-black" />
        </button>
      </div>
    </div>
  );
}
