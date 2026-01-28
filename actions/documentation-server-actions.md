# Documentación de Server Actions

## Descripción General

Este documento proporciona una guía completa de todas las **Server Actions** disponibles en la aplicación. Las Server Actions son funciones ejecutadas en el servidor que pueden ser llamadas desde componentes cliente de forma segura.

### Convenciones

- Todas las funciones están marcadas con `"use server"` para indicar que se ejecutan en el servidor
- Las respuestas pueden variar entre diferentes tipos según su patrón de implementación
- Los errores se manejan con excepciones o objetos de respuesta según la función
- La internacionalización está en español

---

## 📚 API Reference

### 1. Blog Actions (`blog-action.ts`)

Gestiona las publicaciones del blog y operaciones relacionadas.

#### `GetBlogs(page, query, limit)`

Obtiene una lista paginada de publicaciones del blog filtradas por búsqueda.

```typescript
async function GetBlogs(page: number, query: string, limit: number);
```

| Parámetro | Tipo     | Descripción                                 |
| --------- | -------- | ------------------------------------------- |
| `page`    | `number` | Número de página (basado en 1)              |
| `query`   | `string` | Término de búsqueda para filtrar por título |
| `limit`   | `number` | Cantidad de registros por página            |

**Respuesta:**

```typescript
{
  totalBlogs: number;
  blogs: Blog[];
}
```

**Ejemplo:**

```typescript
const { totalBlogs, blogs } = await GetBlogs(1, "typescript", 10);
```

---

#### `GetFeaturedBlogs()`

Obtiene todas las publicaciones destacadas activas del blog.

```typescript
async function GetFeaturedBlogs();
```

**Respuesta:**

```typescript
FeaturedBlog[]
```

**Ejemplo:**

```typescript
const featured = await GetFeaturedBlogs();
```

---

#### `GetBlogById(blogid)`

Obtiene una publicación específica del blog por su ID.

```typescript
async function GetBlogById(blogid: string);
```

| Parámetro | Tipo     | Descripción                |
| --------- | -------- | -------------------------- |
| `blogid`  | `string` | ID única de la publicación |

**Respuesta:**

```typescript
Blog | null;
```

**Ejemplo:**

```typescript
const blog = await GetBlogById("123");
```

---

#### `createBlog(formData)` (Server Action Form)

Crea una nueva publicación del blog. Valida datos según `BlogFormSchema`.

```typescript
async function createBlog(formData: FormData);
```

**Campos del FormData requeridos:**

- `title` - Título de la publicación
- `article_body` - Contenido del artículo
- `categoryid` - ID de la categoría (número)
- `main_topic` - Tema principal
- `published_in` - Fecha de publicación

**Respuesta:**

```typescript
{
  success: boolean;
  message: string;
  data: Blog;
  errors: Record<string, string[]>;
}
```

**Ejemplo:**

```typescript
const formData = new FormData();
formData.append("title", "Mi Primer Blog");
formData.append("article_body", "Contenido...");
formData.append("categoryid", "1");
const result = await createBlog(formData);
```

---

#### `updateBlog(formData)` (Server Action Form)

Actualiza una publicación del blog existente. Valida datos según `BlogFormSchema`.

```typescript
async function updateBlog(formData: FormData);
```

**Campos del FormData requeridos:**

- `id` - ID de la publicación a actualizar
- `title` - Título actualizado
- `article_body` - Contenido actualizado
- `categoryid` - ID de la categoría
- `main_topic` - Tema principal
- `published_in` - Fecha de publicación

**Respuesta:**

```typescript
{
  success: boolean;
  message: string;
  data: Blog;
  errors: Record<string, string[]>;
}
```

---

### 2. Category Actions (`category-action.ts`)

Gestiona las categorías de blog.

#### `getCategories(page, query, limit)`

Obtiene una lista paginada de categorías.

```typescript
async function getCategories(page: number, query: string, limit: number);
```

| Parámetro | Tipo     | Descripción                      |
| --------- | -------- | -------------------------------- |
| `page`    | `number` | Número de página (basado en 1)   |
| `query`   | `string` | Término de búsqueda por nombre   |
| `limit`   | `number` | Cantidad de registros por página |

**Respuesta:**

```typescript
{
  totalCategories: number;
  categories: Category[];
}
```

---

#### `getCategoryById(categoryId)`

Obtiene una categoría específica por ID.

```typescript
async function getCategoryById(categoryId: string);
```

**Respuesta:**

```typescript
Category | null;
```

---

#### `createCategory(formData)` (Server Action Form)

Crea una nueva categoría.

```typescript
async function createCategory(formData: FormData);
```

**Campos del FormData:**

- `name` - Nombre de la categoría

**Respuesta:**

```typescript
{
  success: boolean;
  data: Category;
  errors: null;
}
```

---

#### `updateCategory(formData)` (Server Action Form)

Actualiza una categoría existente.

```typescript
async function updateCategory(formData: FormData);
```

**Campos del FormData:**

- `id` - ID de la categoría
- `name` - Nuevo nombre de la categoría

**Respuesta:**

```typescript
{
  success: boolean;
  data: Category;
  errors: null;
}
```

---

#### `registerCategory(prevState, formData)` (Server Action Form)

Registra una nueva categoría o actualiza una existente. Detecta automáticamente la operación.

```typescript
async function registerCategory(
  prevState: FormStateCategory,
  formData: FormData,
): Promise<FormStateCategory>;
```

**Campos del FormData:**

- `id` - ID (opcional, si existe se actualiza)
- `name` - Nombre de la categoría

**Respuesta:**

```typescript
FormStateCategory;
```

---

### 3. Contact Actions (`contact-action.ts`)

Gestiona los contactos recibidos.

#### `getContacts(page, query, limit)`

Obtiene una lista paginada de contactos.

```typescript
async function getContacts(page: number, query: string, limit: number);
```

| Parámetro | Tipo     | Descripción                      |
| --------- | -------- | -------------------------------- |
| `page`    | `number` | Número de página (basado en 1)   |
| `query`   | `string` | Término de búsqueda por nombre   |
| `limit`   | `number` | Cantidad de registros por página |

**Respuesta:**

```typescript
{
  data: Contact[];
  count: number;
}
```

---

#### `contactRegister(prevState, formData)` (Server Action Form)

Registra un nuevo contacto. Valida datos según `ContactFormSchema`.

```typescript
async function contactRegister(prevState: FormState, formData: FormData): Promise<FormState>;
```

**Campos del FormData:**

- `name` - Nombre del contacto
- `email` - Email del contacto
- `message` - Mensaje del contacto

**Respuesta:**

```typescript
FormState;
```

**Comportamiento:**

- Redirige a `/contacts` si es exitoso
- Retorna errores si la validación falla

---

### 4. Service Actions (`service-action.ts`)

Gestiona los servicios disponibles.

#### `GetServices()`

Obtiene la lista completa de todos los servicios.

```typescript
async function GetServices();
```

**Respuesta:**

```typescript
{
  services: Service[];
  message: string;
}
```

**Ejemplo:**

```typescript
const { services, message } = await GetServices();
```

---

#### `GetLatestServices()`

Obtiene los últimos 3 servicios agregados.

```typescript
async function GetLatestServices();
```

**Respuesta:**

```typescript
{
  services: Service[];
  message: string;
}
```

---

#### `CreateService(formData)` (Server Action Form)

Crea un nuevo servicio.

```typescript
async function CreateService(formData: FormData);
```

**Campos del FormData:**

- `name` - Nombre del servicio
- `description` - Descripción del servicio
- `icon` - Icono del servicio
- `color` - Color asociado al servicio

**Respuesta:**

```typescript
{
  message: string;
}
```

---

#### `UpdateService(id, formData)` (Server Action Form)

Actualiza un servicio existente.

```typescript
async function UpdateService(id: string, formData: FormData);
```

| Parámetro  | Tipo     | Descripción          |
| ---------- | -------- | -------------------- |
| `id`       | `string` | ID del servicio      |
| `formData` | FormData | Datos del formulario |

**Campos del FormData:**

- `name` - Nuevo nombre del servicio
- `description` - Nueva descripción
- `icon` - Nuevo icono
- `color` - Nuevo color

---

#### `DeleteService(id)` (Server Action Form)

Elimina un servicio.

```typescript
async function DeleteService(id: string);
```

**Respuesta:**

```typescript
{
  message: string;
}
```

---

### 5. Authentication Actions (`service-auth.ts`)

Gestiona la autenticación de usuarios mediante Supabase Auth.

#### `signNewUser(email, password)`

Registra un nuevo usuario en la plataforma.

```typescript
async function signNewUser(email: string, password: string);
```

| Parámetro  | Tipo     | Descripción       |
| ---------- | -------- | ----------------- |
| `email`    | `string` | Email del usuario |
| `password` | `string` | Contraseña        |

**Comportamiento:**

- Redirige a `/` después del registro exitoso
- Establece cookie de sesión automáticamente
- Lanza error si el email ya existe

**Ejemplo:**

```typescript
await signNewUser("user@example.com", "password123");
```

---

#### `signInUser(formData)` (Server Action Form)

Inicia sesión de un usuario existente.

```typescript
async function signInUser(formData: FormData);
```

**Campos del FormData:**

- `email` - Email del usuario
- `password` - Contraseña del usuario

**Comportamiento:**

- Redirige a `/` si es exitoso
- Lanza error si las credenciales son inválidas

---

#### `signOutUser()`

Cierra la sesión del usuario actual.

```typescript
async function signOutUser();
```

**Ejemplo:**

```typescript
await signOutUser();
```

---

#### `getUserSession()`

Obtiene la sesión actual del usuario autenticado.

```typescript
async function getUserSession();
```

**Respuesta:**

```typescript
{
  user: User;
  session: Session;
}
```

---

#### `getUserWithJWT(jwt)`

Obtiene datos del usuario a partir de un JWT token.

```typescript
async function getUserWithJWT(jwt: string);
```

| Parámetro | Tipo     | Descripción |
| --------- | -------- | ----------- |
| `jwt`     | `string` | JWT token   |

**Respuesta:**

```typescript
User;
```

**Lanza error:** Si el token es inválido

---

#### `resetPasswordForEmail(email)`

Envía un email de reset de contraseña.

```typescript
async function resetPasswordForEmail(email: string);
```

| Parámetro | Tipo     | Descripción       |
| --------- | -------- | ----------------- |
| `email`   | `string` | Email del usuario |

---

#### `updateUserPassword(newPassword)`

Actualiza la contraseña del usuario autenticado.

```typescript
async function updateUserPassword(newPassword: string);
```

| Parámetro     | Tipo     | Descripción      |
| ------------- | -------- | ---------------- |
| `newPassword` | `string` | Nueva contraseña |

---

### 6. File Processing Actions (`proccess-file-action.ts`)

Gestiona la carga y procesamiento de archivos en Supabase Storage.

#### `ProcessUploadedFile(bucketName, fileBody, filePath?)`

Sube un archivo a Supabase Storage con compresión automática de imágenes.

```typescript
async function ProcessUploadedFile(bucketName: string, fileBody: File, filePath?: string);
```

| Parámetro    | Tipo     | Descripción                     |
| ------------ | -------- | ------------------------------- |
| `bucketName` | `string` | Nombre del bucket en Supabase   |
| `fileBody`   | `File`   | Archivo a subir                 |
| `filePath`   | `string` | Ruta opcional dentro del bucket |

**Características:**

- Comprime automáticamente imágenes > 1MB (PNG, JPG, JPEG, WebP)
- Máx ancho/alto: 1920px
- Soporta PDF sin compresión
- Genera nombre único con UUID

**Respuesta:**

```typescript
{
  imageUrl: string; // URL pública del archivo
  message: string; // Mensaje de estado
}
```

**Ejemplo:**

```typescript
const file = new File(["..."], "photo.jpg", { type: "image/jpeg" });
const { imageUrl } = await ProcessUploadedFile("public", file, "uploads");
```

---

#### `GetPublicFileUrl(bucketName, filePath)`

Obtiene la URL pública de un archivo.

```typescript
async function GetPublicFileUrl(bucketName: string, filePath: string);
```

**Respuesta:**

```typescript
{
  message: string;
  data: {
    publicUrl: string;
  }
}
```

---

#### `DeleteFile(bucketName, filePath)`

Elimina un archivo del storage.

```typescript
async function DeleteFile(bucketName: string, filePath: string);
```

**Respuesta:**

```typescript
{
  message: string;
  data: any;
}
```

---

### 7. Image File Database Actions (`manager-images-files.ts`)

Gestiona registros de archivos de imagen en la base de datos.

#### `getImageFilesById(id)`

Obtiene registros de archivos por ID.

```typescript
async function getImageFilesById(id: string);
```

**Respuesta:**

```typescript
ImageFile[]
```

---

#### `insertImageFiles(formData)`

Inserta un nuevo registro de archivo de imagen.

```typescript
async function insertImageFiles(formData: FormData);
```

**Campos del FormData:**

- `name` - Nombre del archivo
- `image_path` - Ruta del archivo en storage
- `mime_type` - Tipo MIME del archivo

**Respuesta:**

```typescript
{
  success: boolean;
  data?: ImageFile;
  error?: Error;
}
```

---

#### `updateImageFiles(id, formData)`

Actualiza un registro de archivo de imagen.

```typescript
async function updateImageFiles(id: string, formData: FormData);
```

**Campos del FormData (todos opcionales):**

- `name` - Nuevo nombre
- `image_path` - Nueva ruta
- `mime_type` - Nuevo tipo MIME

**Respuesta:**

```typescript
{
  success: boolean;
  data?: ImageFile;
  error?: Error;
}
```

---

#### `deleteImageFiles(id)`

Elimina un registro de archivo de imagen.

```typescript
async function deleteImageFiles(id: string);
```

**Respuesta:**

```typescript
{
  success: boolean;
  data?: any;
  error?: Error;
}
```

---

## 🛡️ Seguridad

### Autenticación y Autorización

- Las funciones de autenticación usan Supabase Auth
- Las cookies de sesión se establecen con opciones seguras:
  - `httpOnly: true` - Previene acceso desde JavaScript
  - `secure: true` (en producción) - Solo HTTPS
  - `maxAge: 7 días` - Expiración automática

### Validación de Datos

- `blog-action.ts` y `contact-action.ts` validan con Zod schemas
- Los errores de validación retornan detalles específicos
- FormData se parsea y tipifica antes de usar

### Manejo de Errores

Existen dos patrones principales:

#### 1. Patrón de Respuesta Estructurada

```typescript
{
  success: boolean;
  data?: any;
  error?: AppError;
  message?: string;
}
```

#### 2. Patrón de Excepciones Lanzadas

Algunas funciones lanzan excepciones directamente (p.ej., `service-auth.ts`).

---

## 📋 Validaciones de Schemas

### BlogFormSchema

```typescript
{
  title: string (requerido, no vacío);
  article_body: string (requerido, no vacío);
  category_id: number (requerido);
  main_topic: string (requerido, no vacío);
  published_in: Date | null;
}
```

### ContactFormSchema

```typescript
{
  email: string (requerido, email válido);
  name: string (requerido, no vacío);
  message: string (requerido, no vacío);
}
```

---

## 🔗 Integraciones

### Supabase

- **Auth**: Autenticación y gestión de usuarios
- **Database**: Almacenamiento de datos en PostgreSQL
- **Storage**: Almacenamiento de archivos e imágenes

### Librerías Externas

- **Zod**: Validación y parseo de datos
- **browser-image-compression**: Compresión de imágenes en cliente
- **uuid**: Generación de nombres únicos para archivos

---

## ⚠️ Consideraciones Importantes

1. **FormData Parsing**: Solo se soporta `FormData` en funciones que lo requieran
2. **Redirects**: Algunas acciones redirigen automáticamente (`signNewUser`, `contactRegister`)
3. **Errores de BD**: Los errores de Supabase se lanzan como excepciones en la mayoría de casos
4. **Compresión de Imágenes**: Solo se comprime si el archivo es > 1MB
5. **Rutas de Archivos**: Se generan rutas únicas con UUID para evitar conflictos

---

## 📝 Ejemplo Completo de Uso

### Crear un Blog Post desde un Componente Cliente

```typescript
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createBlog } from '@/actions/blog-action';
import { useState } from 'react';

export function BlogForm() {
  const [state, formAction] = useFormState(createBlog, null);
  const { pending } = useFormStatus();

  return (
    <form action={formAction}>
      <input
        name="title"
        placeholder="Título"
        required
      />
      <textarea
        name="article_body"
        placeholder="Contenido"
        required
      />
      <input
        name="categoryid"
        type="number"
        placeholder="ID de Categoría"
        required
      />
      <input
        name="main_topic"
        placeholder="Tema Principal"
        required
      />
      <input
        name="published_in"
        type="date"
        required
      />
      <button type="submit" disabled={pending}>
        {pending ? 'Creando...' : 'Crear Blog'}
      </button>

      {!state?.success && state?.errors && (
        <div className="errors">
          {Object.entries(state.errors).map(([field, messages]) => (
            <div key={field}>
              <strong>{field}:</strong> {messages.join(', ')}
            </div>
          ))}
        </div>
      )}
    </form>
  );
}
```

---

## 📞 Soporte

Para preguntas o problemas relacionados con Server Actions:

1. Consulta el archivo [JSDOC_GUIDE.md](../docs/JSDOC_GUIDE.md)
2. Revisa los ejemplos en [examples-error-handling.ts](../lib/examples-error-handling.ts)
3. Consulta la configuración de errores en [errors.ts](../lib/errors.ts)

---

**Última actualización:** 28 de enero de 2026  
**Versión:** 1.0  
**Autor:** GitHub Copilot
