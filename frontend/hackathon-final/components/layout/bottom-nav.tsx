"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "./nav-items";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-2 lg:hidden"
      aria-label="Asosiy navigatsiya"
    >
      <div className="flex items-center gap-1 rounded-full border border-line bg-ink-900/90 p-1.5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center px-3.5 py-2"
              aria-current={active ? "page" : undefined}
            >
              {active && (
                <motion.div
                  layoutId="bottom-nav-active-pill"
                  className="absolute inset-0 rounded-full bg-ink-800"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <Icon
                className={cn(
                  "relative z-10 h-5 w-5 transition-colors duration-200",
                  active ? "text-gold-400" : "text-text-muted"
                )}
                strokeWidth={2}
              />
              <span className="sr-only">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
