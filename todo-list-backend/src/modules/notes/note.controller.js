const asyncHandler = require("../../utils/asyncHandler");
const { success, noContent } = require("../../utils/response");
const noteService = require("./note.service");

const list = asyncHandler(async (req, res) => {
  const data = await noteService.list(req.user.id);
  return success(res, { data, message: "Notas obtenidas correctamente" });
});

const getById = asyncHandler(async (req, res) => {
  const data = await noteService.getById(req.params.id, req.user.id);
  return success(res, { data, message: "Nota obtenida correctamente" });
});

const create = asyncHandler(async (req, res) => {
  const data = await noteService.create(req.body, req.user.id);
  return success(res, { data, status: 201, message: "Nota creada correctamente" });
});

const update = asyncHandler(async (req, res) => {
  const data = await noteService.update(req.params.id, req.body, req.user.id);
  return success(res, { data, message: "Nota actualizada correctamente" });
});

const remove = asyncHandler(async (req, res) => {
  await noteService.remove(req.params.id, req.user.id);
  return noContent(res);
});

module.exports = { list, getById, create, update, remove };
