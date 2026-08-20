import db from "../../config/database.js";

const COLUMNS = "id, user_id, title, content, created_at, updated_at";

const findAll = async (userId) => {
  const { rows } = await db.query(
    `SELECT ${COLUMNS} FROM notes WHERE user_id = $1 ORDER BY updated_at DESC`,
    [userId],
  );
  return rows;
};

const findById = async (id, userId) => {
  const { rows } = await db.query(
    `SELECT ${COLUMNS} FROM notes WHERE id = $1 AND user_id = $2`,
    [id, userId],
  );
  return rows[0] || null;
};

const create = async ({ title, content, userId }) => {
  const { rows } = await db.query(
    `INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING ${COLUMNS}`,
    [title, content, userId],
  );
  return rows[0];
};

const update = async (id, userId, { title, content }) => {
  const { rows } = await db.query(
    `UPDATE notes SET title = $1, content = $2, updated_at = now()
      WHERE id = $3 AND user_id = $4
      RETURNING ${COLUMNS}`,
    [title, content, id, userId],
  );
  return rows[0] || null;
};

const remove = async (id, userId) => {
  const { rowCount } = await db.query(`DELETE FROM notes WHERE id = $1 AND user_id = $2`, [
    id,
    userId,
  ]);
  return rowCount > 0;
};

export default { findAll, findById, create, update, remove };
