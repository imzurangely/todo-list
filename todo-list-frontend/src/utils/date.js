const DAY_MS = 86400000;

const toDate = (value) => (value ? new Date(value) : null);

const startOfToday = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

/** Formato legible: "12 mar 2026". */
export const formatDate = (value) => {
  const date = toDate(value);
  if (!date || Number.isNaN(date.getTime())) return "Sin fecha";
  return date.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
};

/** Etiqueta relativa: Hoy, Manana, Ayer o la fecha formateada. */
export const formatRelativeDate = (value) => {
  const date = toDate(value);
  if (!date || Number.isNaN(date.getTime())) return "Sin fecha";
  date.setHours(0, 0, 0, 0);
  const diff = Math.round((date.getTime() - startOfToday().getTime()) / DAY_MS);
  if (diff === 0) return "Hoy";
  if (diff === 1) return "Manana";
  if (diff === -1) return "Ayer";
  return formatDate(value);
};

/** Valor compatible con <input type="date">. */
export const toInputDate = (value) => {
  const date = toDate(value);
  if (!date || Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

export const isOverdue = (value) => {
  const date = toDate(value);
  if (!date || Number.isNaN(date.getTime())) return false;
  date.setHours(0, 0, 0, 0);
  return date.getTime() < startOfToday().getTime();
};
