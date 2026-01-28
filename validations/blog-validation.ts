import { z } from "zod";

export interface BlogFormData {
  title: string;
  article_body: string;
  main_topic: string;
  published_in: Date | string | null;
}

export const BlogFormSchema: z.ZodType<BlogFormData> = z.object({
  title: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(200, "El título no puede exceder 200 caracteres"),
  article_body: z.string().min(20, "El contenido debe tener al menos 20 caracteres"),
  main_topic: z
    .string()
    .min(2, "El tema principal debe tener al menos 2 caracteres")
    .max(100, "El tema principal no puede exceder 100 caracteres"),
  published_in: z.union([z.string(), z.date()]).transform((val) => {
    const d = new Date(val);
    if (isNaN(d.getTime())) return new Date().toISOString(); // Evita el RangeError
    return d.toISOString();
  }),
});
