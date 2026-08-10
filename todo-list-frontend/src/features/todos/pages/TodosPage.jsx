import { Plus } from "lucide-react";
import Button from "@/components/ui/Button.jsx";
import ErrorState from "@/components/ui/ErrorState.jsx";
import PageHeader from "@/components/ui/PageHeader.jsx";
import TodoFilters from "../components/TodoFilters.jsx";
import TodoList from "../components/TodoList.jsx";
import TodoModals from "../components/TodoModals.jsx";
import useTodos from "../hooks/useTodos.js";
import useTodoActions from "../hooks/useTodoActions.js";

export default function TodosPage() {
  const { visibleTodos, stats, filters, updateFilters, loading, error, refresh } = useTodos();
  const actions = useTodoActions();

  if (error) return <ErrorState message={error} onRetry={refresh} />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Todas las tareas"
        subtitle={`${stats.pending} pendientes · ${stats.completed} completadas`}
        actions={
          <Button size="sm" onClick={actions.openCreate}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Nueva tarea</span>
          </Button>
        }
      />

      <TodoFilters filters={filters} onChange={updateFilters} resultCount={visibleTodos.length} />

      <TodoList
        todos={visibleTodos}
        loading={loading}
        emptyTitle="No encontramos tareas"
        emptyDescription="Prueba con otros filtros o crea una nueva tarea."
        actionLabel="Nueva tarea"
        onAction={actions.openCreate}
        onToggle={actions.toggle}
        onSelect={actions.openDetail}
        onEdit={actions.openEdit}
        onDelete={actions.askDelete}
      />

      <TodoModals actions={actions} />
    </div>
  );
}
