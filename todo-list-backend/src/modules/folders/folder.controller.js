import asyncHandler from "../../utils/asyncHandler.js";
import { success, noContent } from "../../utils/response.js";
import folderService from "./folder.service.js";

const list = asyncHandler(async (req, res) => {
  const data = await folderService.list(req.user.id);
  return success(res, { data, message: "Carpetas obtenidas correctamente" });
});

const getById = asyncHandler(async (req, res) => {
  const data = await folderService.getById(req.params.id, req.user.id);
  return success(res, { data, message: "Carpeta obtenida correctamente" });
});

const create = asyncHandler(async (req, res) => {
  const data = await folderService.create(req.body, req.user.id);
  return success(res, { data, status: 201, message: "Carpeta creada correctamente" });
});

const update = asyncHandler(async (req, res) => {
  const data = await folderService.update(req.params.id, req.body, req.user.id);
  return success(res, { data, message: "Carpeta actualizada correctamente" });
});

const remove = asyncHandler(async (req, res) => {
  await folderService.remove(req.params.id, req.user.id);
  return noContent(res);
});

export default { list, getById, create, update, remove };
