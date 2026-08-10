const ApiError = require("../../utils/ApiError");
const noteModel = require("./note.model");

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

module.exports = { list, getById, create, update, remove };
