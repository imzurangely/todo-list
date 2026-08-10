import { motion } from "framer-motion";
import Logo from "@/components/layout/Logo.jsx";
import ThemeToggle from "@/components/layout/ThemeToggle.jsx";

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Logo />
          <span className="w-auto">
            <ThemeToggle />
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-line bg-card p-6 shadow-soft sm:p-7"
        >
          <h1 className="text-2xl font-bold tracking-tight text-ink">{title}</h1>
          <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </motion.div>

        {footer && <p className="mt-5 text-center text-sm text-ink-muted">{footer}</p>}
      </div>
    </div>
  );
}
