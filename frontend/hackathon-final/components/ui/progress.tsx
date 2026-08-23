"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  className?: string;
  barClassName?: string;
}

export function Progress({ value, className, barClassName }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className={cn("h-2 w-full overflow-hidden rounded-full bg-ink-800", className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className={cn("h-full rounded-full bg-gold-500", barClassName)}
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
