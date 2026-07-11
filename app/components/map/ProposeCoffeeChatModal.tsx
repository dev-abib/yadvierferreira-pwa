"use client";

import { useState } from "react";
import { Coffee } from "lucide-react";

interface ProposeCoffeeChatModalProps {
  open: boolean;
  venueName: string;
  onClose: () => void;
  onSubmit?: (data: {
    time: string;
    proposeTo: string;
    agenda: string;
  }) => void;
  timeSlots?: string[];
}

const DEFAULT_TIME_SLOTS = ["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"];

export default function ProposeCoffeeChatModal({
  open,
  venueName,
  onClose,
  onSubmit,
  timeSlots = DEFAULT_TIME_SLOTS,
}: ProposeCoffeeChatModalProps) {
  const [selectedTime, setSelectedTime] = useState<string>(
    timeSlots[1] ?? timeSlots[0],
  );
  const [proposeTo, setProposeTo] = useState("");
  const [agenda, setAgenda] = useState("");

  const handleSubmit = () => {
    onSubmit?.({ time: selectedTime, proposeTo, agenda });
  };

  return (
    <div className="pb-2">
      <h2 className="text-white font-bold text-2xl leading-tight">
        Propose Coffee Chat
      </h2>
      <p className="text-white/40 text-sm mt-1">{venueName}</p>

      <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mt-6 mb-3">
        Pick a time
      </p>
      <div className="flex flex-wrap gap-2.5">
        {timeSlots.map(slot => (
          <button
            key={slot}
            type="button"
            onClick={() => setSelectedTime(slot)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${
              selectedTime === slot
                ? "bg-primary-yellow text-black"
                : "bg-pill border border-pill-border text-white/60"
            }`}
          >
            {slot}
          </button>
        ))}
      </div>

      <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mt-6 mb-3">
        Propose to
      </p>
      <input
        type="text"
        value={proposeTo}
        onChange={e => setProposeTo(e.target.value)}
        placeholder="Enter the user name..."
        className="w-full bg-[#140D0880]/50 border border-pill-border rounded-2xl px-4 py-3.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary-yellow"
      />

      <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wide mt-6 mb-3">
        Agenda (optional)
      </p>
      <textarea
        value={agenda}
        onChange={e => setAgenda(e.target.value)}
        placeholder="What would you like to chat about?"
        rows={4}
        className="w-full bg-[#140D0880]/50 border border-pill-border rounded-2xl px-4 py-3.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary-yellow resize-none"
      />

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full mt-6 flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary-yellow text-black font-bold text-base cursor-pointer transition-all duration-200 hover:bg-primary-yellow/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-yellow/20 active:translate-y-0 active:scale-[0.98]"
      >
        Request Coffee Chat
        <Coffee size={16} />
      </button>
    </div>
  );
}
