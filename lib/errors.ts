/**
 * Error handling utilities
 * Centraliza el manejo de errores en toda la aplicación
 */

export type ErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMIT"
  | "SERVER_ERROR"
  | "DATABASE_ERROR"
  | "EXTERNAL_API_ERROR"
  | "UNKNOWN_ERROR";

export interface AppError {
  code: ErrorCode;
  message: string;
  statusCode: number;
  details?: Record<string, unknown>;
  timestamp: Date;
  stack?: string;
}

/**
 * Clase base para errores de la aplicación
 */
export class AppErrorClass extends Error implements AppError {
  code: ErrorCode;
  message: string;
  statusCode: number;
  details?: Record<string, unknown>;
  timestamp: Date;
  stack?: string;

  constructor(
    code: ErrorCode,
    message: string,
    statusCode: number,
    details?: Record<string, unknown>,
  ) {
    super(message);
    this.code = code;
    this.message = message;
    this.statusCode = statusCode;
    this.details = details;
    this.timestamp = new Date();
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.stack = super.stack;

    Object.setPrototypeOf(this, AppErrorClass.prototype);
  }
}

/**
 * Error de validación (400)
 */
export class ValidationError extends AppErrorClass {
  constructor(message: string, details?: Record<string, unknown>) {
    super("VALIDATION_ERROR", message, 400, details);
  }
}

/**
 * Error de autenticación (401)
 */
export class UnauthorizedError extends AppErrorClass {
  constructor(message: string = "Usuario no autenticado") {
    super("UNAUTHORIZED", message, 401);
  }
}

/**
 * Error de autorización (403)
 */
export class ForbiddenError extends AppErrorClass {
  constructor(message: string = "Acceso denegado") {
    super("FORBIDDEN", message, 403);
  }
}

/**
 * Error de recurso no encontrado (404)
 */
export class NotFoundError extends AppErrorClass {
  constructor(message: string = "Recurso no encontrado") {
    super("NOT_FOUND", message, 404);
  }
}

/**
 * Error de conflicto (409)
 */
export class ConflictError extends AppErrorClass {
  constructor(message: string = "Conflicto en la solicitud", details?: Record<string, unknown>) {
    super("CONFLICT", message, 409, details);
  }
}

/**
 * Error de rate limiting (429)
 */
export class RateLimitError extends AppErrorClass {
  constructor(message: string = "Demasiadas solicitudes") {
    super("RATE_LIMIT", message, 429);
  }
}

/**
 * Error de base de datos (500)
 */
export class DatabaseError extends AppErrorClass {
  constructor(message: string = "Error en la base de datos", details?: Record<string, unknown>) {
    super("DATABASE_ERROR", message, 500, details);
  }
}

/**
 * Error de API externa (502)
 */
export class ExternalAPIError extends AppErrorClass {
  constructor(message: string = "Error en API externa", details?: Record<string, unknown>) {
    super("EXTERNAL_API_ERROR", message, 502, details);
  }
}

/**
 * Error genérico del servidor (500)
 */
export class ServerError extends AppErrorClass {
  constructor(message: string = "Error interno del servidor", details?: Record<string, unknown>) {
    super("SERVER_ERROR", message, 500, details);
  }
}

/**
 * Convierte cualquier error a AppError
 */
export function toAppError(error: unknown): AppError {
  if (error instanceof AppErrorClass) {
    return error;
  }

  if (error instanceof Error) {
    return {
      code: "UNKNOWN_ERROR",
      message: error.message,
      statusCode: 500,
      details: { originalError: error.message },
      timestamp: new Date(),
      stack: error.stack,
    };
  }

  return {
    code: "UNKNOWN_ERROR",
    message: "Error desconocido",
    statusCode: 500,
    details: { error },
    timestamp: new Date(),
  };
}

/**
 * Verifica si un error es del tipo AppError
 */
export function isAppError(error: unknown): error is AppError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "statusCode" in error &&
    "message" in error
  );
}
