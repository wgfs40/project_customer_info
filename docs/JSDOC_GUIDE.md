/\*\*

- Documentación de funciones críticas de la aplicación
  \*/

/\*\*

- FUNCIONES DE ERROR HANDLING
  \*/

/\*\*

- @typedef {Object} AppError
- @property {string} code - Código de error (ej: VALIDATION_ERROR, UNAUTHORIZED)
- @property {string} message - Mensaje de error descriptivo
- @property {number} statusCode - Código HTTP del error
- @property {Record<string, unknown>} [details] - Detalles adicionales del error
- @property {Date} timestamp - Fecha y hora del error
- @property {string} [stack] - Stack trace del error
  \*/

/\*\*

- Crea un error de validación
- @param {string} message - Mensaje de error
- @param {Record<string, unknown>} [details] - Detalles del error (ej: { field: 'email' })
- @returns {ValidationError} Error de validación
- @throws {ValidationError}
- @example
- throw new ValidationError("Email is required", { field: "email" });
  \*/

/\*\*

- Convierte cualquier error a AppError
- @param {unknown} error - Error a convertir
- @returns {AppError} AppError normalizado
- @example
- try {
- await someAsyncOperation();
- } catch (error) {
- const appError = toAppError(error);
- console.error(appError.code, appError.message);
- }
  \*/

/\*\*

- FUNCIONES DE SERVER ACTIONS
  \*/

/\*\*

- Envuelve una Server Action con manejo centralizado de errores
- @template T - Tipo de retorno de la función
- @param {(...args: never[]) => Promise<T>} fn - Función server action
- @returns {(...args: Parameters<T>) => Promise<ServerActionResponse<T>>}
- @example
- const createBlog = withErrorHandling(async (title: string) => {
- if (!title) throw new ValidationError("Title required");
- return await db.blog.create({ title });
- });
-
- const response = await createBlog("My Blog");
- if (response.success) {
- console.log(response.data);
- } else {
- console.error(response.error?.message);
- }
  \*/

/\*\*

- Procesa la respuesta de una Server Action
- Lanza el error si no fue exitosa
- @template T - Tipo de datos esperados
- @param {ServerActionResponse<T>} response - Respuesta de la Server Action
- @returns {T} Datos si fue exitosa
- @throws {AppError} Si la respuesta contiene error
- @example
- const response = await createBlog("My Blog");
- const blogData = throwIfError(response); // Lanza si hay error
- console.log(blogData);
  \*/

/\*\*

- FUNCIONES DE SANITIZACIÓN
  \*/

/\*\*

- Sanitiza HTML eliminando contenido malicioso
- @param {string} dirty - HTML sin limpiar
- @returns {string} HTML sanitizado
- @description
- - Elimina scripts y event handlers
- - Valida URLs (http, https, mailto, tel, anchors)
- - Permite tags y atributos seguros
- - Preserva contenido seguro
- @example
- const clean = sanitize('<p>Safe</p><script>alert("XSS")</script>');
- // Resultado: '<p>Safe</p>'
  \*/

/\*\*

- HOOKS
  \*/

/\*\*

- Hook para manejo de errores en componentes
- @returns {Object} Estado y funciones de error handling
- @returns {AppError|null} error - Error actual
- @returns {boolean} isLoading - Estado de carga
- @returns {Function} handleError - Establece un error
- @returns {Function} clearError - Limpia el error
- @returns {Function} setLoading - Establece estado de carga
- @returns {Function} executeAsync - Ejecuta una función async con manejo de errores
- @example
- function MyComponent() {
- const { error, isLoading, executeAsync } = useErrorHandler();
-
- const handleSubmit = async () => {
-     await executeAsync(async () => {
-       const response = await createBlog("Title");
-       throwIfError(response);
-     });
- };
-
- return (
-     <>
-       {error && <ErrorAlert error={error} />}
-       <button onClick={handleSubmit} disabled={isLoading}>
-         {isLoading ? "Cargando..." : "Enviar"}
-       </button>
-     </>
- );
- }
  \*/

/\*\*

- VALIDACIONES
  \*/

/\*\*

- Schema de validación para blog posts
- @description Valida que el blog tenga:
- - title: string no vacío
- - article_body: string no vacío
- - main_topic: string válido
- - published_in: fecha válida (opcional)
- @example
- import { BlogFormSchema } from "@/validations/blog-validation";
-
- const result = BlogFormSchema.safeParse({
- title: "Mi blog",
- article_body: "Contenido",
- main_topic: "Technology"
- });
-
- if (result.success) {
- console.log(result.data);
- } else {
- console.error(result.error.flatten());
- }
  \*/

/\*\*

- COMPONENTES
  \*/

/\*\*

- Error Boundary para capturar errores en componentes React
- @param {Object} props
- @param {ReactNode} props.children - Componentes hijos
- @param {Function} [props.fallback] - UI personalizado para errores
- @returns {JSX.Element}
- @description
- - Captura errores en componentes hijos
- - Muestra UI de fallback o personalizada
- - Permite reintentar la renderización
- - En producción, NO muestra detalles técnicos
- @example
- import { ErrorBoundary } from "@/components/common/error-boundary";
-
- export function App() {
- return (
-     <ErrorBoundary>
-       <MyComponent />
-     </ErrorBoundary>
- );
- }
  \*/

/\*\*

- PATRONES DE USO COMUNES
  \*/

/\*\*

- PATRÓN 1: Server Action con error handling
-
- "use server";
-
- import { withErrorHandling } from "@/lib/server-error-handler";
- import { ValidationError } from "@/lib/errors";
-
- export async function createBlog(
- title: string,
- content: string
- ) {
- return withErrorHandling(async () => {
-     if (!title) throw new ValidationError("Title required");
-     if (!content) throw new ValidationError("Content required");
-
-     // Database operation
-     const blog = await db.blog.create({ title, content });
-     return blog;
- })();
- }
  \*/

/\*\*

- PATRÓN 2: Componente con error handling
-
- "use client";
-
- import { useErrorHandler } from "@/hooks/useErrorHandler";
- import { throwIfError } from "@/lib/server-error-handler";
- import { createBlog } from "@/actions/blog-action";
-
- export function BlogForm() {
- const { error, isLoading, executeAsync } = useErrorHandler();
-
- const handleSubmit = async (formData: FormData) => {
-     await executeAsync(async () => {
-       const response = await createBlog(
-         formData.get("title") as string,
-         formData.get("content") as string
-       );
-       throwIfError(response);
-     });
- };
-
- return (
-     <form onSubmit={(e) => {
-       e.preventDefault();
-       handleSubmit(new FormData(e.currentTarget));
-     }}>
-       {error && (
-         <div className="error-alert">
-           {error.message}
-         </div>
-       )}
-       <input name="title" />
-       <textarea name="content" />
-       <button disabled={isLoading}>
-         {isLoading ? "Enviando..." : "Enviar"}
-       </button>
-     </form>
- );
- }
  \*/

/\*\*

- PATRÓN 3: Error Boundary
-
- import { ErrorBoundary } from "@/components/common/error-boundary";
-
- export function App() {
- return (
-     <ErrorBoundary
-       fallback={(error, reset) => (
-         <div className="error-screen">
-           <h1>Oops!</h1>
-           <p>{error.message}</p>
-           <button onClick={reset}>Reintentar</button>
-         </div>
-       )}
-     >
-       <YourComponent />
-     </ErrorBoundary>
- );
- }
  \*/

export {}; // Archivo de documentación solamente
