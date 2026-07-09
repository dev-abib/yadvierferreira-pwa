export default function BotBadge() {
  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/90">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M3 6.5c0-.83.67-1.5 1.5-1.5h6c.83 0 1.5.67 1.5 1.5v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z"
          fill="#100D0A"
        />
        <path
          d="M12 7h.6a1.2 1.2 0 1 1 0 2.4H12"
          stroke="#100D0A"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <rect x="3" y="4.6" width="8" height="1.2" rx="0.6" fill="#100D0A" />
      </svg>
    </div>
  );
}
