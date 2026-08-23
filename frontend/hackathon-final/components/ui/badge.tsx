import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-ink-800 text-text-secondary border border-line",
        gold: "bg-gold-500/15 text-gold-400 border border-gold-500/30",
        ember: "bg-ember-500/15 text-ember-400 border border-ember-500/30",
        duel: "bg-duel-500/15 text-duel-400 border border-duel-500/30",
        success: "bg-success-500/15 text-success-500 border border-success-500/30",
        danger: "bg-danger-500/15 text-danger-500 border border-danger-500/30",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
