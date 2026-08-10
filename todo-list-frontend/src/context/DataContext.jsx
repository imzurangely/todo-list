import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import folderService from "@/features/folders/services/folderService.js";
import todoService from "@/features/todos/services/todoService.js";
import noteService from "@/features/notes/services/noteService.js";
import useAuth from "@/features/auth/hooks/useAuth.js";

export const DataContext = createContext(null);

const sortById = (items) => [...items].sort((a, b) => a.id - b.id);

/**
 * Fuente de verdad del cliente para carpetas, tareas y notas.
 * Centraliza la comunicacion con la API para que los contadores
 * (por ejemplo tareas pendientes) se mantengan sincronizados en toda la app.
 */
export function DataProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [folders, setFolders] = useState([]);
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [nextFolders, nextTodos, nextNotes] = await Promise.all([
        folderService.list(),
        todoService.list(),
        noteService.list(),
      ]);
      setFolders(nextFolders || []);
      setTodos(nextTodos || []);
      setNotes(nextNotes || []);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setFolders([]);
      setTodos([]);
      setNotes([]);
      setLoading(false);
      return;
    }
    refresh();
  }, [isAuthenticated, refresh]);

  // --- Carpetas ---------------------------------------------------
  const createFolder = useCallback(async (payload) => {
    const folder = await folderService.create(payload);
    setFolders((current) => sortById([...current, { ...folder, todos_count: 0, pending_count: 0 }]));
    return folder;
  }, []);

  const updateFolder = useCallback(async (id, payload) => {
    const folder = await folderService.update(id, payload);
    setFolders((current) => current.map((item) => (item.id === folder.id ? { ...item, ...folder } : item)));
    setTodos((current) =>
      current.map((todo) => (todo.folder_id === folder.id ? { ...todo, folder_name: folder.name } : todo)),
    );
    return folder;
  }, []);

  const deleteFolder = useCallback(async (id) => {
    await folderService.remove(id);
    setFolders((current) => current.filter((folder) => folder.id !== id));
    setTodos((current) => current.filter((todo) => todo.folder_id !== id));
  }, []);

  // --- Tareas -----------------------------------------------------
  const syncFolderCounters = useCallback((nextTodos) => {
    setFolders((current) =>
      current.map((folder) => {
        const related = nextTodos.filter((todo) => todo.folder_id === folder.id);
        return {
          ...folder,
          todos_count: related.length,
          pending_count: related.filter((todo) => !todo.completed).length,
        };
      }),
    );
  }, []);

  const applyTodos = useCallback(
    (updater) => {
      setTodos((current) => {
        const next = updater(current);
        syncFolderCounters(next);
        return next;
      });
    },
    [syncFolderCounters],
  );

  const createTodo = useCallback(
    async (payload) => {
      const todo = await todoService.create(payload);
      applyTodos((current) => [todo, ...current]);
      return todo;
    },
    [applyTodos],
  );

  const updateTodo = useCallback(
    async (id, payload) => {
      const todo = await todoService.update(id, payload);
      applyTodos((current) => current.map((item) => (item.id === todo.id ? todo : item)));
      return todo;
    },
    [applyTodos],
  );

  const toggleTodo = useCallback(
    async (id, completed) => {
      const todo = await todoService.updateStatus(id, completed);
      applyTodos((current) => current.map((item) => (item.id === todo.id ? todo : item)));
      return todo;
    },
    [applyTodos],
  );

  const deleteTodo = useCallback(
    async (id) => {
      await todoService.remove(id);
      applyTodos((current) => current.filter((todo) => todo.id !== id));
    },
    [applyTodos],
  );

  // --- Notas ------------------------------------------------------
  const createNote = useCallback(async (payload) => {
    const note = await noteService.create(payload);
    setNotes((current) => [note, ...current]);
    return note;
  }, []);

  const updateNote = useCallback(async (id, payload) => {
    const note = await noteService.update(id, payload);
    setNotes((current) => current.map((item) => (item.id === note.id ? note : item)));
    return note;
  }, []);

  const deleteNote = useCallback(async (id) => {
    await noteService.remove(id);
    setNotes((current) => current.filter((note) => note.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      folders,
      todos,
      notes,
      loading,
      error,
      refresh,
      createFolder,
      updateFolder,
      deleteFolder,
      createTodo,
      updateTodo,
      toggleTodo,
      deleteTodo,
      createNote,
      updateNote,
      deleteNote,
    }),
    [
      folders, todos, notes, loading, error, refresh,
      createFolder, updateFolder, deleteFolder,
      createTodo, updateTodo, toggleTodo, deleteTodo,
      createNote, updateNote, deleteNote,
    ],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
