"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/layout/logo-mark";
import { Avatar } from "@/components/ui/avatar";
import type { ChatMessage } from "@/lib/types";
import { CURRENT_USER } from "@/lib/mock-data";

export function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex items-end gap-3", isUser && "flex-row-reverse")}
    >
      {isUser ? (
        <Avatar seed={CURRENT_USER.avatarSeed} name={CURRENT_USER.name} size="sm" />
      ) : (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-850 ring-1 ring-line-strong">
          <LogoMark className="h-4 w-4" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-3xl px-4 py-3 text-sm leading-relaxed sm:max-w-[65%]",
          isUser
            ? "rounded-br-lg bg-gold-500 text-ink-950"
            : "rounded-bl-lg border border-line bg-ink-900 text-text-primary"
        )}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

export function TypingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-end gap-3"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-850 ring-1 ring-line-strong">
        <LogoMark className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-1 rounded-3xl rounded-bl-lg border border-line bg-ink-900 px-4 py-3.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-text-muted"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}
      </div>
    </motion.div>
  );
}
