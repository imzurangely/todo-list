import { cn } from "@/utils/cn.js";

const VARIANTS = {
  neutral: "bg-surface-muted text-ink-soft",
  brand: "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-200",
  alta: "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300",
  media: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  baja: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
};

export default function Badge({ variant = "neutral", icon: Icon, className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        VARIANTS[variant] || VARIANTS.neutral,
        className,
      )}
    >
      {Icon && <Icon className="h-3 w-3" aria-hidden="true" />}
      {children}
    </span>
  );
}
