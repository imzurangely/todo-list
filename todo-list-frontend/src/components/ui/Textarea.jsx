import { useId } from "react";
import { cn } from "@/utils/cn.js";

export default function Textarea({ label, error, className, id, rows = 4, ...props }) {
  const generatedId = useId();
  const fieldId = id || generatedId;

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={fieldId} className="block text-sm font-medium text-ink-soft">
          {label}
        </label>
      )}
      <textarea
        id={fieldId}
        rows={rows}
        aria-invalid={Boolean(error)}
        className={cn(
          "w-full resize-y rounded-xl border bg-card px-3 py-2 text-sm text-ink transition-colors duration-200",
          "placeholder:text-ink-muted focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-400/15",
          error ? "border-rose-400" : "border-line",
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs font-medium text-rose-600 dark:text-rose-400">{error}</p>}
    </div>
  );
}
