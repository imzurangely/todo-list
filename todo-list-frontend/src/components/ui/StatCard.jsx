import { motion } from "framer-motion";
import Card from "./Card.jsx";

const TONES = {
  brand: "bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300",
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300",
  rose: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300",
};

export default function StatCard({ icon: Icon, label, value, tone = "brand", index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
    >
      <Card interactive className="p-5">
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${TONES[tone]}`}>
          <Icon className="h-4.5 w-4.5" aria-hidden="true" />
        </span>
        <p className="mt-3 font-display text-2xl font-bold leading-none text-ink">{value}</p>
        <p className="mt-1.5 text-sm text-ink-muted">{label}</p>
      </Card>
    </motion.div>
  );
}
