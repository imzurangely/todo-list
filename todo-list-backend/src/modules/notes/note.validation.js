import { z } from "zod";

const idParamSchema = z.object({
  id: z.coerce.number().int().positive("El identificador no es valido"),
});

const noteSchema = z.object({
  title: z.string().trim().min(1, "El titulo de la nota es obligatorio").max(120),
  content: z
    .union([z.string().trim().max(5000), z.null()])
    .optional()
    .transform((value) => (value ? value : "")),
});

export { idParamSchema, noteSchema };
