import { z } from "zod";

const registerSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(80),
  email: z.string().trim().toLowerCase().email("El correo no es valido").max(160),
  password: z.string().min(6, "La contrasena debe tener al menos 6 caracteres").max(72),
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("El correo no es valido"),
  password: z.string().min(1, "La contrasena es obligatoria"),
});

export { registerSchema, loginSchema };
