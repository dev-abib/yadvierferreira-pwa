"use client";

import Link from "next/link";
import { useState } from "react";
import { Calendar, Coffee } from "lucide-react";

const days = [
  { label: "SUN", date: 9 },
  { label: "MON", date: 10 },
  { label: "TUE", date: 11 },
  { label: "WED", date: 12 },
  { label: "THU", date: 13 },
];

export default function Page() {
  const [activeDate, setActiveDate] = useState(11);

  return (
    <div className="app-glow flex flex-col  px-5 pt-6 pb-4">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h3 className="text-[10px] uppercase font-semibold text-primary-yellow tracking-widest">
            ALPFA CONVENTION 2026
          </h3>
          <h2 className="text-[30px] font-bold text-primary-yellow">
            Request Coffee
          </h2>
        </div>
        <Link href="/proposal-request">
          <div className="h-10 w-10 rounded-xl flex justify-center items-center shadow-lg shadow-black border border-pill-border bg-pill cursor-pointer shrink-0">
            <Calendar className="text-primary-yellow" size={18} />
          </div>
        </Link>
      </div>

      <div className="flex justify-between gap-2 my-6 shrink-0">
        {days.map(day => {
          const isActive = day.date === activeDate;
          return (
            <button
              key={day.date}
              onClick={() => setActiveDate(day.date)}
              className={`flex flex-col items-center justify-center gap-1 rounded-2xl h-16 flex-1 border transition-colors cursor-pointer ${
                isActive
                  ? "bg-primary-yellow border-primary-yellow"
                  : "bg-pill border-pill-border"
              }`}
            >
              <span
                className={`text-[10px] font-semibold uppercase ${
                  isActive ? "text-black/60" : "text-white/40"
                }`}
              >
                {day.label}
              </span>
              <span
                className={`text-base font-bold ${
                  isActive ? "text-black" : "text-white"
                }`}
              >
                {day.date}
              </span>
            </button>
          );
        })}
      </div>
      <div className="rounded-2xl border border-pill-border bg-pill mt-8 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="relative h-20 w-20 rounded-2xl overflow-hidden shrink-0">
            <button
              className="h-16 w-16 rounded-xl flex justify-center items-center bg-primary-yellow cursor-pointer"
              aria-label="Contacts"
            >
              <Coffee className="text-black" size={20} />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-white font-bold text-lg leading-tight">
              Propose Coffee Chat
            </h2>
            <p className="text-white/40 text-sm mt-1.5">Pick A Time: 11:30AM</p>
            <p className="text-white/40 text-sm mt-1.5">
              Propose by: Mosfiqur Rahman
            </p>
            <p className="text-white/40 text-sm mt-1.5">
              Agenda: Coffee Tasting and Brewing Techniques
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-5">
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-primary-yellow hover:bg-primary-yellow hover:text-black duration-300 ease-in-out bg-pill text-white text-base font-bold cursor-pointer"
        >
          Decline{" "}
        </button>
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-primary-yellow text-black text-base font-bold cursor-pointer transition-all duration-200 hover:bg-transparent hover:text-primary-yellow border border-primary-yellow"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
