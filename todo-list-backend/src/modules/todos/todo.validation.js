const { z } = require("zod");

const PRIORITIES = ["baja", "media", "alta"];

const optionalDate = z
  .union([z.string().trim(), z.null()])
  .optional()
  .transform((value) => (value ? value : null))
  .refine((value) => value === null || !Number.isNaN(Date.parse(value)), {
    message: "La fecha no tiene un formato valido",
  });

const idParamSchema = z.object({
  id: z.coerce.number().int().positive("El identificador no es valido"),
});

const baseTodoSchema = z.object({
  folder_id: z.coerce.number().int().positive("Debes seleccionar una carpeta"),
  title: z.string().trim().min(1, "El titulo es obligatorio").max(120),
  description: z
    .union([z.string().trim().max(1000), z.null()])
    .optional()
    .transform((value) => (value ? value : null)),
  due_date: optionalDate,
  priority: z.enum(PRIORITIES, { message: "La prioridad debe ser baja, media o alta" }),
});

const createTodoSchema = baseTodoSchema;

const updateTodoSchema = baseTodoSchema.extend({
  completed: z.boolean().optional(),
});

const statusSchema = z.object({
  completed: z.boolean({ message: "El estado debe ser verdadero o falso" }),
});

const listQuerySchema = z.object({
  folderId: z.coerce.number().int().positive().optional(),
  completed: z.enum(["true", "false"]).optional(),
  priority: z.enum(PRIORITIES).optional(),
  search: z.string().trim().max(120).optional(),
  sort: z.enum(["due_asc", "due_desc", "priority", "recent"]).optional(),
});

module.exports = {
  PRIORITIES,
  idParamSchema,
  createTodoSchema,
  updateTodoSchema,
  statusSchema,
  listQuerySchema,
};
