"use client";

import { useRouter } from "next/navigation";
import { Coffee, MessageSquare, X, Calendar, Globe2 } from "lucide-react";
import { useState } from "react";
import CoffeeChatModal from "../map/CoffeeChatModal";
import type { Person } from "./types";

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <p className="text-white/30 text-[11px] font-semibold uppercase tracking-wider mb-2">
        {label}
      </p>
      {children}
    </div>
  );
}

interface ProfileDrawerProps {
  person: Person | null;
  onClose: () => void;
}

export default function ProfileDrawer({ person, onClose }: ProfileDrawerProps) {
  const router = useRouter();
  const [showCoffeeChat, setShowCoffeeChat] = useState(false);
  const open = !!person;

  return (
    // z-[100] — must sit above BottomNav's z-50, otherwise the nav bar
    // paints over the bottom of this sheet (that's what was cutting off
    // the Connect button; it wasn't a scroll issue).
    <div
      className={`fixed inset-0 z-[100] overflow-y-auto min-h-full overflow-y-auto ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Sheet */}
      <div
        className={`absolute left-0 right-0 bottom-0 h-full rounded-t-3xl border-t border-pill-border bg-[#151210] shadow-2xl shadow-black transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {person && (
          <div className="flex flex-col h-full">
            {/* Drag handle */}
            <div className="flex justify-center pt-3 shrink-0">
              <span className="h-1 w-10 rounded-full bg-white/15" />
            </div>

            {/* Scrollable content — flex-1 min-h-0 fixes the cut-off connect button.
                pb-24 (+ safe-area) reserves room so the last button clears
                the bottom nav / home indicator even while this sheet is open. */}
            <div className="overflow-y-auto px-5 pb-24 flex-1 min-h-0">
              {/* Header */}
              <div className="flex items-start justify-between pt-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-14 w-14 rounded-2xl ${person.avatarColor} flex items-center justify-center shrink-0`}
                  >
                    <span className="text-white text-lg font-bold">
                      {person.initials}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white text-xl font-semibold truncate">
                      {person.name}
                    </h3>
                    <p className="text-white/40 text-sm truncate">
                      {person.title}
                    </p>
                    <p className="text-white/40 text-sm truncate">
                      {person.company}
                    </p>

                    {/* Meeting type + posted time */}
                    {(person.meetingType || person.postedTime) && (
                      <div className="flex items-center justify-center gap-2 mt-3">
                        {person.meetingType && (
                          <span className="px-3 py-1.5 rounded-full bg-primary-yellow/15 text-primary-yellow text-[11px] font-bold uppercase tracking-wide">
                            {person.meetingType}
                          </span>
                        )}
                        {person.postedTime && (
                          <span className="text-white/30 text-xs">
                            {person.postedTime}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="h-9 w-9 shrink-0 rounded-full flex items-center justify-center border border-pill-border bg-pill cursor-pointer"
                >
                  <X className="text-white/60" size={15} />
                </button>
              </div>

              {/* About */}
              {person.about && (
                <Section label="About">
                  <p className="text-white/70 text-sm leading-relaxed">
                    {person.about}
                  </p>
                </Section>
              )}

              {/* Industry */}
              {person.industry && (
                <Section label="Industry">
                  <p className="text-white/70 text-sm">{person.industry}</p>
                </Section>
              )}

              {/* Campus */}
              {person.campus && (
                <Section label="Campus / Alma Mater">
                  <p className="text-white/70 text-sm">{person.campus}</p>
                </Section>
              )}

              {/* Interests & Coffee */}
              <Section label="Interests & Coffee">
                <div className="flex flex-wrap gap-2">
                  {person.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-white/5 text-white/60 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-yellow text-black text-xs font-semibold">
                    <Coffee size={12} />
                    {person.drink}
                  </span>
                </div>
              </Section>

              {/* Portfolio */}
              {person.portfolio && (
                <Section label="Portfolio">
                  <div className="flex gap-3 rounded-2xl bg-white/5 p-3">
                    <img
                      src={person.portfolio.image}
                      alt="Portfolio preview"
                      className="h-25 w-25 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0 flex flex-col justify-center">
                      <p className="text-white/80 text-sm leading-snug">
                        {person.portfolio.caption}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-white/35 text-[11px]">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {person.portfolio.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe2 size={11} />
                          {person.portfolio.visibility}
                        </span>
                      </div>
                    </div>
                  </div>
                </Section>
              )}

              {/* Actions — always reachable via scroll */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    onClose();
                    router.push(`/message/${person.id}`);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 cursor-pointer py-3 rounded-full border border-pill-border bg-pill text-white text-base font-bold"
                >
                  <MessageSquare size={15} className="text-primary-yellow" />
                  Message
                </button>
                <button
                  onClick={() => {
                    setShowCoffeeChat(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 cursor-pointer py-3 rounded-full bg-primary-yellow text-black text-base font-bold"
                >
                  <Coffee size={15} />
                  Coffee Chat
                </button>
              </div>
              <button className="w-full my-5  cursor-pointer py-3 rounded-full bg-[#C58B4F4D]/30 text-primary-yellow border border-pill-border  text-base font-bold">
                + Connect
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Coffee Chat Modal */}
      {person && (
        <CoffeeChatModal
          open={showCoffeeChat}
          venueName={`${person.name} · ${person.title}`}
          onClose={() => setShowCoffeeChat(false)}
        />
      )}
    </div>
  );
}
