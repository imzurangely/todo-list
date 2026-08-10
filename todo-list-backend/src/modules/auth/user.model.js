const db = require("../../config/database");

const PUBLIC_COLUMNS = "id, name, email, created_at, updated_at";

const findByEmail = async (email) => {
  const { rows } = await db.query(
    `SELECT id, name, email, password_hash, created_at, updated_at
       FROM users WHERE email = $1`,
    [email],
  );
  return rows[0] || null;
};

const findById = async (id) => {
  const { rows } = await db.query(`SELECT ${PUBLIC_COLUMNS} FROM users WHERE id = $1`, [id]);
  return rows[0] || null;
};

const create = async ({ name, email, passwordHash }) => {
  const { rows } = await db.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING ${PUBLIC_COLUMNS}`,
    [name, email, passwordHash],
  );
  return rows[0];
};

module.exports = { findByEmail, findById, create };
