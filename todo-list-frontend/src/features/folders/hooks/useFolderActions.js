import { useState } from "react";
import useFolders from "./useFolders.js";
import { useToast } from "@/context/ToastContext.jsx";

/** Controlador de edicion y eliminacion de carpetas. */
export function useFolderActions({ onDeleted } = {}) {
  const { deleteFolder } = useFolders();
  const toast = useToast();
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await deleteFolder(pendingDelete.id);
      toast.success("Carpeta eliminada correctamente");
      setPendingDelete(null);
      onDeleted?.();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  return {
    creating,
    editing,
    pendingDelete,
    deleting,
    openCreate: () => setCreating(true),
    closeCreate: () => setCreating(false),
    openEdit: setEditing,
    closeEdit: () => setEditing(null),
    askDelete: setPendingDelete,
    cancelDelete: () => setPendingDelete(null),
    confirmDelete,
  };
}

export default useFolderActions;
