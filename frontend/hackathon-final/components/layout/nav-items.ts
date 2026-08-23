import type { LucideIcon } from "lucide-react";
import { Home, MessagesSquare, Swords, Trophy, CircleUserRound } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Bosh sahifa", icon: Home },
  { href: "/chat", label: "AI Repetitor", icon: MessagesSquare },
  { href: "/duel", label: "Duel", icon: Swords },
  { href: "/leaderboard", label: "Reyting", icon: Trophy },
  { href: "/profile", label: "Profil", icon: CircleUserRound },
];
