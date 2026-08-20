/** Tooltip accesible basado en CSS: no bloquea la interaccion. */
export default function Tooltip({ label, children, side = "top" }) {
  if (!label) return children;

  const position =
    side === "bottom"
      ? "top-full mt-2"
      : side === "right"
        ? "left-full top-1/2 ml-2 -translate-y-1/2"
        : "bottom-full mb-2";

  return (
    <span className="group/tooltip relative inline-flex">
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 max-w-[min(16rem,calc(100vw-2rem))] whitespace-normal break-words rounded-md bg-ink px-2 py-1 text-xs font-medium text-surface opacity-0 transition-opacity duration-150 group-hover/tooltip:opacity-100 ${position} ${side === "right" ? "left-full translate-x-0" : ""}`}
      >
        {label}
      </span>
    </span>
  );
}
