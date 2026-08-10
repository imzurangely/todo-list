import { isOverdue } from "@/utils/date.js";

export const PRIORITIES = [
  { value: "baja", label: "Baja" },
  { value: "media", label: "Media" },
  { value: "alta", label: "Alta" },
];

export const PRIORITY_WEIGHT = { alta: 1, media: 2, baja: 3 };

export const STATUS_FILTERS = [
  { value: "all", label: "Todas" },
  { value: "pending", label: "Pendientes" },
  { value: "completed", label: "Completadas" },
  { value: "alta", label: "Prioridad alta" },
  { value: "media", label: "Prioridad media" },
  { value: "baja", label: "Prioridad baja" },
];

export const SORT_OPTIONS = [
  { value: "due_asc", label: "Fecha mas proxima" },
  { value: "due_desc", label: "Fecha mas lejana" },
  { value: "priority", label: "Prioridad" },
  { value: "recent", label: "Mas recientes" },
];

const matchesStatus = (todo, status) => {
  if (status === "pending") return !todo.completed;
  if (status === "completed") return todo.completed;
  if (PRIORITY_WEIGHT[status]) return todo.priority === status;
  return true;
};

const byDueDate = (direction) => (a, b) => {
  if (!a.due_date && !b.due_date) return 0;
  if (!a.due_date) return 1;
  if (!b.due_date) return -1;
  const diff = new Date(a.due_date) - new Date(b.due_date);
  return direction === "asc" ? diff : -diff;
};

const COMPARATORS = {
  due_asc: byDueDate("asc"),
  due_desc: byDueDate("desc"),
  priority: (a, b) => PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority],
  recent: (a, b) => new Date(b.created_at) - new Date(a.created_at),
};

/** Aplica busqueda, filtro de estado/prioridad y ordenamiento. */
export const filterAndSortTodos = (todos, { search = "", status = "all", sort = "due_asc" } = {}) => {
  const term = search.trim().toLowerCase();

  return todos
    .filter((todo) => matchesStatus(todo, status))
    .filter((todo) => (term ? todo.title.toLowerCase().includes(term) : true))
    .sort(COMPARATORS[sort] || COMPARATORS.due_asc);
};

export const buildStats = (todos) => ({
  total: todos.length,
  pending: todos.filter((todo) => !todo.completed).length,
  completed: todos.filter((todo) => todo.completed).length,
  highPriority: todos.filter((todo) => todo.priority === "alta" && !todo.completed).length,
});

export const isTodoOverdue = (todo) => !todo.completed && isOverdue(todo.due_date);

/** Valida el formulario de tarea antes de enviarlo a la API. */
export const validateTodoForm = (values) => {
  const errors = {};
  if (!values.title || !values.title.trim()) errors.title = "El título es obligatorio";
  else if (values.title.trim().length > 120) errors.title = "Máximo 120 caracteres";
  if (!values.folder_id) errors.folder_id = "Selecciona una carpeta";
  if (!PRIORITY_WEIGHT[values.priority]) errors.priority = "Selecciona una prioridad válida";
  if (values.due_date && Number.isNaN(Date.parse(values.due_date))) {
    errors.due_date = "La fecha no es válida";
  }
  return errors;
};
