"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, SendHorizontal } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { ChatBubble, TypingBubble } from "@/components/features/chat-bubble";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CHAT_HISTORY, SUBJECTS } from "@/lib/mock-data";
import { getSocraticReply } from "@/lib/ai-mock";
import { api } from "@/lib/api";
import type { ChatMessage, Subject } from "@/lib/types";

function ChatPageInner() {
  const searchParams = useSearchParams();
  const initialSubject = searchParams.get("subject") as Subject | null;

  const [subject, setSubject] = useState<Subject | undefined>(initialSubject ?? undefined);
  const [messages, setMessages] = useState<ChatMessage[]>(CHAT_HISTORY);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      subject,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    let content: string;
    try {
      const response = await api.askAI(trimmed, subject);
      content = response.answer || response;
    } catch {
      content = getSocraticReply(subject);
    }

    const reply: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, reply]);
    setIsTyping(false);
  }

  return (
    <div className="flex h-screen flex-col">
      <Topbar title="AI Repetitor" description="Sokrat usulida — javobni birga topamiz" />

      <div className="border-b border-line px-5 py-3 lg:px-8">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {SUBJECTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSubject(s.id === subject ? undefined : s.id)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-200",
                subject === s.id
                  ? "border-transparent bg-gold-500 text-ink-950"
                  : "border-line text-text-secondary hover:border-line-strong hover:text-text-primary"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-5">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <ChatBubble key={m.id} message={m} />
            ))}
            {isTyping && <TypingBubble key="typing" />}
          </AnimatePresence>
        </div>
      </div>

      <div className="border-t border-line bg-ink-950 px-5 py-4 pb-[calc(env(safe-area-inset-bottom)+5.5rem)] lg:px-8 lg:pb-4">
        <div className="mx-auto flex max-w-3xl items-end gap-2">
          <Link
            href="/solve"
            className={cn(buttonVariants({ variant: "secondary", size: "icon" }), "shrink-0 rounded-2xl")}
            aria-label="Rasmga olib yechish"
          >
            <Camera className="h-[18px] w-[18px]" />
          </Link>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Savolingizni yozing..."
            rows={1}
            className="max-h-32 min-h-11 py-2.5"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={cn(buttonVariants({ variant: "primary", size: "icon" }), "shrink-0 rounded-2xl")}
            aria-label="Yuborish"
          >
            <SendHorizontal className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={null}>
      <ChatPageInner />
    </Suspense>
  );
}
