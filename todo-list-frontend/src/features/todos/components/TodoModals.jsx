import ConfirmDialog from "@/components/ui/ConfirmDialog.jsx";
import TodoDetail from "./TodoDetail.jsx";
import TodoFormModal from "./TodoFormModal.jsx";

/** Modales asociados al controlador useTodoActions. */
export default function TodoModals({ actions, defaultFolderId }) {
  return (
    <>
      <TodoDetail
        todo={actions.selected}
        open={Boolean(actions.selected)}
        onClose={actions.closeDetail}
        onToggle={actions.toggle}
        onEdit={actions.openEdit}
        onDelete={actions.askDelete}
      />

      <TodoFormModal
        open={actions.creating}
        onClose={actions.closeCreate}
        defaultFolderId={defaultFolderId}
      />

      <TodoFormModal
        open={Boolean(actions.editing)}
        onClose={actions.closeEdit}
        todo={actions.editing}
        defaultFolderId={defaultFolderId}
      />

      <ConfirmDialog
        open={Boolean(actions.pendingDelete)}
        onClose={actions.cancelDelete}
        onConfirm={actions.confirmDelete}
        loading={actions.deleting}
        title="Eliminar tarea"
        message={`Estas segura de que deseas eliminar "${actions.pendingDelete?.title ?? ""}"? Esta accion no se puede deshacer.`}
      />
    </>
  );
}
