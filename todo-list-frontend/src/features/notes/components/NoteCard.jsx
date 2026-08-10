import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import Card from "@/components/ui/Card.jsx";
import IconButton from "@/components/ui/IconButton.jsx";
import { formatDate } from "@/utils/date.js";

export default function NoteCard({ note, onSelect, onEdit, onDelete, index = 0 }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.22, delay: index * 0.04 }}
    >
      <Card interactive className="group flex h-full flex-col p-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <button type="button" onClick={() => onSelect(note)} className="min-w-0 text-left">
            <h3 className="truncate text-base font-semibold text-ink">{note.title}</h3>
            <p className="mt-0.5 text-xs text-ink-muted">Actualizada el {formatDate(note.updated_at)}</p>
          </button>
          <div className="flex shrink-0 items-center gap-1 opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
            <IconButton icon={Pencil} label="Editar nota" onClick={() => onEdit(note)} />
            <IconButton icon={Trash2} label="Eliminar nota" tone="danger" onClick={() => onDelete(note)} />
          </div>
        </div>
        <p className="mt-3 line-clamp-4 whitespace-pre-line text-sm leading-relaxed text-ink-soft">
          {note.content || "Esta nota no tiene contenido."}
        </p>
      </Card>
    </motion.div>
  );
}
