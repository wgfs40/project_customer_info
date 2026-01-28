/**
 * Ejemplo de implementación de error handling en Server Actions
 * Este archivo demuestra cómo usar el sistema de error handling
 */

"use server";

import { withErrorHandling, ServerActionResponse } from "@/lib/server-error-handler";
import { ValidationError, NotFoundError } from "@/lib/errors";

/**
 * Ejemplo: Crear un blog post con error handling
 */
export async function createBlogPostExample(
  title: string,
  content: string,
): Promise<ServerActionResponse> {
  return withErrorHandling(async () => {
    // Validar entrada
    if (!title || title.trim().length === 0) {
      throw new ValidationError("El título es requerido", { field: "title" });
    }

    if (!content || content.trim().length === 0) {
      throw new ValidationError("El contenido es requerido", { field: "content" });
    }

    // Aquí iría la lógica de base de datos
    // const blog = await db.blog.create({ title, content });

    return {
      id: "1",
      title,
      content,
      createdAt: new Date(),
    };
  })();
}

/**
 * Ejemplo: Obtener un blog post con error handling
 */
export async function getBlogPostExample(id: string): Promise<ServerActionResponse> {
  return withErrorHandling(async () => {
    if (!id) {
      throw new ValidationError("ID del blog es requerido");
    }

    // Simular búsqueda en base de datos
    const blogExists = id === "1";

    if (!blogExists) {
      throw new NotFoundError(`Blog con ID ${id} no encontrado`);
    }

    return {
      id,
      title: "Ejemplo Blog",
      content: "Contenido del blog",
      createdAt: new Date(),
    };
  })();
}

/**
 * Patrón de uso en componentes:
 *
 * import { useErrorHandler } from "@/hooks/useErrorHandler";
 * import { throwIfError } from "@/lib/server-error-handler";
 *
 * export function MyComponent() {
 *   const { error, isLoading, executeAsync } = useErrorHandler();
 *
 *   const handleSubmit = async (title: string, content: string) => {
 *     const response = await executeAsync(() =>
 *       createBlogPostExample(title, content)
 *     );
 *
 *     if (response?.success) {
 *       // Éxito - procesar datos
 *     }
 *     // Error está en el estado del hook
 *   };
 *
 *   return (
 *     <div>
 *       {error && <ErrorAlert error={error} />}
 *       <form onSubmit={() => handleSubmit("Title", "Content")}>
  *         <button type="submit" disabled={isLoading}>
 *       </form>
      </div>
    );
 * }
 **/
