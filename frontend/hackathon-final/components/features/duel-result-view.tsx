"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Zap, Share2, Home } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SUBJECTS } from "@/lib/mock-data";
import type { DuelParticipant, Subject } from "@/lib/types";

interface DuelResultViewProps {
  subject: Subject;
  host: DuelParticipant;
  opponent: DuelParticipant;
  xpAwarded: number;
  currentUserId: string;
}

function ConfettiPiece({ i }: { i: number }) {
  const left = (i * 37) % 100;
  const delay = (i % 10) * 0.08;
  const colors = ["var(--color-gold-500)", "var(--color-duel-500)", "var(--color-ember-500)", "var(--color-success-500)"];
  const color = colors[i % colors.length];
  return (
    <motion.span
      className="absolute top-0 h-2 w-2 rounded-sm"
      style={{ left: `${left}%`, background: color }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{ y: 420, opacity: 0, rotate: 360 }}
      transition={{ duration: 1.8 + (i % 5) * 0.15, delay, ease: "easeIn" }}
    />
  );
}

export function DuelResultView({ subject, host, opponent, xpAwarded, currentUserId }: DuelResultViewProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const won = host.userId === currentUserId ? host.score >= opponent.score : opponent.score >= host.score;
  const you = host.userId === currentUserId ? host : opponent;
  const rival = host.userId === currentUserId ? opponent : host;
  const subjectMeta = SUBJECTS.find((s) => s.id === subject);

  useEffect(() => {
    if (won) {
      const t = window.setTimeout(() => setShowConfetti(true), 200);
      return () => window.clearTimeout(t);
    }
  }, [won]);

  return (
    <div className="relative mx-auto flex max-w-md flex-col items-center px-5 pb-28 pt-10 text-center lg:pb-10">
      {showConfetti && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <ConfettiPiece key={i} i={i} />
          ))}
        </div>
      )}

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-full",
          won ? "bg-gold-500/15 text-gold-400" : "bg-ink-800 text-text-secondary"
        )}
      >
        <Trophy className="h-8 w-8" strokeWidth={2} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mt-4 font-display text-2xl font-semibold tracking-tight text-text-primary"
      >
        {won ? "G'alaba qozonding!" : "Bu safar omad boshqa tomonda"}
      </motion.h2>
      <p className="mt-1 text-sm text-text-secondary">{subjectMeta?.label} bo&apos;yicha duel yakunlandi</p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="mt-8 w-full"
      >
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <ParticipantColumn participant={you} label="Sen" highlight={won} />
            <span className="font-display text-xs font-medium uppercase tracking-widest text-text-muted">vs</span>
            <ParticipantColumn participant={rival} label={rival.name} highlight={!won} />
          </div>

          <div className="mt-6 flex h-2.5 w-full overflow-hidden rounded-full bg-ink-800">
            <motion.div
              className="bg-gold-500"
              initial={{ width: 0 }}
              animate={{ width: `${(you.score / Math.max(1, you.score + rival.score)) * 100}%` }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="bg-duel-500"
              initial={{ width: 0 }}
              animate={{ width: `${(rival.score / Math.max(1, you.score + rival.score)) * 100}%` }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="mt-4 flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-sm font-medium text-gold-400"
      >
        <Zap className="h-4 w-4" />+{xpAwarded} XP qo&apos;lga kiritdingiz
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        className="mt-8 flex w-full gap-3"
      >
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: "AqlZo'r duel natijasi",
                text: `${you.name} ${you.score} — ${rival.score} natija bilan duelni ${won ? "yutdi" : "yakunladi"}!`,
              }).catch(() => {});
            }
          }}
          className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "flex-1")}
        >
          <Share2 className="h-4 w-4" />
          Ulashish
        </button>
        <Link href="/dashboard" className={cn(buttonVariants({ variant: "primary", size: "lg" }), "flex-1")}>
          <Home className="h-4 w-4" />
          Bosh sahifa
        </Link>
      </motion.div>
    </div>
  );
}

function ParticipantColumn({
  participant,
  label,
  highlight,
}: {
  participant: DuelParticipant;
  label: string;
  highlight: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Avatar seed={participant.avatarSeed} name={participant.name} size="lg" ring={highlight} />
      <p className="text-xs font-medium text-text-secondary">{label}</p>
      <p className={cn("font-display text-2xl font-semibold", highlight ? "text-gold-400" : "text-text-primary")}>
        {participant.score}
      </p>
      <p className="text-[11px] text-text-muted">{participant.correctCount}/5 to&apos;g&apos;ri</p>
    </div>
  );
}
