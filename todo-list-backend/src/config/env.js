require("dotenv").config();

/** Lee una variable de entorno obligatoria y falla rapido si no existe. */
const required = (key, fallback) => {
  const value = process.env[key] ?? fallback;
  if (value === undefined || value === "") {
    throw new Error(`Variable de entorno faltante: ${key}`);
  }
  return value;
};

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT),
  databaseUrl: required("DATABASE_URL"),
  corsOrigin: (process.env.CORS_ORIGIN)
    .split(",")
    .map((origin) => origin.trim()),
  jwt: {
    secret: required("JWT_SECRET"),
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};

env.isProduction = env.nodeEnv === "production";

module.exports = env;
