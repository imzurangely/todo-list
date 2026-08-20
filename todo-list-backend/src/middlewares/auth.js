import jwt from "jsonwebtoken";
import env from "../config/env.js";
import ApiError from "../utils/ApiError.js";

/** Verifica el Bearer token y expone req.user = { id, email }. */
const authenticate = (req, _res, next) => {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(ApiError.unauthorized("Debes iniciar sesion para continuar"));
  }

  try {
    const payload = jwt.verify(token, env.jwt.secret);
    req.user = { id: payload.sub, email: payload.email };
    return next();
  } catch {
    return next(ApiError.unauthorized("La sesion ha expirado o es invalida"));
  }
};

export default authenticate;
