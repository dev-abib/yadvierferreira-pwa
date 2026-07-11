"use client";

interface Stat {
  label: string;
  value: number;
}

const stats: Stat[] = [
  { label: "Connections", value: 12 },
  { label: "Coffee Chats", value: 5 },
  { label: "Upcoming", value: 3 },
];

export default function ProfileStats() {
  return (
    <div className="grid grid-cols-3 gap-3 mt-5">
      {stats.map(stat => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center py-4 rounded-2xl border border-pill-border bg-pill"
        >
          <span className="text-white text-xl font-bold">{stat.value}</span>
          <span className="text-white/40 text-xs uppercase mt-1 text-center leading-tight">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
