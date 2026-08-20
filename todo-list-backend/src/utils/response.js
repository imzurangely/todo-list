/** Respuesta exitosa con estructura consistente. */
const success = (res, { data = null, message = "Operacion exitosa", status = 200 } = {}) =>
  res.status(status).json({ success: true, data, message });

/** Respuesta 204 sin contenido. */
const noContent = (res) => res.status(204).send();

export { success, noContent };
