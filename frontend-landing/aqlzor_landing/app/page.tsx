"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { AiChatDemo } from "@/components/ai-chat-demo";
import { DuelShowcase } from "@/components/duel-showcase";
import { SubjectCards } from "@/components/subject-cards";
import { Leaderboard } from "@/components/leaderboard";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <AiChatDemo />
        <DuelShowcase />
        <SubjectCards />
        <Leaderboard />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
