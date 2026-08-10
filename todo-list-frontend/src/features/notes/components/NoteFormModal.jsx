import { useEffect, useState } from "react";
import Button from "@/components/ui/Button.jsx";
import Input from "@/components/ui/Input.jsx";
import Modal from "@/components/ui/Modal.jsx";
import Textarea from "@/components/ui/Textarea.jsx";
import useNotes from "../hooks/useNotes.js";
import { useToast } from "@/context/ToastContext.jsx";

export default function NoteFormModal({ open, onClose, note }) {
  const { createNote, updateNote } = useNotes();
  const toast = useToast();
  const [values, setValues] = useState({ title: "", content: "" });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setValues({ title: note?.title || "", content: note?.content || "" });
    setError(null);
  }, [note, open]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!values.title.trim()) {
      setError("El titulo de la nota es obligatorio");
      return;
    }

    setSubmitting(true);
    try {
      const payload = { title: values.title.trim(), content: values.content.trim() };
      if (note) {
        await updateNote(note.id, payload);
        toast.success("Nota actualizada correctamente");
      } else {
        await createNote(payload);
        toast.success("Nota creada correctamente");
      }
      onClose();
    } catch (requestError) {
      toast.error(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={note ? "Editar nota" : "Nueva nota"}>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label="Titulo *"
          value={values.title}
          onChange={(event) => {
            setValues((current) => ({ ...current, title: event.target.value }));
            setError(null);
          }}
          error={error}
          placeholder="Ej. Ideas para proyectos"
          maxLength={120}
          autoFocus
        />
        <Textarea
          label="Contenido"
          value={values.content}
          onChange={(event) => setValues((current) => ({ ...current, content: event.target.value }))}
          placeholder="Escribe aqui tus ideas..."
          maxLength={5000}
          rows={7}
        />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
            Cancelar
          </Button>
          <Button type="submit" loading={submitting}>
            {note ? "Guardar cambios" : "Crear nota"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
