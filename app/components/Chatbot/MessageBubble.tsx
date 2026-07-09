import BotBadge from "./BotBadge";

export type Segment = { text: string; highlight?: boolean };

export type ChatMessage = {
  id: string;
  sender: "bot" | "user";
  segments: Segment[];
  italic?: boolean;
};

function RichText({ segments, italic }: { segments: Segment[]; italic?: boolean }) {
  return (
    <p className={`text-[15px] leading-[22px] ${italic ? "italic" : ""}`}>
      {segments.map((seg, i) => (
        <span key={i} className={seg.highlight ? "text-accent-light font-medium" : ""}>
          {seg.text}
        </span>
      ))}
    </p>
  );
}

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.sender === "user";

  if (isUser) {
    return (
      <div className="msg-enter flex justify-end px-5">
        <div className="max-w-[82%] rounded-bubble rounded-tr-md bg-accent px-4 py-3 text-[#100D0A]">
          <RichText segments={message.segments} />
        </div>
      </div>
    );
  }

  return (
    <div className="msg-enter flex items-end gap-2 px-5">
      <BotBadge />
      <div className="max-w-[80%] rounded-bubble rounded-tl-md border border-card-border bg-card px-4 py-3 text-text-primary">
        <RichText segments={message.segments} italic={message.italic} />
      </div>
    </div>
  );
}
