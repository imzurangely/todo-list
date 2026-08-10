import { useMemo } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, CalendarClock, CheckCircle2, ListTodo, Plus, Timer } from "lucide-react";
import Button from "@/components/ui/Button.jsx";
import Card from "@/components/ui/Card.jsx";
import ErrorState from "@/components/ui/ErrorState.jsx";
import PageHeader from "@/components/ui/PageHeader.jsx";
import StatCard from "@/components/ui/StatCard.jsx";
import { SkeletonCards, SkeletonList } from "@/components/ui/Skeleton.jsx";
import TodoList from "../components/TodoList.jsx";
import TodoModals from "../components/TodoModals.jsx";
import useTodos from "../hooks/useTodos.js";
import useTodoActions from "../hooks/useTodoActions.js";
import useFolders from "@/features/folders/hooks/useFolders.js";
import useAuth from "@/features/auth/hooks/useAuth.js";
import { filterAndSortTodos } from "../utils/todoUtils.js";

export default function DashboardPage() {
  const { todos, stats, loading, error, refresh } = useTodos();
  const { folders } = useFolders();
  const { user } = useAuth();
  const actions = useTodoActions();

  const pendingTodos = useMemo(
    () => filterAndSortTodos(todos, { status: "pending", sort: "recent" }).slice(0, 5),
    [todos],
  );

  const upcomingTodos = useMemo(
    () =>
      filterAndSortTodos(todos, { status: "pending", sort: "due_asc" })
        .filter((todo) => todo.due_date)
        .slice(0, 5),
    [todos],
  );

  const completionRate = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;

  const listProps = {
    onToggle: actions.toggle,
    onSelect: actions.openDetail,
    onEdit: actions.openEdit,
    onDelete: actions.askDelete,
  };

  if (error) return <ErrorState message={error} onRetry={refresh} />;

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Hola, ${user?.name?.split(" ")[0] || "que tal"}`}
        subtitle={
          stats.pending > 0
            ? `Tienes ${stats.pending} ${stats.pending === 1 ? "tarea pendiente" : "tareas pendientes"} en ${folders.length} ${folders.length === 1 ? "carpeta" : "carpetas"}.`
            : "No tienes tareas pendientes. Buen trabajo."
        }
        actions={
          <Button size="sm" onClick={actions.openCreate}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Nueva tarea</span>
          </Button>
        }
      />

      {loading ? (
        <SkeletonCards count={4} />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Estadisticas">
          <StatCard icon={ListTodo} label="Total de tareas" value={stats.total} tone="brand" index={0} />
          <StatCard icon={Timer} label="Pendientes" value={stats.pending} tone="amber" index={1} />
          <StatCard icon={CheckCircle2} label="Completadas" value={stats.completed} tone="emerald" index={2} />
          <StatCard icon={AlertTriangle} label="Prioridad alta" value={stats.highPriority} tone="rose" index={3} />
        </section>
      )}

      {!loading && stats.total > 0 && (
        <Card className="p-5">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink">Progreso general</p>
              <p className="mt-0.5 text-xs text-ink-muted">
                {stats.completed} de {stats.total} tareas completadas
              </p>
            </div>
            <span className="font-display text-xl font-bold text-brand-500">{completionRate}%</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-muted">
            <div
              className="h-full rounded-full bg-brand-400 transition-[width] duration-500 ease-out"
              style={{ width: `${completionRate}%` }}
              role="progressbar"
              aria-valuenow={completionRate}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progreso de tareas completadas"
            />
          </div>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-3" aria-label="Tareas pendientes">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-ink">Tareas pendientes</h2>
            <Link
              to="/tareas"
              className="text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-300"
            >
              Ver todas
            </Link>
          </div>
          {loading ? (
            <SkeletonList rows={3} />
          ) : (
            <TodoList
              todos={pendingTodos}
              emptyTitle="No tienes tareas pendientes"
              emptyDescription="Crea una tarea para empezar a organizarte."
              actionLabel="Nueva tarea"
              onAction={actions.openCreate}
              {...listProps}
            />
          )}
        </section>

        <section className="space-y-3" aria-label="Proximas tareas">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-4.5 w-4.5 text-brand-500" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-ink">Próximas tareas</h2>
          </div>
          {loading ? (
            <SkeletonList rows={3} />
          ) : (
            <TodoList
              todos={upcomingTodos}
              emptyTitle="Sin fechas próximas"
              emptyDescription="Asigna fechas a tus tareas para verlas aquí."
              {...listProps}
            />
          )}
        </section>
      </div>

      <TodoModals actions={actions} />
    </div>
  );
}
