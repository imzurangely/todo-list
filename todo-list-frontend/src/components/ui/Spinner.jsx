import { cn } from "@/utils/cn.js";

export default function Spinner({ className }) {
  return (
    <span
      role="status"
      aria-label="Cargando"
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-current border-t-transparent",
        className || "h-5 w-5",
      )}
    />
  );
}
