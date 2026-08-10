import { useId } from "react";
import { cn } from "@/utils/cn.js";

export default function Select({ label, error, options = [], className, id, ...props }) {
  const generatedId = useId();
  const fieldId = id || generatedId;

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={fieldId} className="block text-sm font-medium text-ink-soft">
          {label}
        </label>
      )}
      <select
        id={fieldId}
        aria-invalid={Boolean(error)}
        className={cn(
          "h-10 w-full appearance-none rounded-xl border bg-card px-3 text-sm text-ink transition-colors duration-200",
          "focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-400/15",
          error ? "border-rose-400" : "border-line",
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs font-medium text-rose-600 dark:text-rose-400">{error}</p>}
    </div>
  );
}
