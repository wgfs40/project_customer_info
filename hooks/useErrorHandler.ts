"use client";

import { useState, useCallback } from "react";
import { AppError, isAppError } from "@/lib/errors";

interface UseErrorHandlerState {
  error: AppError | null;
  isLoading: boolean;
}

/**
 * Hook para manejo de errores en componentes
 * Proporciona estado y funciones para capturar y limpiar errores
 */
export function useErrorHandler() {
  const [state, setState] = useState<UseErrorHandlerState>({
    error: null,
    isLoading: false,
  });

  const handleError = useCallback((error: unknown) => {
    if (isAppError(error)) {
      setState((prev) => ({ ...prev, error }));
    } else if (error instanceof Error) {
      const appError: AppError = {
        code: "UNKNOWN_ERROR",
        message: error.message,
        statusCode: 500,
        timestamp: new Date(),
        stack: error.stack,
      };
      setState((prev) => ({ ...prev, error: appError }));
    }
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }));
  }, []);

  const executeAsync = useCallback(
    async <T>(fn: () => Promise<T>): Promise<T | null> => {
      try {
        setLoading(true);
        clearError();
        return await fn();
      } catch (error) {
        handleError(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [handleError, clearError, setLoading],
  );

  return {
    ...state,
    handleError,
    clearError,
    setLoading,
    executeAsync,
  };
}
