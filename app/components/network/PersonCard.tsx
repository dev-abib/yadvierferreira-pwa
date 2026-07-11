"use client";

import { useRouter } from "next/navigation";
import { ChevronRight, Coffee, MessageSquare } from "lucide-react";
import type { Person } from "./types";

interface PersonCardProps {
  person: Person;
  onClick: () => void;
}

export default function PersonCard({ person, onClick }: PersonCardProps) {
  const router = useRouter();
  return (
    <div
      className="flex gap-3 py-4 cursor-pointer"
      onClick={onClick}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <div
          className={`h-16 w-16 rounded-2xl ${person.avatarColor} flex items-center justify-center`}
        >
          <span className="text-white text-xl font-bold">
            {person.initials}
          </span>
        </div>
        <span
          className={`absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full ${person.onlineDotColor} border-2 border-black`}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <h4 className="text-white font-semibold text-lg truncate">
            {person.name}
          </h4>
          {person.badge && (
            <span
              className={`text-[11px] font-normal shrink-0 ${person.badge.color}`}
            >
              {person.badge.label}
            </span>
          )}
        </div>
        <p className="text-white/40 text-sm my-1 truncate">
          {person.title} · {person.company}
        </p>

        <div className="flex flex-wrap items-center gap-1.5 my-3">
          {person.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1.5 rounded-full bg-white/5 text-white/50 text-[11px] font-normal"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-2">
          <div className="flex items-center gap-1.5 w-fit text-xs px-2.5 py-1.5 rounded-full bg-white/5 text-white/50 text-[11px] font-normal">
            <Coffee size={12} />
            {person.drink}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col justify-between items-end">
        <div className="shrink-0 flex items-start pt-1">
          {person.action === "connect" ? (
            <button
              onClick={e => e.stopPropagation()}
              className="px-4 py-2.5 cursor-pointer rounded-full bg-primary-yellow text-black text-xs font-bold transition-colors hover:bg-primary-yellow/90"
            >
              Connect
            </button>
          ) : (
            <button
              onClick={e => {
                e.stopPropagation();
                router.push(`/message/${person.id}`);
              }}
              className="h-10 w-10 rounded-full flex justify-center items-center shadow-lg shadow-black border border-pill-border bg-pill"
              aria-label="Messages"
            >
              <MessageSquare className="text-primary-yellow" size={16} />
            </button>
          )}
        </div>
        <ChevronRight className="text-white/40" size={16} />
      </div>
    </div>
  );
}
