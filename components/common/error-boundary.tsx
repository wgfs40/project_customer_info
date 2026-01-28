"use client";

import { ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary para capturar errores en componentes React
 * Nota: Para usar en componentes del cliente, se recomienda usar error.tsx en Next.js 13+
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    // You can also log the error to an error reporting service here
    // Example: Sentry.captureException(error)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleReset);
      }

      return <DefaultErrorFallback error={this.state.error} onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}

/**
 * Componente de fallback por defecto para errores
 */
function DefaultErrorFallback({ error, onReset }: { error: Error; onReset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-red-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-4 flex justify-center">
          <AlertCircle className="h-12 w-12 text-red-600" />
        </div>
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">Algo salió mal</h1>
        <p className="mb-4 text-center text-gray-600">
          Ocurrió un error inesperado. Por favor, intenta de nuevo.
        </p>
        <details className="mb-6 rounded bg-gray-100 p-4">
          <summary className="cursor-pointer font-semibold text-gray-700">
            Detalles del error
          </summary>
          <p className="mt-2 whitespace-pre-wrap break-words text-sm text-gray-600">
            {error.message}
          </p>
        </details>
        <button
          onClick={onReset}
          className="flex w-full items-center justify-center gap-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          <RefreshCw className="h-4 w-4" />
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}

// Re-export React for use in the component
import React from "react";
