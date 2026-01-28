/**
 * Tests para error handling
 */

import {
  AppErrorClass,
  ValidationError,
  UnauthorizedError,
  NotFoundError,
  toAppError,
  isAppError,
} from "@/lib/errors";

describe("Error Handling", () => {
  describe("AppErrorClass", () => {
    it("should create an app error with correct properties", () => {
      const error = new AppErrorClass("SERVER_ERROR", "Test error", 500);

      expect(error.code).toBe("SERVER_ERROR");
      expect(error.message).toBe("Test error");
      expect(error.statusCode).toBe(500);
      expect(error.timestamp).toBeInstanceOf(Date);
    });

    it("should include details when provided", () => {
      const details = { field: "email", reason: "invalid" };
      const error = new AppErrorClass("VALIDATION_ERROR", "Invalid email", 400, details);

      expect(error.details).toEqual(details);
    });
  });

  describe("ValidationError", () => {
    it("should create validation error with 400 status", () => {
      const error = new ValidationError("Email is required");

      expect(error.code).toBe("VALIDATION_ERROR");
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe("Email is required");
    });
  });

  describe("UnauthorizedError", () => {
    it("should create unauthorized error with 401 status", () => {
      const error = new UnauthorizedError();

      expect(error.code).toBe("UNAUTHORIZED");
      expect(error.statusCode).toBe(401);
    });
  });

  describe("NotFoundError", () => {
    it("should create not found error with 404 status", () => {
      const error = new NotFoundError("Post not found");

      expect(error.code).toBe("NOT_FOUND");
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe("Post not found");
    });
  });

  describe("toAppError", () => {
    it("should convert AppErrorClass to AppError", () => {
      const originalError = new ValidationError("Test");
      const appError = toAppError(originalError);

      expect(isAppError(appError)).toBe(true);
      expect(appError.code).toBe("VALIDATION_ERROR");
    });

    it("should convert Error to AppError", () => {
      const originalError = new Error("Test error");
      const appError = toAppError(originalError);

      expect(isAppError(appError)).toBe(true);
      expect(appError.code).toBe("UNKNOWN_ERROR");
      expect(appError.message).toBe("Test error");
      expect(appError.statusCode).toBe(500);
    });

    it("should convert unknown error to AppError", () => {
      const appError = toAppError("string error");

      expect(isAppError(appError)).toBe(true);
      expect(appError.code).toBe("UNKNOWN_ERROR");
      expect(appError.message).toBe("Error desconocido");
      expect(appError.statusCode).toBe(500);
    });
  });

  describe("isAppError", () => {
    it("should return true for valid AppError", () => {
      const error = new ValidationError("Test");
      expect(isAppError(error)).toBe(true);
    });

    it("should return false for regular Error", () => {
      const error = new Error("Test");
      expect(isAppError(error)).toBe(false);
    });

    it("should return false for non-Error objects", () => {
      expect(isAppError({ message: "test" })).toBe(false);
      expect(isAppError("string")).toBe(false);
      expect(isAppError(null)).toBe(false);
    });
  });
});
