"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles, Trophy, Zap, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { WordsPullUp } from "@/components/ui/prisma-hero";

const cream = "#E1E0CC";
const creamDim = "rgba(225, 224, 204, 0.85)";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showApkModal, setShowApkModal] = useState(false);

  useEffect(() => {
    const mobile = /Android|iPhone/i.test(navigator.userAgent);
    setIsMobile(mobile);
    if (mobile) {
      const timer = setTimeout(() => setShowApkModal(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section className="h-screen w-full p-2 sm:p-4 pt-20" ref={ref}>
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2.5rem] shadow-2xl">
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover scale-105 transition-transform duration-1000"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Texture & Dynamic Gradient Overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/90" />

        {/* Floating Glowing Interactive Orbit Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute -right-20 top-20 h-96 w-96 rounded-full border border-white/10 opacity-30"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute -left-20 bottom-32 h-[30rem] w-[30rem] rounded-full border border-white/10 opacity-20"
        />

        {/* Interactive Floating Badge (Top Right of Card) */}
        {/* Content Bottom Grid Layout */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-8 sm:px-10 md:px-14">
          <div className="grid grid-cols-12 items-end gap-6">
            
            {/* Left Title Column */}
            <div className="col-span-12 lg:col-span-8">
              
              {/* Unique Animated Glass Tagline */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="mb-4 inline-flex items-center gap-2.5 rounded-2xl bg-white/10 backdrop-blur-xl px-4 py-2 border border-white/20 shadow-xl"
              >
                <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-ping" />
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-xs sm:text-sm font-black tracking-wide text-white uppercase">
                  Maktab o&apos;quvchilari uchun AI platforma
                </span>
              </motion.div>

              {/* WordsPullUp Animated Main Title */}
              <h1
                className="font-black leading-[0.82] tracking-[-0.07em] text-[22vw] sm:text-[18vw] md:text-[16vw] lg:text-[14vw] xl:text-[13vw]"
                style={{ color: cream }}
              >
                <WordsPullUp text="Aqurin" showAsterisk />
              </h1>
            </div>

            {/* Right Interactive CTA Column */}
            <div className="col-span-12 flex flex-col gap-6 pb-2 lg:col-span-4 lg:pb-6">
              
              {/* Description Card */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-xs sm:text-sm md:text-base font-medium leading-relaxed"
                style={{ color: creamDim }}
              >
                Do&apos;stlaringiz bilan bilim duelida bellashing, AI Sokrat murabbiyidan o&apos;rganing va sinfingiz reytingida birinchi o&apos;ringa chiqing.
              </motion.p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <motion.a
                  href="https://hackathon-finals-41v6.vercel.app/"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full py-2 pl-7 pr-2 text-sm sm:text-base font-black text-white transition-all shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98]"
                  style={{ backgroundColor: "#FF6B4A" }}
                >
                  <span className="relative z-10">Boshlash</span>
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 transition-transform group-hover:scale-110">
                    <ArrowRight className="h-5 w-5 text-white" />
                  </span>
                </motion.a>

                {isMobile && (
                  <button
                    onClick={() => setShowApkModal(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/50 backdrop-blur-md px-6 py-3 text-sm font-bold text-white transition-all hover:bg-black/70"
                  >
                    <Download className="h-4 w-4" />
                    APK Yuklash
                  </button>
                )}
              </div>

              {/* Quick Interactive Mini Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex items-center gap-6 pt-2 border-t border-white/10"
              >
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold text-white">Sokrat AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-accent" />
                  <span className="text-xs font-bold text-white">Duel Rejim</span>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* APK Download Modal */}
      {showApkModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
          onClick={() => setShowApkModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl border border-white/80"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light">
              <Download className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">📱 Mobile ilovani yuklang</h3>
            <p className="mt-2 text-sm text-muted">
              AqlZo&apos;r Android ilovasini yuklab oling va istalgan joyda bilim oling!
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="https://hackathon-finals-0rjs.onrender.com/downloads/aqlzor.apk"
                download
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-hover px-6 py-3.5 font-bold text-white shadow-lg shadow-primary/20"
              >
                <Download className="h-5 w-5" />
                APK Yuklab olish (3.2 MB)
              </a>
              <button
                onClick={() => setShowApkModal(false)}
                className="text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                Yopish
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
