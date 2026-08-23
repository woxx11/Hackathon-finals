"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calculator, Atom, BookText, Globe, FlaskConical, Music } from "lucide-react";

const subjects = [
  { name: "Matematika", icon: Calculator, bg: "bg-sky-light", color: "text-sky-blue", border: "border-sky-blue/20", count: "540+ savol" },
  { name: "Fizika", icon: Atom, bg: "bg-secondary-light", color: "text-secondary", border: "border-secondary/20", count: "380+ savol" },
  { name: "Ona tili", icon: BookText, bg: "bg-primary-light", color: "text-primary", border: "border-primary/20", count: "420+ savol" },
  { name: "Ingliz tili", icon: Globe, bg: "bg-accent-light", color: "text-accent", border: "border-accent/20", count: "310+ savol" },
  { name: "Kimyo", icon: FlaskConical, bg: "bg-sky-light", color: "text-sky-blue", border: "border-sky-blue/20", count: "290+ savol" },
  { name: "Musiqa", icon: Music, bg: "bg-secondary-light", color: "text-secondary", border: "border-secondary/20", count: "180+ savol" },
];

export function SubjectCards() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-primary-light px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-primary">
            📚 MAKTAB DASTURI
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Barcha fanlar{" "}
            <span className="text-gradient-sunset">bitta joyda</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted font-medium">
            Har bir fanga moslashtirilgan AI repetitor va tayyor duel savollar bazasi
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {subjects.map((subject, i) => {
            const Icon = subject.icon;
            return (
              <motion.div
                key={subject.name}
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`cloud-card group flex flex-col items-center gap-3.5 rounded-3xl p-6 text-center transition-all hover:scale-105 border ${subject.border}`}
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${subject.bg} transition-transform group-hover:scale-110 shadow-sm`}>
                  <Icon className={`h-7 w-7 ${subject.color}`} />
                </div>
                <span className="text-base font-extrabold text-foreground">{subject.name}</span>
                <span className="rounded-md bg-surface-hover px-2.5 py-1 text-xs font-bold text-muted">
                  {subject.count}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
