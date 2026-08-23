"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { SubjectMeta } from "@/lib/types";
import { SUBJECT_ICONS } from "./subject-icon";

export function SubjectCard({ subject, index }: { subject: SubjectMeta; index: number }) {
  const Icon = SUBJECT_ICONS[subject.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/chat?subject=${subject.id}`}
        className="group relative flex h-32 flex-col justify-between overflow-hidden rounded-3xl border border-line bg-ink-900/70 p-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-line-strong"
        style={{ "--glow": subject.glow } as React.CSSProperties}
      >
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: subject.glow }}
        />
        <div className="flex items-start justify-between">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: `${subject.color}1f`, color: subject.color }}
          >
            {Icon && <Icon className="h-5 w-5" strokeWidth={2} />}
          </div>
          <ArrowUpRight className="h-4 w-4 text-text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <span className="relative z-10 font-display text-base font-medium text-text-primary">
          {subject.label}
        </span>
      </Link>
    </motion.div>
  );
}
