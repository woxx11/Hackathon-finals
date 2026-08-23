"use client";

import { motion } from "framer-motion";
import { Flame, Lock, MessageCircleQuestion, Swords, Target } from "lucide-react";
import {
  Sigma,
  Trophy,
  Moon,
  type LucideIcon,
} from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { CURRENT_USER } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const XP_PER_LEVEL = 500;

const BADGE_ICONS: Record<string, LucideIcon> = {
  Sigma,
  Flame,
  Swords,
  MessageCircleQuestion,
  Moon,
  Trophy,
};

const STATS = [
  { label: "Duel g'alabalar", value: "14", icon: Swords },
  { label: "So'ralgan savollar", value: "87", icon: MessageCircleQuestion },
  { label: "To'g'ri javob", value: "82%", icon: Target },
];

export default function ProfilePage() {
  const xpIntoLevel = CURRENT_USER.xp % XP_PER_LEVEL;

  return (
    <>
      <Topbar title="Profil" />

      <div className="mx-auto max-w-2xl px-5 pb-28 pt-8 lg:px-8 lg:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="relative overflow-hidden p-6">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-500/10 blur-3xl" />
            <div className="relative flex flex-col items-center text-center">
              <Avatar seed={CURRENT_USER.avatarSeed} name={CURRENT_USER.name} size="xl" ring />
              <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-text-primary">
                {CURRENT_USER.name}
              </h2>
              <p className="text-sm text-text-secondary">
                {CURRENT_USER.grade} &middot; {CURRENT_USER.school}
              </p>

              <div className="mt-5 flex items-center gap-2 rounded-full border border-ember-500/30 bg-ember-500/10 px-4 py-1.5 text-sm font-medium text-ember-400">
                <Flame className="h-4 w-4" />
                {CURRENT_USER.streakDays} kunlik streak
              </div>

              <div className="mt-6 w-full">
                <div className="mb-2 flex items-center justify-between text-xs text-text-secondary">
                  <span>{CURRENT_USER.level}-daraja</span>
                  <span>
                    {xpIntoLevel} / {XP_PER_LEVEL} XP
                  </span>
                </div>
                <Progress value={(xpIntoLevel / XP_PER_LEVEL) * 100} />
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="flex flex-col items-center gap-1.5 p-4 text-center">
                <stat.icon className="h-4 w-4 text-gold-400" />
                <span className="font-display text-lg font-semibold text-text-primary">{stat.value}</span>
                <span className="text-[11px] leading-tight text-text-secondary">{stat.label}</span>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="font-display text-lg font-medium tracking-tight text-text-primary">
            Yutuq nishonlari
          </h3>
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {CURRENT_USER.badges.map((badge, i) => {
              const Icon = BADGE_ICONS[badge.icon] ?? Trophy;
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative"
                  title={badge.description}
                >
                  <Card
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 text-center transition-transform duration-300 hover:-translate-y-0.5",
                      !badge.unlocked && "opacity-45"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-2xl",
                        badge.unlocked ? "bg-gold-500/15 text-gold-400" : "bg-ink-800 text-text-muted"
                      )}
                    >
                      {badge.unlocked ? <Icon className="h-5 w-5" /> : <Lock className="h-4 w-4" />}
                    </div>
                    <span className="text-[11px] font-medium leading-tight text-text-secondary">
                      {badge.label}
                    </span>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
