const asyncHandler = require("../../utils/asyncHandler");
const { success, noContent } = require("../../utils/response");
const todoService = require("./todo.service");

const list = asyncHandler(async (req, res) => {
  const data = await todoService.list(req.user.id, req.query);
  return success(res, { data, message: "Tareas obtenidas correctamente" });
});

const stats = asyncHandler(async (req, res) => {
  const data = await todoService.stats(req.user.id);
  return success(res, { data, message: "Estadisticas obtenidas correctamente" });
});

const getById = asyncHandler(async (req, res) => {
  const data = await todoService.getById(req.params.id, req.user.id);
  return success(res, { data, message: "Tarea obtenida correctamente" });
});

const create = asyncHandler(async (req, res) => {
  const data = await todoService.create(req.body, req.user.id);
  return success(res, { data, status: 201, message: "Tarea creada correctamente" });
});

const update = asyncHandler(async (req, res) => {
  const data = await todoService.update(req.params.id, req.body, req.user.id);
  return success(res, { data, message: "Tarea actualizada correctamente" });
});

const updateStatus = asyncHandler(async (req, res) => {
  const data = await todoService.updateStatus(req.params.id, req.body.completed, req.user.id);
  return success(res, {
    data,
    message: data.completed ? "Tarea completada" : "Tarea marcada como pendiente",
  });
});

const remove = asyncHandler(async (req, res) => {
  await todoService.remove(req.params.id, req.user.id);
  return noContent(res);
});

module.exports = { list, stats, getById, create, update, updateStatus, remove };
