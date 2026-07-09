export default function QuickReplies({
  options,
  onSelect,
}: {
  options: string[];
  onSelect: (option: string) => void;
}) {
  return (
    <div className="msg-enter flex flex-wrap gap-2 px-5 pl-14">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className="rounded-pill border border-pill-border bg-pill px-4 py-2 text-[14px] font-medium text-text-primary transition-colors hover:bg-white/5 active:scale-[0.97]"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
