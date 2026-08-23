"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Swords, Trophy, ChevronRight } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { SUBJECT_ICONS } from "@/components/features/subject-icon";
import { SUBJECTS, DUEL_RESULT } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Subject } from "@/lib/types";

export default function DuelHubPage() {
  const router = useRouter();
  const [subject, setSubject] = useState<Subject | null>(null);

  function createDuel() {
    if (!subject) return;
    const id = Math.random().toString(36).slice(2, 8);
    router.push(`/duel/${id}?subject=${subject}&stage=lobby`);
  }

  return (
    <>
      <Topbar title="Duel" description="Do'stingga qarshi bilim jangiga chiq" />

      <div className="mx-auto max-w-2xl px-5 pb-28 pt-8 lg:px-8 lg:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-duel-500/10 via-ink-900 to-ink-950 p-6">
            <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-duel-500/15 blur-3xl" />
            <div className="relative flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-duel-500/15 text-duel-400">
                <Swords className="h-5 w-5" strokeWidth={2} />
              </div>
              <div>
                <p className="font-display text-lg font-medium text-text-primary">Yangi duel yarat</p>
                <p className="text-sm text-text-secondary">Fanni tanla, link ulash, do'sting qo'shilishini kut</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="mt-6">
          <p className="mb-3 text-sm font-medium text-text-secondary">Fanni tanla</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {SUBJECTS.map((s, i) => {
              const Icon = SUBJECT_ICONS[s.icon];
              const active = subject === s.id;
              return (
                <motion.button
                  key={s.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSubject(s.id)}
                  className={cn(
                    "flex flex-col items-start gap-2.5 rounded-2xl border p-4 text-left transition-all duration-200",
                    active ? "border-transparent bg-ink-800 ring-2 ring-gold-400" : "border-line bg-ink-900/50 hover:border-line-strong"
                  )}
                >
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ background: `${s.color}1f`, color: s.color }}
                  >
                    {Icon && <Icon className="h-4.5 w-4.5" strokeWidth={2} />}
                  </div>
                  <span className="font-display text-sm font-medium text-text-primary">{s.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <Button
          variant="duel"
          size="lg"
          onClick={createDuel}
          disabled={!subject}
          className="mt-6 w-full"
        >
          <Swords className="h-4 w-4" />
          Duel yaratish
        </Button>

        <div className="mt-10">
          <p className="mb-3 text-sm font-medium text-text-secondary">So&apos;nggi natija</p>
          <button
            onClick={() => router.push(`/duel/${DUEL_RESULT.duelId}/result`)}
            className="w-full"
          >
            <Card className="flex items-center justify-between p-4 transition-colors duration-200 hover:border-line-strong">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/15 text-gold-400">
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-text-primary">
                    {DUEL_RESULT.host.name} vs {DUEL_RESULT.opponent.name}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {DUEL_RESULT.host.score} — {DUEL_RESULT.opponent.score} &middot; g&apos;alaba qozonding
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-text-muted" />
            </Card>
          </button>
        </div>
      </div>
    </>
  );
}
