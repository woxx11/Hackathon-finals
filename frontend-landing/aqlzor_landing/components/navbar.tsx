"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Imkoniyatlar", href: "#features" },
  { label: "Qanday ishlaydi", href: "#how-it-works" },
  { label: "Duel ⚔️", href: "#duel" },
  { label: "Reyting 🏆", href: "#leaderboard" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4"
    >
      <div className="mx-auto max-w-7xl">
        <nav className="glass-nav flex items-center justify-between rounded-2xl px-6 py-3.5 transition-all shadow-sm border border-white/60">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background shadow-md transition-transform group-hover:scale-105">
              <svg width="20" height="22" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 6C0 2.68629 2.68629 0 6 0H26C29.3137 0 32 2.68629 32 6V17.5878C32 18.0641 31.8845 18.5323 31.6635 18.9515L24.864 31.8707C21.4395 38.3725 10.5605 38.3725 7.13601 31.8707L0.336496 18.9515C0.115456 18.5323 0 18.0641 0 17.5878V6Z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M16 11C16 13.7614 13.7614 16 11 16C13.7614 16 16 18.2386 16 21C16 18.2386 18.2386 16 21 16C18.2386 16 16 13.7614 16 11Z" fill="var(--background, #fff)"/>
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tight text-foreground">
              Aqurin
            </span>
          </a>

          {/* Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-bold text-muted transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action button */}
          <div className="flex items-center gap-3">
            <a
              href="https://app-aqlzor.vercel.app"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-hover px-5 py-2.5 text-sm font-extrabold text-white shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              Boshlash
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
