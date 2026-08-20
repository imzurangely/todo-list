import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import IconButton from "./IconButton.jsx";

export default function Modal({ open, onClose, title, description, children, footer, size = "md" }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const widths = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto p-2 sm:items-center sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={`relative z-10 flex max-h-[calc(100dvh-1rem)] w-full min-w-0 flex-col overflow-hidden ${widths[size]} rounded-2xl border border-line bg-card p-4 shadow-soft sm:max-h-[calc(100dvh-2rem)] sm:p-6`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold text-ink">{title}</h2>
                {description && <p className="mt-1 text-sm text-ink-muted">{description}</p>}
              </div>
              <IconButton icon={X} label="Cerrar" onClick={onClose} />
            </div>

            <div className="mt-4 min-h-0 overflow-y-auto overscroll-contain pr-1 scrollbar-thin sm:mt-5">{children}</div>

            {footer && <div className="mt-4 flex shrink-0 flex-col-reverse gap-2 border-t border-line pt-4 sm:mt-6 sm:flex-row sm:justify-end sm:border-t-0 sm:pt-0">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
