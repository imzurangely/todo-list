import Button from "@/components/ui/Button.jsx";
import Modal from "@/components/ui/Modal.jsx";
import { formatDate } from "@/utils/date.js";

export default function NoteDetail({ note, open, onClose, onEdit, onDelete }) {
  if (!note) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={note.title}
      description={`Creada el ${formatDate(note.created_at)} · Actualizada el ${formatDate(note.updated_at)}`}
      footer={
        <>
          <Button variant="ghost" onClick={() => onDelete(note)}>
            Eliminar
          </Button>
          <Button variant="outline" onClick={() => onEdit(note)}>
            Editar
          </Button>
        </>
      }
    >
      <div className="max-h-[60vh] overflow-y-auto overscroll-contain pr-1 scrollbar-thin">
        <p className="whitespace-pre-line break-words text-sm leading-relaxed text-ink-soft">
        {note.content || "Esta nota no tiene contenido."}
        </p>
      </div>
    </Modal>
  );
}
