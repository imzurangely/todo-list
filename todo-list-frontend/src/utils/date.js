const DAY_MS = 86400000;

const toDate = (value) => {
  if (!value) return null;

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  return new Date(value);
};

const startOfToday = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

/** Formato legible: "21 ago 2026". */
export const formatDate = (value) => {
  const date = toDate(value);

  if (!date || Number.isNaN(date.getTime())) {
    return "Sin fecha";
  }

  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/** Etiqueta relativa: Hoy, Mañana, Ayer o la fecha formateada. */
export const formatRelativeDate = (value) => {
  const date = toDate(value);

  if (!date || Number.isNaN(date.getTime())) {
    return "Sin fecha";
  }

  date.setHours(0, 0, 0, 0);

  const diff = Math.round(
    (date.getTime() - startOfToday().getTime()) / DAY_MS
  );

  if (diff === 0) return "Hoy";
  if (diff === 1) return "Mañana";
  if (diff === -1) return "Ayer";

  return formatDate(value);
};


export const toInputDate = (value) => {
  if (!value) return "";

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const isOverdue = (value) => {
  const date = toDate(value);

  if (!date || Number.isNaN(date.getTime())) {
    return false;
  }

  date.setHours(0, 0, 0, 0);

  return date.getTime() < startOfToday().getTime();
};