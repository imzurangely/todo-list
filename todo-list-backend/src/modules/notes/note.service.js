import ApiError from "../../utils/ApiError.js";
import noteModel from "./note.model.js";

const list = (userId) => noteModel.findAll(userId);

const getById = async (id, userId) => {
  const note = await noteModel.findById(id, userId);
  if (!note) throw ApiError.notFound("La nota no existe");
  return note;
};

const create = ({ title, content }, userId) => noteModel.create({ title, content, userId });

const update = async (id, payload, userId) => {
  await getById(id, userId);
  return noteModel.update(id, userId, payload);
};

const remove = async (id, userId) => {
  await getById(id, userId);
  const deleted = await noteModel.remove(id, userId);
  if (!deleted) throw ApiError.notFound("La nota no existe");
};

export default { list, getById, create, update, remove };
