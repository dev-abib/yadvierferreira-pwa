export type Tab = "forYou" | "connections" | "favorites";

export interface PortfolioItem {
  image: string;
  caption: string;
  date: string;
  visibility: "Public" | "Private";
}

export interface Person {
  id: string;
  initials: string;
  avatarColor: string;
  onlineDotColor: string;
  name: string;
  badge?: { label: string; color: string };
  title: string;
  company: string;
  tags: string[];
  drink: string;
  action: "connect" | "message";
  // Extra detail shown in the profile drawer
  meetingType?: string;
  postedTime?: string;
  about?: string;
  industry?: string;
  campus?: string;
  portfolio?: PortfolioItem;
}

export const TABS: { key: Tab; label: string }[] = [
  { key: "forYou", label: "For You" },
  { key: "connections", label: "Connections" },
  { key: "favorites", label: "Favorites" },
];

export const PEOPLE: Person[] = [
  {
    id: "1",
    initials: "DC",
    avatarColor: "bg-[#C2793A]/40",
    onlineDotColor: "bg-emerald-400",
    name: "Daniela Cruz",
    badge: { label: "Nearby", color: "text-emerald-400" },
    title: "Senior Marketing Manager",
    company: "Deloitte",
    tags: ["Marketing", "Strategy"],
    drink: "Cappuccino",
    action: "connect",
    meetingType: "In-person",
    postedTime: "5 min ago",
    about:
      "Leads brand and growth marketing at Deloitte. Loves talking about positioning, storytelling, and go-to-market strategy over coffee.",
    industry: "Marketing & Brand Strategy",
    campus: "New York University",
  },
  {
    id: "2",
    initials: "MR",
    avatarColor: "bg-[#243B2A]",
    onlineDotColor: "bg-orange-500",
    name: "Marcus Reyes",
    title: "Staff Software Engineer",
    company: "Google",
    tags: ["Engineering", "AI/ML"],
    drink: "Black Coffee",
    action: "message",
    meetingType: "Remote",
    postedTime: "12 min ago",
    about:
      "Staff engineer working on applied ML infrastructure. Happy to chat about system design, model serving, or breaking into big tech.",
    industry: "Software Engineering",
    campus: "UC Berkeley",
  },
  {
    id: "3",
    initials: "SL",
    avatarColor: "bg-[#243B2A]",
    onlineDotColor: "bg-emerald-400",
    name: "Sofia Lin",
    badge: { label: "Nearby", color: "text-emerald-400" },
    title: "Investment Analyst",
    company: "JP Morgan",
    tags: ["Finance", "Fintech"],
    drink: "Matcha",
    action: "connect",
    meetingType: "In-person",
    postedTime: "2 min ago",
    about:
      "Analyst at JP Morgan focusing on fintech and consumer tech investments. Always up for conversations about emerging markets.",
    industry: "Frontend developer building network-first",
    campus: "University of North Carolina Charlotte",
    portfolio: {
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
      caption: "This is my resume and you can see it.",
      date: "21/02/2026",
      visibility: "Public",
    },
  },
  {
    id: "4",
    initials: "KP",
    avatarColor: "bg-[#C2793A]/40",
    onlineDotColor: "bg-orange-500",
    name: "Kevin Park",
    title: "Product Designer",
    company: "Figma",
    tags: ["Design", "Product"],
    drink: "Oat Latte",
    action: "connect",
    meetingType: "In-person",
    postedTime: "18 min ago",
    about:
      "Product designer crafting collaboration tools at Figma. Into design systems, prototyping, and good oat milk.",
    industry: "Product Design",
    campus: "Rhode Island School of Design",
  },
  {
    id: "5",
    initials: "AJ",
    avatarColor: "bg-[#243B2A]",
    onlineDotColor: "bg-orange-500",
    name: "Aisha Johnson",
    badge: { label: "★", color: "text-primary-yellow" },
    title: "Strategy Consultant",
    company: "McKinsey",
    tags: ["Consulting", "Leadership"],
    drink: "Cold Brew",
    action: "message",
    meetingType: "Remote",
    postedTime: "1 hr ago",
    about:
      "Consultant advising Fortune 500 clients on growth strategy. Enjoys mentoring and swapping notes on leadership.",
    industry: "Management Consulting",
    campus: "Northwestern University",
  },
];
