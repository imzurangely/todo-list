import { Search } from "lucide-react";
import Select from "@/components/ui/Select.jsx";
import { SORT_OPTIONS, STATUS_FILTERS } from "../utils/todoUtils.js";
import { cn } from "@/utils/cn.js";

export default function TodoFilters({ filters, onChange, resultCount }) {
  return (
    <section className="space-y-3" aria-label="Filtros de tareas">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px]">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            value={filters.search}
            onChange={(event) => onChange({ search: event.target.value })}
            placeholder="Buscar por título..."
            aria-label="Buscar tareas por título"
            className="h-10 w-full rounded-xl border border-line bg-card pl-9 pr-3 text-sm text-ink placeholder:text-ink-muted focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-400/15"
          />
        </div>

        <Select
          aria-label="Ordenar tareas"
          value={filters.sort}
          onChange={(event) => onChange({ sort: event.target.value })}
          options={SORT_OPTIONS}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {STATUS_FILTERS.map((option) => {
          const active = filters.status === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange({ status: option.value })}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200",
                active
                  ? "border-brand-400 bg-brand-400 text-white shadow-brand"
                  : "border-line bg-card text-ink-soft hover:border-brand-300 hover:text-brand-600 dark:hover:text-brand-300",
              )}
            >
              {option.label}
            </button>
          );
        })}
        {typeof resultCount === "number" && (
          <span className="ml-auto text-xs text-ink-muted">
            {resultCount} {resultCount === 1 ? "resultado" : "resultados"}
          </span>
        )}
      </div>
    </section>
  );
}
