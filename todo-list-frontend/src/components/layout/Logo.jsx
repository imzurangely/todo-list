import { CheckCheck } from "lucide-react";

export default function Logo({ compact = false }) {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-400 text-white shadow-brand">
        <CheckCheck className="h-5 w-5" aria-hidden="true" />
      </span>
      {!compact && (
        <span className="min-w-0">
          <span className="block truncate font-display text-base font-bold leading-tight text-ink">
            Tareas
          </span>
          <span className="block truncate text-xs text-ink-muted">Organiza tu día</span>
        </span>
      )}
    </span>
  );
}
