import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/utils/cn.js";

/** Checkbox animado y accesible (rol checkbox + teclado nativo). */
export default function Checkbox({ checked, onChange, label, className }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors duration-200",
        checked
          ? "border-brand-400 bg-brand-400"
          : "border-line bg-card hover:border-brand-300",
        className,
      )}
    >
      <motion.span
        initial={false}
        animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        className="text-white"
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
      </motion.span>
    </button>
  );
}
