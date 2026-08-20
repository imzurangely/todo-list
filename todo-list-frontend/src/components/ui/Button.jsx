import { cn } from "@/utils/cn.js";
import Spinner from "./Spinner.jsx";

const VARIANTS = {
  primary:
    "bg-brand-400 text-white shadow-brand hover:bg-brand-500 active:bg-brand-600 disabled:bg-brand-200",
  secondary:
    "bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-900/30 dark:text-brand-200 dark:hover:bg-brand-900/50",
  outline:
    "border border-line bg-card text-ink hover:border-brand-300 hover:text-brand-600 dark:hover:text-brand-300",
  ghost: "text-ink-soft hover:bg-surface-muted hover:text-ink",
  danger: "bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800",
};

const SIZES = {
  sm: "h-9 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-11 px-5 text-base gap-2",
};

export default function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}) {
  return (
    <Component
      className={cn(
        "inline-flex min-w-0 items-center justify-center rounded-xl font-semibold transition-all duration-200 touch-manipulation",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400",
        "disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.97]",
        VARIANTS[variant],
        SIZES[size],
        fullWidth && "w-full",
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner className="h-4 w-4" />}
      {children}
    </Component>
  );
}
