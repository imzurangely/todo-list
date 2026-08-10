/** Valida el nombre de una carpeta antes de enviarlo a la API. */
export const validateFolderName = (name) => {
  const value = (name || "").trim();
  if (!value) return "El nombre de la carpeta es obligatorio";
  if (value.length > 60) return "Maximo 60 caracteres";
  return null;
};

/** Mensaje de confirmacion que advierte si la carpeta tiene tareas. */
export const buildDeleteFolderMessage = (folder) => {
  const total = folder?.todos_count ?? 0;
  if (total === 0) {
    return `Estas segura de que deseas eliminar la carpeta "${folder?.name}"? Esta accion no se puede deshacer.`;
  }
  return `La carpeta "${folder?.name}" tiene ${total} ${total === 1 ? "tarea asociada" : "tareas asociadas"} que tambien se eliminaran. Esta accion no se puede deshacer.`;
};
