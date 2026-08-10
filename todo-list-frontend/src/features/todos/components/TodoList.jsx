import { AnimatePresence } from "framer-motion";
import { ListChecks } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState.jsx";
import { SkeletonList } from "@/components/ui/Skeleton.jsx";
import TodoItem from "./TodoItem.jsx";

export default function TodoList({
  todos,
  loading = false,
  emptyTitle = "No hay tareas para mostrar",
  emptyDescription = "Crea tu primera tarea para comenzar.",
  actionLabel,
  onAction,
  showFolder = true,
  onToggle,
  onSelect,
  onEdit,
  onDelete,
}) {
  if (loading) return <SkeletonList rows={4} />;

  if (todos.length === 0) {
    return (
      <EmptyState
        icon={ListChecks}
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={actionLabel}
        onAction={onAction}
      />
    );
  }

  return (
    <ul className="space-y-3">
      <AnimatePresence initial={false}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            showFolder={showFolder}
            onToggle={onToggle}
            onSelect={onSelect}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}
