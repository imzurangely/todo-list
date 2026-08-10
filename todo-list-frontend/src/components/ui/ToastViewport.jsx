import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";

const CONFIG = {
  success: { icon: CheckCircle2, accent: "text-emerald-500" },
  error: { icon: XCircle, accent: "text-rose-500" },
  info: { icon: Info, accent: "text-brand-500" },
};

export default function ToastViewport({ toasts, onDismiss }) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-60 flex flex-col items-center gap-2 sm:inset-x-auto sm:right-6 sm:items-end"
    >
      <AnimatePresence initial={false}>
        {toasts.map(({ id, message, variant }) => {
          const { icon: Icon, accent } = CONFIG[variant] || CONFIG.info;
          return (
            <motion.div
              key={id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border border-line bg-card p-3.5 shadow-soft"
            >
              <Icon className={`mt-0.5 h-4.5 w-4.5 shrink-0 ${accent}`} aria-hidden="true" />
              <p className="flex-1 text-sm text-ink">{message}</p>
              <button
                type="button"
                aria-label="Cerrar notificacion"
                onClick={() => onDismiss(id)}
                className="text-ink-muted transition-colors hover:text-ink"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
