"use client";

import { useState, FormEvent } from "react";

export default function ChatInput({
  onSend,
}: {
  onSend: (text: string) => void;
}) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-white/[0.04] bg-bg px-4 py-4"
    >
      <div className="flex flex-1 items-center rounded-pill border border-pill-border bg-pill px-4 py-3">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What's brewing in your mind today?"
          className="w-full outline-none bg-transparent text-[15px] text-text-primary placeholder:text-text-tertiary focus:outline-none"
          aria-label="Message Brewie"
        />
      </div>
      <button
        type="submit"
        aria-label="Send message"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-[#100D0A] transition-transform active:scale-95"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M3 10l14-6.5L11.5 17l-2-6.5L3 10z"
            fill="#100D0A"
          />
        </svg>
      </button>
    </form>
  );
}
