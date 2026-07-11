"use client";

import { ChevronDown } from "lucide-react";
import type { FilterKey, FilterSelectProps } from "./map-data";

export default function FilterSelect({
  id,
  label,
  options,
  onChange,
}: FilterSelectProps) {
  return (
    <div className="relative flex-1 min-w-0">
      <select
        id={id}
        defaultValue=""
        onChange={e => onChange?.(id, e.target.value)}
        className="w-full appearance-none bg-pill border border-pill-border text-white/60 text-xs font-normal rounded-full pl-3 pr-7 py-1.5 truncate focus:outline-none focus:border-primary-yellow"
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map(opt => (
          <option key={opt} value={opt} className="text-black bg-white">
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        size={12}
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40"
      />
    </div>
  );
}
