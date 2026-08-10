import { ArrowLeft, Pencil, Plus, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "@/components/ui/Button.jsx";
import ConfirmDialog from "@/components/ui/ConfirmDialog.jsx";
import EmptyState from "@/components/ui/EmptyState.jsx";
import ErrorState from "@/components/ui/ErrorState.jsx";
import IconButton from "@/components/ui/IconButton.jsx";
import PageHeader from "@/components/ui/PageHeader.jsx";
import { SkeletonList } from "@/components/ui/Skeleton.jsx";
import FolderFormModal from "../components/FolderFormModal.jsx";
import useFolders from "../hooks/useFolders.js";
import useFolderActions from "../hooks/useFolderActions.js";
import { buildDeleteFolderMessage } from "../utils/folderUtils.js";
import TodoFilters from "@/features/todos/components/TodoFilters.jsx";
import TodoList from "@/features/todos/components/TodoList.jsx";
import TodoModals from "@/features/todos/components/TodoModals.jsx";
import useTodos from "@/features/todos/hooks/useTodos.js";
import useTodoActions from "@/features/todos/hooks/useTodoActions.js";
import { FolderX } from "lucide-react";

export default function FolderDetailPage() {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const { getFolderById, loading, error, refresh } = useFolders();
  const folder = getFolderById(folderId);
  const { visibleTodos, stats, filters, updateFilters } = useTodos({ folderId });
  const todoActions = useTodoActions();
  const folderActions = useFolderActions({ onDeleted: () => navigate("/carpetas", { replace: true }) });

  if (error) return <ErrorState message={error} onRetry={refresh} />;
  if (loading) return <SkeletonList rows={5} />;

  if (!folder) {
    return (
      <EmptyState
        icon={FolderX}
        title="Esta carpeta no existe"
        description="Puede que haya sido eliminada."
        actionLabel="Ver mis carpetas"
        onAction={() => navigate("/carpetas")}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/carpetas"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-brand-600 dark:hover:text-brand-300"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Mis carpetas
      </Link>

      <PageHeader
        title={folder.name}
        subtitle={`${stats.total} ${stats.total === 1 ? "tarea" : "tareas"} · ${stats.pending} pendientes`}
        actions={
          <>
            <IconButton icon={Pencil} label="Editar carpeta" onClick={() => folderActions.openEdit(folder)} />
            <IconButton
              icon={Trash2}
              label="Eliminar carpeta"
              tone="danger"
              onClick={() => folderActions.askDelete(folder)}
            />
            <Button size="sm" onClick={todoActions.openCreate}>
              <Plus className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Nueva tarea</span>
            </Button>
          </>
        }
      />

      {stats.total > 0 && (
        <TodoFilters filters={filters} onChange={updateFilters} resultCount={visibleTodos.length} />
      )}

      <TodoList
        todos={visibleTodos}
        showFolder={false}
        emptyTitle={stats.total === 0 ? "Esta carpeta esta vacia" : "No encontramos tareas"}
        emptyDescription={
          stats.total === 0
            ? "Crea tu primera tarea para comenzar."
            : "Prueba con otros filtros para ver mas resultados."
        }
        actionLabel={stats.total === 0 ? "Nueva tarea" : undefined}
        onAction={stats.total === 0 ? todoActions.openCreate : undefined}
        onToggle={todoActions.toggle}
        onSelect={todoActions.openDetail}
        onEdit={todoActions.openEdit}
        onDelete={todoActions.askDelete}
      />

      <TodoModals actions={todoActions} defaultFolderId={folder.id} />

      <FolderFormModal
        open={Boolean(folderActions.editing)}
        onClose={folderActions.closeEdit}
        folder={folderActions.editing}
      />
      <ConfirmDialog
        open={Boolean(folderActions.pendingDelete)}
        onClose={folderActions.cancelDelete}
        onConfirm={folderActions.confirmDelete}
        loading={folderActions.deleting}
        title="Eliminar carpeta"
        message={buildDeleteFolderMessage(folderActions.pendingDelete)}
      />
    </div>
  );
}
