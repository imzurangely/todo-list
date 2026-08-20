import ApiError from "../../utils/ApiError.js";
import folderModel from "./folder.model.js";

const list = (userId) => folderModel.findAll(userId);

const getById = async (id, userId) => {
  const folder = await folderModel.findById(id, userId);
  if (!folder) throw ApiError.notFound("La carpeta no existe");
  return folder;
};

const create = async ({ name }, userId) => {
  const duplicated = await folderModel.findByName(name, userId);
  if (duplicated) throw ApiError.conflict("Ya tienes una carpeta con ese nombre");
  return folderModel.create({ name, userId });
};

const update = async (id, { name }, userId) => {
  await getById(id, userId);
  const duplicated = await folderModel.findByName(name, userId);
  if (duplicated && duplicated.id !== id) {
    throw ApiError.conflict("Ya tienes una carpeta con ese nombre");
  }
  return folderModel.update(id, userId, { name });
};

const remove = async (id, userId) => {
  await getById(id, userId);
  const deleted = await folderModel.remove(id, userId);
  if (!deleted) throw ApiError.notFound("La carpeta no existe");
};

const countTodos = async (id, userId) => {
  await getById(id, userId);
  return folderModel.countTodos(id, userId);
};

export default { list, getById, create, update, remove, countTodos };
