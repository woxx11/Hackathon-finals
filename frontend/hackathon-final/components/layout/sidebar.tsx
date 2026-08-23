"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Wordmark } from "./logo-mark";
import { NAV_ITEMS } from "./nav-items";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-line bg-ink-950/60 px-4 py-6 lg:flex">
      <Link href="/dashboard" className="px-2">
        <Wordmark />
      </Link>

      <nav className="mt-10 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="relative">
              {active && (
                <motion.div
                  layoutId="sidebar-active-pill"
                  className="absolute inset-0 rounded-2xl bg-ink-850 ring-1 ring-line-strong"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span
                className={cn(
                  "relative z-10 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors duration-200",
                  active ? "text-gold-400" : "text-text-secondary hover:text-text-primary"
                )}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-line bg-ink-900/60 p-4">
        <p className="font-display text-sm font-medium text-text-primary">Do&apos;stingni chaqir</p>
        <p className="mt-1 text-xs leading-relaxed text-text-secondary">
          Link orqali taklif qil — ikkalangizga ham bonus XP.
        </p>
      </div>
    </aside>
  );
}
