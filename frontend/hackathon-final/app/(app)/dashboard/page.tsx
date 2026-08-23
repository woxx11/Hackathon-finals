"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Camera, MessagesSquare, Swords, ChevronRight, Sparkles, Download } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LevelRing } from "@/components/features/level-ring";
import { SubjectCard } from "@/components/features/subject-card";
import { CURRENT_USER, SUBJECTS } from "@/lib/mock-data";

const APK_URL = "https://hackathon-finals-0rjs.onrender.com/downloads/aqlzor.apk";

const XP_PER_LEVEL = 500;

const QUICK_ACTIONS = [
  {
    href: "/chat",
    title: "AI Repetitor bilan suhbat",
    description: "Savol ber, bosqichma-bosqich birga yechamiz",
    icon: MessagesSquare,
    accent: "var(--color-gold-500)",
  },
  {
    href: "/solve",
    title: "Rasmga olib yechish",
    description: "Masalani suratga ol, xatoni topib beraman",
    icon: Camera,
    accent: "var(--color-duel-500)",
  },
  {
    href: "/duel",
    title: "Duelga chiqish",
    description: "Do'stingga qarshi bilim jangiga chaqir",
    icon: Swords,
    accent: "var(--color-ember-500)",
  },
];

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState(CURRENT_USER);

  useEffect(() => {
    const stored = localStorage.getItem("aqlzor_user");
    if (!stored) return;
    try {
      const profile = JSON.parse(stored) as { name?: string; xp?: number; level?: number; streak?: number; schoolId?: string; classId?: string };
      setCurrentUser((previous) => ({ ...previous, name: profile.name || previous.name, xp: profile.xp ?? previous.xp, level: profile.level ?? previous.level, streakDays: profile.streak ?? previous.streakDays, school: profile.schoolId && profile.classId ? `${profile.schoolId}, ${profile.classId}` : previous.school }));
    } catch { /* ignore invalid local session */ }
  }, []);

  const xpIntoLevel = currentUser.xp % XP_PER_LEVEL;
  const progress = (xpIntoLevel / XP_PER_LEVEL) * 100;
  const firstName = currentUser.name.split(" ")[0];

  return (
    <>
      <Topbar title="Bosh sahifa" description={`Xush kelibsan, ${firstName}!`} />

      <div className="mx-auto max-w-6xl px-5 pb-28 pt-8 lg:px-8 lg:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-ink-900 to-ink-950 p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                <LevelRing level={currentUser.level} progress={progress} />
                <div>
                  <p className="text-sm text-text-secondary">
                    {xpIntoLevel} / {XP_PER_LEVEL} XP &middot; keyingi darajagacha
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
                    {currentUser.streakDays} kunlik streak &#128293;
                  </h2>
                  <p className="mt-1 text-sm text-text-secondary">{currentUser.school}</p>
                </div>
              </div>
              <Link
                href="/duel"
                className={cn(buttonVariants({ variant: "duel", size: "lg" }), "w-full sm:w-auto")}
              >
                <Swords className="h-4 w-4" />
                Duelga chiqish
              </Link>
            </div>
          </Card>
        </motion.div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a href={APK_URL} className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-bold text-text-primary transition hover:border-gold-500 hover:text-gold-600"><Download className="h-4 w-4" /> Android ilovasini yuklash</a>
          <span className="text-xs text-text-muted">Barcha natijalar profilingiz bilan sinxronlanadi</span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {QUICK_ACTIONS.map((action, i) => (
            <motion.div
              key={action.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={action.href}>
                <Card className="group flex h-full flex-col justify-between p-5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-line-strong">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-2xl"
                      style={{ background: `${action.accent}1f`, color: action.accent }}
                    >
                      <action.icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <ChevronRight className="h-4 w-4 text-text-muted transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <div className="mt-4">
                    <p className="font-display text-base font-medium text-text-primary">{action.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">{action.description}</p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between">
          <h3 className="font-display text-lg font-medium tracking-tight text-text-primary">Fanlar</h3>
          <span className="flex items-center gap-1 text-xs font-medium text-text-muted">
            <Sparkles className="h-3.5 w-3.5" />
            fanni tanla, AI bilan boshla
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {SUBJECTS.map((subject, i) => (
            <SubjectCard key={subject.id} subject={subject} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}
