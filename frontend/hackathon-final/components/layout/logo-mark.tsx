import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("h-8 w-8", className)}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="15.5" stroke="var(--color-gold-500)" strokeOpacity="0.4" />
      <path
        d="M16 6 L19.2 13.2 L26.5 16 L19.2 18.8 L16 26 L12.8 18.8 L5.5 16 L12.8 13.2 Z"
        fill="var(--color-gold-500)"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="font-display text-lg font-semibold tracking-tight text-text-primary">
        AqlZo&apos;r
      </span>
    </div>
  );
}
