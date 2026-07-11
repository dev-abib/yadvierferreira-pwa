export interface ChatMessage {
  id: string;
  sender: "them" | "me";
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  initials: string;
  avatarColor: string;
  onlineDotColor: string;
  name: string;
  status: "Online" | "Offline";
  nearby?: boolean;
  preview: string;
  time: string;
  unread?: boolean;
  chat: ChatMessage[];
}

export const conversations: Conversation[] = [
  {
    id: "1",
    initials: "DC",
    avatarColor: "bg-[#C2793A]/40",
    onlineDotColor: "bg-emerald-400",
    name: "Daniela Cruz",
    status: "Online",
    preview: "Let's go outside of the city for a cup of coffee",
    time: "2 hr",
    unread: true,
    chat: [
      {
        id: "m1",
        sender: "them",
        text: "Hey! I saw your portfolio — love the network-first approach you're building.",
        time: "10:14 AM",
      },
      {
        id: "m2",
        sender: "me",
        text: "Thanks Daniela! Really enjoyed reading about your brand strategy work too.",
        time: "10:16 AM",
      },
      {
        id: "m3",
        sender: "them",
        text: "Would love to grab a coffee chat during the convention!",
        time: "10:18 AM",
      },
    ],
  },
  {
    id: "2",
    initials: "MR",
    avatarColor: "bg-[#243B2A]",
    onlineDotColor: "bg-orange-500",
    name: "Daniela Cruz",
    status: "Offline",
    preview: "Senior Marketing Manager · Delo...",
    time: "1 day",
    chat: [
      {
        id: "m1",
        sender: "them",
        text: "Senior Marketing Manager · Delo...",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "3",
    initials: "DC",
    avatarColor: "bg-[#C2793A]/40",
    onlineDotColor: "bg-emerald-400",
    name: "Daniela Cruz",
    status: "Online",
    nearby: true,
    preview: "Senior Marketing Manager · Delo...",
    time: "1 day",
    chat: [
      {
        id: "m1",
        sender: "them",
        text: "Senior Marketing Manager · Delo...",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "4",
    initials: "DC",
    avatarColor: "bg-[#C2793A]/40",
    onlineDotColor: "bg-emerald-400",
    name: "Daniela Cruz",
    status: "Online",
    nearby: true,
    preview: "Senior Marketing Manager · Delo...",
    time: "1 day",
    chat: [
      {
        id: "m1",
        sender: "them",
        text: "Senior Marketing Manager · Delo...",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "5",
    initials: "AJ",
    avatarColor: "bg-[#243B2A]",
    onlineDotColor: "bg-orange-500",
    name: "Aisha Johnson",
    status: "Offline",
    preview: "Senior Marketing Manager · Delo...",
    time: "1 day",
    chat: [
      {
        id: "m1",
        sender: "them",
        text: "Senior Marketing Manager · Delo...",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "6",
    initials: "AJ",
    avatarColor: "bg-[#243B2A]",
    onlineDotColor: "bg-orange-500",
    name: "Aisha Johnson",
    status: "Offline",
    preview: "Senior Marketing Manager · Delo...",
    time: "1 day",
    chat: [
      {
        id: "m1",
        sender: "them",
        text: "Senior Marketing Manager · Delo...",
        time: "Yesterday",
      },
    ],
  },
];

export function getConversationById(id: string): Conversation | undefined {
  return conversations.find(c => c.id === id);
}
