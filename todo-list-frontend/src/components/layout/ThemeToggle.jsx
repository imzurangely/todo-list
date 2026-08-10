import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext.jsx";

export default function ThemeToggle({ withLabel = false }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
      className="flex w-full items-center gap-2 rounded-xl border border-line bg-card px-3 py-2 text-sm font-medium text-ink-soft transition-colors duration-200 hover:border-brand-300 hover:text-brand-600 dark:hover:text-brand-300"
    >
      <span className="relative grid h-5 w-5 shrink-0 place-items-center">
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            {isDark ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
          </motion.span>
        </AnimatePresence>
      </span>
      {withLabel && <span className="truncate">{isDark ? "Modo oscuro" : "Modo claro"}</span>}
    </button>
  );
}
