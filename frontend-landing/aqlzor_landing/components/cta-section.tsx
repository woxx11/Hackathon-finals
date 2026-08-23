"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { useRef } from "react";

export function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-surface to-accent/5 p-10 sm:p-16 text-center"
        >
          {/* Background glows */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary/10 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-accent/10 blur-[100px]" />

          {/* Floating particles */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="pointer-events-none absolute rounded-full bg-primary/15"
              style={{
                width: 6 + i * 2,
                height: 6 + i * 2,
                left: `${20 + i * 20}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{ y: [0, -15, 5, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          <div className="relative z-10">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Zap className="h-7 w-7 text-primary" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Hoziroq{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                boshlang
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-base text-muted leading-relaxed">
              AqlZo&apos;r bilan o&apos;rganishni yangi darajaga olib chiqing. Bepul ro&apos;yxatdan o&apos;ting va darhol
              AI repetitor bilan o&apos;rganishni boshlang!
            </p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="https://hackathon-finals-41v6.vercel.app/"
                className="group inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-base font-bold text-background transition-all hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02] hover:gap-3 active:scale-[0.98]"
              >
                Bepul boshlash
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

            <p className="mt-4 text-xs text-muted">
              Ro&apos;yxatdan o&apos;tish bepul • Kredit karta kerak emas
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
