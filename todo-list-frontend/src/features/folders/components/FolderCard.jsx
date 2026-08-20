import { motion } from "framer-motion";
import { FolderClosed, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Badge from "@/components/ui/Badge.jsx";
import Card from "@/components/ui/Card.jsx";
import IconButton from "@/components/ui/IconButton.jsx";
import { formatDate } from "@/utils/date.js";

export default function FolderCard({ folder, onEdit, onDelete, index = 0 }) {
  const total = folder.todos_count ?? 0;
  const pending = folder.pending_count ?? 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.22, delay: index * 0.04 }}
    >
      <Card interactive className="group p-5">
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-2 sm:gap-3">
          <Link to={`/carpetas/${folder.id}`} className="min-w-0">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
              <FolderClosed className="h-4.5 w-4.5" aria-hidden="true" />
            </span>
            <h3 className="mt-3 break-words text-base font-semibold text-ink">{folder.name}</h3>
            <p className="mt-0.5 text-xs text-ink-muted">Creada el {formatDate(folder.created_at)}</p>
          </Link>

          <div className="flex shrink-0 items-center gap-1 opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
            <IconButton icon={Pencil} label="Editar carpeta" onClick={() => onEdit(folder)} />
            <IconButton icon={Trash2} label="Eliminar carpeta" tone="danger" onClick={() => onDelete(folder)} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <Badge variant="brand">{total} {total === 1 ? "tarea" : "tareas"}</Badge>
          <Badge variant={pending > 0 ? "media" : "success"}>
            {pending > 0 ? `${pending} pendientes` : "Todo al dia"}
          </Badge>
        </div>
      </Card>
    </motion.div>
  );
}
