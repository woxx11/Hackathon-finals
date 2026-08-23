"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface ChatMessage {
  role: "ai" | "user";
  text: string;
}

const demoConversation: ChatMessage[] = [
  {
    role: "user",
    text: "Fotosintez jarayoni qanday sodir bo'ladi?",
  },
  {
    role: "ai",
    text: "Zo'r savol! Keling birga o'ylab ko'ramiz: O'simlik barglari nima uchun yashil rangda? Quyosh nuri ularga nima beradi? 🌱☀️",
  },
  {
    role: "user",
    text: "Xlorofill borligi uchun yashil va quyoshdan energiya oladi!",
  },
  {
    role: "ai",
    text: "Barakalla! 👏 Xlorofill quyosh energiyasini tutib oladi. Endi ayting-chi, o'simlik havodan va ildizidan nima so'radi?",
  },
  {
    role: "user",
    text: "Havodan karbonat angidrid, ildizdan suv!",
  },
  {
    role: "ai",
    text: "Ajoyib! 🎉 Quyosh nuri + CO₂ + H₂O = Glyukoza (oziq) va biz nafas oladigan Kislorod! Sokrat usulida o'zingiz yechim topdingiz!",
  },
];

export function AiChatDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current > demoConversation.length) {
        clearInterval(interval);
        return;
      }
      setVisibleMessages(current);
    }, 1100);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Chat Frame */}
          <motion.div
            ref={ref}
            initial={{ x: -40, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <div className="cloud-card rounded-3xl p-6 sm:p-7 shadow-xl border border-white">
              {/* Chat Header */}
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-accent text-white shadow-md">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold text-foreground">Aqurin AI Murabbiy</span>
                    <span className="rounded-md bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
                      Sokrat 2.0
                    </span>
                  </div>
                  <div className="text-xs text-muted font-medium">Onlayn muloqot rejimida</div>
                </div>
              </div>

              {/* Messages Container */}
              <div className="mt-4 flex flex-col gap-3 h-[380px] overflow-y-auto pr-1">
                {demoConversation.slice(0, visibleMessages).map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className={`flex items-start gap-2.5 ${
                      msg.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                        msg.role === "ai"
                          ? "bg-primary-light text-primary"
                          : "bg-secondary-light text-secondary"
                      }`}
                    >
                      {msg.role === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </div>
                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm font-medium leading-relaxed shadow-sm ${
                        msg.role === "ai"
                          ? "bg-white text-foreground rounded-tl-sm border border-border"
                          : "bg-gradient-to-r from-primary to-primary-hover text-white rounded-tr-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input Fake */}
              <div className="mt-4 pt-3 border-t border-border">
                <div className="flex items-center gap-2 rounded-2xl bg-surface-hover px-4 py-3 border border-border">
                  <input
                    type="text"
                    placeholder="Mavzu bo'yicha savolingizni yozing..."
                    className="flex-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted"
                    readOnly
                  />
                  <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-md">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Text */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-light px-4 py-1.5 text-xs font-extrabold text-sky-blue">
              <Sparkles className="h-4 w-4" />
              <span>SOKRAT USULI</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
              Tayyor javob emas —{" "}
              <span className="text-gradient-sunset">
                chuqur tushunish
              </span>
            </h2>
            <p className="mt-4 text-base text-muted font-medium leading-relaxed max-w-lg">
              Sun&apos;iy intellekt uy vazifasini shunchaki ko&apos;chirib berishi noto&apos;g&apos;ri.
              Aqurin AI sizga yo&apos;naltiruvchi savollar berib, bilimni o&apos;zingiz kashf etishingizga ko&apos;maklashadi.
            </p>

            <div className="mt-6 space-y-3.5">
              {[
                "Bosqichma-bosqich mantiqiy savollar",
                "Xatolarni do'stona ko'rsatish",
                "Meme va qiziqarli o'xshatishlar bilan tushuntirish",
                "Barcha maktab fanlari bo'yicha biladi",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm font-bold text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
