import { AnimatePresence } from "framer-motion";
import { FolderPlus, Plus } from "lucide-react";
import Button from "@/components/ui/Button.jsx";
import ConfirmDialog from "@/components/ui/ConfirmDialog.jsx";
import EmptyState from "@/components/ui/EmptyState.jsx";
import ErrorState from "@/components/ui/ErrorState.jsx";
import PageHeader from "@/components/ui/PageHeader.jsx";
import { SkeletonCards } from "@/components/ui/Skeleton.jsx";
import FolderCard from "../components/FolderCard.jsx";
import FolderFormModal from "../components/FolderFormModal.jsx";
import useFolders from "../hooks/useFolders.js";
import useFolderActions from "../hooks/useFolderActions.js";
import { buildDeleteFolderMessage } from "../utils/folderUtils.js";

export default function FoldersPage() {
  const { folders, loading, error, refresh } = useFolders();
  const actions = useFolderActions();

  if (error) return <ErrorState message={error} onRetry={refresh} />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mis carpetas"
        subtitle="Agrupa tus tareas por contexto y manten el foco."
        actions={
          <Button size="sm" onClick={actions.openCreate}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Nueva carpeta</span>
          </Button>
        }
      />

      {loading ? (
        <SkeletonCards count={6} />
      ) : folders.length === 0 ? (
        <EmptyState
          icon={FolderPlus}
          title="Aun no tienes carpetas"
          description="Crea tu primera carpeta para organizar tus tareas."
          actionLabel="Nueva carpeta"
          onAction={actions.openCreate}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {folders.map((folder, index) => (
              <FolderCard
                key={folder.id}
                folder={folder}
                index={index}
                onEdit={actions.openEdit}
                onDelete={actions.askDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <FolderFormModal open={actions.creating} onClose={actions.closeCreate} />
      <FolderFormModal
        open={Boolean(actions.editing)}
        onClose={actions.closeEdit}
        folder={actions.editing}
      />
      <ConfirmDialog
        open={Boolean(actions.pendingDelete)}
        onClose={actions.cancelDelete}
        onConfirm={actions.confirmDelete}
        loading={actions.deleting}
        title="Eliminar carpeta"
        message={buildDeleteFolderMessage(actions.pendingDelete)}
      />
    </div>
  );
}
