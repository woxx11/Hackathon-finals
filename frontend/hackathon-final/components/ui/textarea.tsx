import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full resize-none rounded-2xl border border-line bg-ink-900 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-colors duration-200 focus-visible:border-gold-400/60 focus-visible:outline-none",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
