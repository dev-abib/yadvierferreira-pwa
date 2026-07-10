"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Coffee, Plus, Send } from "lucide-react";
import { ChatMessage, getConversationById } from "@/public/lib/conversation";

export default function Page() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const conversation = getConversationById(params.id);

  const [messages, setMessages] = useState<ChatMessage[]>(
    conversation?.chat ?? [],
  );
  const [draft, setDraft] = useState("");

  if (!conversation) {
    return (
      <div className="app-glow flex h-dvh flex-col items-center justify-center gap-3 px-5 text-center">
        <p className="text-white/60 text-sm">This conversation doesnt exist.</p>
        <button
          onClick={() => router.back()}
          className="text-primary-yellow text-sm font-semibold cursor-pointer"
        >
          Go back
        </button>
      </div>
    );
  }

  const handleSend = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    setMessages(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        sender: "me",
        text: trimmed,
        time: new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
      },
    ]);
    setDraft("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app-glow flex h-dvh flex-col overflow-hidden">
      <div className="flex items-center gap-3 px-5 pt-6 pb-4 shrink-0 border-b border-pill-border">
        <button
          onClick={() => router.back()}
          aria-label="Back"
          className="shrink-0 cursor-pointer"
        >
          <ArrowLeft size={20} className="text-white/70" />
        </button>

        <div className="relative shrink-0">
          <div
            className={`h-10 w-10 rounded-full ${conversation.avatarColor} flex items-center justify-center`}
          >
            <span className="text-white text-xs font-bold">
              {conversation.initials}
            </span>
          </div>
          <span
            className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ${conversation.onlineDotColor} border-2 border-black`}
          />
        </div>

        <div className="min-w-0">
          <h4 className="text-white font-semibold text-base truncate">
            {conversation.name}
          </h4>
          <p
            className={`text-xs ${conversation.status === "Online" ? "text-emerald-400" : "text-white/40"}`}
          >
            {conversation.status}
          </p>
        </div>
      </div>

      <div className="px-5 pt-4 shrink-0">
        <button className="w-full flex items-center justify-between rounded-2xl border border-pill-border bg-pill px-4 py-3 cursor-pointer">
          <div className="flex items-center gap-2">
            <Coffee size={16} className="text-white/40" />
            <span className="text-white/50 text-sm">Propose a coffee chat</span>
          </div>
          <span className="flex items-center gap-1 text-primary-yellow text-sm font-semibold">
            Propose <span aria-hidden>→</span>
          </span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col min-w-0 ${
              msg.sender === "me" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[80%] min-w-0 rounded-2xl px-4 py-3.5 text-base font-dm-sans leading-relaxed font-normal capitalize whitespace-normal break-words ${
                msg.sender === "me"
                  ? "bg-primary-yellow text-black rounded-br-md"
                  : "bg-pill border border-pill-border text-white rounded-bl-md"
              }`}
            >
              {msg.text}
            </div>
            <span className="text-white/30 text-[11px] mt-1 px-1">
              {msg.time}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-5 py-4 border-t border-pill-border shrink-0">
        <button
          aria-label="Add attachment"
          className="h-10 w-10 rounded-full bg-pill border border-pill-border flex items-center justify-center shrink-0 cursor-pointer"
        >
          <Plus size={18} className="text-white/60" />
        </button>
        <input
          type="text"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message..."
          className="flex-1 bg-pill border border-pill-border rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary-yellow"
        />
        <button
          onClick={handleSend}
          aria-label="Send message"
          className="h-10 w-10 rounded-full bg-primary-yellow flex items-center justify-center shrink-0 transition-colors hover:bg-primary-yellow/90 disabled:opacity-40 cursor-pointer"
          disabled={!draft.trim()}
        >
          <Send size={16} className="text-black" />
        </button>
      </div>
    </div>
  );
}
