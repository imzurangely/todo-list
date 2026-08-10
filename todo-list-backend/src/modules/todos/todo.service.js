const ApiError = require("../../utils/ApiError");
const folderService = require("../folders/folder.service");
const todoModel = require("./todo.model");

const toFilters = (query = {}) => ({
  folderId: query.folderId,
  completed: query.completed === undefined ? undefined : query.completed === "true",
  priority: query.priority,
  search: query.search,
  sort: query.sort,
});

const list = (userId, query) => todoModel.findAll(userId, toFilters(query));

const getById = async (id, userId) => {
  const todo = await todoModel.findById(id, userId);
  if (!todo) throw ApiError.notFound("La tarea no existe");
  return todo;
};

const create = async (payload, userId) => {
  await folderService.getById(payload.folder_id, userId);
  const id = await todoModel.create({
    folderId: payload.folder_id,
    title: payload.title,
    description: payload.description ?? null,
    dueDate: payload.due_date ?? null,
    priority: payload.priority,
  });
  return getById(id, userId);
};

const update = async (id, payload, userId) => {
  const current = await getById(id, userId);
  await folderService.getById(payload.folder_id, userId);

  await todoModel.update(id, {
    folderId: payload.folder_id,
    title: payload.title,
    description: payload.description ?? null,
    dueDate: payload.due_date ?? null,
    priority: payload.priority,
    completed: payload.completed ?? current.completed,
  });
  return getById(id, userId);
};

const updateStatus = async (id, completed, userId) => {
  await getById(id, userId);
  await todoModel.updateStatus(id, completed);
  return getById(id, userId);
};

const remove = async (id, userId) => {
  await getById(id, userId);
  const deleted = await todoModel.remove(id);
  if (!deleted) throw ApiError.notFound("La tarea no existe");
};

const stats = (userId) => todoModel.stats(userId);

module.exports = { list, getById, create, update, updateStatus, remove, stats };
