const env = require("../config/env");
const ApiError = require("../utils/ApiError");

/** Manejo centralizado de errores: nunca expone detalles tecnicos al cliente. */
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, _req, res, _next) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      ...(error.details ? { errors: error.details } : {}),
    });
  }

  if (error && error.code === "23503") {
    return res.status(400).json({ success: false, message: "La referencia indicada no existe" });
  }
  if (error && error.code === "23505") {
    return res.status(409).json({ success: false, message: "El registro ya existe" });
  }

  console.error("[error]", error);

  return res.status(500).json({
    success: false,
    message: "Ocurrio un error inesperado en el servidor",
    ...(env.isProduction ? {} : { debug: error.message }),
  });
};

module.exports = errorHandler;
