import { useState } from "react";
import useData from "@/hooks/useData.js";
import { useToast } from "@/context/ToastContext.jsx";

/**
 * Controlador reutilizable de las acciones sobre una tarea
 * (detalle, edicion, completar y eliminar) para no duplicar
 * la misma logica en cada pagina.
 */
export function useTodoActions() {
  const { toggleTodo, deleteTodo } = useData();
  const toast = useToast();
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [creating, setCreating] = useState(false);

  const toggle = async (todo) => {
    try {
      const updated = await toggleTodo(todo.id, !todo.completed);
      setSelected((current) => (current && current.id === updated.id ? updated : current));
      toast.success(updated.completed ? "Tarea completada" : "Tarea marcada como pendiente");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await deleteTodo(pendingDelete.id);
      toast.success("Tarea eliminada correctamente");
      setPendingDelete(null);
      setSelected(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  return {
    selected,
    editing,
    pendingDelete,
    deleting,
    creating,
    openDetail: setSelected,
    closeDetail: () => setSelected(null),
    openCreate: () => setCreating(true),
    closeCreate: () => setCreating(false),
    openEdit: (todo) => {
      setSelected(null);
      setEditing(todo);
    },
    closeEdit: () => setEditing(null),
    askDelete: setPendingDelete,
    cancelDelete: () => setPendingDelete(null),
    confirmDelete,
    toggle,
  };
}

export default useTodoActions;
