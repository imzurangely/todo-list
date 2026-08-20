import db from "../../config/database.js";

const SELECT_BASE = `
  SELECT t.id, t.folder_id, t.title, t.description, t.due_date, t.priority,
         t.completed, t.created_at, t.updated_at, f.name AS folder_name
    FROM todos t
    JOIN folders f ON f.id = t.folder_id
`;

const PRIORITY_ORDER = `CASE t.priority WHEN 'alta' THEN 1 WHEN 'media' THEN 2 ELSE 3 END`;

const SORT_CLAUSES = {
  due_asc: `t.due_date ASC NULLS LAST, t.created_at DESC`,
  due_desc: `t.due_date DESC NULLS LAST, t.created_at DESC`,
  priority: `${PRIORITY_ORDER} ASC, t.due_date ASC NULLS LAST`,
  recent: `t.created_at DESC`,
};

/** Lista tareas del usuario aplicando filtros opcionales. */
const findAll = async (userId, filters = {}) => {
  const { folderId, completed, priority, search, sort } = filters;
  const values = [userId];
  const conditions = ["f.user_id = $1"];

  if (folderId) {
    values.push(folderId);
    conditions.push(`t.folder_id = $${values.length}`);
  }
  if (typeof completed === "boolean") {
    values.push(completed);
    conditions.push(`t.completed = $${values.length}`);
  }
  if (priority) {
    values.push(priority);
    conditions.push(`t.priority = $${values.length}`);
  }
  if (search) {
    values.push(`%${search}%`);
    conditions.push(`t.title ILIKE $${values.length}`);
  }

  const orderBy = SORT_CLAUSES[sort] || SORT_CLAUSES.recent;
  const { rows } = await db.query(
    `${SELECT_BASE} WHERE ${conditions.join(" AND ")} ORDER BY ${orderBy}`,
    values,
  );
  return rows;
};

const findById = async (id, userId) => {
  const { rows } = await db.query(`${SELECT_BASE} WHERE t.id = $1 AND f.user_id = $2`, [id, userId]);
  return rows[0] || null;
};

const create = async ({ folderId, title, description, dueDate, priority }) => {
  const { rows } = await db.query(
    `INSERT INTO todos (folder_id, title, description, due_date, priority)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id`,
    [folderId, title, description, dueDate, priority],
  );
  return rows[0].id;
};

const update = async (id, { folderId, title, description, dueDate, priority, completed }) => {
  const { rows } = await db.query(
    `UPDATE todos
        SET folder_id = $1, title = $2, description = $3, due_date = $4,
            priority = $5, completed = $6, updated_at = now()
      WHERE id = $7
      RETURNING id`,
    [folderId, title, description, dueDate, priority, completed, id],
  );
  return rows[0] ? rows[0].id : null;
};

const updateStatus = async (id, completed) => {
  const { rows } = await db.query(
    `UPDATE todos SET completed = $1, updated_at = now() WHERE id = $2 RETURNING id`,
    [completed, id],
  );
  return rows[0] ? rows[0].id : null;
};

const remove = async (id) => {
  const { rowCount } = await db.query(`DELETE FROM todos WHERE id = $1`, [id]);
  return rowCount > 0;
};

/** Estadisticas agregadas para el dashboard. */
const stats = async (userId) => {
  const { rows } = await db.query(
    `SELECT COUNT(*)::int AS total,
            COUNT(*) FILTER (WHERE t.completed = false)::int AS pending,
            COUNT(*) FILTER (WHERE t.completed = true)::int AS completed,
            COUNT(*) FILTER (WHERE t.priority = 'alta' AND t.completed = false)::int AS high_priority
       FROM todos t JOIN folders f ON f.id = t.folder_id
      WHERE f.user_id = $1`,
    [userId],
  );
  return rows[0];
};

export default { findAll, findById, create, update, updateStatus, remove, stats };
