import { cn } from "@/lib/utils";

const GRADIENTS = [
  "from-[#5b8def] to-[#7c87ff]",
  "from-[#9b7bff] to-[#e5757a]",
  "from-[#58c48a] to-[#4fbfa8]",
  "from-[#f2a65a] to-[#ff8547]",
  "from-[#e5757a] to-[#f2a65a]",
  "from-[#c9a94e] to-[#e7e1c9]",
];

function hashSeed(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const second = parts[1]?.[0] ?? "";
  return (first + second).toUpperCase();
}

interface AvatarProps {
  seed: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  ring?: boolean;
}

const SIZE_MAP = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-20 w-20 text-2xl",
};

export function Avatar({ seed, name, size = "md", className, ring }: AvatarProps) {
  const gradient = GRADIENTS[hashSeed(seed) % GRADIENTS.length];
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-display font-semibold text-ink-950",
        gradient,
        SIZE_MAP[size],
        ring && "ring-2 ring-gold-400/60 ring-offset-2 ring-offset-ink-950",
        className
      )}
    >
      {initialsFrom(name ?? seed)}
    </div>
  );
}
