"use client";

import { Calendar } from "lucide-react";
import { useState } from "react";
import CoffeeChatModal from "../components/map/CoffeeChatModal";
import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/img/Frame 24.png";

const days = [
  { label: "SUN", date: 9 },
  { label: "MON", date: 10 },
  { label: "TUE", date: 11 },
  { label: "WED", date: 12 },
  { label: "THU", date: 13 },
];

const events = [
  {
    time: "9:00",
    period: "AM",
    dotColor: "bg-primary-yellow",
    title: "Sunrise Coffee Meetup",
    location: "Hotel Lobby Café",
    status: "Open",
    statusStyle: "bg-primary-yellow/15 text-primary-yellow",
  },
  {
    time: "11:30",
    period: "AM",
    dotColor: "bg-emerald-400",
    title: "1:1 with Marcus R.",
    location: "Terrace Bar",
    status: "Confirmed",
    statusStyle: "bg-emerald-400/15 text-emerald-400",
  },
  {
    time: "2:00",
    period: "PM",
    dotColor: "bg-primary-yellow",
    title: "Open Networking Hour",
    location: "Convention Hall B",
    status: "Open",
    statusStyle: "bg-primary-yellow/15 text-primary-yellow",
  },
  {
    time: "4:30",
    period: "PM",
    dotColor: "bg-primary-yellow",
    title: "Mentor Match Pop-up",
    location: "Mezzanine Café",
    status: "Open",
    statusStyle: "bg-primary-yellow/15 text-primary-yellow",
  },
];

export default function Page() {
  const [activeDate, setActiveDate] = useState(11);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  return (
    <div className="app-glow flex flex-col  px-5 pt-6 pb-4">
      <div className="flex justify-between items-center shrink-0">
        <div>
          {/* <h3 className="text-[10px] uppercase font-semibold text-primary-yellow tracking-widest">
            ALPFA CONVENTION 2026
          </h3> */}
          <Image src={Logo} alt="Convention Logo" width={200} height={200} />
          <h2 className="text-[30px] font-bold text-primary-yellow">
            Schedule
          </h2>
        </div>
        <div className="relative">
          <Link href="/proposal-request">
            <div className="h-10 w-10 rounded-xl flex justify-center items-center shadow-lg shadow-black border border-pill-border bg-pill cursor-pointer shrink-0">
              <Calendar className="text-primary-yellow" size={18} />
            </div>
          </Link>
          <div className="h-3 w-3 rounded-full bg-green-500 absolute top-0 -left-1"></div>
        </div>
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

      <div className="flex-1">
        <div className="relative flex flex-col gap-6">
          <div className="absolute left-14 top-2 bottom-2 w-px bg-white/10" />

          {events.map((event, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-10 shrink-0 text-right pt-0.5">
                <div className="text-primary-yellow text-xs font-bold leading-tight">
                  {event.time}
                </div>
                <div className="text-white/40 text-[10px] leading-tight">
                  {event.period}
                </div>
              </div>

              <div className="relative flex flex-col items-center pt-1.5 shrink-0">
                <span className={`h-2 w-2 rounded-full ${event.dotColor}`} />
              </div>

              <div className="flex gap-3 rounded-2xl border border-pill-border bg-pill px-4 py-3.5">
                <div className="">
                  <h4 className="text-white font-semibold text-[15px]">
                    {event.title}
                  </h4>
                  <p className="text-white/40 text-xs mt-0.5">
                    {event.location}
                  </p>
                  <span
                    className={`inline-block mt-2.5 px-3 py-1 rounded-full text-[11px] font-semibold ${event.statusStyle}`}
                  >
                    {event.status}
                  </span>
                </div>
                <div className="flex gap-2 shrink-0 items-center">
                  <div className="bg-[#1A2E50] h-12 w-12 rounded-xl flex justify-center items-center border-2 border-primary-yellow">
                    <p className="text-white">SL</p>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=50&h=50&fit=crop"
                    alt="Proposed Coffee Chat"
                    width={50}
                    height={50}
                    className="rounded-xl object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowCalendarModal(true)}
        className="shrink-0 cursor-pointer flex mt-10 mb-5 items-center justify-center gap-2 rounded-2xl border border-dashed border-primary-yellow/50 py-3.5 text-primary-yellow text-sm font-medium"
      >
        <span className="text-lg leading-none">+</span>
        <span>Add to my calendar</span>
      </button>

      <CoffeeChatModal
        open={showCalendarModal}
        venueName="ALPFA Convention 2026"
        onClose={() => setShowCalendarModal(false)}
        onSubmit={data => {
          console.log("Calendar event proposed:", data);
          setShowCalendarModal(false);
        }}
      />
    </div>
  );
}
