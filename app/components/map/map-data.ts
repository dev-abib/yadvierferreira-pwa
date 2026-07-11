export type FilterKey = "coffeePref" | "profession" | "availability";

export interface FilterConfig {
  label: string;
  options: string[];
}

export const filterOptions: Record<FilterKey, FilterConfig> = {
  coffeePref: {
    label: "Coffee Pref",
    options: ["Espresso", "Latte", "Filter", "Cold Brew"],
  },
  profession: {
    label: "Profession",
    options: ["Founder", "Designer", "Engineer", "Marketer"],
  },
  availability: {
    label: "Availability",
    options: ["Now", "Today", "This Week"],
  },
};

export interface Pin {
  id: string;
  top: string;
  left: string;
  color: string;
  initials?: string;
  icon?: boolean;
}

export const pins: Pin[] = [
  { id: "DC", top: "20%", left: "22%", color: "bg-rose-800", initials: "DC" },
  {
    id: "MR",
    top: "34%",
    left: "60%",
    color: "bg-emerald-700",
    initials: "MR",
  },
  { id: "SL", top: "48%", left: "82%", color: "bg-blue-700", initials: "SL" },
  { id: "KP", top: "62%", left: "38%", color: "bg-purple-700", initials: "KP" },
  {
    id: "two-birds-coffee-house",
    top: "42%",
    left: "24%",
    color: "bg-primary-yellow",
    icon: true,
  },
];

export interface Venue {
  id: string;
  name: string;
  image: string;
  distance: string;
  attendeeCount: number;
  status: "open" | "closed";
  statusLabel: string;
  tags: string[];
  hot?: boolean;
}

export const venues: Venue[] = [
  {
    id: "two-birds-coffee-house",
    name: "Two Birds Coffee House",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=200&fit=crop",
    distance: "5 min walk",
    attendeeCount: 3,
    status: "open",
    statusLabel: "Open now",
    tags: ["Quiet", "Good WiFi"],
    hot: true,
  },
  {
    id: "sunny-side-bakery",
    name: "Sunny Side Bakery",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop",
    distance: "10 min walk",
    attendeeCount: 5,
    status: "open",
    statusLabel: "Open until 8 PM",
    tags: ["Cozy atmosphere", "Free pastries with coffee"],
  },
  {
    id: "the-urban-lounge",
    name: "The Urban Lounge",
    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=200&h=200&fit=crop",
    distance: "7 min walk",
    attendeeCount: 4,
    status: "open",
    statusLabel: "Open 24 hours",
    tags: ["Lively", "Great for meetings"],
  },
];

export interface FilterSelectProps {
  id: FilterKey;
  label: string;
  options: string[];
  onChange?: (id: FilterKey, value: string) => void;
}

/* ── Shop Detail (rich data for drawer) ── */

export interface ShopDetail {
  kind: "shop";
  id: string;
  name: string;
  image: string;
  address: string;
  distance: string;
  rating: number;
  reviewCount: number;
  status: "open" | "closed";
  statusLabel: string;
  tags: string[];
  hoursToday: { day: string; hours: string };
  attendees: { id: string; initials: string; color: string }[];
  extraAttendeeCount: number;
}

export interface PersonDetail {
  kind: "person";
  id: string;
  name: string;
  role: string;
  company: string;
  distance: string;
  color: string;
  status: "available" | "busy";
  statusLabel: string;
  tags: string[];
  bio: string;
}

export type Detail = ShopDetail | PersonDetail;

export const shopData: Record<string, ShopDetail> = {
  "two-birds-coffee-house": {
    kind: "shop",
    id: "two-birds-coffee-house",
    name: "Two Birds Coffee House",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=200&fit=crop",
    address: "123 Convention Blvd",
    distance: "5 min walk",
    rating: 4.2,
    reviewCount: 118,
    status: "open",
    statusLabel: "Open · Closes 9 PM",
    tags: ["Quiet", "Good WiFi", "Outdoor seating", "Dairy-free options"],
    hoursToday: { day: "Monday", hours: "7:00 AM – 9:00 PM" },
    attendees: [
      { id: "DC", initials: "DC", color: "bg-amber-700" },
      { id: "KP", initials: "KP", color: "bg-purple-700" },
    ],
    extraAttendeeCount: 1,
  },
  "sunny-side-bakery": {
    kind: "shop",
    id: "sunny-side-bakery",
    name: "Sunny Side Bakery",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop",
    address: "48 Market Street",
    distance: "10 min walk",
    rating: 4.6,
    reviewCount: 92,
    status: "open",
    statusLabel: "Open until 8 PM",
    tags: ["Cozy atmosphere", "Free pastries with coffee"],
    hoursToday: { day: "Monday", hours: "7:00 AM – 8:00 PM" },
    attendees: [{ id: "MR", initials: "MR", color: "bg-emerald-700" }],
    extraAttendeeCount: 4,
  },
  "the-urban-lounge": {
    kind: "shop",
    id: "the-urban-lounge",
    name: "The Urban Lounge",
    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=200&h=200&fit=crop",
    address: "9 Regent Court",
    distance: "7 min walk",
    rating: 4.4,
    reviewCount: 65,
    status: "open",
    statusLabel: "Open 24 hours",
    tags: ["Lively", "Great for meetings"],
    hoursToday: { day: "Monday", hours: "Open 24 hours" },
    attendees: [{ id: "SL", initials: "SL", color: "bg-blue-700" }],
    extraAttendeeCount: 3,
  },
};

export const peopleData: Record<string, PersonDetail> = {
  DC: {
    kind: "person",
    id: "DC",
    name: "Dana Cole",
    role: "Founder",
    company: "Loop Studio",
    distance: "4 min walk",
    color: "bg-rose-800",
    status: "available",
    statusLabel: "Available now",
    tags: ["Espresso", "Founder", "Open to chat"],
    bio: "Building a design tools startup. Always up for talking product, fundraising, or good espresso.",
  },
  MR: {
    kind: "person",
    id: "MR",
    name: "Maya Reyes",
    role: "Product Designer",
    company: "Northwind",
    distance: "8 min walk",
    color: "bg-emerald-700",
    status: "available",
    statusLabel: "Available today",
    tags: ["Latte", "Designer", "Portfolio reviews"],
    bio: "Product designer working on fintech. Happy to trade portfolio feedback over coffee.",
  },
  SL: {
    kind: "person",
    id: "SL",
    name: "Sam Lin",
    role: "Engineer",
    company: "Quarry Labs",
    distance: "12 min walk",
    color: "bg-blue-700",
    status: "busy",
    statusLabel: "Busy until 3 PM",
    tags: ["Cold Brew", "Engineer", "This week"],
    bio: "Backend engineer, into distributed systems. Free for coffee chats later this week.",
  },
  KP: {
    kind: "person",
    id: "KP",
    name: "Kai Park",
    role: "Marketer",
    company: "Bright Field",
    distance: "6 min walk",
    color: "bg-purple-700",
    status: "available",
    statusLabel: "Available now",
    tags: ["Filter", "Marketer", "Networking"],
    bio: "Growth marketer for early-stage startups. Loves meeting founders and swapping notes.",
  },
};

export function getDetail(id: string | null): Detail | null {
  if (!id) return null;
  return shopData[id] ?? peopleData[id] ?? null;
}
