/** Error de dominio con codigo HTTP, usado por los services. */
class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.details = details;
  }

  static badRequest(message = "Solicitud invalida", details = null) {
    return new ApiError(400, message, details);
  }

  static unauthorized(message = "No autorizado") {
    return new ApiError(401, message);
  }

  static forbidden(message = "No tienes permiso para esta accion") {
    return new ApiError(403, message);
  }

  static notFound(message = "Recurso no encontrado") {
    return new ApiError(404, message);
  }

  static conflict(message = "El recurso ya existe") {
    return new ApiError(409, message);
  }
}

module.exports = ApiError;
