import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Plus, Search, StickyNote } from "lucide-react";
import Button from "@/components/ui/Button.jsx";
import ConfirmDialog from "@/components/ui/ConfirmDialog.jsx";
import EmptyState from "@/components/ui/EmptyState.jsx";
import ErrorState from "@/components/ui/ErrorState.jsx";
import PageHeader from "@/components/ui/PageHeader.jsx";
import { SkeletonCards } from "@/components/ui/Skeleton.jsx";
import NoteCard from "../components/NoteCard.jsx";
import NoteDetail from "../components/NoteDetail.jsx";
import NoteFormModal from "../components/NoteFormModal.jsx";
import useNotes from "../hooks/useNotes.js";
import { useToast } from "@/context/ToastContext.jsx";

export default function NotesPage() {
  const { visibleNotes, notes, search, setSearch, loading, error, refresh, deleteNote } = useNotes();
  const toast = useToast();
  const [selected, setSelected] = useState(null);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await deleteNote(pendingDelete.id);
      toast.success("Nota eliminada correctamente");
      setPendingDelete(null);
      setSelected(null);
    } catch (requestError) {
      toast.error(requestError.message);
    } finally {
      setDeleting(false);
    }
  };

  if (error) return <ErrorState message={error} onRetry={refresh} />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notas"
        subtitle="Guarda ideas sueltas sin asociarlas a una tarea."
        actions={
          <Button size="sm" onClick={() => setCreating(true)}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Nueva nota</span>
          </Button>
        }
      />

      {notes.length > 0 && (
        <div className="relative max-w-md">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar en tus notas..."
            aria-label="Buscar notas"
            className="h-10 w-full rounded-xl border border-line bg-card pl-9 pr-3 text-sm text-ink placeholder:text-ink-muted focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-400/15"
          />
        </div>
      )}

      {loading ? (
        <SkeletonCards count={4} />
      ) : visibleNotes.length === 0 ? (
        <EmptyState
          icon={StickyNote}
          title={notes.length === 0 ? "Aun no tienes notas" : "No encontramos notas"}
          description={
            notes.length === 0
              ? "Crea una nota para guardar tus ideas."
              : "Prueba con otra busqueda."
          }
          actionLabel={notes.length === 0 ? "Nueva nota" : undefined}
          onAction={notes.length === 0 ? () => setCreating(true) : undefined}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {visibleNotes.map((note, index) => (
              <NoteCard
                key={note.id}
                note={note}
                index={index}
                onSelect={setSelected}
                onEdit={(target) => {
                  setSelected(null);
                  setEditing(target);
                }}
                onDelete={setPendingDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <NoteDetail
        note={selected}
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        onEdit={(note) => {
          setSelected(null);
          setEditing(note);
        }}
        onDelete={setPendingDelete}
      />
      <NoteFormModal open={creating} onClose={() => setCreating(false)} />
      <NoteFormModal open={Boolean(editing)} onClose={() => setEditing(null)} note={editing} />
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Eliminar nota"
        message={`¿Estas segura de que deseas eliminar la nota "${pendingDelete?.title ?? ""}"? Esta accion no se puede deshacer.`}
      />
    </div>
  );
}
