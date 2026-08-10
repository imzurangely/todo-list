import { useMemo, useState } from "react";
import useData from "@/hooks/useData.js";

/** Notas del usuario con busqueda por titulo y contenido. */
export function useNotes() {
  const { notes, loading, error, createNote, updateNote, deleteNote, refresh } = useData();
  const [search, setSearch] = useState("");

  const visibleNotes = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return notes;
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(term) || (note.content || "").toLowerCase().includes(term),
    );
  }, [notes, search]);

  return { notes, visibleNotes, search, setSearch, loading, error, createNote, updateNote, deleteNote, refresh };
}

export default useNotes;
