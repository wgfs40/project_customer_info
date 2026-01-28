/**
 * Middleware para manejar errores en Server Actions
 */

import { AppError, toAppError, isAppError } from "@/lib/errors";

export interface ServerActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: AppError;
}

/**
 * Envuelve una Server Action con manejo de errores centralizado
 * @param fn - Función server action
 * @returns Función envuelta con manejo de errores
 */
export function withErrorHandling<T extends (...args: never[]) => Promise<unknown>>(
  fn: T,
): (...args: Parameters<T>) => Promise<ServerActionResponse> {
  return async (...args: Parameters<T>): Promise<ServerActionResponse> => {
    try {
      const data = await fn(...args);
      return { success: true, data };
    } catch (error) {
      const appError = toAppError(error);

      // Log error
      if (process.env.NODE_ENV === "development") {
        console.error("[ServerAction Error]", appError);
      }

      // TODO: Send to error tracking service (Sentry, etc.)
      // reportErrorToService(appError);

      return { success: false, error: appError };
    }
  };
}

/**
 * Procesa la respuesta de una Server Action
 * Lanza el error si no fue exitosa
 */
export function throwIfError<T>(response: ServerActionResponse<T>): T {
  if (!response.success && response.error) {
    throw response.error;
  }
  return response.data as T;
}

/**
 * Extrae el mensaje de error de una respuesta
 */
export function getErrorMessage(response: ServerActionResponse): string {
  if (response.error) {
    return response.error.message;
  }
  return "Error desconocido";
}

/**
 * Extrae el código de error de una respuesta
 */
export function getErrorCode(response: ServerActionResponse): string {
  if (response.error) {
    return response.error.code;
  }
  return "UNKNOWN_ERROR";
}
