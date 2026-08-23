"use client";

import { motion } from "framer-motion";
import { Minus, TrendingDown, TrendingUp, Trophy } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { CURRENT_USER, LEADERBOARD } from "@/lib/mock-data";
import { cn, formatNumber } from "@/lib/utils";

const PODIUM_ORDER = [2, 1, 3];
const PODIUM_HEIGHT: Record<number, string> = { 1: "h-28", 2: "h-20", 3: "h-16" };
const PODIUM_ACCENT: Record<number, string> = {
  1: "border-t-gold-500",
  2: "border-t-[#C7C9D6]",
  3: "border-t-[#D7935A]",
};

export default function LeaderboardPage() {
  const top3 = LEADERBOARD.slice(0, 3);
  const rest = LEADERBOARD.slice(3);

  return (
    <>
      <Topbar title="Reyting" description="42-maktab, 9-sinf haftalik chempionlari" />

      <div className="mx-auto max-w-2xl px-5 pb-28 pt-8 lg:px-8 lg:pb-10">
        <div className="flex items-end justify-center gap-3 sm:gap-5">
          {PODIUM_ORDER.map((rank, i) => {
            const entry = top3.find((e) => e.rank === rank);
            if (!entry) return null;
            return (
              <motion.div
                key={entry.userId}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                <Avatar seed={entry.avatarSeed} name={entry.name} size={rank === 1 ? "xl" : "lg"} ring={rank === 1} />
                <p className="mt-2 max-w-[6.5rem] truncate text-sm font-medium text-text-primary">
                  {entry.name.split(" ")[0]}
                </p>
                <p className="text-xs text-gold-400">{formatNumber(entry.xp)} XP</p>
                <div
                  className={cn(
                    "mt-3 flex w-16 sm:w-20 flex-col items-center justify-start rounded-t-2xl border border-b-0 border-line bg-gradient-to-b from-ink-800 to-ink-900 pt-2",
                    "border-t-2",
                    PODIUM_HEIGHT[rank],
                    PODIUM_ACCENT[rank]
                  )}
                >
                  <span className="font-display text-xl font-bold text-text-secondary">{rank}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-2">
          {rest.map((entry, i) => {
            const isMe = entry.userId === CURRENT_USER.id;
            return (
              <motion.div
                key={entry.userId}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card
                  className={cn(
                    "flex items-center gap-3 p-3.5",
                    isMe && "border-gold-500/40 bg-gold-500/5"
                  )}
                >
                  <span className="w-6 text-center font-display text-sm font-medium text-text-muted">
                    {entry.rank}
                  </span>
                  <Avatar seed={entry.avatarSeed} name={entry.name} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-text-primary">
                      {entry.name} {isMe && <span className="text-gold-400">(sen)</span>}
                    </p>
                    <p className="text-xs text-text-secondary">{entry.grade}</p>
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-text-primary">
                    {formatNumber(entry.xp)}
                  </span>
                  <TrendIcon trend={entry.trend} />
                </Card>
              </motion.div>
            );
          })}
        </div>

        <Card className="mt-6 flex items-center gap-3 border-gold-500/20 bg-gold-500/5 p-4">
          <Trophy className="h-5 w-5 shrink-0 text-gold-400" />
          <p className="text-sm text-text-secondary">
            Haftaning chempioniga aylanish uchun yana{" "}
            <span className="font-medium text-text-primary">
              {formatNumber(LEADERBOARD[0].xp - CURRENT_USER.xp)} XP
            </span>{" "}
            kerak
          </p>
        </Card>
      </div>
    </>
  );
}

function TrendIcon({ trend }: { trend: "up" | "down" | "same" }) {
  if (trend === "up") return <TrendingUp className="h-4 w-4 shrink-0 text-success-500" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 shrink-0 text-danger-500" />;
  return <Minus className="h-4 w-4 shrink-0 text-text-muted" />;
}
