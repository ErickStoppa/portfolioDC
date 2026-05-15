import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        default: "bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border)]",
        primary: "bg-[var(--primary-light)] text-[var(--primary-bright)] border border-[var(--border-brand)]",
        accent: "bg-[var(--primary-light)] text-[var(--primary-bright)] border border-[var(--border-brand)]",
        success: "bg-[var(--success-light)] text-emerald-400 border border-[rgba(34,197,94,0.2)]",
        warning: "bg-[var(--warning-light)] text-amber-400 border border-[rgba(245,158,11,0.2)]",
        error: "bg-[var(--error-light)] text-red-400 border border-[rgba(239,68,68,0.2)]",
        muted: "bg-[var(--bg-card)] text-[var(--text-subtle)] border border-[var(--border-subtle)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
