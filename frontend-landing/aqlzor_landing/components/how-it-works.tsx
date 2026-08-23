"use client";

import { motion, useInView } from "framer-motion";
import { MessageSquare, Brain, CheckCircle, ArrowDown } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Savol ber",
    description:
      "Istalgan fandan savolingni yoz yoki rasmga olib yuborish. AI darhol tushunadi.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI fikrlashga undaydi",
    description:
      "AI javobni to'g'ridan-to'g'ri bermaydi — Sokrat usulida savol berib, seni fikrlashga undaydi.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "O'rgan va bellash",
    description:
      "Tushunganingdan so'ng — do'stlaringga duelga chiq! Kim ko'proq bilsa, g'olib.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/3 blur-[150px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            Qanday ishlaydi
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            3 oddiy qadam
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="mt-16 flex flex-col items-center gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="flex w-full flex-col items-center">
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group w-full max-w-xl rounded-2xl border border-border bg-surface/50 p-6 sm:p-8 backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-surface"
                >
                  <div className="flex items-start gap-5">
                    {/* Number + Icon */}
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs font-bold text-muted">{step.number}</span>
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${step.bg} transition-transform group-hover:scale-110`}
                      >
                        <Icon className={`h-6 w-6 ${step.color}`} />
                      </div>
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                      <p className="mt-1 text-sm text-muted leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Connector arrow */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.3 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                    className="my-2"
                  >
                    <ArrowDown className="h-5 w-5 text-muted" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
