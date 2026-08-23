import Link from "next/link";
import { Flame, Zap } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Wordmark } from "./logo-mark";
import { CURRENT_USER } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

interface TopbarProps {
  title: string;
  description?: string;
}

export function Topbar({ title, description }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-ink-950/80 px-5 py-4 backdrop-blur-xl lg:px-8">
      <div>
        <div className="lg:hidden">
          <Wordmark />
        </div>
        <div className="hidden lg:block">
          <h1 className="font-display text-xl font-semibold tracking-tight text-text-primary">{title}</h1>
          {description && <p className="mt-0.5 text-sm text-text-secondary">{description}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 rounded-full border border-line bg-ink-900/60 px-3 py-1.5 text-sm font-medium text-ember-400">
          <Flame className="h-4 w-4" strokeWidth={2.25} />
          {CURRENT_USER.streakDays}
        </div>
        <div className="hidden items-center gap-1.5 rounded-full border border-line bg-ink-900/60 px-3 py-1.5 text-sm font-medium text-gold-400 sm:flex">
          <Zap className="h-4 w-4" strokeWidth={2.25} />
          {formatNumber(CURRENT_USER.xp)} XP
        </div>
        <Link href="/profile" aria-label="Profil">
          <Avatar seed={CURRENT_USER.avatarSeed} name={CURRENT_USER.name} size="md" ring />
        </Link>
      </div>
    </header>
  );
}
