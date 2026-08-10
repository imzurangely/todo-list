import { useMemo, useState } from "react";
import useData from "@/hooks/useData.js";
import { buildStats, filterAndSortTodos } from "../utils/todoUtils.js";

/**
 * Encapsula filtros, busqueda y orden sobre las tareas compartidas.
 * @param {{ folderId?: number }} options
 */
export function useTodos({ folderId } = {}) {
  const { todos, loading, error, createTodo, updateTodo, toggleTodo, deleteTodo, refresh } = useData();
  const [filters, setFilters] = useState({ search: "", status: "all", sort: "due_asc" });

  const scoped = useMemo(
    () => (folderId ? todos.filter((todo) => todo.folder_id === Number(folderId)) : todos),
    [todos, folderId],
  );

  const visibleTodos = useMemo(() => filterAndSortTodos(scoped, filters), [scoped, filters]);
  const stats = useMemo(() => buildStats(scoped), [scoped]);

  const updateFilters = (partial) => setFilters((current) => ({ ...current, ...partial }));
  const resetFilters = () => setFilters({ search: "", status: "all", sort: "due_asc" });

  return {
    todos: scoped,
    visibleTodos,
    stats,
    filters,
    updateFilters,
    resetFilters,
    loading,
    error,
    refresh,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
  };
}

export default useTodos;
