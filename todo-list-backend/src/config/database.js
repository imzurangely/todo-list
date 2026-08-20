import { Pool } from "pg";
import env from "./env.js";

const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: env.isProduction ? { rejectUnauthorized: false } : false,
});

pool.on("error", (error) => {
  console.error("[db] Error inesperado en el pool de conexiones:", error.message);
});

/** Ejecuta una query parametrizada. Unico punto de acceso a PostgreSQL. */
const query = (text, params) => pool.query(text, params);

/** Ejecuta varias queries dentro de una transaccion. */
const withTransaction = async (callback) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export default { pool, query, withTransaction };
