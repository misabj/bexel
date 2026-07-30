import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-800 text-white hover:bg-brand-900 focus-visible:ring-brand-300",
  accent:
    "bg-accent-500 text-white hover:bg-accent-600 focus-visible:ring-accent-300",
  outline:
    "border border-slate-300 bg-white text-brand-800 hover:bg-slate-50 focus-visible:ring-brand-200",
  ghost: "text-brand-800 hover:bg-slate-100 focus-visible:ring-brand-200",
  danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-300",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
