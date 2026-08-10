const db = require("../../config/database");

const COLUMNS = "id, user_id, name, created_at, updated_at";

const findAll = async (userId) => {
  const { rows } = await db.query(
    `SELECT f.id, f.user_id, f.name, f.created_at, f.updated_at,
            COUNT(t.id)::int AS todos_count,
            COUNT(t.id) FILTER (WHERE t.completed = false)::int AS pending_count
       FROM folders f
       LEFT JOIN todos t ON t.folder_id = f.id
      WHERE f.user_id = $1
      GROUP BY f.id
      ORDER BY f.created_at ASC`,
    [userId],
  );
  return rows;
};

const findById = async (id, userId) => {
  const { rows } = await db.query(
    `SELECT ${COLUMNS} FROM folders WHERE id = $1 AND user_id = $2`,
    [id, userId],
  );
  return rows[0] || null;
};

const findByName = async (name, userId) => {
  const { rows } = await db.query(
    `SELECT ${COLUMNS} FROM folders WHERE lower(name) = lower($1) AND user_id = $2`,
    [name, userId],
  );
  return rows[0] || null;
};

const create = async ({ name, userId }) => {
  const { rows } = await db.query(
    `INSERT INTO folders (name, user_id) VALUES ($1, $2) RETURNING ${COLUMNS}`,
    [name, userId],
  );
  return rows[0];
};

const update = async (id, userId, { name }) => {
  const { rows } = await db.query(
    `UPDATE folders SET name = $1, updated_at = now()
      WHERE id = $2 AND user_id = $3
      RETURNING ${COLUMNS}`,
    [name, id, userId],
  );
  return rows[0] || null;
};

const remove = async (id, userId) => {
  const { rowCount } = await db.query(`DELETE FROM folders WHERE id = $1 AND user_id = $2`, [
    id,
    userId,
  ]);
  return rowCount > 0;
};

const countTodos = async (id, userId) => {
  const { rows } = await db.query(
    `SELECT COUNT(*)::int AS total
       FROM todos t JOIN folders f ON f.id = t.folder_id
      WHERE t.folder_id = $1 AND f.user_id = $2`,
    [id, userId],
  );
  return rows[0].total;
};

module.exports = { findAll, findById, findByName, create, update, remove, countTodos };
