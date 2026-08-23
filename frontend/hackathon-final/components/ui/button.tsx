import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:pointer-events-none disabled:opacity-40 active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary:
          "bg-gold-500 text-ink-950 shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset] hover:bg-gold-400 hover:shadow-[0_0_0_1px_rgba(216,198,135,0.4),0_8px_24px_-8px_rgba(201,169,78,0.55)]",
        secondary:
          "bg-ink-800 text-text-primary border border-line hover:bg-ink-700 hover:border-line-strong",
        outline:
          "border border-line-strong bg-transparent text-text-primary hover:bg-ink-850",
        ghost: "bg-transparent text-text-secondary hover:bg-ink-850 hover:text-text-primary",
        duel: "bg-duel-500 text-white hover:bg-duel-400 hover:shadow-[0_8px_24px_-8px_rgba(124,135,255,0.6)]",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
