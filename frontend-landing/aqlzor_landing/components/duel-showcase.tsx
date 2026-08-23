"use client";

import { motion, useInView } from "framer-motion";
import { Swords, Timer, Share2, Trophy, Zap, ArrowRight } from "lucide-react";
import { useRef } from "react";

const duelFeatures = [
  { icon: Timer, text: "10 ta tezkor savol — vaqt belgilanadi" },
  { icon: Swords, text: "Real-vaqtda duel rejimi" },
  { icon: Share2, text: "Natijani Story qilib ulashish" },
  { icon: Trophy, text: "G'oliblarga maxsus XP mukofotlar" },
];

export function DuelShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="duel" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Text */}
          <motion.div
            ref={ref}
            initial={{ x: -40, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-extrabold text-primary">
              <Swords className="h-4 w-4" />
              <span>VIRAL DUEL REJIM</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
              Sinfdoshingni{" "}
              <span className="text-gradient-sunset">
                duelga chaqir
              </span>
            </h2>
            <p className="mt-4 text-base text-muted font-medium leading-relaxed max-w-lg">
              Endi bilim olish zerikarli dars emas — bu bellashuv! Do&apos;stingizga havola yuboring,
              10 ta savolga bir vaqtning o&apos;zida javob bering va kim Bilimdon ekanini isbotlang.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {duelFeatures.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="cloud-card flex items-center gap-3 rounded-2xl p-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs font-bold text-foreground">{item.text}</span>
                  </div>
                );
              })}
            </div>

            <a
              href="https://hackathon-finals-41v6.vercel.app/"
              className="mt-8 group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-secondary to-primary px-7 py-4 text-sm font-extrabold text-white shadow-lg shadow-secondary/25 transition-all hover:scale-[1.02]"
            >
              Duel boshlash
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* Right Card Mockup (Modern Light/Dark Combo) */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative flex justify-center"
          >
            <div className="cloud-card-dark relative w-full max-w-md rounded-3xl p-7 text-white shadow-2xl overflow-hidden">
              {/* Background Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-sky-blue" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Swords className="h-5 w-5 text-primary" />
                  <span className="text-sm font-extrabold text-white">Fizika Dueli</span>
                </div>
                <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary animate-pulse">
                  JANG KETMOQDA
                </span>
              </div>

              {/* VS Players */}
              <div className="mt-8 flex items-center justify-between">
                {/* Player 1 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 border border-primary/40 text-3xl shadow-inner">
                    🧑‍🎓
                  </div>
                  <span className="text-sm font-bold text-white">Jasur</span>
                  <div className="flex items-center gap-1 rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-extrabold text-primary">
                    <Zap className="h-3 w-3 fill-primary" /> 8/10
                  </div>
                </div>

                {/* VS Badge */}
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-black text-gradient-gold">VS</span>
                  <span className="mt-1 text-xs font-mono text-white/50">⏱ 00:15</span>
                </div>

                {/* Player 2 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/20 border border-secondary/40 text-3xl shadow-inner">
                    👩‍🎓
                  </div>
                  <span className="text-sm font-bold text-white">Laylo</span>
                  <div className="flex items-center gap-1 rounded-full bg-secondary/20 px-2.5 py-0.5 text-xs font-extrabold text-secondary">
                    <Zap className="h-3 w-3 fill-secondary" /> 6/10
                  </div>
                </div>
              </div>

              {/* Question Preview */}
              <div className="mt-8 rounded-2xl bg-white/5 p-4 border border-white/10">
                <div className="text-xs font-bold text-white/40 mb-1">9-Savol:</div>
                <p className="text-sm font-medium text-white/90">
                  Nyuotonning ikkinchi qonuni formulasini ko&apos;rsating:
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="rounded-xl bg-primary/30 p-2.5 border border-primary/50 text-white text-center">
                    F = m × a  ✅
                  </div>
                  <div className="rounded-xl bg-white/5 p-2.5 text-white/60 text-center">
                    E = m × c²
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
