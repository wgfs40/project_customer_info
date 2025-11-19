import { z } from "zod";

export const BlogFormSchema = z.object({
  title: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(200, "El título no puede exceder 200 caracteres"),
  content: z.string().min(20, "El contenido debe tener al menos 20 caracteres"),
  main_topic: z
    .string()
    .min(3, "El tema principal debe tener al menos 3 caracteres")
    .max(100, "El tema principal no puede exceder 100 caracteres"),
  published_in: z
    .string()
    .min(4, "El año de publicación debe tener al menos 4 caracteres"),
});
