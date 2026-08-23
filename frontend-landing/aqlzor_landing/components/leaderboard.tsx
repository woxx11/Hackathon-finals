"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Flame, Target, Star, Trophy } from "lucide-react";

const leaderboardData = [
  { rank: 1, name: "Sardor Abduvaliyev", school: "56-maktab, 9-A", xp: 3420, streak: 16, badge: "🥇" },
  { rank: 2, name: "Madina Rahimova", school: "21-maktab, 8-B", xp: 3150, streak: 12, badge: "🥈" },
  { rank: 3, name: "Bekzod Toshpulatov", school: "56-maktab, 9-A", xp: 2890, streak: 10, badge: "🥉" },
  { rank: 4, name: "Nilufar Qodirova", school: "103-maktab, 10-V", xp: 2540, streak: 8, badge: "⭐" },
  { rank: 5, name: "Javlon Mirzayev", school: "21-maktab, 9-A", xp: 2210, streak: 6, badge: "⭐" },
];

const achievements = [
  { icon: Target, label: "100 ta savol yechildi", color: "text-primary", bg: "bg-primary-light" },
  { icon: Flame, label: "7 kunlik uzluksiz streak", color: "text-secondary", bg: "bg-secondary-light" },
  { icon: Award, label: "Matematika Chenpioni", color: "text-accent", bg: "bg-accent-light" },
  { icon: Star, label: "5 ta Duel G'alabasi", color: "text-sky-blue", bg: "bg-sky-light" },
];

export function Leaderboard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="leaderboard" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Leaderboard */}
          <motion.div
            ref={ref}
            initial={{ y: 40, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-light px-4 py-1.5 text-xs font-extrabold text-accent">
              <Trophy className="h-4 w-4" />
              <span>HAFTALIK REYTING</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Maktabimiz{" "}
              <span className="text-gradient-sunset">chempionlari</span>
            </h2>

            <div className="mt-8 cloud-card rounded-3xl p-6 shadow-xl border border-white overflow-hidden">
              <div className="grid grid-cols-12 gap-2 border-b border-border pb-3 text-xs font-extrabold text-muted uppercase tracking-wider">
                <div className="col-span-1">#</div>
                <div className="col-span-6">O&apos;quvchi</div>
                <div className="col-span-3 text-right">XP</div>
                <div className="col-span-2 text-right">Streak</div>
              </div>

              {leaderboardData.map((row, i) => (
                <motion.div
                  key={row.rank}
                  initial={{ x: -20, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`grid grid-cols-12 gap-2 items-center py-3.5 ${
                    i < leaderboardData.length - 1 ? "border-b border-border/60" : ""
                  }`}
                >
                  <div className="col-span-1 text-xl">{row.badge}</div>
                  <div className="col-span-6">
                    <div className="text-sm font-extrabold text-foreground">{row.name}</div>
                    <div className="text-xs font-medium text-muted">{row.school}</div>
                  </div>
                  <div className="col-span-3 text-right">
                    <span className="text-sm font-extrabold text-primary">{row.xp.toLocaleString()} XP</span>
                  </div>
                  <div className="col-span-2 text-right flex items-center justify-end gap-1 text-secondary font-bold text-xs">
                    <Flame className="h-3.5 w-3.5 fill-secondary" />
                    {row.streak}d
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Badges */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary-light px-4 py-1.5 text-xs font-extrabold text-secondary">
              <Award className="h-4 w-4" />
              <span>O'YIN ELEMENTLARI</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Yutuq va{" "}
              <span className="text-gradient-sunset">nishonlar</span>
            </h2>
            <p className="mt-3 text-sm font-medium text-muted max-w-md">
              Muntazam bilim oling, duellarda g&apos;olib bo&apos;ling va profillaringiz uchun maxsus nishonlarni oching!
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {achievements.map((ach, i) => {
                const Icon = ach.icon;
                return (
                  <motion.div
                    key={ach.label}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="cloud-card flex flex-col items-center gap-3 rounded-3xl p-5 text-center transition-all hover:translate-y-[-2px] border border-white"
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${ach.bg}`}>
                      <Icon className={`h-6 w-6 ${ach.color}`} />
                    </div>
                    <span className="text-sm font-extrabold text-foreground">{ach.label}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* XP progress card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 cloud-card rounded-3xl p-6 border border-white"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-extrabold text-foreground">Sizning XP darajangiz</span>
                <span className="text-sm font-black text-primary">1,840 / 2,500 XP</span>
              </div>
              <div className="h-3.5 w-full rounded-full bg-surface-hover overflow-hidden p-0.5 border border-border">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "74%" } : {}}
                  transition={{ duration: 1.2, delay: 0.6 }}
                  className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary"
                />
              </div>
              <div className="mt-2 text-xs font-semibold text-muted">
                Keyingi daraja: <span className="text-secondary font-bold">Zakovat Ustasi 🎖</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
