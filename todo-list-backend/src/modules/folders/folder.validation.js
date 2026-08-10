const { z } = require("zod");

const idParamSchema = z.object({
  id: z.coerce.number().int().positive("El identificador no es valido"),
});

const createFolderSchema = z.object({
  name: z.string().trim().min(1, "El nombre de la carpeta es obligatorio").max(60),
});

const updateFolderSchema = createFolderSchema;

module.exports = { idParamSchema, createFolderSchema, updateFolderSchema };
