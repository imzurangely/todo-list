import { cn } from "@/utils/cn.js";
import Tooltip from "./Tooltip.jsx";

/** Boton de solo icono: exige label para lectores de pantalla. */
export default function IconButton({ icon: Icon, label, onClick, className, tone = "default", ...props }) {
  const tones = {
    default: "text-ink-muted hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/30",
    danger: "text-ink-muted hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40",
  };

  return (
    <Tooltip label={label}>
      <button
        type="button"
        aria-label={label}
        onClick={onClick}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-200",
          tones[tone],
          className,
        )}
        {...props}
      >
        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
      </button>
    </Tooltip>
  );
}
