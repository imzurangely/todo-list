import { useState } from "react";
import Modal from "@/components/ui/Modal.jsx";
import EmptyState from "@/components/ui/EmptyState.jsx";
import { FolderPlus } from "lucide-react";
import TodoForm from "./TodoForm.jsx";
import useData from "@/hooks/useData.js";
import { useToast } from "@/context/ToastContext.jsx";

/** Modal reutilizable para crear y editar tareas. */
export default function TodoFormModal({ open, onClose, todo, defaultFolderId }) {
  const { folders, createTodo, updateTodo } = useData();
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      if (todo) {
        await updateTodo(todo.id, { ...payload, completed: todo.completed });
        toast.success("Tarea actualizada correctamente");
      } else {
        await createTodo(payload);
        toast.success("Tarea creada correctamente");
      }
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={todo ? "Editar tarea" : "Nueva tarea"}
      description={todo ? "Actualiza los datos de la tarea." : "Completa la información de tu nueva tarea."}
    >
      {folders.length === 0 ? (
        <EmptyState
          icon={FolderPlus}
          title="Primero crea una carpeta"
          description="Las tareas se organizan dentro de carpetas. Crea una carpeta desde el menú lateral para comenzar."
        />
      ) : (
        <TodoForm
          todo={todo}
          folders={folders}
          defaultFolderId={defaultFolderId ?? folders[0]?.id}
          onSubmit={handleSubmit}
          onCancel={onClose}
          submitting={submitting}
        />
      )}
    </Modal>
  );
}
