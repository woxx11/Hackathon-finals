"use client";

import { Zap } from "lucide-react";

const footerLinks = [
  {
    title: "Platforma",
    links: [
      { label: "AI Repetitor", href: "#features" },
      { label: "Duel rejimi", href: "#duel" },
      { label: "Reyting", href: "#" },
      { label: "Test generatori", href: "#" },
    ],
  },
  {
    title: "Kompaniya",
    links: [
      { label: "Biz haqimizda", href: "#" },
      { label: "Jamoa", href: "#team" },
      { label: "Blog", href: "#" },
      { label: "Aloqa", href: "#" },
    ],
  },
  {
    title: "Qo'llab-quvvatlash",
    links: [
      { label: "FAQ", href: "#" },
      { label: "Foydalanish shartlari", href: "#" },
      { label: "Maxfiylik", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <a href="#" className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-foreground text-background shadow-sm">
                <svg width="18" height="20" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 6C0 2.68629 2.68629 0 6 0H26C29.3137 0 32 2.68629 32 6V17.5878C32 18.0641 31.8845 18.5323 31.6635 18.9515L24.864 31.8707C21.4395 38.3725 10.5605 38.3725 7.13601 31.8707L0.336496 18.9515C0.115456 18.5323 0 18.0641 0 17.5878V6Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M16 11C16 13.7614 13.7614 16 11 16C13.7614 16 16 18.2386 16 21C16 18.2386 18.2386 16 21 16C18.2386 16 16 13.7614 16 11Z" fill="var(--background, #fff)"/>
                </svg>
              </div>
              <span className="text-lg font-black tracking-tight text-foreground">
                Aqurin
              </span>
            </a>
            <p className="mt-4 text-sm text-muted leading-relaxed max-w-xs">
              Maktab o&apos;quvchilari uchun AI-yordamchi va bilim bellashuv platformasi.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Aqurin. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-muted hover:text-foreground transition-colors">
              Telegram
            </a>
            <a href="#" className="text-xs text-muted hover:text-foreground transition-colors">
              Instagram
            </a>
            <a href="#" className="text-xs text-muted hover:text-foreground transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
