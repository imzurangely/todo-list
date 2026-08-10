import { cn } from "@/utils/cn.js";

export default function Card({ as: Component = "div", interactive = false, className, children, ...props }) {
  return (
    <Component
      className={cn(
        "rounded-2xl border border-line bg-card shadow-soft transition-all duration-200",
        interactive && "hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-brand",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
