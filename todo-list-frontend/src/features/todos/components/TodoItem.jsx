import { motion } from "framer-motion";
import { CalendarDays, FolderClosed, Pencil, Trash2 } from "lucide-react";
import Badge from "@/components/ui/Badge.jsx";
import Checkbox from "@/components/ui/Checkbox.jsx";
import IconButton from "@/components/ui/IconButton.jsx";
import PriorityBadge from "./PriorityBadge.jsx";
import { formatRelativeDate } from "@/utils/date.js";
import { isTodoOverdue } from "../utils/todoUtils.js";
import { cn } from "@/utils/cn.js";

export default function TodoItem({ todo, onToggle, onSelect, onEdit, onDelete, showFolder = true }) {
  const overdue = isTodoOverdue(todo);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -12, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div
        className={cn(
          "flex items-start gap-3 rounded-2xl border border-line bg-card p-4 transition-all duration-200",
          "hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-brand",
          todo.completed && "opacity-70",
        )}
      >
        <span className="pt-0.5">
          <Checkbox
            checked={todo.completed}
            onChange={() => onToggle(todo)}
            label={todo.completed ? `Marcar "${todo.title}" como pendiente` : `Completar "${todo.title}"`}
          />
        </span>

        <button
          type="button"
          onClick={() => onSelect(todo)}
          className="min-w-0 flex-1 text-left"
          aria-label={`Ver detalle de ${todo.title}`}
        >
          <p
            className={cn(
              "truncate text-sm font-semibold text-ink transition-all duration-200",
              todo.completed && "text-ink-muted line-through",
            )}
          >
            {todo.title}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <PriorityBadge priority={todo.priority} />
            {showFolder && todo.folder_name && (
              <Badge icon={FolderClosed}>{todo.folder_name}</Badge>
            )}
            <Badge
              icon={CalendarDays}
              variant={overdue ? "alta" : "neutral"}
              className={overdue ? "font-bold" : undefined}
            >
              {overdue ? `Atrasada · ${formatRelativeDate(todo.due_date)}` : formatRelativeDate(todo.due_date)}
            </Badge>
            {todo.completed && <Badge variant="success">Completada</Badge>}
          </div>
        </button>

        <div className="flex shrink-0 items-center gap-1 opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
          <IconButton icon={Pencil} label="Editar tarea" onClick={() => onEdit(todo)} />
          <IconButton icon={Trash2} label="Eliminar tarea" tone="danger" onClick={() => onDelete(todo)} />
        </div>
      </div>
    </motion.li>
  );
}
