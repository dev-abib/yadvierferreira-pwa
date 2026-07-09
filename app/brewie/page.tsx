"use client";

import { useEffect, useRef, useState } from "react";
import RegisterSW from "../components/Chatbot/RegisterSW";
import ChatHeader from "../components/Chatbot/ChatHeader";
import MessageBubble, {
  ChatMessage,
} from "../components/Chatbot/MessageBubble";
import QuickReplies from "../components/Chatbot/QuickReplies";
import ChatInput from "../components/Chatbot/ChatInput";

type Turn =
  | { type: "message"; message: ChatMessage }
  | { type: "quickReplies"; id: string; options: string[] };

const INITIAL_TURNS: Turn[] = [
  {
    type: "message",
    message: {
      id: "m1",
      sender: "bot",
      segments: [
        { text: "Morning! Your next coffee chat is " },
        { text: "in 45 min", highlight: true },
        { text: " with Daniela from Deloitte. Want a quick prep?" },
      ],
    },
  },
  {
    type: "quickReplies",
    id: "qr1",
    options: ["Yes, prep me", "Icebreakers", "Dress code"],
  },
  {
    type: "message",
    message: {
      id: "m2",
      sender: "bot",
      segments: [
        {
          text: "Three quick things: business-casual is safe. Lead with something genuine. Have ",
        },
        { text: "one specific ask", highlight: true },
        { text: " ready before the cup's empty." },
      ],
    },
  },
  {
    type: "message",
    message: {
      id: "m3",
      sender: "user",
      segments: [{ text: "Give me an icebreaker for someone in fintech" }],
    },
  },
  {
    type: "message",
    message: {
      id: "m4",
      sender: "bot",
      italic: true,
      segments: [
        {
          text: 'Try: "What\'s one assumption about fintech that people here still get wrong?" — opens a real conversation, not small talk.',
        },
      ],
    },
  },
];

// Canned replies for the quick-reply pills, so the demo stays interactive.
const QUICK_REPLY_RESPONSES: Record<string, string> = {
  "Yes, prep me":
    "Great — take a breath. Daniela leads risk advisory at Deloitte. Keep it warm and curious, not pitchy.",
  Icebreakers:
    'Try: "What\'s the most interesting problem your team is solving right now?" — genuine, easy to answer.',
  "Dress code": "Business-casual is safe here. Blazer optional, no tie needed.",
};

let idCounter = 100;
function nextId() {
  idCounter += 1;
  return `gen-${idCounter}`;
}

export default function Home() {
  const [turns, setTurns] = useState<Turn[]>(INITIAL_TURNS);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [turns]);

  function handleQuickReply(option: string) {
    const userTurn: Turn = {
      type: "message",
      message: { id: nextId(), sender: "user", segments: [{ text: option }] },
    };
    const botTurn: Turn = {
      type: "message",
      message: {
        id: nextId(),
        sender: "bot",
        segments: [{ text: QUICK_REPLY_RESPONSES[option] ?? "Got it." }],
      },
    };
    setTurns(prev => [...prev, userTurn, botTurn]);
  }

  function handleSend(text: string) {
    const userTurn: Turn = {
      type: "message",
      message: { id: nextId(), sender: "user", segments: [{ text }] },
    };
    const botTurn: Turn = {
      type: "message",
      message: {
        id: nextId(),
        sender: "bot",
        segments: [
          {
            text: "Noted. I'll fold that into your next prep — anything else before the chat?",
          },
        ],
      },
    };
    setTurns(prev => [...prev, userTurn, botTurn]);
  }

  return (
    <div className="app-glow flex h-[91dvh] flex-col">
      <RegisterSW />
      <ChatHeader />
      <div
        ref={scrollRef}
        className="no-scrollbar flex-1 space-y-4 overflow-y-auto pb-4"
      >
        {turns.map(turn =>
          turn.type === "message" ? (
            <MessageBubble key={turn.message.id} message={turn.message} />
          ) : (
            <QuickReplies
              key={turn.id}
              options={turn.options}
              onSelect={option => handleQuickReply(option)}
            />
          ),
        )}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
}
