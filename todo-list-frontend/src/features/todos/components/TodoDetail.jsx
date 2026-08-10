import { CalendarDays, CheckCircle2, Circle, FolderClosed, Pencil, Trash2 } from "lucide-react";
import Badge from "@/components/ui/Badge.jsx";
import Button from "@/components/ui/Button.jsx";
import Modal from "@/components/ui/Modal.jsx";
import PriorityBadge from "./PriorityBadge.jsx";
import { formatDate } from "@/utils/date.js";

function DetailRow({ label, children }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line py-2.5 last:border-0">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</span>
      <span className="text-sm text-ink">{children}</span>
    </div>
  );
}

export default function TodoDetail({ todo, open, onClose, onToggle, onEdit, onDelete }) {
  if (!todo) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={todo.title}
      footer={
        <>
          <Button variant="ghost" onClick={() => onDelete(todo)}>
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Eliminar
          </Button>
          <Button variant="outline" onClick={() => onEdit(todo)}>
            <Pencil className="h-4 w-4" aria-hidden="true" />
            Editar
          </Button>
          <Button onClick={() => onToggle(todo)}>
            {todo.completed ? <Circle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
            {todo.completed ? "Marcar como pendiente" : "Marcar como completada"}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <p className="whitespace-pre-line text-sm leading-relaxed text-ink-soft">
          {todo.description || "Esta tarea no tiene descripcion."}
        </p>

        <div>
          <DetailRow label="Estado">
            <Badge variant={todo.completed ? "success" : "brand"}>
              {todo.completed ? "Completada" : "Pendiente"}
            </Badge>
          </DetailRow>
          <DetailRow label="Prioridad">
            <PriorityBadge priority={todo.priority} />
          </DetailRow>
          <DetailRow label="Carpeta">
            <Badge icon={FolderClosed}>{todo.folder_name}</Badge>
          </DetailRow>
          <DetailRow label="Fecha">
            <Badge icon={CalendarDays}>{formatDate(todo.due_date)}</Badge>
          </DetailRow>
          <DetailRow label="Creada">{formatDate(todo.created_at)}</DetailRow>
          <DetailRow label="Ultima actualizacion">{formatDate(todo.updated_at)}</DetailRow>
        </div>
      </div>
    </Modal>
  );
}
