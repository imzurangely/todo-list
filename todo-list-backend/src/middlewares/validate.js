const ApiError = require("../utils/ApiError");

/** Valida req[source] con un schema de Zod y reemplaza el valor por el parseado. */
const validate = (schema, source = "body") => (req, _res, next) => {
  const result = schema.safeParse(req[source]);
  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      field: issue.path.join(".") || source,
      message: issue.message,
    }));
    return next(ApiError.badRequest(details[0].message, details));
  }
  req[source] = result.data;
  return next();
};

module.exports = validate;
