"use client";

import { motion, useInView } from "framer-motion";
import {
  MessageSquareText,
  Camera,
  Swords,
  Trophy,
  Smile,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { useRef } from "react";

const features = [
  {
    icon: MessageSquareText,
    title: "AI Sokrat Repetitor",
    description:
      "Savolingizni bering — AI tayyor javob yubormaydi, savollar berib mantiqiy fikrlashingizni rivojlantiradi.",
    bg: "bg-primary-light",
    iconColor: "text-primary",
    tag: "Aql-idrok",
  },
  {
    icon: Camera,
    title: "Foto-masala yechish",
    description:
      "Daftardagi formulangizni rasmga oling. AI xatoyingiz aynan qaysi bosqichda ekanligini aniq ko'rsatib beradi.",
    bg: "bg-sky-light",
    iconColor: "text-sky-blue",
    tag: "Kamera AI",
  },
  {
    icon: Swords,
    title: "Bilim Dueli ⚔️",
    description:
      "Sinfdoshlar bilan onlayn bilim jangiga chiqing! 10 ta savolga kim eng tez javob bersa — haftalik g'olib.",
    bg: "bg-secondary-light",
    iconColor: "text-secondary",
    tag: "Viral rejimi",
  },
  {
    icon: Trophy,
    title: "Maktab Leaderboard",
    description:
      "Maktabingiz va sinfingiz doirasida birinchi o'ringa ko'tariling. XP ballar va maxsus nishonlar yuting.",
    bg: "bg-accent-light",
    iconColor: "text-accent",
    tag: "Reyting",
  },
  {
    icon: Smile,
    title: "Meme va Rap uslubida",
    description:
      "Fizika yoki Biologiyani tushunmayapsizmi? AI mavzuni anime yoki meme uslubida oson tushuntiradi!",
    bg: "bg-primary-light",
    iconColor: "text-primary",
    tag: "Qiziqarli",
  },
  {
    icon: BookOpen,
    title: "Avto-Test Generatori",
    description:
      "O'qituvchilar va o'quvchilar uchun soniyalar ichida sifatli test topshiriqlarini avtomatik tayyorlash.",
    bg: "bg-sky-light",
    iconColor: "text-sky-blue",
    tag: "O'qituvchilarga",
  },
];

export function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary-light px-4 py-1.5 text-xs font-extrabold text-secondary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>SUPER IMKONIYATLAR</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Aqurin — bu o&apos;quvchilar uchun{" "}
            <span className="text-gradient-sunset">yangi davr</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted font-medium">
            Zerikarli darsliklarni unuting — o&apos;rganish interaktiv, bellashuvli va zavqli bo&apos;lishi kerak!
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="cloud-card group relative rounded-3xl p-8 transition-all hover:translate-y-[-4px] hover:shadow-xl hover:border-primary/20"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bg} transition-transform group-hover:scale-110`}>
                    <Icon className={`h-7 w-7 ${feature.iconColor}`} />
                  </div>
                  <span className="rounded-full bg-surface-hover px-3 py-1 text-xs font-bold text-muted">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-muted">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
